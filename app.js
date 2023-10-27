const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const ejs = require('ejs')
const Stripe = require('stripe')
const DepartmentRouter = require('./Routes/DepartmentRouter')
const EmployeeRouter = require('./Routes/AddEmployee')
const EmployeeList = require('./Routes/EmployeeList')
const { v4: uuidV4 } = require('uuid')
const JobList = require('./Routes/jobList')
const login = require('./Routes/login')
const logout = require('./Routes/logout')
const makeapplication = require('./Routes/Application')
const Application = require('./Routes/Application')
const methodOverride = require('method-override');
require('./DB/db')
const morgan = require('morgan')
app.use(morgan('dev'))
const PORT = 3000;


app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.static("public", {
  mimeTypes: {
    "text/css": "css"
  }
}));



app.get('/', (req, res) => {
  const link = uuidV4();
  res.redirect(`/${link}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId)
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});





// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/department', DepartmentRouter)
app.use('/employeelist', EmployeeList)
app.use('/addemployee', EmployeeRouter)
app.use('/jobList', JobList)
app.use('/login', login)
app.use('/logout', logout)
app.use('/application', Application)




server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
