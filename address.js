var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://liveaddress.p.rapidapi.com/street-address',
//   params: {
//     'auth-token': 'OWSbBENwQMqwgbVY9QgU',
//     'auth-id': '7f515232-7ebe-f03e-6ee7-f6a94d94221c',
//     street: '209 main street Woodbridge NJ 07095',
//     candidates: '10'
//   },
//   headers: {
//     'x-rapidapi-host': 'liveaddress.p.rapidapi.com',
//     'x-rapidapi-key': 'be003229f3mshbcc6f7dc35c54d2p19ee35jsn50fe864bda4b'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });



async function get_live_address(street1) {

  const response = await axios({
    method: 'GET',
    url: 'https://liveaddress.p.rapidapi.com/street-address',
    params: {
      'auth-token': 'OWSbBENwQMqwgbVY9QgU',
      'auth-id': '7f515232-7ebe-f03e-6ee7-f6a94d94221c',
      street: street1 || "209 main street Woodbridge NJ 07095",
      candidates: '10'
    },
    headers: {
      'x-rapidapi-host': 'liveaddress.p.rapidapi.com',
      'x-rapidapi-key': 'be003229f3mshbcc6f7dc35c54d2p19ee35jsn50fe864bda4b'
    }
  });
 
  if (response.data){
    let zip=response.data[0].components.zipcode
    let city_name=response.data[0].components.city_name
    let state=response.data[0].components.state_abbreviation
      console.log(zip,city_name,state)
      // console.log(response.data[0])
      return [zip,city_name,state]  
  }
  else{
    return ["undifined zip","undifined city","undifined state"]
  }
}

get_live_address()

module.exports={get_live_address}