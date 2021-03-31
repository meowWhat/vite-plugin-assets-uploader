import 'colors';
import { ResolvedOptions } from './index';
export interface fileItem {
    filename: string;
    absFile: string;
    size: string;
}
export declare class AssetsMaintainer {
    private options;
    private uploadImplementation;
    private doneCount;
    private filesToPushLen;
    constructor(options: ResolvedOptions);
    pushAssetsToOss(): Promise<void>;
    private mergeQueue;
    private doUpload;
    uploadFile({ absFile, filename, size }: fileItem): Promise<any>;
    private initOssClinet;
    private logError;
}
