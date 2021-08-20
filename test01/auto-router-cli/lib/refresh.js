const fs = require('fs')
// 模板语法库
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = () => {
    // 获取页面列表
    const list =  fs.readdirSync('./src/views')
        .map(v => ({
            // TODO 暂时不考虑目录
            name: v.replace(".jsx", "").toLocaleLowerCase(),
            file: v
        }))
    
    // 生成路由
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')

    /**
     * 
     * @param {*} meta 
     * @param {*} filePath 
     * @param {*} templatePath 
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString()
            const reslut = handlebars.compile(content)(meta)
            fs.writeFileSync(filePath, reslut)
        }
        console.log(chalk.red(`🚀${filePath} 创建成功`))
    }
}