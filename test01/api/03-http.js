const fs = require("fs");
const http = require("http");
const path = require("path");

const server = http.createServer((req, res) => {
    // 1.打印原型上所有属性
    // console.log(getPropertyChain(res))
    // 2.返回前台字符串
    // res.end("KBB 87")

    // 3.请求页面
    const {url, method, headers} = req;
    if (url === "/" && method === "GET") {
        fs.readFile("test.html", (err, data) => {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                })
                res.end("500 服务器挂了！")
            }

            res.statusCode = 200
            res.setHeader("Content-Type", 'text/html')
            res.end(data)
        })
    } else if (url === "/users" && method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify({
            bbb: "你好哈"
        }))
    } else if (method === "GET" && headers.accept.includes("image")) {
        // 少个favicon.ico
        fs.createReadStream(path.join(__dirname, url)).pipe(res)
    }
})

server.listen(3000)

// 获取原型上所有属性
const getPropertyChain = function(obj) {
    const props = []
    while(obj = Object.getPrototypeOf(obj)) {
        props.push(obj)
    }
    return props;
}