// pages/api/mail.js

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;

    const data = {
      to: "engr.abidbaig@gmail.com",
      from: email,
      subject: `${name.toUpperCase()} sent you a message from Contact Form`,
      text: `Email => ${email}`,
      html: msg.replace(/\r\n/g, "<br>"),
    };

    console.log(data);

    try {
      await sgMail.send(data);
      res.status(200).json({ message: "Your message was sent successfully." });
    } catch (err) {
      res
        .status(500)
        .json({ message: `There was an error sending your message. ${err}` });
    }
  }
}
