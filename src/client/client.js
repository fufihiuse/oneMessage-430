const socket = io();

const nameSection = document.querySelector('#name');
const messageSection = document.querySelector('#message');

const updateMessage = (data) => {
    nameSection.textContent = data.name;
    messageSection.textContent = data.message;
}

const init = () => {
    socket.on('message posted', updateMessage);
};

window.onload = init;