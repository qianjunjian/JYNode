import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as  Parameter from 'parameter'

const router = new KoaRouter()

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

type RouteOptions = {
    prefix?: string;
    middlewares?: Array<Koa.Middleware>
}

const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        process.nextTick(() => {
            // 添加中间件数组
            const middlewares = []
            if (options.middlewares) {
                middlewares.push(...options.middlewares)
            }

            if (target.middlewares) {
                middlewares.push(...target.middlewares)
            }

            middlewares.push(target[property])
            const url = options.prefix ? options.prefix + path : path
            // router[method](url, target[property])
            router[method](url, ...middlewares)
        })
    }
}

const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router)

export const get = method('get')

type LoadOptions = {
    extname?: string
}

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
    const extname = options.extname || '.{js,ts}'
    glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach((item) => require(item))
    return router
}

// 可以作为权限校验,token 校验
export const middlewares = (middlewares: Koa.Middleware[]) => {
    return function (target) {
        target.prototype.middlewares = middlewares
    }
}

const validateRule = paramPart => rule => {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = function () {
            const ctx = arguments[0]
            const p = new Parameter()
            const data = ctx[paramPart]
            const errors = p.validate(rule, data)
            console.log('error',errors)
            if (errors) throw new Error(JSON.stringify(errors))
            return oldValue.apply(null, arguments);
        }
        return descriptor;
    }
}

export const querystring = validateRule('query')