'use strict';

const { Service } = require('egg');
class UserAccessService extends Service {
  async login() {
    const { service } = this;
    // 生成Token令牌
    return { token: await service.actionToken.apply('123123123123') };
  }
}

module.exports = UserAccessService;
