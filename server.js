const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

})

app.post('/', function(req, res){
    // check the user's choice
    let currency = req.body.currency;
    /*console.log(currency)
    res.send(`You have Selected ${currency} yes`);*/


    // get BitCoin Teres from external API
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    request(url, function(error, response, body){
        console.log("Status Message: ",response.statusMessage);
        console.log("Status Status Code: ",response.statusCode);
        // server response (the date we actualy need)
        console.log(response.body);

        // convert response string to json object
       /* let data = JSON.parse(response.body);
        let price;

        if(currency === "EUR"){
            price = data.bpi.EUR.rate;
            console.log("Price in EUR ", price)
        }else {
            price = data.bpi.USD.rate;
            console.log("Price in USD ", price)
        }

        let disclaimer = data.disclaimer;

        res.write(`${disclaimer}`);
        res.write(`<br>`);
        res.write(`Current price in ${currency} is ${price}`);
        res.write();*/

    });

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})