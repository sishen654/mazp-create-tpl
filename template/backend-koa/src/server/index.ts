import app from "../app/index.js"

// 2 初始化参数
const PORT = process.env.PORT || 3000;
const SERVER = app.listen(PORT, () => {
  // Here we send the ready signal to PM2
  process.send && process.send('ready');
  console.log(`✔ : server start success on port ${PORT}`);
})

export default SERVER
