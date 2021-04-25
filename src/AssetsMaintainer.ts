import * as glob from 'glob'
import * as fs from 'fs'
import 'colors'
import { ResolvedOptions } from './index'
import { pushAssetsDone } from './message'
import { AliOss, getToken } from './AliOss'
import { pathHelper } from './helper/PathHelper'

export interface fileItem {
  filename: string,
  absFile: string,
  size: string
}
export class AssetsMaintainer {
  private uploadImplementation!: (filePath: string, base64: Buffer) => Promise<any>
  private doneCount = 0
  private filesToPushLen!: number
  constructor(private options: ResolvedOptions) {
  }

  public async pushAssetsToOss() {
    if (!this.options.root || !this.options.assetsDir) {
      return
    }

    // 获取上传客户端
    try {
      if (this.options.enableAlioss) {
        const ossClient = await this.initOssClinet()
        if (ossClient) {
          this.uploadImplementation = (fileName, base64) => {
            return ossClient.putFile(fileName, base64)
          }
        }
      }
    } catch (error) {
      this.logError(error)
      return
    }

    // 上传文件
    try {
      const filesToPush: Array<fileItem> = []
      const assetDir = pathHelper.join(this.options.root, this.options.assetsDir).replace(/\/$/, '')
      const absFiles = glob.sync(assetDir + '/**/*')

      for (const absFile of absFiles) {
        const stat = fs.statSync(absFile)
        if (!stat.isFile()) {
          continue
        }
        const relativeFile = absFile.replace(assetDir + '/', '')
        if (relativeFile === 'index.html') {
          continue
        }
        const filename = relativeFile
        let sizeS = ` (${Math.round(stat.size / 1024)}K)`
        if (stat.size > 500 * 1024) {
          sizeS = sizeS.red
        } else if (stat.size > 100 * 1024) {
          sizeS = sizeS.yellow
        } else {
          sizeS = sizeS.green
        }
        filesToPush.push({ filename, absFile, size: sizeS })
      }

      this.filesToPushLen = filesToPush.length
      // const answer = await new Question(pushAssetsConfirm).getAnswer()
      // if (answer !== 'y') {
      //   console.log(pushAssetsCanceled)
      //   return
      // }

      const queues: any[] = []

      const sliceCount = 5

      for (let i = 0, len = filesToPush.length; i < len; i += sliceCount) {
        queues.push(() => {
          return this.doUpload(filesToPush.slice(i, i + sliceCount))
        })
      }


      await this.mergeQueue(queues)

      console.log(pushAssetsDone)
    }

    catch (error) {
      this.logError(error)
    }
  }

  private async mergeQueue(arr: Array<() => Promise<any>>) {
    let res: any[] = []
    let errorCount = 0
    const doFn = async (fn: () => any): Promise<boolean> => {
      try {
        const data = await fn()
        res.push(data)
        return true
      } catch (error) {
        if (errorCount === 2) {
          return false
        }
        errorCount += 1
        console.log(`任务失败,正在重试,次数 ${errorCount}!\n`.red, error || '')
        return await doFn(fn)
      }
    }
    for (let fn of arr) {
      errorCount = 0
      const isSuccess = await doFn(fn)
      if (!isSuccess) {
        throw "任务失败,重试次数超过两次!".red
      }
    }
    return res
  }

  private doUpload(files: fileItem[]) {
    return Promise.all(files.map((item) => this.uploadFile(item)))
  }

  public uploadFile({ absFile, filename, size }: fileItem) {
    const res = fs.readFileSync(absFile)
    const filePath = pathHelper.join(this.options.savePath!, filename)

    console.log(`[↑] 正在上传: ${filename.yellow} 大小:${size} 进度:${this.doneCount + 1}/${this.filesToPushLen}`)

    this.doneCount++

    if (this.options.userUpload) {
      return this.options.userUpload(filePath, res)
    }

    return this.uploadImplementation(filePath, res)
  }

  private async initOssClinet() {
    const options = this.options.ossOptions

    if (!options) {
      throw new Error("The required ossOptions parameter is missing when enableAlioss is true")
    }

    const { credentials } = await getToken({
      accessKeyId: options.accessKeyId,
      accessKeySecret: options.accessKeySecret,
      roleArn: options.roleArn
    })

    return new AliOss({
      stsToken: credentials.SecurityToken,
      accessKeyId: credentials.AccessKeyId,
      accessKeySecret: credentials.AccessKeySecret,
      bucket: options.bucket,
      region: options.region
    })

  }

  private logError(error: any) {
    let msg = typeof error == 'object' ? JSON.stringify(error, undefined, 2) : error ? error : ''
    console.log(`程序终止，错误信息:${msg}`.red)
  }
}
