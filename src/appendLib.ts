import chalk from "chalk"
import path from "node:path"
import fs from "fs-extra"
import { getPathFromDir } from "./contain"
import { copyFile } from "./util"

const SRC_LIB = getPathFromDir("lib")
const DEST_PATH = process.cwd()

function appendEslint() {
  const PACKAGE_PATH = path.join(DEST_PATH, "package.json")
  const ESLINT_DEST_PATH = path.join(DEST_PATH, ".eslintrc.json")
  // 1 获取项目类型
  const project = fs.readJSONSync(PACKAGE_PATH, { encoding: 'utf8' })
  const deps = project.dependencies
  const devDeps = project.devDependencies
  if (deps["react"]) {
    // 是否有 TS
    if (devDeps["typescript"]) {
      // 2 添加所需包到 package.json
      const injectLib = fs.readJSONSync(path.join(SRC_LIB, "/eslint/react-ts.json"))
      project.dependencies = Object.assign(injectLib["dependencies"], deps)
      project.devDependencies = Object.assign(injectLib["devDependencies"], devDeps)
      // 3 添加对应 eslint 配置文件
      copyFile(path.join(SRC_LIB, "/eslint/_react-ts.json"), ESLINT_DEST_PATH)
    } else { }
  }
  else if (deps["vue"]) {
    // 是否有 TS
    if (devDeps["typescript"]) {

    } else { }
  }
  // 2 将新的配置文件设置回去
  fs.writeFileSync(PACKAGE_PATH, JSON.stringify(project, null, 2))
  // 3 询问是否下载包
}


export { appendEslint }
