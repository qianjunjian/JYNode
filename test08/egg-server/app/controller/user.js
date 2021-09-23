'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 用户管理
 */
class UserController extends Controller {

  /**
   * @summary 创建用户
   * @description 创建用户,记住账户类型和密码
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验入参
    ctx.validate(ctx.rule.createUserRequest);
    // 参数
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;

