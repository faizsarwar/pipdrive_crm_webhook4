const nodemailer = require('nodemailer');

function send_email(message){
let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'defyinsurancebot@gmail.com',
		pass: 'insurancebot'}
});

let mailDetails = {
	from: 'defyinsurancebot@gmail.com',
	to: 'Hello@defyinsurance.com',
	subject: 'User wants to Become an agent',
	text:message

};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {

		console.log(err);
	} else {
		console.log('Email sent successfully');
	}
});
}

// send_email()
module.exports={send_email}