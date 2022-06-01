declare class PathHelper {
    isAbsolute(pathStr: string): boolean;
    normalize(pathStr: string): string;
    join(...paths: string[]): string;
    getFileName(pathStr: string, includeExt?: boolean): string;
    /** 依照 paths 依次寻址并返回最终到达的绝对路径 */
    resolve(...paths: string[]): string;
    /**
     * 获取 to 相对于 from 的相对路径，结果路径不会由 / 开头
     * @param from 寻址起路路径
     * @param to 寻址目标路径
     * @param fromIsFile 寻址起始路径是否是文件，如果是文件，起止路径会自动进行 dirname 处理
     */
    relative(from: string, to: string, fromIsFile?: boolean): string;
}
export declare const pathHelper: PathHelper;
export {};
