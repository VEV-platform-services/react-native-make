"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./ios/service");
const type_1 = require("../../services/type");
const service_2 = require("./android/service");
const utils_1 = require("../../utils");
exports.setSplashScreenTask = async (argv, config, args) => {
    const { path: imagePath, platform, background: backgroundColor, resize: resizeMode, outputPath } = args;
    utils_1.setOutputPath(outputPath);
    switch (platform) {
        case type_1.EPlatform.IOS:
            await service_1.addIosSplashScreen(imagePath, backgroundColor, resizeMode);
            break;
        case type_1.EPlatform.ANDROID:
            await service_2.addAndroidSplashScreen(imagePath, backgroundColor, resizeMode);
            break;
        case type_1.EPlatform.ALL:
            await service_1.addIosSplashScreen(imagePath, backgroundColor, resizeMode);
            await service_2.addAndroidSplashScreen(imagePath, backgroundColor, resizeMode);
            break;
        default:
            console.log("We don't support this platform yet");
            break;
    }
};
