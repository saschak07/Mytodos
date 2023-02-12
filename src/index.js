const express = require ('express')
const {getTodos,insertTodo,updateTodo,getOneTodo,removeTodo} = require('./db/toDoRepository')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.get('/todos', getTodos)
app.get('/todo/:id',getOneTodo)
app.post('/todos', insertTodo)
app.put('/todos/:id', updateTodo)
app.delete('/todo/:id',removeTodo)

app.listen(8000, () =>{
    console.log('started server at port 8000!' )
})