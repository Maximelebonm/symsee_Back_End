const {Sequelize} = require('sequelize');

let db;
if(process.env.NODE_ENV === "development"){
    db = new Sequelize("symsee","root","root",{
        host : "Localhost",
        dialect : "mysql",
        logging : false,
    }
    )
} else {
    db = new Sequelize("symsee",process.env.DB_USER,process.env.DB_PASSWORD,{
        host : process.env.DB_HOST,
        dialect : "mysql",
        logging: function () {},
    })
}
module.exports = db