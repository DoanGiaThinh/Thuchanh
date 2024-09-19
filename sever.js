import express from 'express'
import dontenv from 'dotenv/config'
import myDateTime from './date'
import {getPath,getParamsURL} from './getURL.js'
import viewEngine from './viewEngine.js'
const app = express()
const port = process.env.PORT
viewEngine(app)
app.get('/', (req, res) =>{
    // res.send('Hello World!')
    res.render("home")
})
app.get('/about', (req, res) =>{
    // res.send('Hello World!. Page about')
    res.render("about")
})
app.get('/date', (req, res) =>{
    const myDate = myDateTime()
    res.send(`${myDate}`)
})
app.get('/geturl', (req, res) =>{
    const url = getPath(req)
    res.send(url)
})
app.get('/getparams', (req, res) =>{
    const paramsurl = getParamsURL(req)
    res.send(paramsurl)
})
app.get('/ejs',(req, res) =>{
    res.render("test")
})
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})
