const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://10.62.22.249:8000',
			changeOrigin: true,
			pathRewrite: {'^/api': ''}
		}),
	)
}
