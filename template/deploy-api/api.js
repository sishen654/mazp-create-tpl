import axios from "axios"

export default function router (match) {
    return async function (ctx, next) {
        let path = ctx.request.path
        let req = ctx.request
        if (match.test(path)) {
            let method = ctx.request.method
            let url = "http://152.136.185.210:5000" + path.replace("/api", "")
            // 获取请求头需要的数据
            let obj = {}
            for (const key in req.headers) {
                if (["authorization"].includes(key)) {
                    obj[key] = req.headers[key]
                }
            }
            // 发送请求
            let data = await axios.request({
                url,
                method,
                headers: obj,
                params: req.params,
                data: req.body
            }).catch((error) => {
                console.log(error.message);
                ctx.status = 404
                ctx.body = { message: "something went happened." }
            })
            if (data) {
                ctx.status = 200
                ctx.body = data.data
            } else {
                ctx.status = 404
                ctx.body = { message: "something went happened." }
            }
        }
        await next()
    }
}