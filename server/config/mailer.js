'use strict';
 var nodemailer = require('nodemailer');

 export default function sendEmail(subject, message){
   var smtpSettings = {
     service:"gmail",
     host:"smtp.gmail.com",
     auth: {
       user:"acabreram85@gmail.com",
       pass:"Guitar85!"
     }
   };
    var smtpTransport = nodemailer.createTransport(smtpSettings);
    var mailOptions = {
      to: 'a.cabrera.m85@gmail.com',
      subject : subject,
      text : message
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        res.end("error");
    }else{
        console.log("Message sent: " + response.message);
        res.end("sent");
        }
    });

 }
