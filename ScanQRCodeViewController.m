//
//  ScanQRCodeViewController.m
//  MShow
//
//  Created by ChanAllan on 4/15/16.
//  Copyright © 2016 Allan.Chan. All rights reserved.
//

#import "ScanQRCodeViewController.h"
#import "LiveViewController.h"
#import "QRScanView.h"
#import "Masonry.h"
#import "ACNetworkHttpRequestManages.h"
#import "UtilityHelper.h"
#import "ZXCGImageLuminanceSource.h"
#import "ZXBinaryBitmap.h"
#import "ZXDecodeHints.h"
#import "ZXResult.h"
#import "ZXHybridBinarizer.h"
#import "ZXMultiFormatReader.h"
#import "MBProgressHUD.h"
#import <AssetsLibrary/AssetsLibrary.h>




@interface ScanQRCodeViewController ()
{
    float _scanViewWidth;
    QRScanView *_scanView;
    ACNetworkHttpRequestManages *_acnetworkHRM;
    
    UILabel *_detailLab;
    UIImageView *_lineImage;
    UILabel *_faileQRCodeLab;
    UILabel *_openCameraLab;
    MBProgressHUD *_mbHUD;
}

@property (strong, nonatomic) AVCaptureDevice* device;
@property (strong, nonatomic) AVCaptureDeviceInput* input;
@property (strong, nonatomic) AVCaptureMetadataOutput* output;
@property (strong, nonatomic) AVCaptureSession* session;
@property (strong, nonatomic) AVCaptureVideoPreviewLayer* preview;

@property (strong, nonatomic) UIImagePickerController *imagePicker;
@property (strong, nonatomic) CIDetector *detector;
@end

@implementation ScanQRCodeViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    if(![self isCameraAvailable]) {
        [self setupNoCameraView];
        return;
    }
    
    if(![self isAllowUseCamera]){
        _openCameraLab.text = @"请打开摄像头功能";
        _openCameraLab.textColor = [UIColor whiteColor];
        _openCameraLab.font = [UIFont fontWithName:@"Arial" size:16.0];
        _openCameraLab.hidden = NO;
        self.view.backgroundColor = [UIColor blackColor];
        [self.view addSubview:_openCameraLab];
        [UtilityHelper showAlertView:@"请打开摄像头权限" andMessage:@"设置->隐私->相机" andCancelBtnTitle:@"确定"];
        return;
    }
    if([self isCameraAvailable]) {
        _openCameraLab.hidden = YES;
        _scanViewWidth = [UIScreen mainScreen].bounds.size.width - 100;
        _detailLab = [[UILabel alloc] init];
        _detailLab.text = @"将云导播的二维码放入框内，即可自动联机直播";
        _detailLab.textColor = [UIColor whiteColor];
        _detailLab.font = [UIFont fontWithName:@"Arial" size:14];
        
        _lineImage = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"扫描动画.png"]];
        _lineImage.frame = CGRectMake(0, 0, _scanViewWidth, 20);
        _lineImage.center = CGPointMake(ScreenWidth*0.5, (ScreenHeight - _scanViewWidth)*0.5);
        
        _faileQRCodeLab = [[UILabel alloc] init];
        _faileQRCodeLab.text = @"联机失败,二维码过期";
        _faileQRCodeLab.textColor = [UIColor redColor];
        _faileQRCodeLab.font = [UIFont fontWithName:@"Arial" size:16.0f];
        _faileQRCodeLab.hidden = YES;
        
        _scanView = [[QRScanView alloc] init];
        
        [self setupAlphaLayer];
        [self setupScanner];
        [self scanLineSetup];
        [self startScanning];
        
        [self.view addSubview:_scanView];
        [self.view addSubview:self.pictureBtn];
        [self.view addSubview:self.outBtn];
        [self.view addSubview:_detailLab];
        [self.view addSubview:_lineImage];
        [self.view addSubview:_faileQRCodeLab];
        
        
        _mbHUD = [[MBProgressHUD alloc] initWithView:self.view];
        _mbHUD.mode = MBProgressHUDModeIndeterminate;
        _mbHUD.labelText = @"正在识别二维码";
        [self.view addSubview:_mbHUD];
        
        [_detailLab mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.mas_equalTo((ScreenHeight + _scanViewWidth)*0.5 + 5);
            make.centerX.equalTo(self.view.mas_centerX);
        }];
        
        [_faileQRCodeLab mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.mas_equalTo((ScreenHeight - _scanViewWidth)*0.5 -20);
            make.centerX.equalTo(self.view.mas_centerX);
        }];
        
        _acnetworkHRM = [ACNetworkHttpRequestManages new];
        [_acnetworkHRM initHttpRequestManages];
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

#pragma mark -
#pragma mark NoCamAvailable

- (void)setupNoCameraView;
{
    UILabel *labelNoCam = [[UILabel alloc] init];
    labelNoCam.text = @"No Camera available";
    labelNoCam.textColor = [UIColor blackColor];
    [self.view addSubview:labelNoCam];
    [labelNoCam sizeToFit];
    labelNoCam.center = self.view.center;
}


#pragma mark -
#pragma mark AVFoundationSetup

- (void) setupScanner;
{
    self.device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    
    if ([self.device isFocusModeSupported:AVCaptureFocusModeContinuousAutoFocus] && [self.device lockForConfiguration:nil]) {
        [self.device setFocusMode:AVCaptureFocusModeContinuousAutoFocus];
        
        if ([self.device isFocusPointOfInterestSupported])
            [self.device setFocusPointOfInterest:CGPointMake(0.5f,0.5f)];
        
        [self.device unlockForConfiguration];
    }
    
    self.input = [AVCaptureDeviceInput deviceInputWithDevice:self.device error:nil];
    
    self.session = [[AVCaptureSession alloc] init];
    
    self.output = [[AVCaptureMetadataOutput alloc] init];
    [self.session addOutput:self.output];
    [self.session addInput:self.input];
    
    [self.output setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
    self.output.metadataObjectTypes=@[AVMetadataObjectTypeQRCode,AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode128Code];
    
    self.preview = [AVCaptureVideoPreviewLayer layerWithSession:self.session];
    self.preview.videoGravity = AVLayerVideoGravityResizeAspectFill;
    
    AVCaptureConnection *con = self.preview.connection;
    con.videoOrientation = AVCaptureVideoOrientationPortrait;
    self.preview.frame = CGRectMake(0, 0, ScreenWidth, ScreenHeight);
    
    [self.view.layer insertSublayer:self.preview atIndex:0];
}


#pragma TODO scanLine要设置它的初始位置
- (void)scanLineSetup{
    [UIView beginAnimations:@"animation" context:NULL];
    [UIView setAnimationDuration:4];
    [UIView setAnimationCurve:UIViewAnimationCurveLinear];
    [UIView setAnimationRepeatCount:100];
    [_lineImage setFrame:CGRectMake((ScreenWidth -_scanViewWidth)*0.5, (ScreenHeight + _scanViewWidth)*0.5 -15, _lineImage.frame.size.width, _lineImage.frame.size.height)];
    [UIView commitAnimations];
}

#pragma mark -
#pragma mark Helper Methods

- (BOOL) isCameraAvailable;
{
    NSArray *videoDevices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    return [videoDevices count] > 0;
}

- (BOOL)isAllowUseCamera{
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if(authStatus == AVAuthorizationStatusAuthorized) {
        return TRUE;
    } else if(authStatus == AVAuthorizationStatusDenied){
        return FALSE;
    }
    else{
        return FALSE;
    }
}

- (void)startScanning;
{
    [self.session startRunning];
}

- (void) stopScanning;
{
    [self.session stopRunning];
}

- (void)setupAlphaLayer{
    _scanView = [[QRScanView alloc] initWithScanRect: CGRectMake((ScreenWidth-_scanViewWidth)*0.5, (ScreenHeight-_scanViewWidth)*0.5, _scanViewWidth, _scanViewWidth)];
}

#pragma mark -
#pragma mark AVCaptureMetadataOutputObjectsDelegate

- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects
       fromConnection:(AVCaptureConnection *)connection
{
    NSString *scanResult;
    
    if ([metadataObjects count] >0)
    {
        AVMetadataMachineReadableCodeObject * metadataObject = [metadataObjects objectAtIndex:0];
        scanResult = metadataObject.stringValue;
        [self vailQRCode:scanResult];
    }
    
}

-(void)goToLiveVC:(NSString *)sid{
    LiveViewController *liveVC = [LiveViewController new];
    liveVC.sid = sid;
    [self.navigationController pushViewController:liveVC animated:YES];
}

- (IBAction)outScanQRCodeVC:(id)sender{
    [self stopScanning];
    [self.navigationController popViewControllerAnimated:YES];
}


-(BOOL)vailDomainName:(NSString *)inputString{
    NSArray *sourceStringArray = [inputString componentsSeparatedByString:@"/"];
    NSString *outPutString = [[NSString alloc] initWithFormat:@"%@//%@/",sourceStringArray.firstObject,[sourceStringArray objectAtIndex:2]];
    if ([outPutString isEqualToString:DOMAINNAME]) {
        return TRUE;
    }
    else{
        return FALSE;
    }
}

- (NSString *)cutTheQRCodeString:(NSString *)inputString{
    NSArray *sourceStringArray = [inputString componentsSeparatedByString:@"/"];
    NSString *outPutString = [[NSString alloc] initWithFormat:@"%@",sourceStringArray.lastObject];
    return outPutString;
}

-(void)vailQRCode:(NSString *)inputString{
    BOOL isVailCode = [self vailDomainName:inputString];
    NSString *sid = [[NSString alloc] init];
    if (isVailCode) {
        sid = [self cutTheQRCodeString:inputString];
        [_session stopRunning];
        [self goToLiveVC:sid];
    }
    else{
        [UtilityHelper showAlertView:@"验证错误" andMessage:@"请扫描正确的二维码" andCancelBtnTitle:@"确定"];
    }
}

#pragma mark 从用户相册获取活动图片
- (IBAction)pickupTheQRCodeFromLib:(id)sender{
    ALAuthorizationStatus author = [ALAssetsLibrary authorizationStatus];
    if (author == ALAuthorizationStatusRestricted || author ==ALAuthorizationStatusDenied){
        [UtilityHelper showAlertView:@"温馨提示" andMessage:@"请您设置允许云导播访问您的相册\n设置>隐私>照片" andCancelBtnTitle:@"确定"];
    }
    
    else {
        _imagePicker = [[UIImagePickerController alloc] init];
        _imagePicker.delegate =self;
        _imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
        _imagePicker.modalTransitionStyle = UIModalTransitionStyleCoverVertical;
        _imagePicker.allowsEditing = YES;
        [self presentViewController:_imagePicker animated:YES completion:nil];
    }
}


#pragma mark UIImagePickerControllerDelegate
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    
    UIImage *image = [info objectForKey:UIImagePickerControllerEditedImage];
    if (!image)
        image = [info objectForKey:UIImagePickerControllerOriginalImage];
    
    [picker dismissViewControllerAnimated:YES completion:^{
        CGImageRef decodeImage = image.CGImage;
        
        ZXLuminanceSource *source = [[ZXCGImageLuminanceSource alloc] initWithCGImage:decodeImage] ;
        ZXBinaryBitmap *bitmap = [ZXBinaryBitmap binaryBitmapWithBinarizer:[ZXHybridBinarizer binarizerWithSource:source]];
        NSError *error = nil;
        
        ZXDecodeHints *hints = [ZXDecodeHints hints];
        
        ZXMultiFormatReader *reader = [ZXMultiFormatReader reader];
        ZXResult *result = [reader decode:bitmap
                                    hints:hints
                                    error:&error];
        if (result) {
            NSString *contents = result.text;
            [self vailQRCode:contents];
        }
        
        else {
            _faileQRCodeLab.hidden = FALSE;
        }
        
    }];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker{
    [picker dismissViewControllerAnimated:YES completion:^{
        _lineImage.center = CGPointMake(ScreenWidth*0.5, (ScreenHeight - _scanViewWidth)*0.5);
        [self scanLineSetup];
    }];
}

- (void)decodeQRCodeImage:(UIImage *)qrcodeimage{
    
}

@end
