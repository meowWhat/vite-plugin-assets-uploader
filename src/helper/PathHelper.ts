import * as path from 'path'

class PathHelper {
  public isAbsolute(pathStr: string) {
    if (pathStr.startsWith('/') || pathStr[1] === ':') {
      return true
    }
    return false
  }

  public normalize(pathStr: string) {
    return pathStr.replace(/\\/g, '/')
  }

  public join(...paths: string[]) {
    return this.normalize(path.join(...paths))
  }

  public getFileName(pathStr: string, includeExt = false) {
    const baseName = path.basename(pathStr)
    if (includeExt) {
      return baseName
    }
    return baseName.replace(path.extname(pathStr), '')
  }

  /** 依照 paths 依次寻址并返回最终到达的绝对路径 */
  public resolve(...paths: string[]) {
    return this.normalize(path.resolve(...paths))
  }

  /**
   * 获取 to 相对于 from 的相对路径，结果路径不会由 / 开头
   * @param from 寻址起路路径
   * @param to 寻址目标路径
   * @param fromIsFile 寻址起始路径是否是文件，如果是文件，起止路径会自动进行 dirname 处理
   */
  public relative(from: string, to: string, fromIsFile = false) {
    if (fromIsFile) {
      from = path.dirname(from)
    }
    return this.normalize(path.relative(from, to))
  }
}

export const pathHelper = new PathHelper()
