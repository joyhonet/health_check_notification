const nodemailer = require("nodemailer");
require("dotenv").config();
require('../model/date');
//let nDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000)).format('yyyy-MM-dd H:i:s');

const senderInfo = {
    user: process.env.MAILER_AUTHID,
    pass: process.env.MAILER_AUTHPWD,
};
// 메일발송 객체
const mailSender = {
    // 메일발송 함수
    sendGmail: function (params) {
        let nDate = new Date().format('yyyy-MM-dd H:i:s');
        try{
            let transporter = nodemailer.createTransport({
                service: 'gmail',   // 메일 보내는 곳
                prot: 587,
                host: 'smtp.gmlail.com',  
                secure: false,  
                requireTLS: true ,
                auth: {
                    user: senderInfo.user,  // 보내는 메일의 주소
                    pass: senderInfo.pass   // 보내는 메일의 비밀번호
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            // 메일 옵션
            let mailOptions = {
                sender: params.from?params.from:senderInfo.user, // 보내는 메일의 주소
                from: params.from?params.from:senderInfo.user, // 보내는 메일의 주소
                replyTo: params.replyTo?params.replyTo:'',
                to: params.to?params.to:'', // 수신할 이메일
                subject: params.subject, // 메일 제목
                text: params.text, // 메일 내용
                html: params.html, // 메일 내용
            };
            
            // 메일 발송
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(`[${nDate}]	"sendMail"	"Failed"	${error}`);
                } else {
                    console.log(`[${nDate}]	"sendMail"	"Success"	${info.response}`);
                }
            });
        } catch(error) {
            console.log(`[${nDate}]	"sendGmail"	"Failed"	${error}`);
        }

    }
}

module.exports = mailSender;
/**
let emailParam = {
    "from": "보내는사람",
    "replyTo": "답변메일",
    "to": "받는사람",
    "subject": "메일 제목",
    "text": "메일 내용(TEXT)",
    "html": `메일 내용(HTML)`,
}
mailSender.sendGmail(emailParam);
*/