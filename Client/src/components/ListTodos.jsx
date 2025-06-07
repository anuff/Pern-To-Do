import React from 'react';
import { useState, useEffect } from 'react';
import { EditTodos } from './EditTodos';

export const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // Update status function

  const toggleStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete todo function

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get todo function

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
      // console.log(jsonData)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  // console.log(todos);

  return (
    <>
      <table className="table text-center mt-5">
        <thead>
          <tr>
            <th>Status</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr> */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleStatus(todo.todo_id, !todo.status)}
                />
              </td>
              <td>
                {todo.status ? <s>{todo.description}</s> : todo.description}
              </td>
              <td>
                <EditTodos todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
