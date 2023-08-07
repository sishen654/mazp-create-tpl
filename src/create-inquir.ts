import inquirer, { type DistinctQuestion } from "inquirer"
import { getPathFromDir } from "./contain"
import { DirToJson } from "./util"

// 1) 创建问题集合
function createQuestions() {
  const QUESTIONS: Array<DistinctQuestion> = []
  const TEMPLATE = DirToJson(getPathFromDir("template"), ['common'])
  const FRAMEWORK = Object.keys(TEMPLATE)
  const PROJECT_NAME = process.env.__CREATE_NAME__ === "undefined" ? "project" : process.env.__CREATE_NAME__

  // 1 项目名
  QUESTIONS.push({
    message: 'projectName',
    name: "projectName",
    default: PROJECT_NAME
  })
  // 2 对应框架
  QUESTIONS.push({
    message: 'Select a framework',
    name: "framework",
    type: 'rawlist',
    choices: FRAMEWORK,
  })
  // 3 可选模板
  QUESTIONS.push({
    message: 'Select a variant',
    name: "variant",
    type: 'rawlist',
    choices: (res: any) => (TEMPLATE[res.framework])
  })
  // 4 是否需要测试框架
  QUESTIONS.push({
    message: 'Do you need a testing framework',
    name: "needTest",
    type: 'confirm'
  })
  return QUESTIONS
}

// 2) 执行函数
export default function startQA() {
  return new Promise((resolve, reject) => {
    const questions = createQuestions()
    inquirer.prompt(questions).then(res => {
      resolve(res)
    })
  })
}

export interface Choosed {
  projectName: string;
  framework: string;
  variant: string;
  needTest: boolean;
}

