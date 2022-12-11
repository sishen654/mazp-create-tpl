// TODO:  cra i redux\pinia\vitest
/*
  1 整理文件夹，编译为 json 格式
  2 读取参数
  3 复制文件夹
  4 输出信息
*/
import { getArgs, createProject, handlerError } from "./util.js"
import { type Choosed } from "./create-inquir.js"
import startQA from "./create-inquir.js"
import { appendEslint } from "./appendLib.js"
import chalk from "chalk"

// 1) 获取参数
const ARGUMENTS = getArgs()
process.env.__CREATE_NAME__ = ARGUMENTS[0];

// 2) 判断参数
switch (ARGUMENTS[0]) {
  // 追加库
  case 'i':
    ARGUMENTS[1] ? append(ARGUMENTS[1]) : init()
    break;
  // 默认开始问答
  default:
    init()
    break;
}


// 3) 初始化项目
async function init() {
  try {
    const ANSWERS = await startQA()
    createProject(ANSWERS as Choosed)
  } catch (error) {
    handlerError(error as Error)
  }
}

// 4) 追加脚本
function append(chooes: string) {
  try {
    switch (chooes) {
      case "eslint":
        appendEslint()
        break;
      default:
        console.log(`${chalk.bgRed("UNSUPPORT")} : ${chooes} unsupport, you can commit a issue...`);
        break;
    }
  } catch (error) {
    handlerError(error as Error)
  }
}
