import startServer from "quickly-deploy"
import path from "path"
import { fileURLToPath } from "url"
import router from "./api.js"
import bodyParser from "koa-bodyparser"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, "./.env")		// env path

// 添加路由，转接请求等

let app = startServer([path.resolve(__dirname, "./dist")], envPath, [], [bodyParser({ jsonLimit: '10kb' }), router(/\/api\/.+/)])
app.start()		// start server