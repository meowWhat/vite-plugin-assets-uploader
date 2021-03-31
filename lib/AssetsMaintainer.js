"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsMaintainer = void 0;
var glob = require("glob");
var path = require("path");
var fs = require("fs");
require("colors");
var message_1 = require("./message");
var AliOss_1 = require("./AliOss");
var Question_1 = require("./helper/Question");
var AssetsMaintainer = /** @class */ (function () {
    function AssetsMaintainer(options) {
        this.options = options;
    }
    AssetsMaintainer.prototype.pushAssetsToOss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ossClient_1, error_1, filesToPush_1, assetDir, absFiles, absFiles_1, absFiles_1_1, absFile, stat, relativeFile, filename, sizeS, answer, queues, sliceCount_1, _loop_1, i, len, error_2;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.options.root || !this.options.assetsDir) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        if (!this.options.enableAlioss) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.initOssClinet()];
                    case 2:
                        ossClient_1 = _b.sent();
                        if (ossClient_1) {
                            this.uploadImplementation = function (fileName, base64) {
                                return ossClient_1.putFile(fileName, base64);
                            };
                        }
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        this.logError(error_1);
                        return [2 /*return*/];
                    case 5:
                        _b.trys.push([5, 8, , 9]);
                        filesToPush_1 = [];
                        assetDir = path.join(this.options.root, this.options.assetsDir).replace(/\/$/, '');
                        absFiles = glob.sync(assetDir + '/**/*');
                        try {
                            for (absFiles_1 = __values(absFiles), absFiles_1_1 = absFiles_1.next(); !absFiles_1_1.done; absFiles_1_1 = absFiles_1.next()) {
                                absFile = absFiles_1_1.value;
                                stat = fs.statSync(absFile);
                                if (!stat.isFile()) {
                                    continue;
                                }
                                relativeFile = absFile.replace(assetDir + '/', '');
                                if (relativeFile === 'index.html') {
                                    continue;
                                }
                                filename = relativeFile;
                                sizeS = " (" + Math.round(stat.size / 1024) + "K)";
                                if (stat.size > 500 * 1024) {
                                    sizeS = sizeS.red;
                                }
                                else if (stat.size > 100 * 1024) {
                                    sizeS = sizeS.yellow;
                                }
                                else {
                                    sizeS = sizeS.green;
                                }
                                filesToPush_1.push({ filename: filename, absFile: absFile });
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (absFiles_1_1 && !absFiles_1_1.done && (_a = absFiles_1.return)) _a.call(absFiles_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, new Question_1.Question(message_1.pushAssetsConfirm).getAnswer()];
                    case 6:
                        answer = _b.sent();
                        if (answer !== 'y') {
                            console.log(message_1.pushAssetsCanceled);
                            return [2 /*return*/];
                        }
                        queues = [];
                        sliceCount_1 = 5;
                        _loop_1 = function (i, len) {
                            queues.push(function () {
                                return _this.doUpload(filesToPush_1.slice(i, i + sliceCount_1));
                            });
                        };
                        for (i = 0, len = filesToPush_1.length; i < len; i += sliceCount_1) {
                            _loop_1(i, len);
                        }
                        return [4 /*yield*/, this.mergeQueue(queues)];
                    case 7:
                        _b.sent();
                        console.log(message_1.pushAssetsDone);
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _b.sent();
                        this.logError(error_2);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AssetsMaintainer.prototype.mergeQueue = function (arr) {
        return __awaiter(this, void 0, void 0, function () {
            var res, errorCount, doFn, arr_1, arr_1_1, fn, isSuccess, e_2_1;
            var e_2, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = [];
                        errorCount = 0;
                        doFn = function (fn) { return __awaiter(_this, void 0, void 0, function () {
                            var data, error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 4]);
                                        return [4 /*yield*/, fn()];
                                    case 1:
                                        data = _a.sent();
                                        res.push(data);
                                        return [2 /*return*/, true];
                                    case 2:
                                        error_3 = _a.sent();
                                        if (errorCount === 2) {
                                            return [2 /*return*/, false];
                                        }
                                        errorCount += 1;
                                        console.log(("\u4EFB\u52A1\u5931\u8D25,\u6B63\u5728\u91CD\u8BD5,\u6B21\u6570 " + errorCount + "!\n").red, error_3 || '');
                                        return [4 /*yield*/, doFn(fn)];
                                    case 3: return [2 /*return*/, _a.sent()];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        arr_1 = __values(arr), arr_1_1 = arr_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!arr_1_1.done) return [3 /*break*/, 5];
                        fn = arr_1_1.value;
                        errorCount = 0;
                        return [4 /*yield*/, doFn(fn)];
                    case 3:
                        isSuccess = _b.sent();
                        if (!isSuccess) {
                            throw "任务失败,重试次数超过两次!".red;
                        }
                        _b.label = 4;
                    case 4:
                        arr_1_1 = arr_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, res];
                }
            });
        });
    };
    AssetsMaintainer.prototype.doUpload = function (files) {
        var _this = this;
        return Promise.all(files.map(function (item) { return _this.uploadFile(item); }));
    };
    AssetsMaintainer.prototype.uploadFile = function (_a) {
        var absFile = _a.absFile, filename = _a.filename;
        var res = fs.readFileSync(absFile);
        if (this.options.userUpload) {
            return this.options.userUpload(filename, res);
        }
        return this.uploadImplementation(filename, res);
    };
    AssetsMaintainer.prototype.initOssClinet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.options.ossOptions;
                        if (!options) {
                            throw new Error("The required ossOptions parameter is missing when enableAlioss is true");
                        }
                        return [4 /*yield*/, AliOss_1.getToken({
                                accessKeyId: options.accessKeyId,
                                accessKeySecret: options.accessKeySecret,
                                roleArn: options.roleArn
                            })];
                    case 1:
                        credentials = (_a.sent()).credentials;
                        return [2 /*return*/, new AliOss_1.AliOss({
                                stsToken: credentials.SecurityToken,
                                accessKeyId: credentials.AccessKeyId,
                                accessKeySecret: credentials.AccessKeySecret,
                                bucket: options.bucket,
                                region: options.region
                            })];
                }
            });
        });
    };
    AssetsMaintainer.prototype.logError = function (error) {
        var msg = typeof error == 'object' ? JSON.stringify(error, undefined, 2) : error ? error : '';
        console.log(("\u7A0B\u5E8F\u7EC8\u6B62\uFF0C\u9519\u8BEF\u4FE1\u606F:" + msg).red);
    };
    return AssetsMaintainer;
}());
exports.AssetsMaintainer = AssetsMaintainer;
