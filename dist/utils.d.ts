/**
 * Fetch Android package name by reading string content of main AndroidManifest.xml
 */
export declare function getAndroidPackageName(): string;
/**
 * Convert extracted package name to uri by replacing
 * @param packageName Android module package name
 */
export declare function convertAndroidPackageNameToUri(packageName: string): string;
/**
 * Fetch Ios package name by reading string content of Podfile
 */
export declare function getIosPackageName(): string;
/**
 * Get android resource output path
 */
export declare function getAndroidResourceOutputPath(): string;
export declare function getOutputPath(): string;
export declare function setOutputPath(outputPath: string): void;
