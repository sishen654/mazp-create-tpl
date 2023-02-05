import Router from "@koa/router"
import multer from "@koa/multer"
import fs from "fs"

const upload = multer(); // note you can pass `multer` options here
const router = new Router();

// 1 登录
// 2 注册
// 3 充值（）
// 4 使用次数(每天)
// 5 等级设置（）

router.get('/', (ctx, next) => {
  // ctx.throw(400, 'name required', { msg: "error" });
  // 1 字符串
  ctx.response.body = "123"
  ctx.body = "123"
  // 2 buffer
  let fileContentBuffer = fs.readFileSync("./index.js")
  ctx.body = fileContentBuffer
  // 3 Stream
  let Reader = fs.createReadStream("./index.js")
  ctx.body = Reader
  // 4 object
  ctx.body = { a: 1, b: 2 }
  // 5 array
  ctx.body = [1, 2, 3]
  // 6 null
  ctx.status = 300
  ctx.response.status = 300
});


router.post('/upload', upload.fields([
  {
    name: 'file',
    maxCount: 1
  }
]), (ctx, next) => {
  console.log(ctx.request.body);    //  { name: '哈哈哈', age: '18' }
  console.log(ctx.request.files);
});
router.post('/upload-single', upload.single("file"), (ctx, next) => {
  console.log(ctx.request.file);  // { fieldname ...
});



export default router
