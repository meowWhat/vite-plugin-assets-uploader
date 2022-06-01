import * as OSS from 'ali-oss'

interface AliOssOptions {
  accessKeyId: string,
  accessKeySecret: string,
  stsToken?: string,
  bucket: string,
  region: string
}

interface StsTokenOptions {
  accessKeyId: string
  accessKeySecret: string
  roleArn: string
}

export class AliOss {
  private ossClient: OSS
  constructor(options: AliOssOptions) {
    this.ossClient = new OSS(options)
  }
  public async putFile(fileName: string, buffer: Buffer) {
    return this.ossClient.put(fileName, buffer)
  }
}


export const getToken = async (options: StsTokenOptions) => {
  const STS = OSS.STS
  const sts = new STS({
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret
  })

  return await sts.assumeRole(options.roleArn)
}