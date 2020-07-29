
const express = require("express")
const app = express();
const puerto = parseInt(process.env.PORT, 10) || 8891;
const bodyParser = require("body-parser")
const nodemailer = require('nodemailer');


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// Open port
app.listen(puerto, () => console.log("Listening port " + puerto))



// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //

app.get("/", (_, res) => {
	res.send("E-skeleton-email is up and running! :D")
})

app.post("/send-email", (req, res) => {
	let body = req.body;

	let transporter = nodemailer.createTransport({
		host: `${body.host}`,
		port: body.port,
		secure: body.secure,
		auth: {
			user: body.authUser,
			pass: body.authPassword,
		},
	});

	var mailOptions = {
		from: body.user_email,
		to: `${body.dest_email}`,
		subject: `${body.subject}`,
		text: `${body.emailBody}`
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.status(200).send({ code: "400", status: "There was an error sending the email: " + error })
			console.log(error);
		} else {
			res.status(200).send({ code: "200", status: "Email sent Succesfully" })
		}
	});
})



