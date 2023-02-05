import Router from "@koa/router"
import { signup, login, logout } from "../controllers/authController.js"
import { askQuestion } from "../controllers/askController.js"

const router = new Router({ prefix: '/api' });


// 1 注册
router.post("/signup", signup);
// 2 登录
router
  .post("/login", login)
  .get("/login", logout);

// 后续所有路由需要验证登录
// 3 询问问题
router.get("ask", askQuestion);

// 3 充值（人工充值）
// 4 等级设置（）

// 4 使用次数(每天)

export default router
