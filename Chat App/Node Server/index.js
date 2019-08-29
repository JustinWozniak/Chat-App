
const http = require('http');
const url = require('url');


let message_text = "";

const process_request = function (request, response) {
    console.log("Requested url from browser: " + request.url);
    const parsed_url = url.parse(request.url);
    
    // Set CORS headers -- https://gist.github.com/balupton/3696140
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
    
    
    if (parsed_url.pathname === '/read_message')
    {
        
        response.write(message_text);
        response.end();
    }
    else if (parsed_url.pathname === '/write_message')
    {
        
        const query = parsed_url.query;
        message_text = query.split("=")[1];
        console.log(message_text);
        
        response.end();
    }


}

//create a server object:
const server = http.createServer(process_request);

server.listen(8080); //the server object listens on port 8080
