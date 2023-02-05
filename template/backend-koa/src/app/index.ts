import Koa from "koa"
import bodyParser from "koa-bodyparser"
import cors from "@koa/cors"
import helmet from "koa-helmet"
import { RateLimit } from "koa2-ratelimit"
import mongoSanitize from "koa-mongo-sanitize"
import { xss } from "koa-xss-sanitizer"
import hpp from "koa-hpp2"
import fileStatic from "koa-static"
import router from "../router/index.js"

const app = new Koa();

// 1) 设置代理
app.proxy = true
app.use(cors())

// 2) 全局中间件
app.use(bodyParser({ jsonLimit: '10kb' }))    // body 解析
app.use(helmet({ contentSecurityPolicy: false, }))   // 设置安全请求头
app.use(RateLimit.middleware({
  interval: { min: 1 },  // 1分钟
  max: 10000,   // 限制每个 ip 的请求间隔
  message: "Too many request from this IP, please try again after a minute"
}));
app.use(xss());   // 防止 xss 注入
app.use(mongoSanitize()); // 防止 Mongo 注入
app.use(hpp({ whitelist: ['title', 'value', 'percent', 'name', 'desc', 'content', 'url', 'category'] }))

// 2) 添加路由
app
  .use(router.routes())
  .use(router.allowedMethods());

// 3) 添加静态页面
app.use(fileStatic("imgs/"))
app.use(fileStatic("www/dist/"))

// 4) 处理所有非指定路由
app.use(async ctx => {
  ctx.throw(404, `Can't find ${ctx.request.originalUrl} on this server!`)
});



app.on('error', (err, ctx) => {
  console.log(err.message);
});

export default app
