const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const { clone } = require('./download')

const log = (content) => console.log(chalk.green(content));

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    const options = args[args.length - 1]
    if(process.platform === 'win32'){
        // 设置 shell 选项为 true 以隐式地调用 cmd 
        options.shell = true
    }else {
        // nothing
    }

    return new Promise(resolve => {
        const proc = spawn(...args)
        // 子进程的输出信息，输出到主进程，这样在控制台可以看见
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    clear();
    const data = await figlet("welcome");
    log(data);

    log(`🚀创建项目:` + name)
    // 克隆代码
    await clone('github:su37josephxia/vue-template', name)
    log('安装依赖')
    await spawn('npm', ['install'], { cwd: `./${name}` })
    log(`
    👌安装完成：
    开始同步:
    ===========================
        cd ${name}
        npm run serve
    ===========================
    `)
    const open = require('open')
    open('http://localhost:8080')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}