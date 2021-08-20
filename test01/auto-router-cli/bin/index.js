#!/usr/bin/env node

const { program } = require("commander");
const pkg = require("../package.json");
const init = require("../lib/init");

program.version(pkg.version);

program
  .command("init <name>")
  .description("初始化")
  .action(name => {
    init(name)
  })

program
  .command('refresh')
  .description('刷新路由')
  .action(require('../lib/refresh'))

program
  .command('serve')
  .description('实时生成路由')
  .action(require('../lib/serve'))

program.parse(process.argv)