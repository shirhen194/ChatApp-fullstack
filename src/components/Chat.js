import '../App.css';
import ChatInput from './ChatInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import Messages from './Messages'
import ChatHeader from './ChatHeader';
import { useState, useRef } from 'react'
import ModalInput from './ModalInput';

function Chat(props) {
  const [rec, setShowRec] = useState(false);
  const [pic, setShowPic] = useState(false);
  const [vid, setShowVid] = useState(false);


  const modals = {
    closeRec: () => setShowRec(false),
    closePic: () => setShowPic(false),
    closeVid: () => setShowVid(false),
    showRec: () => setShowRec(true),
    showPic: () => setShowPic(true),
    showVid: () => setShowVid(true),
  }

  let { conversation_id, addMessage, conversation } = props
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className='chat-wrapper'>
      {rec && <ModalInput c_id={conversation_id} handleClose={modals.closeRec} addMessage={addMessage} rec={rec} type="recording" />}
      {pic && <ModalInput c_id={conversation_id} handleClose={modals.closePic} addMessage={addMessage} pic={pic} type="img" />}
      {vid && <ModalInput c_id={conversation_id} handleClose={modals.closeVid} addMessage={addMessage} vid={vid} type="video" />}
      <div className='chat_heder'>
        <ChatHeader
          conversation_id={conversation_id}
          conversations={props.conversations}
          online={props.online}
          conversation={conversation} />
      </div>
      <div className='chat-flow'>
        <Messages
          conversation_id={props.conversation_id}
          conversations={props.conversations}
          self={props.online.displayName}
          messagesEndRef={messagesEndRef}
          conversation={conversation}
        ></Messages>
      </div>
      <ChatInput
        addMessage={addMessage}
        conversation_id={props.conversation_id}
        modals={modals}
        scrollToBottom={scrollToBottom}
        onlineId={props.online.id}
        onlineToken={props.online.token}
        contactId={props.contactId}
        ></ChatInput>
    </div>
  );
}


export default Chat;
