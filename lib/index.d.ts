/// <reference types="node" />
import { Plugin } from 'vite';
interface ossOptions {
    accessKeyId: string;
    accessKeySecret: string;
    roleArn?: string;
    bucket: string;
    region: string;
}
export interface Options {
    enableAlioss?: boolean;
    ossOptions?: ossOptions;
    userUpload?: (filePath: string, content: Buffer) => Promise<any>;
}
export interface ResolvedOptions extends Options {
    root?: string;
    assetsDir?: string;
    savePath?: string;
    isProduction?: boolean;
}
export default function assetUploaderPlugin(rawOptions?: Options): Plugin;
export {};
