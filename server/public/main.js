const socket = io();

socket.on('temp', function (data){
    console.log(data);
    let temp = document.getElementById('temperatura');
    temp.innerHTML = `${data} *C`;
})