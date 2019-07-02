const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    /*app.use(proxy('/users', {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        pathRewrite: {
            "^/": "/"
        }
    }))*/
    app.use(proxy('/users', {target: 'http://127.0.0.1:4000/users'}))
}