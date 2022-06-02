export function sendMessage(message, contactId, token) {
  return fetch('https://localhost:7005/api/contacts/' + contactId + '/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(message)
  })
    .then(data => data.json())
}

export function getConverationMessages(contactId, token) {
  return fetch('https://localhost:7005/api/contacts/' + contactId + '/messages', {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + token
    },
  })
    .then(data => data.json())
}

export function getConveration(contactId, token) {
  return fetch('https://localhost:7005/api/Conversation/' + contactId, {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + token
    },
  })
    .then(data => data.json())
}

export function getMessage(contactId, messageId, token) {
  return fetch('https://localhost:7005/api/contacts/' + contactId + '/messages/' + messageId, {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + token
    },
  })
    .then(data => data.json())
}

export function updateMessage(message, contactId, messageId, token) {
  return fetch('https://localhost:7005/api/contacts/' + contactId + '/messages/' + messageId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(message)
  })
    .then(data => data.json())
}



export function deleteMessage(contactId, messageId, token) {
  return fetch('https://localhost:7005/api/contacts/' + contactId + '/messages/' + messageId, {
    method: 'DELETE',
    headers: {
      'Authorization': "Bearer " + token
    },
  })
    .then(data => data.json())
}


export function conversationInvitation(invitation, token) {
  return fetch('https://localhost:7005/api/invitations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(invitation)
  })
    .then(data => data.json()).catch((err) => err)
}


export function transfer(message, token) {
  return fetch('https://localhost:7005/api/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(message)
  })
    .then(data => data.json())
}

export function getAllOnlineConversations(token) {
  return fetch('https://localhost:7005/api/Conversation', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  })
    .then(data => data.json())
}