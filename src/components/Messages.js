import '../App.css';
import { useRef, useEffect, useState } from 'react'
import React from 'react';

function LeftMessage(props) {
    if (props.type === "recording") {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'> <audio src={props.content} controls /></ul>
            <ul className='LeftMessage_timeStamp'> {props.Created} </ul>
        </div>);
    } else if (props.type === "img") {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'> <img src={props.content} alt="img" style={{ width: '20vh', height: '20vh' }} /></ul>
            <ul className='LeftMessage_timeStamp'> {props.Created} </ul>
        </div>
        )
    }
    else if (props.type === "video") {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'> <video src={props.content} alt="vid" style={{ width: '50vh' }} controls /></ul>
            <ul className='LeftMessage_timeStamp'> {props.Created} </ul>
        </div>
        )
    }
    else {
        return (<div className="LeftMessageWraper">
            <ul className='LeftMessage'>{props.content}</ul>
            <ul className='LeftMessage_timeStamp'> {props.Created} </ul>
        </div>
        )
    }
}

function RightMessage(props) {
    if (props.type === "recording") {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'> <audio src={props.content} controls /></ul>
            <ul className='RightMessage_timeStamp'> {props.Created} </ul>
        </div>);
    } else if (props.type === "img") {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'> <img src={props.content} style={{ width: '20vh', height: '20vh' }} alt="img" /></ul>
            <ul className='RightMessage_timeStamp'> {props.Created} </ul>
        </div>
        )
    } else if (props.type === "video") {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'> <video src={props.content} alt="vid" style={{ width: '50vh' }} controls /></ul>
            <ul className='RightMessage_timeStamp'> {props.Created} </ul>
        </div>
        )
    }
    else {
        return (<div className="RightMessageWraper">
            <ul className='RightMessage'>{props.content}</ul>
            <ul className='RightMessage_timeStamp'> {props.Created} </ul>
        </div>)
    }
}

const Messages = React.forwardRef((props, ref) => {
    const createMessage = function (self, user, content, key, type, Created) {
        if (self == user)
            return <RightMessage key={key} content={content} type={type} Created={Created} />
        else
            return <LeftMessage key={key} content={content} type={type} Created={Created} />
    }
    // props.setUpdateConvo()
    let messages = props.conversation.messages;

    const {messagesEndRef} = props;
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages, messagesEndRef]);

    return (
        <div>
            {props.conversation.messages.map(({ author, type, content, created }, index) => createMessage(props.self, author.id, content, index, type, created))}
            <div ref={messagesEndRef} style={{height: '8px'}} />
        </div>

    );

})
export default Messages;
