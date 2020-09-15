import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import axios from "axios";

// class TodoApp extends React.Component{

//     render(){
//         return(
//             <div className="container">
//                 <Header />
//                 <AddTodo addTodo={this.addTodo}/>
//                 <Todos 
//                     todos={this.state.todos} 
//                     handleChange={this.handleCheckboxChange}
//                     deleteTodo={this.deleteTodo}
//                 />
//             </div>
//         );
//     }
// }

function TodoApp(){

    const [state, setState] = useState({
        todos: []
    });

    const handleCheckboxChange = id => {
       setState({
           todos: state.todos.map(todo =>{
               if(todo.id === id){
                   todo.completed = !todo.completed;
               }
               return todo;
           })
       })
    };
    
    const addTodo = title => {
        const todoData = {
            title: title,
            completed: false
        };
        axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
        .then(res => {
            //console.log(res.data);
            setState({
                todos: [...state.todos, res.data]
            });
        })
  
     
    };

    const deleteTodo = id =>{
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => setState({
            todos:[
                ...state.todos.filter(todo =>{
                    return todo.id !== id;
                })
            ]
        }))
    }
    useEffect(() => {
        const config = {
            params: {
                _limit: 10   
            }
        }
        axios.get("https://jsonplaceholder.typicode.com/todos", config)
            .then(res => setState({
                todos: res.data
            }));
    },[]);

    return (
        <div className="container">
            <Header/>
            <AddTodo addTodo={addTodo} />
            <Todos todos = {state.todos}
                handleChange={handleCheckboxChange}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default TodoApp;