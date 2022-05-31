export function getOnline() {
  return fetch('https://localhost:7005/api/Online')
    .then(data => data.json())
}

export function login(username, password) {
  return fetch('https://localhost:7005/api/User/login', {
    method: 'POST',
    headers: {
      'Login-userName': username,
      'Login-password': password
    }
  })
    .then(data => data.json())
}

export function register(username, password) {
  return fetch('https://localhost:7005/api/User/register', {
    method: 'POST',
    headers: {
      'Register-userName': username,
      'Register-password': password
    }
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
      return data.json()
    })
}