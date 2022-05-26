export function getOnline() {
    return fetch('http://localhost:3333/Online')
      .then(data => data.json())
}


export function getContacts() {
    return fetch('http://localhost:3333/Contacts')
      .then(data => data.json()).catch(err => console.log(err))
}
