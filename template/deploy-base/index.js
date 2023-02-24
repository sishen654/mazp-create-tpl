import startServer from "quickly-deploy"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, "./.env")		// env path

let app = startServer([path.resolve(__dirname, "./dist")], envPath)
app.start()		// start server