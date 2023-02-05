import mongoose from 'mongoose'
import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from '@mazp/dotenv'
import Msg from './models/msgModel.js'
import Project from './models/projectModel.js'
import Skill from './models/skillModel.js'

dotenv({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), './config/config.env') });

mongoose.connect(process.env.DDTABASE_LOCAL as string, {}).then(() => { console.log('connect successful!'); });

// 删除所有数据
async function deleteAllDate(type: string) {
    try {
        if (type === 'msg') {
            await Msg.deleteMany();
        } else if (type === 'skill') {
            await Skill.deleteMany();
        } else if (type === 'project') {
            await Project.deleteMany();
        }
        console.log('Delete All Date.');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

// 简单的命令交互
if (process.argv[2] === '--delete') {
    deleteAllDate(process.argv[3]);
}
