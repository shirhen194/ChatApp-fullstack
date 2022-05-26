
    
function ChatHeader(props){
    const conversation_mates = props.conversations[props.conversation_id].users;
    let friend_name="";
    if (conversation_mates[0] == props.online.userName){
        friend_name = conversation_mates[1];
    }
    else{
        friend_name=conversation_mates[0];
    }
    var index = props.users.findIndex(p => p.userName == friend_name);
    const friend_display_name = props.users[index].displayName;
    //const friend_display_name = props.users.findIndex(p => p.userName == friend_name).displayName;
    return(
        <div>
            <img className='chat-header-img' src={props.users[index].pic} alt=""/>
            {friend_display_name}
        </div>
    );
}
export default ChatHeader;