const { promisify } = require("util");

module.exports.clone = async function(repo, desc) {
    const download = promisify(require("download-git-repo"));
    const ora = require("ora");
    const pro =  ora(`下载中... ${repo}`);
    pro.start();
    await download(repo, desc);
    pro.succeed();
}