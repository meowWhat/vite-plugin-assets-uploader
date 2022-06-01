/// <reference types="node" />
import * as OSS from 'ali-oss';
interface AliOssOptions {
    accessKeyId: string;
    accessKeySecret: string;
    stsToken?: string;
    bucket: string;
    region: string;
}
interface StsTokenOptions {
    accessKeyId: string;
    accessKeySecret: string;
    roleArn: string;
}
export declare class AliOss {
    private ossClient;
    constructor(options: AliOssOptions);
    putFile(fileName: string, buffer: Buffer): Promise<OSS.PutObjectResult>;
}
export declare const getToken: (options: StsTokenOptions) => Promise<{
    credentials: OSS.Credentials;
}>;
export {};
