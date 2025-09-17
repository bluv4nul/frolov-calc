const express = require("express")
const app = express()
const PORT = 2000

const isNumbers = (req, res, next) => {
    if( !(isNaN(req.query.x)) && !(isNaN(req.query.y)) ){
        const parsed = {
            x: Number(req.query.x),
            y: Number(req.query.y)
        }
        req.parsed = parsed;
        next()
    } else {
        res.status(400).json({error: "Parameters 'x' and 'y' must be valid numbers."})
    }
}

app.get('/', (req, res) => {
    res.send('Введите действие (/add, /minus, /divide, /multiply + ?x={значение}&y={значение})')
})

app.get('/add', isNumbers, (req, res) =>{
    const numbers = req.parsed
    res.status(200).json({result: numbers.x + numbers.y})
})

app.get('/minus', isNumbers, (req, res) =>{
    const numbers = req.parsed
    res.status(200).json({result: numbers.x - numbers.y})
})

app.get('/multiply', isNumbers, (req, res) =>{
    const numbers = req.parsed
    res.status(200).json({result: numbers.x * numbers.y})
})

app.get('/divide', isNumbers, (req, res) =>{
    const numbers = req.parsed
    if (numbers.y === 0)
        res.status(400).json({error: 'Division by zero is not allowed.'})
    res.status(200).json({result: numbers.x / numbers.y})
}) 

app.listen(PORT, (req,res)=>{
    console.log(`Server started: http://localhost:${PORT}`)
})