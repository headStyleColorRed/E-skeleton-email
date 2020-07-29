# Mailing Node Server

This is a very simple Node server that uses nodemailer to send emails.

## How to use it

This server listens on port 8891 and expects to be given a few parameters, this is what a successfull call would look like

```javascript

function sendEmail() {
	let emailBody = {
		host: host,			// Email smtp hosting
		port: port,			// Port used
		authUser: authUser,		// Smtp hosting user
		authPassword: authPassword, 	// Smtp hosting password
		user_email: user_email,		// Email of user sending the mail
		dest_email: dest_email,		// Email of destination user
		subject: subject,		// Email subject
		emailBody: emailBody,		// Email body
	}


	axios.post("http://<your-server-ip>:8891/send-email", emailBody)
		.then((res) => {
			console.log(res); // ==> { "code": "200", "status": "Email sent Succesfully" }
		})
		.catch((err) => {
			console.log(err); // ==> { "code": "400", "status": "There was an error sending the email:.... Error: <the error>" }
		})
}
	
```
