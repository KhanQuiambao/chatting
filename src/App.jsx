import React, { useState } from 'react'
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import ChatBox from './Chatbox';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Auth } from './components';
import Calendar from './components/Calendar';
import './app.css';
import 'stream-chat-react/dist/css/v2/index.css';

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

const App = () => {



  if(!authToken) return <Auth />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChatBox></ChatBox>}></Route>
          <Route path='/checklist' element={<Calendar></Calendar>}></Route>
        </Routes>
      </BrowserRouter>
    </>
    // <div className="app__wrapper" theme="team light">
    //     {/* <ChatBox></ChatBox> */}
    //     {/* <Calendar></Calendar> */}
    // </div>
  );
}

export default App;

