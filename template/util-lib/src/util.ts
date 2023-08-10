import fs from "node:fs"
import { resolve, dirname, join } from "node:path"
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process"

type Obj<T = any> = Record<string, T>

// 1) 文件相关
export const DirToJson = (dirPath: string, exclude?: string[]) => {
  const obj: Record<string, string[]> = {}
  for (const file of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (exclude?.includes(file.name)) continue;
    if (file.isDirectory()) {
      const NAME = file.name
      // 1 获取 - 前面的字段
      const prop = NAME.match(/(\w+)-/)
      // 2 如果 prop 存在
      if (prop) {
        obj[prop[1]] ? obj[prop[1]].push(NAME) : (obj[prop[1]] = [NAME])
      } else {
        obj[NAME] ? obj[NAME].push(NAME) : (obj[NAME] = [NAME])
      }
    }
  }
  return obj
}
export const fileIsExits = (path: string) => {
  try {
    return fs.statSync(path)
  } catch (error) {
    return null
  }
}
export const writeJsonSync = (path: string, data: Obj) => fs.writeFileSync(path, JSON.stringify(data, null, 4), { encoding: "utf8" })
export const readJsonSync = (path: string) => {
  if (!fileIsExits(path)) throw new Error("file unExits");
  if (!path.endsWith(".json")) throw new Error("file is not a .json file");
  try {
    let data = fs.readFileSync(path, "utf8")
    return JSON.parse(data)
  } catch (error) {
    throw new Error(`parse ${path} error`);
  }
}
export const ensureFile = (path: string) => !fileIsExits(path) && fs.writeFileSync(path, "", { encoding: "utf8" })
export const copyFile = (src: string, dest: string) => fs.statSync(src).isDirectory() ? copyDir(src, dest) : fs.copyFileSync(src, dest)
export const copyDir = (srcDir: string, destDir: string, renameRule: [string[], Obj<string>] = [[], {}], exclude?: string[]) => {
  // 1 创建目录
  fs.mkdirSync(destDir, { recursive: true })
  // 2 循环复制
  const dirs = fs.readdirSync(srcDir)
  const FileArr = filterItem(dirs, [".git"])
  // 3 循环目录
  for (let fileName of FileArr) {
    if (exclude?.includes(fileName)) continue;
    const destFileName = filterRename(fileName, ...renameRule)
    const srcFile = resolve(srcDir, fileName)
    const destFile = resolve(destDir, destFileName)
    copyFile(srcFile, destFile)
  }
}


// 2) 路径相关
export const getPathFromExecRoot = (path: string = ".") => join(process.cwd(), path)
export const getPathLatestName = (path: string) => path.match(/[^/|^\\]+$/)?.[0] || ""
export const getDirname = () => dirname(fileURLToPath(import.meta.url))
export const getFilename = () => fileURLToPath(import.meta.url)

// 3) 执行脚本相关
export const runSync = (command: string) => {
  let stdout = execSync(command).toString('utf-8')
  return stdout.substring(0, stdout.length - 1)
}

// 4) 其它
export const chalk = {
  bright: (msg: string) => `\x1B[1m${msg}\x1b[0m`,              // 亮色
  grey: (msg: string) => `\x1B[2m${msg}\x1b[0m`,                // 灰色
  italic: (msg: string) => `\x1B[3m${msg}\x1b[0m`,              // 斜体
  underline: (msg: string) => `\x1B[4m${msg}\x1b[0m`,           // 下划线
  reverse: (msg: string) => `\x1B[7m${msg}\x1b[0m`,             // 反向
  hidden: (msg: string) => `\x1B[8m${msg}\x1b[0m`,              // 隐藏
  black: (msg: string) => `\x1B[30m${msg}\x1b[0m`,              // 黑色
  red: (msg: string) => `\x1B[31m${msg}\x1b[0m`,                // 红色
  green: (msg: string) => `\x1B[32m${msg}\x1b[0m`,              // 绿色
  yellow: (msg: string) => `\x1B[33m${msg}\x1b[0m`,             // 黄色
  blue: (msg: string) => `\x1B[34m${msg}\x1b[0m`,               // 蓝色
  magenta: (msg: string) => `\x1B[35m${msg}\x1b[0m`,            // 品红
  cyan: (msg: string) => `\x1B[36m${msg}\x1b[0m`,               // 青色
  white: (msg: string) => `\x1B[37m${msg}\x1b[0m`,              // 白色
  blackBG: (msg: string) => `\x1B[40m${msg}\x1b[0m`,            // 背景色为黑色
  redBG: (msg: string) => `\x1B[41m${msg}\x1b[0m`,              // 背景色为红色
  greenBG: (msg: string) => `\x1B[42m${msg}\x1b[0m`,            // 背景色为绿色
  yellowBG: (msg: string) => `\x1B[43m${msg}\x1b[0m`,           // 背景色为黄色
  blueBG: (msg: string) => `\x1B[44m${msg}\x1b[0m`,             // 背景色为蓝色
  magentaBG: (msg: string) => `\x1B[45m${msg}\x1b[0m`,          // 背景色为品红
  cyanBG: (msg: string) => `\x1B[46m${msg}\x1b[0m`,             // 背景色为青色
  whiteBG: (msg: string) => `\x1B[47m${msg}\x1b[0m`             // 背景色为白色
}

export const getArgs = () => process.argv.slice(2)
export const isDef = (val: any) => val !== null && val !== undefined
export const filterItem = (arr: any[], filterArr: any[]) => arr.filter(v => (!filterArr.includes(v)))
export const filterRename = (str: string, filter: string[], rules: Obj<string>) => {
  if (filter.includes(str)) Object.keys(rules).forEach(key => str = str.replace(key, rules[key]))
  return str
}
export const handlerError = (err: Error, tips?: string[]) => {
  err.message && console.log(`${chalk.red('ERROR')}: ${err.message}`);
  tips?.forEach(tip => console.log(tip))
  console.log(chalk.yellow('UNHANDLER ERROR! 🐱 Shuting dow...'));
  process.exit(1);
}


