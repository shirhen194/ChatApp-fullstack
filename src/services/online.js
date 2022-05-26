export function setOnline() {
    return fetch('http://localhost:3333/Online')
      .then(data => data.json())
}

