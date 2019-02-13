
const net = require('net');
const errFile = require('./htmlfiles/404.js');
const heliumFile = require('./htmlfiles/helium.js');
const hydroFile = require('./htmlfiles/hydrogen.js');
const indexFile = require('./htmlfiles/index.js');
const stylesFile = require('./htmlfiles/styles.js');  


const server = net.createServer((socket) => {
    console.log('client connected');

    socket.on('data', data => {
        console.log(data);
        let date = new Date().toUTCString();
        let parsedData = data.toString();
        // console.log(parsedData)
        parsedData = parsedData.split('\n');
        console.log(parsedData);
        const reqLine = parsedData[0].split(' ');
        // console.log('REQUEST LINE',reqLine);
        const method = reqLine[0];
        const reqUri = reqLine[1];
        // console.log('method',method, 'uri', reqUri);

        if(method === 'GET'){
            
            if(reqUri === '/'){
                const response = `HTTP/1.1 OK\nServer: MyServer\nDate ${date}\nContent-Type: *\n\n${indexFile}` 
                console.log(response);
                socket.write(response);
                socket.end(); 
            }else if(reqUri === '/hydrogen.html'){ 
                const response = `HTTP/1.1 OK\nServer: MyServer\nDate ${date}\nContent-Type: *\n\n${hydroFile}`
                socket.write(response);
                socket.end();
            }else if(reqUri === '/helium.html'){
                const response = `HTTP/1.1 OK\nServer: MyServer\nDate ${date}\nContent-Type: *\n\n${heliumFile}`
                socket.write(response);
                socket.end();
            }else if(reqUri === '/css/styles.css'){
                const response = `HTTP/1.1 OK\nServer: MyServer\nDate ${date}\nContent-Type: text/css\n\n${stylesFile}`;
                console.log('css', response)
                socket.write(response);
                socket.end();
            }else{
                const response = `HTTP/1.1 404 Not Found\nServer: MyServer\nDate ${date}\nContent-Type: *\n\n${errFile}`;
                console.log('error', response)
                socket.write(response);
                socket.end();
            }
        
            

        }

      

        
    });

    
   
    
});
    server.on('error', (err) => {
        throw err;
    })

    

server.listen(8080, () => {
    console.log('hellooo')
});


