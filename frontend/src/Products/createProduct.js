import fetch from 'isomorphic-fetch';

export function createProduct(data) {
return fetch('localhost:8081/products', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
        console.log(response);
        window.location.reload();
      } else {
       console.log('Somthing happened wrong');
      }
}).catch(err => console.log(err));
}