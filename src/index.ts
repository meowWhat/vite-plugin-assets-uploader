import { Plugin } from 'vite'
import * as path from 'path'
import { AssetsMaintainer } from './AssetsMaintainer'


interface ossOptions {
  accessKeyId: string,
  accessKeySecret: string,
  roleArn: string,
  bucket: string,
  region: string
}

export interface Options {
  enableAlioss?: boolean
  ossOptions?: ossOptions
  userUpload?: (fileName: string, content: Buffer) => Promise<any>
}

export interface ResolvedOptions extends Options {
  root?: string
  assetsDir?: string
}

export default function assetUploaderPlugin(rawOptions: Options = {}): Plugin {
  let options: ResolvedOptions = {
    ...rawOptions,
  }

  return {
    name: 'vite-plugin-assets-uploader',

    configResolved: (config) => {
      options.assetsDir = path.join(config.build.outDir, config.build.assetsDir)
      options.root = config.root
    },
    closeBundle: () => {
      new AssetsMaintainer(options).pushAssetsToOss()
    }
  }
}