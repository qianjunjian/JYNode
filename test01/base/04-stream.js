const fs = require("fs");
const rs = fs.createReadStream("test.png")
const ws = fs.createWriteStream("test2.png")

ws.on("pipe", () => {
    console.log("doing...")
})

// 当在可读流上调用 stream.pipe() 方法将此可写流添加到其目标集时，则触发 'pipe' 事件
rs.pipe(ws)