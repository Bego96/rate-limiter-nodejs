const express = require('express');
const app = express();
const port = 3000;
const requestIP = require('request-ip');

const userIpInfo = {
    ip: "",
    date: null
};

app.get('/request', (req, res) => {
    
    if (!userIpInfo.ip) {
        const date = new Date();
        userIpInfo.date = date.getTime();
        const ipAddress = requestIP.getClientIp(req);
        userIpInfo.ip = ipAddress;
        
    } else {
        const currentTime = new Date().getTime();
        const seconds = 5000;
       
        if (currentTime - userIpInfo.date < seconds) {
            console.log(currentTime - userIpInfo.date)
            return res.send("Too many requests");
        } else {
            const date = new Date();
            userIpInfo.date = date.getTime();
        }
    }
    res.send(userIpInfo.ip);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
