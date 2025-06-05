import React from 'react';
import { useState } from 'react';

export const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const body = { description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(body);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Input Todo</h1>
      <form
        className="d-flex justify-content-center mt-5"
        onSubmit={onSubmitForm}
      >
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          value={description}
          className="form-control-md w-50"
          placeholder="Enter here..."
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </>
  );
};
