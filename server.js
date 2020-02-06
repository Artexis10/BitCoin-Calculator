const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    //checking user chosen currency
    let currency = req.body.currency;
    let url = `https://api.coindesk.com/v1/bpi/currentvalue/${currency}.json`;
    //get BitCoin currency values from external API
    request(url, function(error, response, body){
        console.log("Status Message: ", response.statusMessage);      
        console.log("Server Status Code: ", response.statusCode);
        //server response (the data we need)
        console.log(response.body);

        //convert response string to json object
        let data = JSON.parse(response.body);
        let Bitcoin = parseFloat(req.body.Bitcoin);
        let bitcoin_value;
        let value;

        if(currency === "EUR"){
            value = parseFloat(data.bpi.EUR.rate_float);
            bitcoin_value = value*Bitcoin;
            console.log(bitcoin_value);
            bitcoin_value = Math.round(bitcoin_value);
            console.log("Value in EUR ", bitcoin_value);
        } else {
            value = parseFloat(data.bpi.USD.rate_float);
            bitcoin_value = value*Bitcoin;
            console.log(bitcoin_value);
            bitcoin_value = Math.round(bitcoin_value);
            console.log("Value in USD ", bitcoin_value);
        }
        
        let disclaimer = data.disclaimer;
        res.write(`${disclaimer}. `);
        res.write(`Current value in ${currency} is ${bitcoin_value}.`);
        res.send();
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});