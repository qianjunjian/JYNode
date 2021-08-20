(async() => {
    // 异步改成promise形式，防止嵌套地狱
    const fs = require("fs");
    const { promisify } = require("util");
    const readFile = promisify(fs.readFile);
    const data = await readFile("./test.json", "utf-8");
    console.log("data", data);
})()