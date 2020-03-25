const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Jakie jest twoje imię?') //Póżniej pobierane z bazy danych ale teraz takiej nie mamy ;()

Msg('OOO! Widzę że doszedłeś :O')

socket.emit('new-user', name)

socket.on('chat-message', data => {
    Msg(`${data.name}: ${data.message}`);
});

socket.on('user-conected', name =>{
    Msg(`${name} Wszedł`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    Msg(`${name}: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
});

function Msg(message){
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    messageContainer.append(msgElement)
}