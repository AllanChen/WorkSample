//
//  fft.h
//  BaiMiTest
//
//  Created by ChanAllan on 8/4/15.
//  Copyright (c) 2015 ChanAllan. All rights reserved.
//
#ifdef __cplusplus
extern "C" {
#endif
    
#ifndef BaiMiTest_fft_h
#define BaiMiTest_fft_h
#include <stdio.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <math.h>
#include "zx_fft.h"
#include "rscode.h"

extern int renderDatas(int32_t *data , int len, int count_of_byte, int msg_len, int sample, char *out);
extern int decodeRsChar(const char *data, int len, char *out);

#endif
#ifdef __cplusplus
}
#endif