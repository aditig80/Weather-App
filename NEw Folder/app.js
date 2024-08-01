const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.get('/', (req,res)=> {
   res.sendFile(__dirname + "/index.html");
   
 
   
});
app.post('/', (req,res) => {
       const query = req.body.cityname;
    const api = '98e4fe342515c336012ded44cee5f7ee'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query +'&appid=' + api + '&units=metric';
    https.get(url, (response)=> {
       //console.log(response.statusCode);  
      response.on('data', (data)=> {
        //console.log(data);
        const weatherdata = JSON.parse(data);
        //console.log(weatherdata);
        const temp = weatherdata.main.temp;
        const description = weatherdata.weather[0].description;
        res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius</h1>");
        res.write("<p>The weather description is " + description + "</p>");
      })
    })
       
});



app.listen(3000, ()=> {
    console.log("Server is running at port 3000");
});