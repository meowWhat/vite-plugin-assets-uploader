export declare class Question {
    private query;
    constructor(query: string);
    getAnswer(): Promise<string>;
    /**
     * 支持多行标准输入
     */
    getMultiLine(): Promise<string>;
}
