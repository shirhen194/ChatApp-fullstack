import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Conversations from './Conversations';
import Chat from './Chat';
import React from 'react';
import WelcomeScreenConversation from './WelcomeScreenConversation';
import { getConveration } from '../services/conversations';

class ChatScreen extends React.Component {

  constructor() {
    super()
    this.state = { conversation_id: 0, conversation: {}, contactId: '', update: false }
    this.changeConversationId = this.changeConversationId.bind(this)
  }

  changeConversationId = async (c_id) => {
    await getConveration(c_id, this.props.token).then((res) => {
      this.setState({ conversation_id: res.id, conversation: res, contactId: c_id })
    })
  }

  setUpdateConvo  = async () => {
    await this.changeConversationId(this.state.contactId)
  }

  getConveration = () => {
    return this.state.conversation
  }

  render() {
    return (
      <div className='web-chat'>
        <div className='conversations'><Conversations changeConversationId={this.changeConversationId} {...this.props} /></div>
        {this.state.conversation_id == 0 &&
          <div className='empty-conversation'><WelcomeScreenConversation></WelcomeScreenConversation></div>
        }
        {this.state.conversation_id !== 0 &&
          <div className='chat'>
            <Chat
              conversation_id={this.state.conversation_id}
              conversations={this.props.conversations}
              addMessage={this.props.addMessage}
              online={this.props.online}
              conversation={this.state.conversation}
              contactId={this.state.contactId}
              setUpdateConvo={this.setUpdateConvo}
              getConveration={this.getConveration}
            >
            </Chat>
          </div>
        }
      </div>
    );
  }
}

export default ChatScreen;
