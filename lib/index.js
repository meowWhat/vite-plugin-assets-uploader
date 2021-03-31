"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var AssetsMaintainer_1 = require("./AssetsMaintainer");
function assetUploaderPlugin(rawOptions) {
    if (rawOptions === void 0) { rawOptions = {}; }
    var options = __assign({}, rawOptions);
    return {
        name: 'vite-plugin-assets-uploader',
        configResolved: function (config) {
            options.assetsDir = path.join(config.build.outDir, config.build.assetsDir);
            options.root = config.root;
        },
        closeBundle: function () {
            new AssetsMaintainer_1.AssetsMaintainer(options).pushAssetsToOss();
        }
    };
}
exports.default = assetUploaderPlugin;
