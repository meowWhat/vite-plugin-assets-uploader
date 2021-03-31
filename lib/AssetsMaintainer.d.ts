import 'colors';
import { ResolvedOptions } from './index';
export interface fileItem {
    filename: string;
    absFile: string;
}
export declare class AssetsMaintainer {
    private options;
    private uploadImplementation;
    constructor(options: ResolvedOptions);
    pushAssetsToOss(): Promise<void>;
    private mergeQueue;
    private doUpload;
    uploadFile({ absFile, filename }: fileItem): Promise<any>;
    private initOssClinet;
    private logError;
}
