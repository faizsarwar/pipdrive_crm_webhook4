const axios = require('axios');
const { type } = require('os');

//      getting query string

var querystring = require('querystring');

async function get_access_token() {           
    // form data
    var postData = querystring.stringify({
        refresh_token: '1000.a1635dad90645047252b72b2a5748da0.96459d821382bae5ae15c9ee98572d54',
        client_id:"1000.3UA36O2XU61VR9L3UB6WGT9BME29AK",
        client_secret:"6bb9ab767a4059d56b5111336b5afa80d247993748",
        grant_type:"refresh_token"
    });
    
  
  const response = await axios({
    method: 'POST',
    baseURL: 'https://accounts.zoho.com/oauth/v2/token',

    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data:postData,
  });

    console.log(response.data)
    
    access_token=response.data.access_token
    return access_token
}

async function get_access_token_for_Tickets() {           
  // form data
  var postData = querystring.stringify({
      refresh_token: '1000.0b9abd1f3027313f79dbdb2f6227b095.9d7f6ee293c11688d9d75d4883fb2a96',
      client_id:"1000.3UA36O2XU61VR9L3UB6WGT9BME29AK",
      client_secret:"6bb9ab767a4059d56b5111336b5afa80d247993748",
      grant_type:"refresh_token"
  });
  

const response = await axios({
  method: 'POST',
  baseURL: 'https://accounts.zoho.com/oauth/v2/token',

  headers: {
      "Content-Type": "application/x-www-form-urlencoded",
  },
  data:postData,
});

  console.log(response.data)
  
  access_token=response.data.access_token
  return access_token
}


async function get_access_token_for_sql() {           
    // form data
    var postData = querystring.stringify({
        refresh_token: '1000.d797bedf8a2a30a85dec7e52614b9fcc.c80c0a88f5bfee401544023162d7c6dd',
        client_id:"1000.3UA36O2XU61VR9L3UB6WGT9BME29AK",
        client_secret:"6bb9ab767a4059d56b5111336b5afa80d247993748",
        grant_type:"refresh_token"
    });
    
  
  const response = await axios({
    method: 'POST',
    baseURL: 'https://accounts.zoho.com/oauth/v2/token',

    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data:postData,
  });

    console.log(response.data)
    
    access_token=response.data.access_token
    return access_token
}


async function create_ticket(SubjectOfTicket,email,Description){
  let access_token=await get_access_token_for_Tickets();
  // let id_name=await get_id_of_contact_by_email(email)
  // let Id=id_name[0]
  // console.log(Id)
  let data={
    "subject":SubjectOfTicket,
    "departmentId":"656360000000006907",
    "contactId": "656360000000234001",
    "email":email,
    "description":Description
  }
  const response = await axios({
    method: 'POST',
    baseURL: 'https://desk.zoho.com/api/v1/tickets',
    headers: {
       "Authorization": `Zoho-oauthtoken ${access_token}`,
      "ogrId":"710022290"
     },
    data:data,
  });  
    console.log(response.data)
}

// create_ticket("hi faizi","musaalusaimi@gmail.com","hello from chatbot")

async function fetch_leads(){
    access_token=await get_access_token()
    console.log(access_token)
    const config = {
        method: 'get',
        url: `https://www.zohoapis.com/crm/v2/Leads`,
        headers: { "Authorization": `Zoho-oauthtoken ${access_token}` }
    }

    let res = await axios(config)

    console.log(res.data)


}

// fetch_leads()

async function insert_lead(data) {

    access_token= await get_access_token()

  const response = await axios({
    method: 'POST',
    baseURL: 'https://www.zohoapis.com/crm/v2/Leads',
    headers: { "Authorization": `Zoho-oauthtoken ${access_token}` },
    data:data,
  });
  
    console.log(response.data)
}


async function get_lead_count_by_email(Email,name){
    access_token= await get_access_token_for_sql()

    let body={
        "select_query" : `select Last_Name, First_Name
                         from Leads 
                        where Email='${Email}' `
       }

  const response = await axios({
    method: 'POST',
    baseURL: 'https://www.zohoapis.com/crm/v2/coql',
    headers: { "Authorization": `Zoho-oauthtoken ${access_token}` },
    data:body,
  });
  
    // console.log(response.data=="")

    if (response.data==""){
      
        var obj={
          "data":[
              {
              // "First_Name":first_name,
              "Last_Name":name,
              "Email":Email,
              // "Phone":phone_number,
              // "Address":address,

        }
      ],
      "trigger": [
          "approval",
          "workflow",
          "blueprint"
      ]
      }

      insert_lead(obj)
      console.log("lead inserted")
   
    }
    else{
      console.log("email already exists")
    }

    // return response.data.info.count

}



//have to work on that



// have to work on that
async function get_id_of_contact_by_email(email){         // if the customer is already with defy then we use this function
      access_token= await get_access_token_for_sql()

      let body={
          "select_query" : `SELECT 	Carrier,Full_Name
                          FROM Contacts 
                          where Email='${email}' `
        }

      const response = await axios({
        method: 'POST',
        baseURL: 'https://www.zohoapis.com/crm/v2/coql',
        headers: { "Authorization": `Zoho-oauthtoken ${access_token}` },
        data:body,
      });

      let Id=response.data.data[0].id
      let name=response.data.data[0].Full_Name
      // console.log(String(Id),name)
      return [String(Id),name]
}


async function get_Policy_Carrier_by_contact_email(email) {
  let data =await get_id_of_contact_by_email(email)
  let id =data[0]
  access_token=await get_access_token()
  console.log(access_token)

  const config = {
      method: 'get',
      url: `https://www.zohoapis.com/crm/v2/Contacts/${id}/Policy_Associated`,  //id
      headers: { "Authorization": `Zoho-oauthtoken ${access_token}` }
  }

  let res = await axios(config)
  var Carriers=[]

  for (let i=0;i<res.data.data.length;i++){
    // console.log(i)
    let Carrier=res.data.data[i].Carrier
    Carriers.push(Carrier)
  }

  // console.log(Carriers)
  return Carriers

}

async function get_Policy_associated_by_contact_email(email) {
  let data =await get_id_of_contact_by_email(email)
  let id =data[0]
  access_token=await get_access_token()
  // console.log(access_token)

  const config = {
      method: 'get',
      url: `https://www.zohoapis.com/crm/v2/Contacts/${id}/Policy_Associated`,  //id
      headers: { "Authorization": `Zoho-oauthtoken ${access_token}` }
  }

  let res = await axios(config)
  var policies=[]
  console.log(res.data.data)
  for (let i=0;i<res.data.data.length;i++){
    console.log(i)
    let policy=res.data.data[i].LOB_interest
    policies.push(policy)
  }

  console.log(policies)
  return policies
}

// get_Policy_Carrier_by_contact_email('musaalusaimi@gmail.com')
// get_Policy_associated_by_contact_email('musaalusaimi@gmail.com')
// get_id_of_contact_by_email('musaalusaimi@gmail.com')
module.exports={ insert_lead,fetch_leads,get_lead_count_by_email,get_Policy_associated_by_contact_email,get_Policy_Carrier_by_contact_email,get_id_of_contact_by_email,create_ticket}