import '../App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { deleteContact } from '../services/contacts'
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

function Conversations(props, changeConversationId) {

  const [showA, setShowA] = useState(false)
  const [errorContact, setErrContact] = useState("")
  const [convoModal, setConvoModal] = useState(false)
  const [editContact, setEditContact] = useState(false)
  const [editContactId, setEditContactId] = useState("")

  const contactName = useRef(null)
  const contactServerName = useRef(null)
  const contactId = useRef(null)

  const toggleShowA = () => setShowA(!showA)
  const toggleConvoModal = () => setConvoModal(!convoModal)
  const toggleEditContact = (id) => {
    setEditContactId(id)
    setEditContact(!editContact)
  }

  const signOut = () => {
    props.setOnline(null)
  }

  const addContact = () => {
    //if already has
    // if (props.online.contacts.includes(contactName.current.value)) {
    //   setErrContact("You already have this contact!")
    // }
    //if same name as myself?
    // else if (props.online.displayName === contactName.current.value) {
    //   setErrContact("You can't add yourself!")
    // }
    // else if (contactName.current.value === "") {
    //   setErrContact("Please enter a name!")
    // }
    // else if (!props.users.find(u => u.displayName === contactName.current.value)) {
    //   setErrContact("This user does not exist!")
    // }
    // else {
    setErrContact("")
    props.addContact(contactName.current.value, contactId.current.value, contactServerName.current.value)
    setShowA(false)
    // }
  }

  const removeContact = async (id) => {
    await deleteContact(id, props.token)
  }

  return (
    <Container>
      <div className='top-convos'>
        <img
          className="profile-pic"
          src="cat_aviad.jpg"
          alt="profile_pic"
        />
        <div className="convo-btn" onClick={toggleConvoModal} >
          Add Conversation
        </div>
        <div className="convo-btn" onClick={toggleShowA} >
          Add Contact
        </div>
        <div className="convo-btn">
          <Link to="/" onClick={signOut} style={{
            textDecoration: 'none',
            color: 'inherit',
            fontSize: '1rem'
          }}>
            Sign Out
          </Link>
        </div>
      </div>
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-3"
            alt=""
          />
          <strong className="me-auto">New contact</strong>
        </Toast.Header>
        <Toast.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Id of contact:</Form.Label>
            <Form.Control type="id" placeholder="id of contact" ref={contactId} />
            <Form.Label>Enter friend's contact name (display name):</Form.Label>
            <Form.Control type="id" placeholder="Display name" ref={contactName} />
            <Form.Label>Server:</Form.Label>
            <Form.Control type="id" placeholder="Server" ref={contactServerName} />
          </Form.Group>
          <div className="error" style={{ color: 'red' }}>{errorContact}</div>
          <Button variant="primary" type="submit" onClick={addContact}>
            Add
          </Button>
        </Toast.Body>
      </Toast>
      <Toast show={convoModal} onClose={toggleConvoModal}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-3"
            alt=""
          />
          <strong className="me-auto">New conversation</strong>
        </Toast.Header>
        <Toast.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Label>Enter friend's contact name (display name):</Form.Label>
            <Form.Control type="id" placeholder="Display name" ref={contactName} />
          </Form.Group>
          <div className="error" style={{ color: 'red' }}>{errorContact}</div>
          <Button variant="primary" type="submit" onClick={() => {
            props.addConversation(contactName.current.value)
            contactName.current.value = ""
            toggleConvoModal(false)
          }}>
            Add
          </Button>
        </Toast.Body>
      </Toast>
      <Toast show={editContact} onClose={() => toggleEditContact(editContactId)}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-3"
            alt=""
          />
          <strong className="me-auto">Edit contact details</strong>
        </Toast.Header>
        <Toast.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="id" placeholder="Name" ref={contactName} />
            <Form.Label>Server:</Form.Label>
            <Form.Control type="id" placeholder="Server" ref={contactServerName} />
          </Form.Group>
          <div className="error" style={{ color: 'red' }}>{errorContact}</div>
          <Button variant="primary" type="submit" onClick={() => {
            props.editContact(editContactId, contactName.current.value, contactServerName.current.value)
            setEditContact(!editContact)
          }}>
            Add
          </Button>
        </Toast.Body>
      </Toast>
      <div className='conversations-flow'>
        {renderConvos()}
      </div>
    </Container>

  );

  function renderConvos() {

    if (props.conversations.length > 0 && props.contacts.length > 0) {
      return props.conversations.map(c => {
        let contact = c.users.find(c2 => c2.id !== props.online.id)
        contact = props.contacts.find(c2 => c2.id === contact.id)
        if (!contact) {
          return null
        }
        return (
          <div key={contact ? contact.name : c.id} className="convo" onClick={() => props.changeConversationId(contact.id)}>
            <img className="convos-pic" src="cat_sam.jpeg" alt="profile_pic" />
            <div className="convo-message-wrap">
              <div id="convo-name">{contact && contact.name}</div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                <div id="convo-last-message">
                  {contact && contact.last ? contact.last : "..."}
                </div>
              </div>
              <div>
              <img src="pencil.png" alt="pencil" style={{ width: '2vw', height: '4vh' }} onClick={() => toggleEditContact(contact.id)} />
              <img className="remove-img" src="trash.png" alt="Remove" style={{ width: '2vw', height: '4vh' }} onClick={() => removeContact(contact.id)} />
              </div>
            </div>
          </div>
        );
      })
    }
    else {
      return <div>Loading...</div>
    }
  }
}

export default Conversations;