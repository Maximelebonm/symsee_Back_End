// const nodeMailer = require('nodemailer');
// const appConfig = require('../configs/app.config')

// const html = `
//     <h1> test mail</h1>
//     <p> paragraphe du mail</p>
//     `;

//     const createMail = async (req) => {
//         try{
//         const transporter = nodeMailer.createTransport({
//             service : 'Gmail',
//             auth: {
//               user: "lebon.maxime.m@gmail.com",
//               pass: "",
//             },
//             tls: {
//               // do not fail on invalid certs
//               rejectUnauthorized: false,
//             },
//         })

//         const mailOptions = {
//             from: 'maksmoove@gmail.com',
//             to: 'lebon.maxime.m@gmail.com',
//             subject: 'Node.js Email Tutorial',
//             text: 'This is a basic email sent from Node.js using Nodemailer.',
//           };
//         transporter.sendMail(mailOptions)

//         return 'mail send'
//         }
//         catch (err){
//             return err
//         }
//     }

// module.exports = {createMail}