import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import ChatScreen from './components/ChatScreen';
import SignIn from './components/SignIn';
import React from 'react';
import { useState, useEffect } from 'react';
import conversations from './services/dummyConversations.js';
// import { useStateValue } from './state';
// import { auth } from './firebase';
// import { useHistory } from 'react-router-dom';
// import { useUser } from './hooks/useUser';
import users from './services/dummyUsers.js';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: users,
      conversations: conversations,
      online: "",
    }
    this.addMessage = this.addMessage.bind(this)
  }

  componentDidMount = async () => {
    let forcast = await fetch("https://localhost:5095/WeatherForecast")
    let data = await forcast.json()
    console.log(data);
  }

  // componentDidMount = () => {
  //   this.setState({
  //     online: this.state.users[0]
  // })


    // add message to the array of messages to the right conversation.
    addMessage = function (message, c_id, type) {
      // TODO: change c_index to find the right index by c_id
      //TODO: add user information to new message
      //time and date stamp
      let timeStamp = new Date().toLocaleTimeString()
      let timeWithootSeconds = timeStamp.substring(0, timeStamp.length - 3)
      let dateStamp = new Date().toLocaleDateString()
      let dateWithootYear = dateStamp.substring(0, dateStamp.length - 5)
      let c_index = c_id;
      let conversations = [...this.state.conversations];
      let new_message = {
        user: this.state.online.displayName,
        type: type, content: message,
        timeStamp: timeWithootSeconds + " " + dateWithootYear
      }
      if (c_index !== -1 && new_message.content !== '') {
        let updated_conversation = {
          ...conversations[c_index],
          messages: [...conversations[c_index].messages, new_message]
        }
        conversations[c_index] = updated_conversation
        this.setState({ conversations })
      }
      else {
        console.log("A bug occured! Trying to add a message to an undefined conversation!")
      }
    }

    setOnline = (user) => {
      let userObj = this.state.users.find(u => u.userName === user)
      this.setState({
        online: userObj
      })
    }

    addUser = (user) => {
      let newUsers = [...this.state.users, user]
      this.setState({
        users: newUsers
      })
    }

    addConversation = (otherUserName) => {
      let newUsers = [...this.state.users].map((u) => {
        if (u.displayName === this.state.online.displayName) {
          u.contacts.push(otherUserName)
        }
        else if (u.displayName === otherUserName) {
          u.contacts.push(this.state.online.displayName)
        }
        return u
      })
      let otherUser = newUsers.find(u => u.displayName === otherUserName)
      let newConversations = [...this.state.conversations, {
        users: [this.state.online.userName, otherUser.userName],
        id: this.state.conversations.at(-1).id + 1,
        messages: []
      }]
      this.setState({
        users: newUsers,
        conversations: newConversations
      })
    }

    render() {
      return (
        <BrowserRouter>
          <Routes>
            {/* Routes go here v */}
            <Route path="/" element={
              <SignIn
                users={this.state.users}
                setOnline={this.setOnline}
              />}>
            </Route>
            {!this.state.online && <Route path="/chat" element={
              <SignIn
                users={this.state.users}
                setOnline={this.setOnline}
              />}>
            </Route>}
            {this.state.online && <Route path="/chat" element={
              <ChatScreen
                users={this.state.users}
                online={this.state.online}
                conversations={this.state.conversations}
                setOnline={this.setOnline}
                addConversation={this.addConversation}
                addMessage={this.addMessage}
              />}>
            </Route>}
            <Route path="/register" element={
              <Register
                addUser={this.addUser}
                users={this.state.users}
                setOnline={this.setOnline}
              />}>
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }
  }
export default App;