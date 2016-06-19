
//
//  AppDelegate.m
//  BaiMiTest
//
//  Created by ChanAllan on 7/3/15.
//  Copyright (c) 2015 ChanAllan. All rights reserved.
//

#import "AppDelegate.h"
//微波
#import "FFTBufferManager.h"
#import "aurio_helper.h"
#import "bb_header.h"
#import "AudioUnit/AudioUnit.h"
#import "CAXException.h"
#import "fft.h"
#import "ACNetworkHttpRequestManages.h"
#import "MainViewController.h"



@interface AppDelegate (){
    SInt32*						fftData;
    NSUInteger					fftLength;
    BOOL						hasNewFFTData;
    
    AudioUnit					rioUnit;
    BOOL						unitIsRunning;
    BOOL						unitHasBeenCreated;
    
    BOOL						initted_oscilloscope, initted_spectrum;
    UInt32*						texBitBuffer;
    CGRect						spectrumRect;
    
    GLuint						bgTexture;
    GLuint						muteOffTexture, muteOnTexture;
    GLuint						fftOffTexture, fftOnTexture;
    
    
    BOOL						mute;
    
    BOOL                        interruption;
    
    
    FFTBufferManager*			fftBufferManager;
    DCRejectionFilter*			dcFilter;
    CAStreamBasicDescription	thruFormat;
    CAStreamBasicDescription    drawFormat;
    
    AudioBufferList*            drawABL;
    Float64						hwSampleRate;
    
    AudioConverterRef           audioConverter;
    
    UIEvent*					pinchEvent;
    CGFloat						lastPinchDist;
    
    SystemSoundID				buttonPressSound;
    
    int32_t*					l_fftData;
    
    BOOL						resetOscilLine;
    
    BOOL                        _isListenning;
}

@property						FFTBufferManager*		fftBufferManager;

@property (nonatomic, assign)	AudioUnit				rioUnit;
@property (nonatomic, assign)	BOOL					unitIsRunning;
@property (nonatomic, assign)	BOOL					unitHasBeenCreated;
@property (nonatomic, assign)	BOOL					mute;

@property (nonatomic, assign)   BOOL interruption;
@property (nonatomic, strong) ACNetworkHttpRequestManages *acntworkHRM;
@property (nonatomic, strong) NSString *iTunesLink;
@property (nonatomic, copy) NSMutableString *combinationString ;
@end




@implementation AppDelegate
@synthesize navController = _navController;
@synthesize micDataArray = _micDataArray;
@synthesize acntworkHRM = _acntworkHRM;
@synthesize iTunesLink = _iTunesLink;
@synthesize combinationString = _combinationString;

@synthesize rioUnit;
@synthesize unitIsRunning;
@synthesize unitHasBeenCreated;

@synthesize fftBufferManager;
@synthesize mute;
@synthesize inputProc;
@synthesize interruption;
@synthesize avSession = _avSession;



- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    MainViewController *mainVC = [[MainViewController alloc] init];
    _navController = [[UINavigationController alloc] initWithRootViewController:mainVC];
    [_navController setNavigationBarHidden:NO];
    self.navController.navigationBar.translucent = NO;
    
    [self.window setRootViewController:_navController];
    [self.window makeKeyAndVisible];
    _isListenning = YES;
    _micDataArray = [NSMutableArray new];
    _combinationString = [NSMutableString new];
    
#ifdef __IPHONE_8_0
    if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_6_1) {
        
        [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL granted) {
            
            if (!granted) {
                
                UIAlertView *alertView = [[[UIAlertView alloc] initWithTitle:@"没有开启麦克风" message:@"请到[设置]->[隐私]->[麦克风]中开启" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil] autorelease];
                [alertView show];
            }
            
        }];
    }
#endif
    
    inputProc.inputProc = PerformThru;
    inputProc.inputProcRefCon = self;
    _avSession = [AVAudioSession sharedInstance];
    [self setupListening];
    
    // Set up the view to refresh at 20 hz
    NSTimer *animationTimer = [NSTimer scheduledTimerWithTimeInterval:1./20. target:self selector:@selector(computeWave) userInfo:nil repeats:YES];
    
    NSRunLoop *main = [NSRunLoop currentRunLoop];
    [main addTimer:animationTimer forMode:NSRunLoopCommonModes];
    
    
    return YES;
}



- (void)applicationDidBecomeActive:(UIApplication *)application {
    
    //start animation now that we're in the foreground
    NSTimer *animationTimer = [NSTimer scheduledTimerWithTimeInterval:1./20. target:self selector:@selector(computeWave) userInfo:nil repeats:YES];
    
    NSRunLoop *main = [NSRunLoop currentRunLoop];
    [main addTimer:animationTimer forMode:NSRunLoopCommonModes];
    AudioOutputUnitStart(self.rioUnit);
}


- (void)computeWave {
//    NSLog(@"%d",fftBufferManager->HasNewAudioData());
    if (_isListenning == YES && fftBufferManager->HasNewAudioData()) {
        char out_data[21];
        if (fftBufferManager->ComputeFFT(out_data)) {
            // 得到的out_data就是20个字符 uv(TAG)(RS)
            out_data[20] = '\0';
            [self combinationString:out_data];
        }
        else
            hasNewFFTData = NO;
    }
}

-(NSString *)combinationString:(char *)inputChar{
    NSString *inputSting = [NSString stringWithFormat:@"%s",inputChar];
    NSLog(@"%@",inputSting);
    if ([_combinationString length] >=60) {
        
        NSArray *array = [_combinationString componentsSeparatedByString:@"uv"];
        //NSLog(@"uv array --%@",array);
        for(int i=0;i<array.count;i++){
            NSString *pmcode = [array objectAtIndex:i] ;
            const char *out_data;
            if (pmcode.length ==18) {
                out_data = [pmcode cStringUsingEncoding:NSUTF8StringEncoding];
                [self decodeRecevieSting:out_data];
            }
            
            else if (pmcode.length>18) {
                out_data = [[pmcode substringToIndex:18] cStringUsingEncoding:NSUTF8StringEncoding];
                //NSLog(@"out_data -- %s",out_data);
                [self decodeRecevieSting:out_data];
            }
        }
        _combinationString = [[NSMutableString alloc]initWithString:@""];
    }
    else{
        NSString *newInputString = [[NSString alloc] initWithFormat:@"%@s",inputSting];
        [_combinationString appendString:newInputString];
        //NSLog(@"combination String -- %@",_combinationString);
    }
    return inputSting;
}

- (void)decodeRecevieSting:(const char*)inputSting{
    char out_string[21];
    decodeRsChar(inputSting, 18, out_string);
    out_string[18] = '\0';
    NSString *recevieString = [NSString stringWithFormat:@"%s",out_string];
    //NSLog(@"output Sting --- %@",recevieString);
    NSNotificationCenter *notification = [NSNotificationCenter defaultCenter];
    if ([recevieString rangeOfString:@"<"].location == NSNotFound || ![recevieString isEqualToString:@"  "]) {
        if (![_micDataArray containsObject:recevieString]) {
            [_micDataArray addObject:recevieString];
        }
//        [notification postNotificationName:MICNOTIFICATION object:recevieString];
    }
}


- (void)dealloc
{
    delete[] dcFilter;
    delete fftBufferManager;
    if (drawABL)
    {
        for (UInt32 i=0; i<drawABL->mNumberBuffers; ++i)
            free(drawABL->mBuffers[i].mData);
        free(drawABL);
        drawABL = NULL;
    }
    [_window release];
    [super dealloc];
}


#pragma mark -Audio Session Property Listener

void propListener(void *inClientData, AudioSessionPropertyID inID, UInt32 inDataSize, const void *inData)
{
    AppDelegate *THIS = (AppDelegate*)inClientData;
    if (inID == kAudioSessionProperty_AudioRouteChange)
    {
        try {
            UInt32 isAudioInputAvailable;
            UInt32 size = sizeof(isAudioInputAvailable);
            
            XThrowIfError([THIS->_avSession isOtherAudioPlaying], "couldn't get AudioSession AudioInputAvailable property value");
            
            if(THIS->unitIsRunning && !isAudioInputAvailable)
            {
                XThrowIfError(AudioOutputUnitStop(THIS->rioUnit), "couldn't stop unit");
                THIS->unitIsRunning = false;
            }
            
            else if(!THIS->unitIsRunning && isAudioInputAvailable)
            {
                //XThrowIfError(AudioSessionSetActive(true), "couldn't set audio session active\n");
                NSError *error;
                BOOL avSessionActive;
                avSessionActive = [THIS->_avSession setActive:YES error:&error];
                if (!avSessionActive)
                    XThrow(NULL, "couldn't set audio session active\n");
                
                if (!THIS->unitHasBeenCreated)	// the rio unit is being created for the first time
                {
                    XThrowIfError(SetupRemoteIO(THIS->rioUnit, THIS->inputProc, THIS->thruFormat), "couldn't setup remote i/o unit");
                    THIS->unitHasBeenCreated = true;
                    
                    THIS->dcFilter = new DCRejectionFilter[THIS->thruFormat.NumberChannels()];
                }
                XThrowIfError(AudioOutputUnitStart(THIS->rioUnit), "couldn't start unit");
                THIS->unitIsRunning = true;
            }
            
        } catch (CAXException e) {
            char buf[256];
            fprintf(stderr, "Error: %s (%s)\n", e.mOperation, e.FormatError(buf));
        }
        
    }
}



#pragma mark -Audio Session Interruption Listener
void rioInterruptionListener(void *inClientData, UInt32 inInterruption)
{
    try {
        printf("Session interrupted! --- %s ---", inInterruption == kAudioSessionBeginInterruption ? "Begin Interruption" : "End Interruption");
        
        AppDelegate *THIS = (AppDelegate *)inClientData;
        
        if (inInterruption == kAudioSessionEndInterruption) {
            if (![THIS->_avSession setActive:YES error:nil])
                NSLog(@"couldn't set audio session active");
            
            XThrowIfError(AudioOutputUnitStart(THIS->rioUnit), "couldn't start unit");
            
            THIS->interruption = NO;
        }
        
        if (inInterruption == kAudioSessionBeginInterruption) {
            
            THIS->interruption = YES;
            
            XThrowIfError(AudioOutputUnitStop(THIS->rioUnit), "couldn't stop unit");
        }
    } catch (CAXException e) {
        char buf[256];
        fprintf(stderr, "Error: %s (%s)\n", e.mOperation, e.FormatError(buf));
    }
}


#pragma mark -RIO Render Callback

static OSStatus	PerformThru(
                            void						*inRefCon,
                            AudioUnitRenderActionFlags 	*ioActionFlags,
                            const AudioTimeStamp 		*inTimeStamp,
                            UInt32 						inBusNumber,
                            UInt32 						inNumberFrames,
                            AudioBufferList 			*ioData)
{
    AppDelegate *THIS = (AppDelegate *)inRefCon;
    OSStatus err = AudioUnitRender(THIS->rioUnit, ioActionFlags, inTimeStamp, 1, inNumberFrames, ioData);
    if (err) { printf("PerformThru: error %d\n", (int)err); return err; }
    
    // Remove DC component
    for(UInt32 i = 0; i < ioData->mNumberBuffers; ++i)
        THIS->dcFilter[i].InplaceFilter((Float32*)(ioData->mBuffers[i].mData), inNumberFrames);
    
    if (THIS->fftBufferManager == NULL) return noErr;
    
    if (THIS->fftBufferManager->NeedsNewAudioData())
        THIS->fftBufferManager->GrabAudioData(ioData);
    
    if (THIS->mute == YES) { SilenceData(ioData); }
    
    return err;
}

- (void)setupListening {
    
    CFURLRef url = NULL;
    try {
        // Initialize and configure the audio session
        XThrowIfError(AudioSessionInitialize(NULL, NULL, rioInterruptionListener, self), "couldn't initialize audio session");
        self.interruption = NO;
        
        
        UInt32 audioCategory = kAudioSessionCategory_PlayAndRecord;
        XThrowIfError(AudioSessionSetProperty(kAudioSessionProperty_AudioCategory, sizeof(audioCategory), &audioCategory), "couldn't set audio category");
        
        XThrowIfError(AudioSessionAddPropertyListener(kAudioSessionProperty_AudioRouteChange, propListener, self), "couldn't set property listener");
        
        
        UInt32 size = sizeof(hwSampleRate);
        XThrowIfError(AudioSessionGetProperty(kAudioSessionProperty_CurrentHardwareSampleRate, &size, &hwSampleRate), "couldn't get hw sample rate");
        
        XThrowIfError(AudioSessionSetActive(true), "couldn't set audio session active\n");
        
        XThrowIfError(SetupRemoteIO(rioUnit, inputProc, thruFormat), "couldn't setup remote i/o unit");
        
        unitHasBeenCreated = true;
        drawFormat.SetAUCanonical(2, false);
        //drawFormat.mSampleRate = 44100;
        XThrowIfError(AudioConverterNew(&thruFormat, &drawFormat, &audioConverter), "couldn't setup AudioConverter");
        
        dcFilter = new DCRejectionFilter[thruFormat.NumberChannels()];
        
        UInt32 maxFPS;
        size = sizeof(maxFPS);
        XThrowIfError(AudioUnitGetProperty(rioUnit, kAudioUnitProperty_MaximumFramesPerSlice, kAudioUnitScope_Global, 0, &maxFPS, &size), "couldn't get the remote I/O unit's max frames per slice");
        
        maxFPS = 44100 * 20 * 0.0872;
        fftBufferManager = new FFTBufferManager(maxFPS);
        l_fftData = new int32_t[maxFPS/2];
        
        
        XThrowIfError(AudioOutputUnitStart(rioUnit), "couldn't start remote i/o unit");
        
        size = sizeof(thruFormat);
        XThrowIfError(AudioUnitGetProperty(rioUnit, kAudioUnitProperty_StreamFormat, kAudioUnitScope_Output, 1, &thruFormat, &size), "couldn't get the remote I/O unit's output client format");
        
        unitIsRunning = 1;
    }
    catch (CAXException &e) {
        char buf[256];
        fprintf(stderr, "Error: %s (%s)\n", e.mOperation, e.FormatError(buf));
        unitIsRunning = 0;
        if (dcFilter) delete[] dcFilter;
        if (drawABL)
        {
            for (UInt32 i=0; i<drawABL->mNumberBuffers; ++i)
                free(drawABL->mBuffers[i].mData);
            free(drawABL);
            drawABL = NULL;
        }
        if (url) CFRelease(url);
    }
    catch (...) {
        fprintf(stderr, "An unknown error occurred\n");
        unitIsRunning = 0;
        if (dcFilter) delete[] dcFilter;
        if (drawABL)
        {
            for (UInt32 i=0; i<drawABL->mNumberBuffers; ++i)
                free(drawABL->mBuffers[i].mData);
            free(drawABL);
            drawABL = NULL;
        }
        if (url) CFRelease(url);
    }
}


#pragma mark -

+ (AppDelegate *)sharedAppDelegate {
    return (AppDelegate *)[UIApplication sharedApplication].delegate;
}

- (void)setActive{
    AudioOutputUnitStart(self.rioUnit);
}

- (void)setListenning:(BOOL)state {
    
    _isListenning = state;
}

@end
