const koa = require('koa')
const { initRouter, initController, loadConfig } = require("./loader")

class tgg {
    constructor(conf) {
        this.$app = new koa(conf)

        loadConfig(this)

        this.$ctrl = initController(this) // 加载ctrl
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes()) 
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log('服务器启动 端口：' + port)
        })
    }
}

module.exports = tgg