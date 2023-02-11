const { request } = require('express')
const {Pool} = require('pg')

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.DB_URL,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
})

const getTodos = (request, response) => {
    pool.query('select * from todos').then((result) => response.status(200)
    .json(result.rows))
    .catch((error) => response.status(500).json({errorMsg:'internal server error!',
    reason : error}))
}

const getOneTodo = (request, response) => {
    pool.query('select * from todos where id = $1',
    [request.params.id]
    ).then((result) => response.status(200)
    .json(result.rows))
    .catch((error) => response.status(500).json({errorMsg:'internal server error!',
    reason : error}))
}

const removeTodo = (request, response) => {
    pool.query('delete from todos where id = $1',
    [request.params.id]
    ).then((result) => response.status(200).json({msg: "successfully removed todo!"}))
    .catch((error) => response.status(500).json({errorMsg:'internal server error!',
    reason : error}))
}

const insertTodo = (request,response) => {
    pool.query('insert into todos values ($1,$2,$3,$4,$5)',[Math.random()*1001,
        request.body.title,
        request.body.priority,
        request.body.createdate,
        request.body.enddate
    ]).then(result => response.status(201).json({msg: 'record inserted successfully!'}))
    .catch((error) => response.status(500).json({errorMsg:'internal server error!',
    reason : error}))
}

const updateTodo = (request,response) => {
    pool.query('update todos set title = $1 , priority = $2 , createdate = $3 , enddate = $4 where id = $5',
    [   request.body.title,
        request.body.priority,
        request.body.createdate,
        request.body.enddate,
        request.params.id
    ]).then(result => response.status(200).json({msg: 'record updated successfully!'}))
    .catch((error) => response.status(500).json({errorMsg:'internal server error!',
    reason : error}))
}


module.exports = {getTodos,insertTodo,updateTodo,getOneTodo,removeTodo}