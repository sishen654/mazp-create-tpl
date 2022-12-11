import Koa from "koa"
import http from "http"
import router from "./route.js"
import bodyParser from "koa-bodyparser"
import fileStatic from "koa-static"

const app = new Koa();
app.use(async (ctx, next) => { ctx.state.a = 1; next() })
app.use(async (ctx, next) => { ctx.state.b = 2; next() })
app.use(async (ctx, next) => {
  console.log(ctx.state.a, ctx.state.b);
  next()
})
app.use(bodyParser())
app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(fileStatic("./"))

app.use(async ctx => {
  // throw new Error("THIS IS A ERROR")
  // 自定义路由
  if (ctx.request.method === "GET") {
    let path = ctx.request.path
    if (path === "/") {
      ctx.body = '默认页面';
    } else if (path === "/login") {
      ctx.body = '登录页面';
    } else if (path === "/register") {
      ctx.body = '注册页面';
    } else {
      ctx.body = '未知页面';
    }
  }
});

app.on('error', (err, ctx) => {
  console.log('error');
});

// app.listen(3000, () => {
//   console.log("http://localhost:3000");
// });
http.createServer(app.callback()).listen(3000, () => {
  console.log("http://localhost:3000");
})

