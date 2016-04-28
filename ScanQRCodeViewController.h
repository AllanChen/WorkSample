//
//  ScanQRCodeViewController.h
//  MShow
//
//  Created by ChanAllan on 4/15/16.
//  Copyright © 2016 Allan.Chan. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>


@protocol ScanQRCodeViewControllerDelegate;
@interface ScanQRCodeViewController : UIViewController<AVCaptureMetadataOutputObjectsDelegate,UINavigationControllerDelegate,UIImagePickerControllerDelegate>


@property (nonatomic, weak) id<ScanQRCodeViewControllerDelegate> delegate;

@property (assign, nonatomic) BOOL touchToFocusEnabled;
@property (weak, nonatomic) IBOutlet UIButton *outBtn;
@property (weak, nonatomic) IBOutlet UIButton *pictureBtn;


- (BOOL) isCameraAvailable;
- (void) startScanning;
- (void) stopScanning;
- (void) setTorch:(BOOL) aStatus;

@end

@protocol ScanQRCodeViewControllerDelegate <NSObject>

@optional

//- (void) scanViewController:(ScanQRCodeViewController *) aCtler didTapToFocusOnPoint:(CGPoint) aPoint;
//- (void) scanViewController:(ScanQRCodeViewController *) aCtler didSuccessfullyScan:(NSString *) aScannedValue;

@end
