//
//  AppDelegate.h
//  BaiMiTest
//
//  Created by ChanAllan on 7/3/15.
//  Copyright (c) 2015 ChanAllan. All rights reserved.
//

#import <UIKit/UIKit.h>
#include <libkern/OSAtomic.h>
#include <CoreFoundation/CFURL.h>
#import <AVFoundation/AVFoundation.h>
@interface AppDelegate : UIResponder <UIApplicationDelegate,UIAlertViewDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, strong) UITabBarController *tabbarController;
@property (strong, nonatomic) UINavigationController *navController;
@property (strong, nonatomic) NSMutableArray *micDataArray;
@property (nonatomic, retain) AVAudioSession *avSession;
@property (nonatomic, assign) AURenderCallbackStruct	inputProc;
+ (AppDelegate *)sharedAppDelegate;
- (void)setListenning:(BOOL)state;
- (void)setActive;
@end

