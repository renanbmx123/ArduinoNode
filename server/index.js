const http =  require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const socketIO = require('socket.io');

const io = socketIO.listen(server);
server.listen(3000,function(){
    console.log('server listening on port, 3000');
});

app.use(express.static(__dirname + '/public'));

//Serial
const SerialPort = require('serialport');
const ReadLine = new SerialPort.parsers.Readline();
const port = SerialPort('/dev/ttyACM0',{
     baudRate: 9600
 });
const parser = port.pipe(new SerialPort.parsers.Readline({delimiter: '\r\n'}));

 parser.on('open',function(){
     console.log('Connection is opened');
 });

parser.on('data',function(data){
    let temp = parseFloat(data,10)+' *C';
    console.log(temp);
    io.emit('temp', data);
});

port.on('error',function(){
    console.log(err);
});