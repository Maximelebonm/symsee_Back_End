let clearCookieConfig
if(process.env.NODE_ENV === "development"){
    clearCookieConfig = {
        sameSite:'none',
        secure : true,
        maxAge : 0,
    }
} else {
    clearCookieConfig ={
        domain: '.symsee.fr',
        path: '/',
        sameSite:'none',
        secure : true,
        httpOnly: false,
        maxAge : 0,
    }
}

module.exports = clearCookieConfig