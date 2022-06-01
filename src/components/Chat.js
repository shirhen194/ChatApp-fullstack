import '../App.css';
import ChatInput from './ChatInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import Messages from './Messages'
import ChatHeader from './ChatHeader';
import { useState, useRef, useEffect } from 'react'
import ModalInput from './ModalInput';
import { getConveration } from '../services/conversations'

function Chat(props) {
  const [rec, setShowRec] = useState(false);
  const [pic, setShowPic] = useState(false);
  const [vid, setShowVid] = useState(false);
  const [conversation, setConversation] = useState(props.conversation);
  const [updateConvo, setUpdateConvo] = useState(false);

  const modals = {
    closeRec: () => setShowRec(false),
    closePic: () => setShowPic(false),
    closeVid: () => setShowVid(false),
    showRec: () => setShowRec(true),
    showPic: () => setShowPic(true),
    showVid: () => setShowVid(true),
  }

  let { conversation_id, addMessage, online, contactId } = props
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function oConvos() {
      if (online) {
        
        //service
        await getConveration(contactId, props.online.token).then((res) => {
          setConversation(res)
          // console.log("conversation_id")
          // console.log(res.messages)
        })
      }
    }
    oConvos()
  }, [contactId, conversation_id, online, props, props.conversations, updateConvo])
  // console.log(conversation)
  // console.log(conversation.messages)
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
          setUpdateConvo={() => {
            props.setUpdateConvo()
            setUpdateConvo(!updateConvo)
          }}
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
        setUpdateConvo={() => {
          props.setUpdateConvo()
          setUpdateConvo(!updateConvo)
        }}
      ></ChatInput>
    </div>
  );
}


export default Chat;
