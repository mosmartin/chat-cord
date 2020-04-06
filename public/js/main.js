const chartForm = document.getElementById('chat-form');

const socket = io();

// listen for the message event
socket.on('message', (message) => {
  console.log(message);
});

// message submit
chartForm.addEventListener('submit', (e) => {
  // prevent default form submit behavior
  e.preventDefault();

  // get message text from the chat input
  const msg = e.target.elements.msg.value;

  // emit message to server
  socket.emit('chatMessage', msg);
});
