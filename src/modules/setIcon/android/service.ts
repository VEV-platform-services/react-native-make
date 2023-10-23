import { checkImageIsSquare, generateResizedAssets } from '../../../services/image.processing';
import { config } from './config';
import { join } from 'path';
import { copyFile, replaceInFile } from '../../../services/file.processing';
import { getHexColor } from '../../../services/color.processing';
import {getAndroidResourceOutputPath} from '../../../utils';

export const addAndroidIcon = async (iconSource: string, backgroundColor: string) => {
  try {
    await checkImageIsSquare(iconSource);
    await generateLegacyIcons(iconSource);
    await generateAdaptiveIcons(iconSource, backgroundColor);
  } catch (err) {
    console.log(err);
  }
};

const generateLegacyIcons = (iconSource: string) =>
  Promise.all(
    config.androidIconSizes.map(size =>
      generateResizedAssets(
        iconSource,
        `${getAndroidResourceOutputPath()}/mipmap-${size.density}/ic_launcher.png`,
        size.value
      )
    )
  );

const generateAdaptiveIcons = (iconSource: string, backgroundColor: string) => {
  replaceInFile(
    join(__dirname, `../../../../templates/android/values/colors-icon.xml`),
    `${getAndroidResourceOutputPath()}/values/colors-icon.xml`,
    [
      {
        newContent: getHexColor(backgroundColor),
        oldContent: /{{iconBackground}}/g,
      },
    ]
  );

  return Promise.all(
    config.androidIconSizes.map(size => generateAdaptiveIcon(iconSource, size.density, size.value))
  );
};

const generateAdaptiveIcon = (iconSource: string, density: string, value: number) => {
  const destinationDirectoryPath = `${getAndroidResourceOutputPath()}/mipmap-${density}-v26`;
  copyFile(
    join(__dirname, `../../../../templates/android/mipmap/ic_launcher.xml`),
    `${destinationDirectoryPath}/ic_launcher.xml`
  );
  return generateResizedAssets(iconSource, `${destinationDirectoryPath}/ic_foreground.png`, value);
};
