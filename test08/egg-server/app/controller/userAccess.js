'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 用户鉴权
 */
class UserAccess extends Controller {

  /**
   * @summary 用户登入
   * @description 用户登入
   * @router post /auth/jwt/login
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验入参
    ctx.validate(ctx.rule.loginRequest);
    // 参数
    const payload = ctx.request.body || {};
    const res = await service.userAccess.login(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserAccess;

