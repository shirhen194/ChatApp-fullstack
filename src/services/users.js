export function getOnline() {
    return fetch('https://localhost:7005/api/Online')
      .then(data => data.json())
}

export function login(username, password) {
  return fetch('https://localhost:7005/api/User/?userName=' + username + "&password=" + password, {
    method: 'POST'
  })
    .then(data => data.json())
}

export function register(username, password) {
    return fetch('https://localhost:7005/api/User/?userName=' + username + "&password=" + password, {
        method: 'PUT'
      })
        .then(data => data.json())
}

export function getUserById(id, token) {
    return fetch('https://localhost:7005/api/User/' + id, {
        method: 'GET',
        headers: {
          'Authorization': "Bearer " + token
        }
    })
      .then(data => {
        console.log(data)
        return data.json()
      })
}