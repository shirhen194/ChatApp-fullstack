import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Conversations from './Conversations';
import Chat from './Chat';
import React from 'react';
import WelcomeScreenConversation from './WelcomeScreenConversation';
import { getConveration } from '../services/conversations';
import { useState, useRef, useEffect } from 'react';
import { getContacts } from '../services/contacts';

function ChatScreen(props) {

  const [conversation, setConversation] = useState(props.conversation);
  const [updateConvo, setUpdate] = useState(false);
  const [contactId, setContactId] = useState('');
  const [conversation_id, setConversation_id] = useState(0);
  const [contacts, setContacts] = useState(props.contacts);



  const changeConversationId = async (c_id) => {
    await getConveration(c_id, props.token).then((res) => {
      setConversation(res)
      setUpdate(true)
      setContactId(c_id)
      setConversation_id(res.id)
    })
  }

  const setUpdateConvo = () => {
    // await changeConversationId(contactId)
    setUpdate(!updateConvo)
  }

  useEffect(() => {
    async function oConvos() {
      if (props.token != '' && contactId != '') {
        //service
        await getConveration(contactId, props.token).then((res) => {
          setConversation(res)
          setConversation_id(res.id)
        })
      }
    }
    oConvos()
  }, [contactId, props.token, updateConvo])


  useEffect(() => {
    async function gContacts() {
      if (props.token != '') {
        //service
        await getContacts(props.token)
          .then(contacts => {
            setContacts(contacts)
          })
      }
    }
    gContacts()
  }, [props.token, updateConvo])

  const isContact = contacts.find(contact => contact.id === contactId)

  return (
    <div className='web-chat'>
      <div className='conversations'>
        <Conversations
          changeConversationId={changeConversationId}
          contacts={contacts}
          addConversation={props.addConversation}
          editContact={props.editContact}
          deleteContact={props.deleteContact}
          setUpdateConvo={setUpdateConvo}
          conversations={props.conversations}
          conversation_id={conversation_id}
          conversation={conversation}
          online={props.online}
          setOnline={props.setOnline}
          addContact={props.addContact}
          token={props.token}
        />
      </div>
      {!isContact &&
        <div className='empty-conversation'><WelcomeScreenConversation></WelcomeScreenConversation></div>
      }
      {isContact &&
        <div className='chat'>
          <Chat
            conversation_id={conversation_id}
            conversations={props.conversations}
            addMessage={props.addMessage}
            online={props.online}
            conversation={conversation}
            contactId={contactId}
            setUpdateConvo={setUpdateConvo}
          >
          </Chat>
        </div>
      }
    </div>
  );
}

export default ChatScreen;
