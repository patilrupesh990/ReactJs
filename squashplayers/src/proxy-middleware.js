const proxy = require("http-proxy-middleware")
module.exports= function(app){
    app.use(
        proxy('/login',{
            target:"https://uat.squash.itomic.app/api/v1/login",
            changeOrigin:true
        })
    )
}