import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import ChatScreen from './components/ChatScreen';
import SignIn from './components/SignIn';
import React from 'react';
import { useState, useEffect } from 'react';
import dummyConversations from './services/dummyConversations.js';
import dummyUsers from './services/dummyUsers.js';
import { getOnline, setOnline as setOnlineServer } from './services/online.js'
import { getConveration, getAllOnlineConversations, sendMessage, conversationInvitation } from './services/conversations.js'
import { addContact, updateContact, getContacts } from './services/contacts.js'
import { register, getUserById } from './services/users.js'


function App() {

  // const [users, setUsers] = useState(dummyUsers);
  const [online, setStateOnline] = useState({id:'s'});
  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [token, setToken] = useState("");
  // const [onlineContacts, setContacts] = useState(dummyUsers);

  // useEffect(() => {
  //   let mounted = true;
  //   getOnline()
  //     .then(onlineNow => {
  //       if(mounted) {
  //         setStateOnline(onlineNow)
  //       }
  //     })
  //   return () => mounted = false;
  // }, [online])

  // useEffect(() => {
  //   let mounted = true;
  //   getAllOnlineConversations(token)
  //     .then(convos => {
  //       if(mounted) {
  //         setConversations(convos)
  //         console.log("setConversations")
  //         // setShouldUpdate(false)
  //       }
  //     })
  //   return () => mounted = false;
  // }, [shouldUpdate])


    useEffect(() => {
    // let mounted = true;

    async function oConvos() {
    if (token != '') {
      //service
    getAllOnlineConversations(token)
      .then(convos => {
        // if(mounted) {
          setConversations(convos)                                       
          // setShouldUpdate(false)
        // }
      })
    }}
    oConvos()
  }, [token])

  useEffect(() => {
    // let mounted = true;
    async function gContacts() {
    if (token != '') {
      //service
      await getContacts(token)
        .then(contacts => {
          // if(mounted) {
          setContacts(contacts)
          // console.log(contacts)
          // setShouldUpdate(false)
          // }
        })
    }}
    gContacts()
    // return () => mounted = false;
  }, [token, shouldUpdate])


  // componentDidMount = async () => {
  //   let forcast = await fetch("https://localhost:5095/WeatherForecast")
  //   let data = await forcast.json()
  //   console.log(data);
  // }


  // let onlineUsers = users.filter(user => online.includes(user.id))


  // add message to the array of messages to the right conversation.
  const addMessage = async (message, c_id, type) => {
    // TODO: change c_index to find the right index by c_id
    //TODO: add user information to new message
    //time and date stamp
    let Created = new Date().toLocaleTimeString()
    let timeWithootSeconds = Created.substring(0, Created.length - 3)
    let dateStamp = new Date().toLocaleDateString()
    let dateWithootYear = dateStamp.substring(0, dateStamp.length - 5)
    let c_index = c_id;
    // let to = conversations[c_index].find(user => user.id !== localStorage.getItem('userId'))
    let new_message = {
      Author: online,
      Type: type,
      Content: message,
      // Created: timeWithootSeconds + " " + dateWithootYear,
      ConversationId: c_id + ""
    }
    if (c_index !== -1 && new_message.content !== '') {
      await sendMessage(new_message, online.id, token);
      setShouldUpdate(!shouldUpdate);
      await getAllOnlineConversations(token)
        .then(convos => {
          setConversations(convos)
        })
    }
    else {
      console.log("A bug occured! Trying to add a message to an undefined conversation!")
    }
  }

  const setOnline = async (userId) => {
    let userObj;
    //service call to get user object
    await getUserById(userId).then(user => {
      userObj = user;
    })
    // setOnlineServer(userObj)
    //service
    await setOnlineServer(userObj)
      .then(() => {
        setStateOnline(userObj);
      })
    setShouldUpdate(!shouldUpdate);
  }


  const addContactByName = async (name, contactId, server) => {
    //service
    if(name !== '' && contactId !== '' && token != '') {
    await addContact({ Id: contactId, Name: name, Server: "https://localhost:7005" }, token)
    //!!!TODO: add functionality to add if contact is not a user?!
    setShouldUpdate(!shouldUpdate);
    }
  }

  const addConversation = async (contactName) => {
    let contact = contacts.find(c => c.name === contactName)
    // let user = users.find(u => u.id === localStorage.getItem('userId'))
    await conversationInvitation({ from: online.id, to: contact.id, server: "https://localhost:7005" }, token)
    setShouldUpdate(!shouldUpdate)
  }

  const editContact = async (editContactId, contactName, contactServerName) => {
    let contact = { id: editContactId }
    if (contactName) {
      contact.name = contactName
    } else {
      contact.name = ""
    }
    if (contactServerName) {
      contact.server = contactServerName
    } else {
      contact.server = ""
    }
    
    
    await updateContact(contact, token).then(() => setShouldUpdate(!shouldUpdate))
    setShouldUpdate(!shouldUpdate)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes go here v */}
        <Route path="/" element={
          <SignIn
            setOnline={setOnline}
            setToken={setToken}
            setStateOnline={setStateOnline}
          />}>
        </Route>
        {!online && <Route path="/chat" element={
          <SignIn
            setOnline={setOnline}
            token={token}
          />}>
        </Route>}
        {online && <Route path="/chat" element={
          <ChatScreen
            online={online}
            conversations={conversations}
            setOnline={setOnline}
            addConversation={addConversation}
            addContact={addContactByName}
            addMessage={addMessage}
            editContact={editContact}
            token={token}
            contacts={contacts}
          />}>
        </Route>}
        <Route path="/register" element={
          <Register
            setOnline={setOnline}
          />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;