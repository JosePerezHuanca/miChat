console.log('Cliente Websocket')

const socket = io.connect()
socket.on('messages', mensajes => {
    render(mensajes)
})

function render(mensajes){
let html=mensajes.map(mensaje=> ` <div>
<b>${mensaje.autor}</b>:
<i>${mensaje.text}</i>
</div>
`).join('')
document.getElementById('Mensajes').innerHTML=html
}

const contenido=document.getElementById('contenido');
contenido.addEventListener('submit', e=>{
    e.preventDefault();
    let mensaje={
        autor: document.getElementById('autor').value,
        text: document.getElementById('Mensaje').value
    }
socket.emit('new-message', mensaje);
contenido.reset();
})

