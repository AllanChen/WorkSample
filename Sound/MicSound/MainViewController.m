//
//  MainViewController.m
//  SoundTooth
//
//  Created by ChanAllan on 8/26/15.
//  Copyright (c) 2015 ChanAllan. All rights reserved.
//

#import "MainViewController.h"


@interface MainViewController ()
@property(nonatomic, strong)NSArray *videoPathArray;
@end

@implementation MainViewController
@synthesize videoPathArray = _videoPathArray;

- (void)viewDidLoad {
    [self initView];
    [super viewDidLoad];
}

- (void)initView{
    self.videoPathArray = [[NSArray alloc] initWithObjects:@"33",@"44", nil];
    
}

- (NSInteger)mergeStatus:(NSInteger)mergerStatus{
    NSLog(@"%ld",(long)mergerStatus);
    return mergerStatus;
}

- (float)mergeProgress:(float)mergeProgress{
    NSLog(@"%f",mergeProgress);
    return mergeProgress;
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}


@end
