import React from 'react'
import './Tudo.css'
import { useState, useRef, useEffect } from 'react'

//icons from react 
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Tudo() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault(); // its preventing the form rendering the dom while submit tym 

  }

  const addTodo = () => {
    if(todo !== ''){
      setTodos([...todos, {list : todo, id : Date.now(), status: false}]);
      setTodo('');
    }
    if(editId){
      const editTodo = todos.find((todo)=> todo.id === editId)
      const updateTodo = todos.map((to)=> to.id === editTodo.id
      ? (to = {id : to.id, list: todo})
      : (to = {id: to.id, list: to.list})
      )
      setTodos(updateTodo)
      setEditId(0)
      setTodo('')
    }
  }

  const inputRef = useRef('null');

  useEffect(() => {
    inputRef.current.focus()
  })

    const onDelet = (id)=>{
      setTodos(todos.filter((to) => to.id !== id)) // return statement
    }

    const onComplete = (id)=>{
      let complete = todos.map((list)=>{
        if(list.id === id){
          return({...list, status: !list.status}) // change to status true
        }
        return list
        
      })
      setTodos(complete)
    }

    const onEdit = (id)=>{
      const editTodo = todos.find((to)=> to.id === id)
      setTodo(editTodo.list)
      setEditId(editTodo.id)
    }

  return (
    <div className='container'>
      <h2>TODO APP</h2>

      <form className='orm-group' onSubmit={handleSubmit}>

        <input type="text" value={todo} placeholder='Enter Your ToDo' ref={inputRef} className='form-control' onChange={(event) => setTodo(event.target.value)} />

        <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button> 
      </form>

      <div className='list'>
        <ul>
          {
            todos.map((to, index) => (
              <li key={index} className='list-items'>
                <div className='list-item-list' id={to.status ? 'list-item':''} >{to.list}</div>
                <span>
                  <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(to.id)} />
                  <FiEdit className='list-item-icons' id='edit' title='Edit' onClick={()=> onEdit(to.id)}/>
                  <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={()=>onDelet(to.id)} />
                </span>
              </li>
            ))}

        </ul>

      </div>

    </div>


  )
}

export default Tudo
