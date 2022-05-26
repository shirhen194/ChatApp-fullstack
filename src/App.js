import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import ChatScreen from './components/ChatScreen';
import SignIn from './components/SignIn';
import React from 'react';
import { useState, useEffect } from 'react';
import dummyConversations from './services/dummyConversations.js';
import dummyUsers from './services/dummyUsers.js';
import { getOnline, setOnline as setOnlineServer} from './services/online.js'
function App() {

  const [users, setUsers] = useState(dummyUsers);
  const [online, setStateOnline] = useState('');
  const [conversations, setConversations] = useState(dummyConversations);


  useEffect(() => {
    let mounted = true;
    getOnline()
      .then(online => {
        if(mounted) {
          setStateOnline(online)
        }
      })
    return () => mounted = false;
  }, [])
  // addMessage = addMessage.bind(this)

  // componentDidMount = async () => {
  //   let forcast = await fetch("https://localhost:5095/WeatherForecast")
  //   let data = await forcast.json()
  //   console.log(data);
  // }

  // componentDidMount = () => {
  //   this.setState({
  //     online: users[0]
  // })


  // add message to the array of messages to the right conversation.
  const addMessage = (message, c_id, type) => {
    // TODO: change c_index to find the right index by c_id
    //TODO: add user information to new message
    //time and date stamp
    let timeStamp = new Date().toLocaleTimeString()
    let timeWithootSeconds = timeStamp.substring(0, timeStamp.length - 3)
    let dateStamp = new Date().toLocaleDateString()
    let dateWithootYear = dateStamp.substring(0, dateStamp.length - 5)
    let c_index = c_id;
    let conversationsCopy = [...conversations];
    let new_message = {
      user: online.displayName,
      type: type, content: message,
      timeStamp: timeWithootSeconds + " " + dateWithootYear
    }
    if (c_index !== -1 && new_message.content !== '') {
      let updated_conversation = {
        ...conversationsCopy[c_index],
        messages: [...conversationsCopy[c_index].messages, new_message]
      }
      conversationsCopy[c_index] = updated_conversation
      setConversations(conversationsCopy)
    }
    else {
      console.log("A bug occured! Trying to add a message to an undefined conversation!")
    }
  }

  const setOnline = (user) => {
    let userObj = users.find(u => u.userName === user)
    setOnlineServer(userObj)
    setStateOnline(userObj)
  }

  const addUser = (user) => {
    let newUsers = [...users, user]
    setUsers(newUsers)
  }

  const addConversation = (otherUserName) => {
    let newUsers = [...users].map((u) => {
      if (u.displayName === online.displayName) {
        u.contacts.push(otherUserName)
      }
      else if (u.displayName === otherUserName) {
        u.contacts.push(online.displayName)
      }
      return u
    })
    let otherUser = newUsers.find(u => u.displayName === otherUserName)
    let newConversations = [...conversations, {
      users: [online.userName, otherUser.userName],
      id: conversations.at(-1).id + 1,
      messages: []
    }]
    setUsers(newUsers)
    setConversations(newConversations)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes go here v */}
        <Route path="/" element={
          <SignIn
            users={users}
            setOnline={setOnline}
          />}>
        </Route>
        {!online && <Route path="/chat" element={
          <SignIn
            users={users}
            setOnline={setOnline}
          />}>
        </Route>}
        {online && <Route path="/chat" element={
          <ChatScreen
            users={users}
            online={online}
            conversations={conversations}
            setOnline={setOnline}
            addConversation={addConversation}
            addMessage={addMessage}
          />}>
        </Route>}
        <Route path="/register" element={
          <Register
            addUser={addUser}
            users={users}
            setOnline={setOnline}
          />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;