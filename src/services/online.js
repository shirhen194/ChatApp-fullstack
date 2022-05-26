export function setOnline(item) {
  return fetch('http://localhost:3333/Online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
 }

 export function getOnline() {
  return fetch('http://localhost:3333/Online')
    .then(data => data.json())
}
