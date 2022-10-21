const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://JT:Unilag2022@cluster0.rbg9ctw.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })

    .then(() => console.log("connected to DB"))
    .catch(console.error);


const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find(req.params.id);


    res.json(todos);
}); 

app.get('/todo/new', (req, res) => {
    const todo = new Todo({
    text: req.body.text
    });

    todo.save();
    res.json(todo);
});
    app.delete('/todo/delete/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    
    res.json(result);
})

app.put('/todo/compete/id', async (req, res) => {
    const todo = await Todo.findById(req.params.Id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})
app.listen(3001, () => console.log("server started on port 3001"));