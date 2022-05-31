
    
function ChatHeader(props){
    const conversation_mates = props.conversation.users;
    let friend_name="";
    let friendId = ""
    if (conversation_mates[0].id == props.online.id){
        friendId = conversation_mates[1].id;
        let friend = conversation_mates[0].contacts.find(p => p.id == friendId);
        if (friend != null){
            friend_name = friend.name;
        }
    }
    else{
        friendId=conversation_mates[0].id;
        let friend = conversation_mates[1].contacts.find(p => p.id == friendId);
        if (friend != null){
            friend_name = friend.name;
        }
    }


    return(
        <div>
            <img className='chat-header-img' src="cat_sam.jpeg" alt=""/>
            {friend_name}
        </div>
    );
}
export default ChatHeader;