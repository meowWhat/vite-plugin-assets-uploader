"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathHelper = void 0;
var path = require("path");
var PathHelper = /** @class */ (function () {
    function PathHelper() {
    }
    PathHelper.prototype.isAbsolute = function (pathStr) {
        if (pathStr.startsWith('/') || pathStr[1] === ':') {
            return true;
        }
        return false;
    };
    PathHelper.prototype.normalize = function (pathStr) {
        return pathStr.replace(/\\/g, '/');
    };
    PathHelper.prototype.join = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return this.normalize(path.join.apply(path, __spreadArray([], __read(paths))));
    };
    PathHelper.prototype.getFileName = function (pathStr, includeExt) {
        if (includeExt === void 0) { includeExt = false; }
        var baseName = path.basename(pathStr);
        if (includeExt) {
            return baseName;
        }
        return baseName.replace(path.extname(pathStr), '');
    };
    /** 依照 paths 依次寻址并返回最终到达的绝对路径 */
    PathHelper.prototype.resolve = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return this.normalize(path.resolve.apply(path, __spreadArray([], __read(paths))));
    };
    /**
     * 获取 to 相对于 from 的相对路径，结果路径不会由 / 开头
     * @param from 寻址起路路径
     * @param to 寻址目标路径
     * @param fromIsFile 寻址起始路径是否是文件，如果是文件，起止路径会自动进行 dirname 处理
     */
    PathHelper.prototype.relative = function (from, to, fromIsFile) {
        if (fromIsFile === void 0) { fromIsFile = false; }
        if (fromIsFile) {
            from = path.dirname(from);
        }
        return this.normalize(path.relative(from, to));
    };
    return PathHelper;
}());
exports.pathHelper = new PathHelper();
