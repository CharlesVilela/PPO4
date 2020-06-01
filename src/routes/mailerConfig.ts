
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "charlesvilela12@gmail.com",
        pass: "1221011401"
    }
});

export default transporter;