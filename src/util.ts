import fs from "fs-extra"
import { resolve, dirname, join } from "node:path"
import { fileURLToPath } from "node:url";
import { type Choosed } from "./create-inquir.js"
import chalk from "chalk"
import injectData from "./injection.js"

// 读取文件夹生成嵌套结构
export function DirToJson(dirPath: string) {
  const obj: Record<string, string[]> = {}
  for (const file of fs.readdirSync(dirPath, { withFileTypes: true })) {
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

// 获取参数
export function getArgs() {
  process.argv.splice(0, 2)
  return process.argv
}

// 从两级祖父目录合并目录
export function getPathFromDir(path: string): string {
  const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../")
  return join(rootDir, path)
}

// 从执行根目录合并目录
export function getPathFromExecRoot(path: string = "."): string {
  return join(process.cwd(), path)
}

// 判断文件是否存在
export function fileIsExits(path: string) {
  try {
    return fs.statSync(path)
  } catch (error) {
    return null
  }
}

// 修改 package.json
export function changePackageJson(path: string, type: "-D" | "-S", addArr: string[]) {
  // 1 获取 package.json
  const data = fs.readJSONSync(path)
  // 2 循环添加
  addArr.forEach(v => {
    const strArr = v.split(" ")
    if (type === '-D') {
      // 大于2表示替换
      if (strArr.length > 2) {
        delete data.devDependencies[strArr[0]]
        data.devDependencies[strArr[1]] = strArr[2]
        return
      }
      data.devDependencies[strArr[0]] = strArr[1]
    }
    else if (type === '-S') {
      data.dependencies[strArr[0]] = strArr[1]
    }
  })
  // 3 重新写入
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

// 修改项目名
export function changePackageJsonName(path: string, name: string) {
  // 1 获取 package.json
  const data = fs.readJSONSync(path)
  // 2 修改名
  data.name = name
  // 3 重新写入
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

// 修改 tsconfig.json
export function changeTSConfig(destPath: string, changeObj: Record<string, any>) {
  const configPath = `${destPath}/tsconfig.json`
  // 1 原数据
  const data = fs.readJSONSync(configPath, { encoding: "utf-8" })
  // 2 修改数据
  for (const key in changeObj) {
    const value = changeObj[key];
    if (key === "compilerOptions") {
      for (const k in value) {
        if (Array.isArray(value[k]) && data[key][k]) {
          data[key][k] = data[key][k].concat(value[k])
        } else {
          data[key][k] = value[k]
        }
      }
    }
    // 需要新装的包
    else if (key === "-D") {
      changePackageJson(`${destPath}/package.json`, "-D", value)
    }
    else {
      if (Array.isArray(value) && data[key]) {
        data[key] = data[key].concat(value)
      } else {
        data[key] = value
      }
    }
  }
  // 3 重新写入
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2))
}

// 修改 vite.config
export function changeViteConfig(type: keyof typeof injectData, viteConfigPath: string, destPath: string) {
  // 1 原数据
  const data = fs.readFileSync(viteConfigPath, { encoding: "utf-8" })
  // 2 需要修改的对象
  const changeObj = injectData[type]["vite.config"]
  // 3 循环替换字符
  let newData = data
  for (const key in changeObj) {
    const value = changeObj[key];
    if (key.substring(0, 2) === "__") {
      newData = data.replace(`/* ${key} */`, value)
    }
    else if (key === "-D") {
      // 修改 package.json
      changePackageJson(`${destPath}/package.json`, "-D", value)
    } else if (key === "-S") {
    } else if (key === "TS") {
      // 修改 TS
      if (process.env.HAS_TS === "true") {
        changeTSConfig(destPath, value)
      }
    }
  }
  // 4 替换首个 vite
  newData = newData.replace("vite", "vitest/config")
  // 5 修改 vite 配置
  fs.writeFileSync(viteConfigPath, newData, { flag: "w+", encoding: "utf-8" })
}

// 过滤字符
export function filterCharacter(arr: any[], filterArr: any[]) {
  return arr.filter(v => (!filterArr.includes(v)))
}

// 过滤文件进行重名
export function filterFile(str: string) {
  const FILTERARR = ["_gitignore"]
  if (FILTERARR.includes(str)) str = str.replace("_", ".")
  return str
}

// 复制目录或者文件
export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) copyDir(src, dest);
  else fs.copyFileSync(src, dest)
}

// 复制整个目录
export function copyDir(srcDir: string, destDir: string) {
  // 1 创建目录
  fs.mkdirSync(destDir, { recursive: true })
  // 2 循环复制
  const FileArr = filterCharacter(fs.readdirSync(srcDir), [".git"])
  for (let file of FileArr) {
    const destFileName = filterFile(file)
    const srcFile = resolve(srcDir, file)
    const destFile = resolve(destDir, destFileName)
    copy(srcFile, destFile)
  }
}

// 创建项目
export function createProject(answer: Choosed) {
  const { projectName, variant, needTest } = answer
  const srcPath = getPathFromDir(`template/${variant}`)
  const destPath = getPathFromExecRoot(projectName);
  // 是否添加测试
  if (variant.match(/ts/g)) process.env.HAS_TS = "true";
  // 复制文件夹
  copyDir(srcPath, destPath)
  needTest && addTestFramework(destPath)
  // 修改 package.json 项目名
  let packageName = projectName
  if ([".", "./"].includes(packageName)) {
    packageName = getPathLatestName(process.cwd())
  }
  changePackageJsonName(`${destPath}/package.json`, packageName)
  // 输出完成信息
  console.log(chalk.blue(`Scaffolding project in ${destPath}...\n`));
  console.log(chalk.red("Done.") + ` Now run:\n`);
  console.log(`${[".", "./"].includes(projectName) ? "" : `      cd ${projectName}\n`}      npm install
      npm run dev\n`);
}

// 错误处理
export function handlerError(err: Error) {
  console.log(chalk.red(`${err.message}`));
  console.log(chalk.bgRed('UNHANDLER ERROR! 🐱‍🏍 Shuting dow...'));
  process.exit(1);
}

// 需要测试框架
export function addTestFramework(destPath: string) {
  fs.ensureDirSync(`${destPath}/__test__`)
  const viteConfigPath = `${destPath}\\vite.config${process.env.HAS_TS === "true" ? ".ts" : ".js"}`
  if (fileIsExits(viteConfigPath)) {
    changeViteConfig("test", viteConfigPath, destPath)
  }
}

export function readPackageJson(path: string) {
  return fs.readJSONSync(path, { encoding: 'utf8' })
}

export function getPathLatestName(path: string): string {
  const REG = /[^/|^\\]+$/
  const data = path.match(REG) || [""]
  return data[0]
}

export function getDirname() {
  return dirname(fileURLToPath(import.meta.url))
}
