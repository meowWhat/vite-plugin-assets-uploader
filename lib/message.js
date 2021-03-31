"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushAssetsDone = exports.pushAssetsCanceled = exports.pushAssetsConfirm = void 0;
require("colors");
exports.pushAssetsConfirm = "\u5C06\u4F1A\u63A8\u9001\u4E0A\u8FF0\u6587\u4EF6\uFF0C\u662F\u5426\u786E\u8BA4? (\u8BF7\u8F93\u5165y\u6216n)\n" + '[y]'.yellow + " \u786E\u8BA4\u63A8\u9001\n" + '[n]'.yellow + " \u53D6\u6D88\n> ";
exports.pushAssetsCanceled = '推送取消'.yellow;
exports.pushAssetsDone = '推送完成'.green;
