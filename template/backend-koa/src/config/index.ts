import dotenv from "@mazp/dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

dotenv({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), "./config.env") })
console.log(`✔ : config inject successful`);

