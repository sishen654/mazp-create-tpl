import fs from "fs-extra"
import { resolve, dirname, join } from "node:path"
import { fileURLToPath } from "node:url";
import { type Choosed } from "./create-inquir.js"
import chalk from "chalk"
import injectData from "./injection.js"
import { fileIsExits, getPathFromExecRoot, getPathLatestName, copyDir } from "./util"

// 从两级祖父目录合并目录
export function getPathFromDir(path: string): string {
  const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../")
  return join(rootDir, path)
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

// 创建项目
export function createProject(answer: Choosed) {
  const { projectName, variant, needTest } = answer
  const srcPath = getPathFromDir(`template/${variant}`)
  const commonPath = getPathFromDir(`template/common`)
  const destPath = getPathFromExecRoot(projectName);
  // 是否添加测试
  if (variant.match(/ts/g)) process.env.HAS_TS = "true";
  // 复制文件夹
  const renameRule = [["_gitignore", "_gitattributes"], { '_': '.' }]
  copyDir(commonPath, destPath, renameRule as any)
  copyDir(srcPath, destPath, renameRule as any)
  needTest && addTestFramework(destPath)
  // 修改 package.json 项目名
  let packageName = projectName
  if ([".", "./"].includes(packageName)) {
    packageName = getPathLatestName(process.cwd())
    console.log("packageName", packageName);
    console.log(getPathLatestName('a/b/c'));
  }
  changePackageJsonName(`${destPath}/package.json`, packageName)
  // 输出完成信息
  console.log(chalk.blue(`Scaffolding project in ${destPath}...\n`));
  console.log(chalk.red("Done.") + ` Now run:\n`);
  console.log(`${[".", "./"].includes(projectName) ? "" : `      cd ${projectName}\n`}      npm install
      npm run dev\n`);
}

// 需要测试框架
export function addTestFramework(destPath: string) {
  fs.ensureDirSync(`${destPath}/__test__`)
  const viteConfigPath = `${destPath}\\vite.config${process.env.HAS_TS === "true" ? ".ts" : ".js"}`
  if (fileIsExits(viteConfigPath)) {
    changeViteConfig("test", viteConfigPath, destPath)
  }
}
