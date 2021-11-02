'use strict';
let email=require('./sendmail')
let insertfetch=require('./insert_fetch')
let SendmailToUser=require('./SendMailToUser')
const address1=require("./address")
const fs = require('fs');


module.exports = (webhook) => {

    webhook.on('User_message_recorded', (session) => {
        let message= session.text  // user message to be sent in email 
        console.log(message)
        email.send_email(message)  //sending user email to defy insurance email

    });

    webhook.on('Got_Email_Name', (session) => {
  
        let name=session.name
        let useremail=session.email
        insertfetch.get_lead_count_by_email(useremail,name)   // checking and inserting if not present then add to lead
        console.log(useremail,name)
        SendmailToUser.send_email(useremail,name)

    });

    webhook.on('home_address', async(session) => {
        let first_name=session.First_Name
        let last_name=session.Last_Name
        let phone_number=session.phone_number
        let email=session.email
        let street = session.address

        let addressdata=await address1.get_live_address(street)                   //street city state zip
        let zipcode=addressdata[0]
        let city_name=addressdata[1]
        let state=addressdata[2]
        let address=`${street},${city_name},${state},${zipcode}`

        console.log(`first name: ${first_name},    last name: ${last_name},   phone: ${phone_number},  email: ${email},  address:${address} `)

        var obj={
            "data":[
                {
                "First_Name":first_name,
                "Last_Name":last_name,
                "Email":email,
                "Phone":"0"+phone_number,
                "Address":address,
    
           }
        ],
        "trigger": [
            "approval",
            "workflow",
            "blueprint"
        ]
        }
    
        await insertfetch.insert_lead(obj)
    
    });


    webhook.on('cyber_address', async(session) => {
        let first_name=session.First_Name
        let last_name=session.Last_Name
        let phone_number=session.Phone_number
        let email=session.email
        let street = session.address

        let addressdata=await address1.get_live_address(street)                   //street city state zip
        let zipcode=addressdata[0]
        let city_name=addressdata[1]
        let state=addressdata[2]
        let address=`${street},${city_name},${state},${zipcode}`

        console.log(`first name: ${first_name},    last name: ${last_name},   phone: ${phone_number},  email: ${email},  address:${address} `)

        var obj={
            "data":[
                {
                "First_Name":first_name,
                "Last_Name":last_name,
                "Email":email,
                "Phone":"0"+phone_number,
                "Address":address,
    
           }
        ],
        "trigger": [
            "approval",
            "workflow",
            "blueprint"
        ]
        }
    
        await insertfetch.insert_lead(obj)
    

    });

    webhook.on('car_address', async(session) => {
        let first_name=session.First_Name
        let last_name=session.Last_Name
        let phone_number=session.phone_number
        let email=session.email
        let street = session.address

        let addressdata=await address1.get_live_address(street)                   //street city state zip
        let zipcode=addressdata[0]
        let city_name=addressdata[1]
        let state=addressdata[2]
        let address=`${street},${city_name},${state},${zipcode}`

        console.log(`first name: ${first_name},    last name: ${last_name},   phone: ${phone_number},  email: ${email},  address:${address} `)

        var obj={
            "data":[
                {
                "First_Name":first_name,
                "Last_Name":last_name,
                "Email":email,
                "Phone":"0"+phone_number,
                "Address":address,
    
           }
        ],
        "trigger": [
            "approval",
            "workflow",
            "blueprint"
        ]
        }
    
        await insertfetch.insert_lead(obj)
    
    });


    webhook.on('life_address', async(session) => {
        let first_name=session.First_Name
        let last_name=session.Last_name
        let phone_number=session.Phone_number
        let email=session.email

        let street = session.address

        let addressdata=await address1.get_live_address(street)                   //street city state zip
        let zipcode=addressdata[0]
        let city_name=addressdata[1]
        let state=addressdata[2]
        let address=`${street},${city_name},${state},${zipcode}`

        console.log(`first name: ${first_name},    last name: ${last_name},   phone: '0'+${phone_number},  email: ${email},  address:${address} `)

        var obj={
            "data":[
                {
                "First_Name":first_name,
                "Last_Name":last_name,
                "Email":email,
                "Phone":"0"+phone_number,
                "Address":address,    
           }
        ],
        "trigger": [
            "approval",
            "workflow",
            "blueprint"
        ]
        }
        await insertfetch.insert_lead(obj)
    
  });
  var emails=[]
 
  webhook.on('got_email', async(session) => {
    let email=session.email
    emails.push(email)
    let contact=await insertfetch.get_id_of_contact_by_email(email)
    let name=contact[1]    
    session.name=name
    var policies=await insertfetch.get_Policy_associated_by_contact_email(email)
    session.policies=policies
    });

    webhook.on('policy_selected',async(session)=>{
        let policy_selected=session.policy
        email=emails[0]
        console.log(policy_selected)
        var index;
        var policies=await insertfetch.get_Policy_associated_by_contact_email(email)
        for(let i=0;i<policies.length;i++){
            if(policies[i].toUpperCase()==policy_selected.toUpperCase()){
                index=i
            }
        }
        console.log(index)
        policy_selected=policies[index]      //getting selected policy form policies 

        var Carriers=await insertfetch.get_Policy_Carrier_by_contact_email(email);
        let Carrier_selected=Carriers[index]
        console.log(Carrier_selected,'carrier selected')

        // now fetching all carriers from carrier.json
        let rawdata = fs.readFileSync('carriers.json');
        let carreir_details = JSON.parse(rawdata);
        let Carrier_details_of_user=carreir_details[Carrier_selected]
        console.log(Carrier_details_of_user,'carrier details of user')
        if (Carrier_details_of_user!=undefined){
            let website_link=Carrier_details_of_user['links']['website']
            let payment_link=Carrier_details_of_user['links']['Billing']
            let claim_link=Carrier_details_of_user['links']['claim']
            let claim_phone=Carrier_details_of_user['phone']['claim']
            let service_phone=Carrier_details_of_user['phone']['service']
            session.website_link=website_link
            session.payment_link=payment_link
            session.claim_link=claim_link
            session.claim_phone=claim_phone
            session.service_phone=service_phone
        }
        else{
            session.Login=Carrier_selected
            session.payment_link="payment link is not available"
            session.claim_link="claim link is not availbale"
            session.claim_phone=" phone Number is not available"
            session.service_phone="service phone is not available"
        }

    })

        
    
    webhook.on('policy_review', async(session) => {
        email=emails[0]

        let policyDetails=await insertfetch.get_Policy_associated_by_contact_email(email)
        console.log(policyDetails," policy documnets")
        let PloicyStatus=policyDetails.Policy_Status;
        let PolicyExpiration=policyDetails.Expiration_Date;
        let Carrier=policyDetails.Carrier;
        session.details=`Your Policy Status is : ${PloicyStatus}  
                        Policy Expiration is : ${PolicyExpiration}
                        Policy Carrier is : ${Carrier}
                        `
        });

        webhook.on('filed_cliam',async(session)=>{
            let email=session.email;
            let Id_name=await insertfetch.get_id_of_contact_by_email(email)
            let name = Id_name[1]
            let damage=session.damage
            let description=`${name} Filed A Claim \n   email: ${email} \n  Reason : ${damage} `;
            await insertfetch.create_ticket("Claim Filed",email,description);
            console.log("done ticket")
          
        });//

        webhook.on('Requested_A_Callback',async(session)=>{
            let email=session.email;
            let Id_name=await insertfetch.get_id_of_contact_by_email(email)
            let name = Id_name[1]
            // let damage=session.damage
            let best_phone=session.best_phone;
            let best_time=session.best_time;
            let best_day=session.best_day;
            let description=`${name} Requested A Call Back            \n   email: ${email}  \n  best phone number to call : ${best_phone}   best day to call: ${best_day}     best time to call ${best_time}`;
            await insertfetch.create_ticket("Claim Filed",email,description);
            console.log("done ticket")
          
        });

        webhook.on('Request_certificate',async(session)=>{
            let email=session.email;
            let Id_name=await insertfetch.get_id_of_contact_by_email(email)
            let name = Id_name[1]
            // let damage=session.damage
            let description=`${name} Requested A Certificate  \n   email: ${email} \n   `;
            await insertfetch.create_ticket("Claim Filed",email,description);
            console.log("done ticket")
          
        });//callback,certicate,changes


        webhook.on('Policy_Changes_requested',async(session)=>{
            let email=session.email;
            let Id_name=await insertfetch.get_id_of_contact_by_email(email)
            let name = Id_name[1]
            // let damage=session.damage
            let requested_change=session.change_request
            let description=`${name} Requested Changes In Policy \n   email: ${email}  Change Requested : ${requested_change}}`;
            await insertfetch.create_ticket("Claim Filed",email,description);
            console.log("done ticket")
                  });//RequestID

        webhook.on('RequestID',async(session)=>{
            let email=session.email;
            let Id_name=await insertfetch.get_id_of_contact_by_email(email);
            let name = Id_name[1];
            let requested_change=session.change_request;
            let description=`${name} Requested Auto Id Via Email  \n      email: ${email}       Change Requested : ${requested_change}}`;
            await insertfetch.create_ticket("Claim Filed",email,description);
            console.log("done ticket")
        });
    } 



