import { useEffect, useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  // data store States
  const [todos, settodos] = useState(() => {
    const savetodo = localStorage.getItem("todos");
    return savetodo ? JSON.parse(savetodo) : [];
  });

  // form State inputs
  const [Taskinput, setTaskinput] = useState("");

  // Edit State
  const [Edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos]);

  const handleChange = (e) => {
    setTaskinput(e.target.value);

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const records = {
      id: Math.random().toFixed(4),
      text: Taskinput,
    };

    if (Edit) {

      settodos([
        ...todos.filter(update => update.id !== Edit), { id: Edit, text: Taskinput }
      ]);

      setEdit(null);

    } else {
      settodos([
        ...todos, records
      ]);
    }

    setTaskinput("")
  }

  const handleEdit = (id) => {
    const EditData = todos.find(edit => edit.id === id);
    setTaskinput(EditData.text);
    setEdit(id);
  }

  const handledelete = (id) => {
    settodos(todos.filter(del => del.id !== id))
  }


  const handlecomplete = (id) => {
    settodos(
      todos.map((Status) =>
        Status.id === id ? { ...Status, Complete: !Status.Complete } : Status
      )
    )
  }

  return (
   <div className='bg-light h-100'>
    <div className="container py-4 bg-light">
      <div className="row justify-content-center ">
        <div className="col-lg-8 col-md-10 col-sm-12">

          <h1 className='text-center mb-4 mt-3'>Todo App</h1>

          <form className="d-flex mb-4" onSubmit={handleSubmit}>
            <input type="text" style={{height:"45px",}}
            className='form-control  ml-3 me-2 border-dark'
              placeholder='Enter Task...'
              value={Taskinput}
              onChange={handleChange}
              required />

            <button type='submit' style={{marginLeft : "10px", width : "80px"}}  className={Edit ? 'btn btn-success' : 'btn btn-primary'}>
              {Edit ? "Edit" : "Add"}
              </button>
          </form>


          <table className='table table-borderless table-hover   w-7  mt-4' style={{marginLeft : "25px"}}>
            {todos.map((todo) => (
              <tr key={todo.id}>

             <td>
                  <button className={todo.Complete ? 'btn btn-warning' : 'btn btn-primary'} 
                  onClick={() => handlecomplete(todo.id)}>
                    {todo.Complete ? "Undo" : "Check"}
                  </button>
                </td>

                <td className='h5'>{todo.Complete ? <del className='text-danger'>{todo.text}</del> : todo.text}</td>

                <td>
                  <button className='btn btn-success' onClick={() => handleEdit(todo.id)}>Edit</button>
                </td>

                <td>
                  <button className='btn btn-danger' onClick={() => handledelete(todo.id)}>delete</button>
                </td>

              </tr>
            ))}
          </table>

        </div>
      </div>
    </div>
</div>
  );
}

export default App;
