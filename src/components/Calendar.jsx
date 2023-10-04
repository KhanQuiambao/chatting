import React, { useState, useEffect } from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelListContainer, Auth } from '../components';
import '../app.css';

import Header from './components/Header';
import Form from './components/form';
import TodosList from './components/TodosList';



const cookies = new Cookies();

const apiKey = 'w7gsaxm77tzs';
const authToken =  cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),           
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  },  authToken)
}


const Calendar = () => {

  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />

  return (
    <div className="app__wrapper" theme="team light">
   
        <Chat client={client} theme="team light">
          <ChannelListContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
          />
          <div className='container'>
              <div className='app-wrapper col-12'>
                <div>
                  <Header />
                  <Form 
                    input={input}
                    setInput={setInput}
                    todos={todos}
                    setTodos={setTodos}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                  />
                  <div>
                    <TodosList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
                  </div>
                  
                </div>         
              </div>      
          </div>
        </Chat>
    </div>
  );
}

export default Calendar;

