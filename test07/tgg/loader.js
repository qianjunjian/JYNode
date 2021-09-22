const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 读取目录
function load(dir, cb) {
    // 获取目录绝对路径
    const url = path.resolve(__dirname, dir)
    // 读取目录下的所有文件
    const files = fs.readdirSync(url)
    // 遍历所有文件
    files.forEach(file => {
        const filename = file.replace('.js', '')
        const _file = require(url + '/' + filename)
        cb(filename, _file)
    })
}


// 初始化路由
function initRouter(app) {
    const router = new Router();

    load("routes", (fileName, routes) => {

        // index前缀处理
        const prefix = fileName === "index" ? "/" : `/${fileName}`

        // 路由类型判断
        const _routes = typeof routes === "function" ? routes(app) : routes
        Object.keys(_routes).forEach(key => {
            const [method, path] = key.split(' ');
            console.log(`正在映射地址 ${method.toLocaleUpperCase()} ${path}`)
            // 注册路由
            router[method](path, async ctx => {
                app.ctx = ctx;
                await _routes[key](ctx)
            })
        })
    })
    return router
}

function initController(app) {
    const controllers = {}
    // 读取目录
    load('controller', (filename, controller) => {
        controllers[filename] = controller(app)
    })
    return controllers
}

function loadConfig(app) {
    load('config', (filename, conf) => {
        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))
            })
        }
    })
}

module.exports = {
    initRouter,
    initController,
    loadConfig
}