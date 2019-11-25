
const fs = require('fs');

const http = require('http')

const url = require('url')
const data = fs.readFileSync('./dev-data/data.json','utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, resp)=>{

    if(req.url==='/' || req.url ==='/overview') {
        resp.end('This is overview ')
    }
    else if(req.url ==='/product') {
        resp.end('This is product')
    }
    if(req.url==='/api') {
        resp.writeHead(200,{
            'Content-type' : 'application/json'
        })
        resp.end(data)
    }
    else {
        resp.writeHead(404 , {
            'Content-type' :'text/html'
        })
        resp.end('Page not found ')

    }
})



server.listen(8000,'127.0.0.1',(error, data)=>{

console.log('Listening to server')

})