import express from "express"
import cors from "cors";
import pool from"./db.js";

const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(express.json()) // req.body

// Routes

// Get all todos

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})


// Create a todo

app.post("/todos", async(req, res) => {
    try {
        const {description, status = false } = req.body
        // console.log(description)
        const newTodo = await pool.query("INSERT INTO todo (description, status) VALUES($1, $2) RETURNING *", [description, status]);
        res.json(newTodo.rows)
    } catch (error) {
        console.log(error.message)
    }
})
 
// Get a specific todo

app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT description FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// Update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);
        res.json("Todo was updated")
    } catch (error) {
        console.log(error.message)
    }
})

// Update status

app.put("/todos/:id/status", async(req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const updateStatus = await pool.query("UPDATE todo SET status = $1 WHERE todo_id = $2", [status, id]);
        res.json("Todo status was updated");
    } catch (error) {
        console.log(error.message)
    }
})

// Delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo where todo_id = $1", [id])
        res.json("Todo was deleted")
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(port, (req, res) => {
    console.log(`Server has started on port ${port}`)
})