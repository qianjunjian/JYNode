const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
    const { pathname } = require('url').parse(request.url);

    if (pathname === '/upload') {

    } else {
        
    }
})