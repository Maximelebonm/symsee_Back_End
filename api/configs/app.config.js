let config
if(process.env.NODE_ENV === "development"){
    console.log(process.env.NODE_ENV)
    config = {
        PORT : process.env.PORT || 5000,
        origin : "http://localhost:5173",
        methods : "GET,POST,PUT,DELETE",
        credentials : true,
    }
} else {
    config = {
     
        origin : "https://www.symsee.fr",
        credentials : true,
        methods : "GET,POST,PUT,DELETE",
        }
}



module.exports= config