
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


// Modules
const JoiSchema = require("./validation.js")



// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //

app.get("/", (_, res) => {
	res.send("E-skeleton-email is up and running! :D")
})

app.post("/send-email", (req, res) => {
	let body = req.body;

	// Validation
	validationResult = JoiSchema.validate(body)
	if (validationResult.error) {
		return res.status(200).send({ code: "400", status: validationResult.error.details[0].message })
	}

	// Mail stmp
	let transporter = nodemailer.createTransport({
		host: `${body.host}`,
		port: body.port,
		secure: false,
		auth: {
			user: body.authUser,
			pass: body.authPassword,
		},
	});

	// Mail content
	var mailOptions = {
		from: body.user_email,
		to: `${body.dest_email}`,
		subject: `${body.subject}`,
		text: `${body.emailBody}`
	};

	// Mail sending process
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.status(200).send({ code: "400", status: "There was an error sending the email: " + error })
			console.log(error);
		} else {
			res.status(200).send({ code: "200", status: "Email sent Succesfully" })
		}
	});
})