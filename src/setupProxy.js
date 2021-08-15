const {createProxyMiddleware} = require('http-proxy-middleware');

const proxy=createProxyMiddleware({
    target:'https://apiko-2021-spring-course-api.herokuapp.com/api',
    pathRewrite:{
        '^/api':'',
    },
    changeOrigin:true,
});

module.exports=(app)=>{
    app.use('/api',proxy);
};