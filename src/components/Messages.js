import '../App.css';
import { useRef, useEffect } from 'react'
import React from 'react';

function LeftMessage(props) {
    if (props.type === "recording") {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'> <audio src={props.content} controls /></ul>
            <ul className='LeftMessage_timeStamp'> {props.timeStamp} </ul>
        </div>);
    } else if (props.type === "img") {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'> <img src={props.content} alt="img" style={{ width: '20vh', height: '20vh' }} /></ul>
            <ul className='LeftMessage_timeStamp'> {props.timeStamp} </ul>
        </div>
        )
    }
    else if (props.type === "video") {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'> <video src={props.content} alt="vid" style={{ width: '50vh' }} controls /></ul>
            <ul className='LeftMessage_timeStamp'> {props.timeStamp} </ul>
        </div>
        )
    }
    else {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'>{props.content}</ul>
            <ul className='LeftMessage_timeStamp'> {props.timeStamp} </ul>
        </div>
        )
    }
}

function RightMessage(props) {
    if (props.type === "recording") {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'> <audio src={props.content} controls /></ul>
            <ul className='RightMessage_timeStamp'> {props.timeStamp} </ul>
        </div>);
    } else if (props.type === "img") {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'> <img src={props.content} style={{ width: '20vh', height: '20vh' }} alt="img" /></ul>
            <ul className='RightMessage_timeStamp'> {props.timeStamp} </ul>
        </div>
        )
    } else if (props.type === "video") {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'> <video src={props.content} alt="vid" style={{ width: '50vh' }} controls /></ul>
            <ul className='RightMessage_timeStamp'> {props.timeStamp} </ul>
        </div>
        )
    }
    else {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'>{props.content}</ul>
            <ul className='RightMessage_timeStamp'> {props.timeStamp} </ul>
        </div>)
    }
}

const Messages = React.forwardRef((props, ref) => {
    const createMessage = function (self, user, content, key, type, timeStamp) {
        if (self == user)
            return <RightMessage key={key} content={content} type={type} timeStamp={timeStamp} />
        else
            return <LeftMessage key={key} content={content} type={type} timeStamp={timeStamp} />
    }

    const messages = props.conversation.messages;
    const {messagesEndRef} = props;
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages, messagesEndRef]);

    return (
        <div>
            {props.conversation.messages.map(({ user, type, content, timeStamp }, index) => createMessage(props.self, user, content, index, type, timeStamp))}
            <div ref={messagesEndRef} style={{height: '8px'}} />
        </div>

    );

})
export default Messages;
