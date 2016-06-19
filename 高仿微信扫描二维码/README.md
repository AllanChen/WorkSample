###苹果在iOS 8 之后新增的扫描二维码和识别图像二维码等功能，但可惜的不是所有的苹果机都能用上这个功能。所以前期本人暂时使用第三方库来取代CIImage

####问题详情:

I want to detect QR codes on CIImage and wrote code including below two lines.
 
NSDictionary *detectorConfiguration = [NSDictionary dictionaryWithObjectsAndKeys:CIDetectorAccuracyHigh, CIDetectorAccuracy, nil];
CIDetector *detector = [CIDetector detectorOfType:CIDetectorTypeQRCode context:nil options:detectorConfiguration];
 
But unexpectedly "detector" is nil after the second line executed, and so detection fails.
This issue always occurs on some devices and never occurs on other devices.
It seems to depend also on iOS versions.
For example, tested by simulator, "detector" is nil on (不支持的机型)   
iPhone5 (iOS8.4)  
iPhone5 (iOS9.0)  
iPhone5s (iOS8.4)  
while non-nil on  
iPhone5s (iOS9.0)  
