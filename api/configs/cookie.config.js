let cookieConfig
if(process.env.NODE_ENV === "development"){
    console.log('cookieConfig dev')
    cookieConfig = {
        sameSite:'none',
        secure : true,
        maxAge : 864000000,
    }
}
else if(process.env.NODE_ENV === "production"){
    cookieConfig ={
        domain: '.symsee.fr',
        path: '/',
        sameSite:'none',
        secure : true,
        httpOnly: true,
        maxAge : 864000000,
    }
}

module.exports = cookieConfig