const cors = require('cors');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());
app.use(cookie_parser());

let service = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lengefitness@gmail.com',
        pass: 'lenge123'
    }
});

function sendEmail(email, title, body){
    let mailOptions = {
        from: 'lengefitness@gmail.com',
        to: email,
        subject: title,
        text: body
    };
    service.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Did not send', err);
        } else {
            console.log('Sent');
        }
    });
}

app.post("/mail", (req, res) => {
    console.log("Email has been recieved", req.headers)
    console.log(req.body)
    sendEmail(req.body.email, req.body.title, req.body.body);
})

app.listen(4000, () => {
    console.log("Server Running at 4000 ");
})
