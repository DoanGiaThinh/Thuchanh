import url from "url";
// var url = require('url')
const getPath=(req)=>{
    return req.url;
}
const getParamsURL=(req)=>{
    let urlData = url.parse(req.url, true);
    return JSON.stringify(urlData.query);
}
export {getPath,getParamsURL}
