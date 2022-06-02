import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, Stack } from 'react-bootstrap';
import { useRef, useEffect, useState } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { getOnline } from '../services/users';
import { getConverationMessages, transfer } from '../services/conversations.js'

function ChatInput(props) {
  let { modals, scrollToBottom, setUpdateConvo, setUpdate, contactId } = props;

  const message = useRef("");
  const [ connection, setConnection ] = useState(null);
  //const [input, setInput]= useState("");
  // const sendMessageAndClearInput= ()=>{
  //   props.addMessage(input.current.value,props.conversation_id, 'text', contactId);
  //  setUpdateConvo()
  //   setInput(()=>"")
  // }

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7005/myHub')
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}, [props.contactId]);


useEffect(() => {
  if (connection) {
      connection.start()
          .then(result => {
              console.log('Connected!');

              connection.on('Receive', async(fromId, toId) => {
                if (props.onlineId === toId) {
                  getConverationMessages(fromId, props.onlineToken)
                }
              });
          })
          .catch(e => console.log('Connection failed: ', e));
  }
}, [connection, props.onlineId, props.onlineToken]);


const sendMessage = async () => {
  let fromId = props.onlineId;
  let toId = props.contactId;
  if (connection.connectionStarted) {
      try {
          await connection.invoke('send', fromId, toId);
      }
      catch(e) {
          console.log(e);
      }
  }
  else {
      alert('No connection to server yet.');
  }
}



  //let { modals, scrollToBottom } = props;
  return (
    <div className='message-input'>
      <>
        <Stack direction="horizontal" gap={3}>
          <Form.Control ref={message}
            className="me-auto"
            placeholder="Type your message here..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                props.addMessage(message.current.value, props.conversation_id, 'text', contactId)
                transfer(message.current.value, props.online, props.contactId) 
                sendMessage(props.onlineId, props.contactId)
                message.current.value = ""
                scrollToBottom()
                setUpdateConvo()
              }
            }}
          />
          <Button variant="secondary"
            onClick={() => {
              props.addMessage(message.current.value, props.conversation_id, 'text', contactId)
              transfer(message.current.value, props.online, props.contactId) 
              sendMessage(props.onlineId, props.contactId)
              message.current.value = ""
              scrollToBottom()
              setUpdateConvo()
            }}
          >Send</Button>
          <div className="vr" />
          <DropdownButton
            variant="outline-secondary"
            title="Attach"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item href="#" onClick={modals.showRec}>Audio</Dropdown.Item>
            <Dropdown.Item href="#" onClick={modals.showPic}>Image</Dropdown.Item>
            <Dropdown.Item href="#" onClick={modals.showVid}>Video</Dropdown.Item>
          </DropdownButton>
        </Stack>

      </>
    </div>
  );
}

export default ChatInput;