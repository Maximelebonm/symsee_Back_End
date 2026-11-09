let config
if(process.env.NODE_ENV === "development"){
    console.log(process.env.NODE_ENV)
    config = {
        PORT : process.env.PORT_DEV || 5000,
        origin : "http://localhost:5173",
        methods : "GET,POST,PUT,DELETE",
        credentials : true,
    }
} else {
    config = {
        PORT : process.env.PORT_PROD || 5001,
        origin : process.env.ORIGIN_PROD,
        credentials : true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
        methods : "GET,POST,PUT,DELETE",
    }
}



module.exports= config