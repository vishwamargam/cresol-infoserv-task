import { useState } from 'react';
import './App.css';

function App() {

  let [data, setData] = useState({ "uname": "", "task": "", "date": "" })
  let [todo, setTodo] = useState([])
  let [f, setF] = useState(true)
  let [i, setIndex] = useState('')
  let [comp, setComp] = useState([])
  let [copytodo,setCopy]=useState([])
  let [user,setUser]=useState('')
  let [fn,setFn]=useState('')


  let store = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  let addtodo = () => {
    setTodo([...todo, data])
    setCopy([...todo,data])
    setData({ "uname": "", "task": "", "date": "" })
  }
  let del = (ind) => {
    todo.splice(ind, 1)
    setTodo([...todo])
    setCopy([...todo])
  }
  let edit = (ind) => {
    setData({ ...todo[ind] })
    setIndex(ind)
    setF(false)
  }
  let update = () => {
    todo[i] = data
    setTodo([...todo])
    setCopy([...todo])
    setF(true)
    setData({ "uname": "", "task": "", "date": "" })
  }

  let complt = (ind) => {
    setComp([...comp,todo[ind]])
    del(ind)
  }

  let cdel = (ind) => {
    comp.splice(ind, 1)
    setComp([...comp])
  }

  let fun1=(e)=>{
   
    setUser(e.target.value)
  }

  let search=()=>{
    setTodo(copytodo.filter((item)=>item[fn]==user))
  }
  
  let clear=()=>{
    setTodo([...copytodo])
    setUser("")
  }

  let fun2=(e)=>{
    setFn(e.target.value)
  }

  return (
    <div className="App">
      <h1>Task manager</h1>
      <div>
        <input type='text' onChange={store} placeholder='Enter Username..' name='uname' value={data.uname} />
        <input type='text' onChange={store} placeholder='Enter Task' name='task' value={data.task} />
        <input type='date' onChange={store} name='date' value={data.date} />
        {f && <button onClick={addtodo}>Add</button>}
        {!f && <button onClick={update}>Update</button>}
      </div>

      <div>
        <select onChange={fun2}>
          <option disabled selected>Select Filter</option>
          <option value="uname">User name</option>
          <option value="task">Task</option>
        </select>
        <input type='text' name='uname' onChange={fun1} value={user}/>
        <button onClick={search}>Search</button>
        <button onClick={clear}>Clear Filter</button>
      </div>

      <h2>Tasks to do</h2>
      {todo.length > 0 && <table>
        <thead>
          <th>Username</th><th>Task</th><th>Deadline</th>
        </thead>
        <tbody>
          {
            todo.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.uname}</td>
                  <td>{item.task}</td>
                  <td>{item.date}</td>
                  <td><button onClick={() => del(index)}>Delete</button></td>
                  <td><button onClick={() => edit(index)}>Edit</button></td>
                  <td><button onClick={() => complt(index)}>Completed</button></td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

      }

      <h2>Completed Tasks</h2>
      {comp.length > 0 && <table>
        <thead>
          <th>Username</th><th>Task</th><th>Deadline</th>
        </thead>
        <tbody>
          {
            comp.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.uname}</td>
                  <td>{item.task}</td>
                  <td>{item.date}</td>
                  <td><button onClick={() => cdel(index)}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

      }

    </div>
  );
}

export default App;
