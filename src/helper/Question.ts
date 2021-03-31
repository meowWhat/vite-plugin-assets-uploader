import * as readline from 'readline'

export class Question {
  constructor(private query: string) { }
  public async getAnswer(): Promise<string> {
    return new Promise<string>((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.question(this.query, (answer) => {
        resolve(answer)
        rl.close()
      })
    })
  }
  /**
   * 支持多行标准输入
   */
  public async getMultiLine() {
    const lines: string[] = []
    console.log(this.query)
    return new Promise<string>((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.on('line', (line) => {
        let isQuit = false
        let text = line
        if (line.endsWith('exit')) {
          text = line.slice(0, line.length - 4)
          isQuit = true
        }
        text = text.trim()
        text && lines.push(text)
        if (isQuit) {
          rl.close()
          resolve(lines.join('\n'))
        }
      })
    })
  }
}
