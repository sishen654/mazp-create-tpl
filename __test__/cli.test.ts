import { join } from 'node:path'
import type { ExecaSyncReturnValue, SyncOptions, ExecaSyncError } from 'execa'
import { execaCommandSync } from 'execa'
import { mkdirpSync, readdirSync, remove, writeFileSync } from 'fs-extra'
import { getDirname } from "@src/util"

const __dirname = getDirname()
const CLI_PATH = join(__dirname, 'playground')
const PROJECT_PATH = join(__dirname, 'test-app')
const run = (args: string[], options: SyncOptions = {}): ExecaSyncReturnValue | ExecaSyncError => {
  try {
    return execaCommandSync(`cra ${args.join(' ')}`, options)
  } catch (error) {
    return error as ExecaSyncError
  }
}

describe("cra <project-name>", () => {
  it('prompts for the project name is project if none supplied', () => {
    const { stdout } = run([])
    expect(stdout).toContain("projectName (project)")
  })

  it('prompts for the project name is test-name if specify project name', () => {
    const { stdout } = run(["test-name"])
    expect(stdout).toContain("projectName (test-name)")
  })

  it('prompts for the framework if choosed project name', () => {
    const { stdout } = run(["test-name"], { input: "test" })
    expect(stdout).toContain("Select a framework")
  })
})

// describe("cra i <lib-name>", () => {
//   test('install for the eslint', () => {
//   })
// })
