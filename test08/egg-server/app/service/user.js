'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    payload.password = await this.ctx.genHash(payload.password);
    return {
      password: payload.password,
    };
  }
}

module.exports = UserService;
