const JY = require('./jy');
const app = new JY();

const static = require('./static');
app.use(static(__dirname + '/public'));

const Router = require('./router')
const router = new Router();

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/22', async ctx => { ctx.body = '222 page'; });
app.use(router.routes());

app.listen(3000, () => {
    console.log("监听端口 3000");
});