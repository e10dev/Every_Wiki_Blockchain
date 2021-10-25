import rp from "request-promise";
import blockheader from "../header/header.js";

const request = function (data, route) {
    
    var options = {
        method: 'POST',
        uri: process.env.API_URI + route,
        body: data,
        headers: blockheader,
        json: true 
    };
    
    return rp(options).then(body => {
        return body;
    });
};

export default request;