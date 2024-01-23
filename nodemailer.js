//"use strict";
const nodemailer = require('nodemailer');



//tenemos una función asincrona
async function sendMail(){
    

    //Se crea una cuenta para test
    //Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    //despues nos dicen como va a ser el transporte
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        host:"smtp.gmail.com",
        // port: 587,
        port: 465,
        // secure: false, //true for 465, flase for other ports
        secure: true,
        auth: {
            // user:testAccount.user, // generated ethereal user
            // user: 'heather.brekke@ethereal.email',
            // pass: testAccount.pass, //generated ethereal password
            // pass: 'v1NeYJG9jfVwEXM9tK'

            //con mi información de gmail
            user: 'zabala1juan@gmail.com',
            pass: 'fcew bdrq bnsr tcsj'
        },
    });

    //después de configurar el transporte, tenemos el envío, por ejemplo
    let info = await transporter.sendMail({
        // from: '"Fred Foo" <foo@example.com>',   //sender address
        // from: '"Fred Foo" <heather.brekke@ethereal.email>',
        from: '"Fred Foo" <zabala1juan@gmail.com>',
        // to: "bar@example.com, bas@example.com", // list of receivers
        // to: "heather.brekke@ethereal.email",
        to: "juankz90@gmail.com",
        subject: "Hello desde mi app de NodeJs", //Subject Line
        text: "Hello Mundo!",   //plain text body
        html: "<b>Hola world?</b>", //html body 
    });

    console.log('Message sent: %s', info.messageId);


    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}


// main().catch(console.error);
//este no lo usaremos, usaremos
sendMail();