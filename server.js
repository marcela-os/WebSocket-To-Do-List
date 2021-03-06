const express = require('express');
const socket = require('socket.io');

const tasks = [
    { id: 1, name: 'Shopping' }, 
    { id: 2, name: 'Go out with a dog' }
  ];

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);
let index = 3;

io.on('connection', (socket) => {
    console.log('New user! Its id – ' + socket.id);
    
  
    socket.emit('updateData', tasks);
  
    socket.on('addTask', (task) => {
      console.log('User ' + socket.id + 'added new task:' + task);
      let newTask = { id: index, name: task };
      tasks.push(newTask);
      socket.broadcast.emit('addTask', newTask);
      index = index + 1;
    });

    socket.on('removeTask', (removeTask) => {
        const task = tasks.find(task => task.id === removeTask);
        console.log('Task was removed: ' + task);
        const index = tasks.indexOf(task);
        tasks.splice(index,1);
        socket.broadcast.emit('removeTask', removeTask);
      });
  
  
    console.log('I\'ve added a listener on tasks event \n');
  }); 

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});