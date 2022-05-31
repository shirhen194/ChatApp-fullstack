export function getContacts(token) {
  console.log(token)
    return fetch('https://localhost:7005/api/contacts',{
        method: 'GET',
        headers: {
          'Authorization': "Bearer " + token
        },
    })
    .then(data => data.json())
}
  

export function addContact(contact, token) {
    return fetch('https://localhost:7005/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
        body: JSON.stringify(contact)
      })
        .then(data => data.json())
}


export function updateContact(contact, token) {
    return fetch('https://localhost:7005/api/contacts' + contact.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
        body: JSON.stringify( contact )
      })
        .then(data => data.json())
}

export function getContact(contactId) {
    return fetch('https://localhost:7005/api/contacts/' + contactId,{
        method: 'GET',
        'Content-Type': 'application/json',
    })
    .then(data => data.json())
}

export function deleteContact(contactId, token) {
    return fetch('https://localhost:7005/api/contacts' + contactId, {
        method: 'DELETE',
        headers: {
          'Authorization': "Bearer " + token
        },
      })
        .then(data => data.json())
}