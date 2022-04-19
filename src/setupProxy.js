const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://10.62.152.203:8000',
			changeOrigin: true,
			pathRewrite: {'^/api': ''}
		}),
	)
}
