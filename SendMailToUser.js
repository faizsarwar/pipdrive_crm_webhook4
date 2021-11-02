const nodemailer = require('nodemailer');
const hbs=require('nodemailer-express-handlebars')

function send_email(UserEmail,UserName){
let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'defyinsurancebot@gmail.com',
		pass: 'insurancebot'
    }
});

mailTransporter.use("compile",hbs({
	viewEngine:"express-handlebars",
	viewPath:""
}))

let mailDetails = {
	from: 'defyinsurancebot@gmail.com',
	to: UserEmail,
	subject: 'Meeting schedule',
	template:"index1",
	context:{
		name:UserName,
		email:UserEmail
	}

};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {

		console.log(err);
	} else {
		console.log('Email sent successfully');
	}
});
}

// send_email("faizsarwar44@gmail.com","faiz")
module.exports={send_email}