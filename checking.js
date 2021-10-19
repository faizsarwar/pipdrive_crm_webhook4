let myobj={
    "type":"'lead.new'",
    "data":{
        "id":"'824887'",
        "created_at":"'2021-10-14 15:34:37'",
        "customer":{
            "title":"'her'",
            "first_name":"teslead2",
            "last_name":"19-20-21",
            "zip_code":"'55595'",
            "city":"'Karachi'",
            "street":"'teststr. 11'",
            "phone":"''",
            "phone_mobile":"''",
            "phone_work":"''",
            "email":"'faizsarwar856@gmail.com'",
            "martial_status":"''",
            "occupational_status":"''"
        },
        "product":{"name" : "'fries'", "price":"199"},
        "notes":"''",
        "additional":{
            "title":"'her'",
            "first_name":"teslead2",
            "last_name":"19-20-21",
            "zip_code":"'55595'",
            "city":"'Karachi'",
            "street":"'teststr. 11'",
            "phone":"''",
            "phone_mobile":"''",
            "phone_work":"''",
            "email":"'faizsarwar856@gmail.com'",
            "martial_status":"''",
            "occupational_status":"''"
        }
    }
}


let note=''

let additional_data =myobj.data.additional
for (i in additional_data){
console.log(i+" :  "+additional_data[i]) 
note+=i+" :  "+additional_data[i]
note+="\n"
}
console.log(note)

