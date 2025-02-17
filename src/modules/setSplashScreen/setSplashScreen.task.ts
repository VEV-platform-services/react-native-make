import { Config } from '@react-native-community/cli';
import { addIosSplashScreen } from './ios/service';
import { EPlatform } from '../../services/type';
import { addAndroidSplashScreen } from './android/service';
import {setOutputPath} from '../../utils';

export const setSplashScreenTask = async (
  argv: string[],
  config: Config,
  args: Record<string, any>
) => {
  const { path: imagePath, platform, background: backgroundColor, resize: resizeMode, outputPath } = args;
  setOutputPath(outputPath);
  switch (platform) {
    case EPlatform.IOS:
      await addIosSplashScreen(imagePath, backgroundColor, resizeMode);
      break;
    case EPlatform.ANDROID:
      await addAndroidSplashScreen(imagePath, backgroundColor, resizeMode);
      break;
    case EPlatform.ALL:
      await addIosSplashScreen(imagePath, backgroundColor, resizeMode);
      await addAndroidSplashScreen(imagePath, backgroundColor, resizeMode);
      break;
    default:
      console.log("We don't support this platform yet");
      break;
  }
};
