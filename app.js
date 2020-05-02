const Koa = require('koa');
const app = new Koa();
app.use(require('koa-static')('bootstrap-studio-export'));

app.listen(3000);

