const { request, response } = require("express");
const express=require("express");
const app=express();
const get_post=require('./get_post')

app.get("/",(req,res)=>{
    res.send("this is pipdrive webhook")
})

app.post("/webhook",express.json(),async (request,response)=>{   
    console.log(request.body.data.customer)    


    // console.log(request.body.data.customer.phone)
    if (request.body.data.customer){

        let person_name=request.body.data.customer.first_name+" "+request.body.data.customer.last_name;
        let person_phone=request.body.data.customer.phone;
        let person_mobile_phone=request.body.data.customer.phone_mobile;
        let person_work_phone=request.body.data.customer.phone_work;
        let person_email=request.body.data.customer.email;
        let person_addtime=request.body.data.created_at;
        let productName=request.body.data.product.name;
        let additional_data=request.body.data.additional
    
        // get_post.create_person(person_name,person_email,person_phone,person_mobile_phone,person_work_phone)
        console.log(person_name,person_email,person_phone,person_mobile_phone,person_work_phone)
        
        let personId=await get_post.create_person(person_name,person_email,person_phone,person_mobile_phone,person_work_phone)

        let lead_name=person_name+" Lead"

        //creatring lead

        console.log("Person Id is this "+personId)
        await get_post.create_lead(lead_name , personId)
        

        //creating deal
        let deal_tittle=person_name+" "+productName;

        let dealId=await get_post.create_deal(deal_tittle,personId,additional_data)

        // console.log(lead_name,deal_tittle)


        //creating note


        let additional_note=request.body.data.additional;
        let sliced_note=''
        for (i in additional_note){
            console.log(i+" :  "+additional_note[i]) 
            sliced_note+=i+" :  "+additional_note[i]
            sliced_note+="\n"
        }

            

        console.log(sliced_note)

        await get_post.create_note_inside_deal(sliced_note,dealId)
    
        response.send("webhook called")   
    
    }
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server is up on 4000");
})
