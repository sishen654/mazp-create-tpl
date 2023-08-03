import { execaCommandSync } from 'execa'
import fs from "node:fs"
import type { ExecaSyncReturnValue, SyncOptions, ExecaSyncError } from 'execa'

// 1) 文件相关
export function fileIsExits(path: string) {
  try {
    return fs.statSync(path)
  } catch (error) {
    return null
  }
}
export function ensureFile(path: string) {
  if (!fileIsExits(path)) {
    fs.writeFileSync(path, "", { encoding: "utf8" })
  }
}
export function writeJsonSync(path: string, data: Record<string, any>) {
  let jsonData = JSON.stringify(data, null, 4)
  fs.writeFileSync(path, jsonData, { encoding: "utf8" })
}
export function readJsonSync(path: string) {
  if (!fileIsExits(path)) throw new Error("file unExits");
  if (!path.endsWith(".json")) throw new Error("file is not a .json file");
  try {
    let data = fs.readFileSync(path, "utf8")
    return JSON.parse(data)
  } catch (error) {
    throw new Error(`parse ${path} error`);
  }
}

// 2) 提示
export const chalk = {
  warn(msg: string): string {
    return `\x1b[33m${msg}\x1b[0m`
  },
  success(msg: string): string {
    return `\x1b[32m${msg}\x1b[0m`
  },
  error(msg: string): string {
    return `\x1b[31m${msg}\x1b[0m`
  },
  info(msg: string): string {
    return `\x1b[34m${msg}\x1b[0m`
  }
}


export function runSync(args: string[], options: SyncOptions = {}): ExecaSyncReturnValue | ExecaSyncError {
  try {
    return execaCommandSync(`${args.join(' ')}`, options)
  } catch (error) {
    return error as ExecaSyncError
  }
}

export function getArguments() {
  return process.argv.slice(2)
}

// = 分割成对象
export function createObjFromFile(data: string) {
  let matches = data.match(/(.+)=(.+)/g) || []
  let obj: Record<string, any> = {}
  matches.forEach(match => {
    let values = match.split('=')
    if (values.length != 2) return
    obj[values[0]] = values[1]
  })
  return obj
}

export function checkUrl(url: string) {
  return url.startsWith('http')
}

export function isDef(val: any) {
  return val !== null && val !== undefined
}

export function throwError(msg: string) {
  throw new Error(msg)
}


export function handlerError(err: Error, tips: string[] = []) {
  err.message && console.log(`${chalk.error('ERROR')}: ${err.message}`);
  tips.forEach(tip => console.log(tip))
  console.log(chalk.warn('UNHANDLER ERROR! 🐱 Shuting dow...'));
  process.exit(1);
}

