
const fs = require('fs');

const http = require('http')

const url = require('url')

const replaceItems = (tempCard, product) =>{
    let output = tempCard.replace(/{%PRODUCTNAME%}/g,product.productName );
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESC%}/g,product.description)
    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
    }
    
    output = output.replace(/{%ID%}/g,product.id)
    return output;
}

const templateOverview = fs.readFileSync('./templates/template-overview.html','utf-8')
const templateProduct = fs.readFileSync('./templates/template-product.html','utf-8')
const templateCard = fs.readFileSync('./templates/template-card.html','utf-8')
const data = fs.readFileSync('./dev-data/data.json','utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, resp)=>{
    const {query,pathname} = url.parse(req.url,true);

    if(pathname==='/' || pathname ==='/overview') {
        resp.writeHead(200,{'Content-type' : 'text/html'})
        const cardsHtml = dataObj.map(el=> replaceItems(templateCard,el)).join('');        
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g,cardsHtml)        
        resp.end(output)
    }
    else if(pathname ==='/product') {
        
        resp.writeHead(200, {'Content-type' : 'text/html'})
        const product = dataObj[query.id]
        const output = replaceItems(templateProduct,product)
        resp.end(output)
    }
    if(pathname==='/api') {
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
