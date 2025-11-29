const https = require('https');

const url = 'https://script.google.com/macros/s/AKfycbzPyIyRJOaDM-NBt6PXyqkVibelo6pTK7AX3dCrOTj3DNbAZaiTxuy39JYawWI3p5pn/exec';

https.get(url, (res) => {
  if (res.statusCode === 302 || res.statusCode === 301) {
    // Handle redirect
    https.get(res.headers.location, (res2) => {
      let data = '';
      res2.on('data', (chunk) => { data += chunk; });
      res2.on('end', () => { console.log(data); });
    });
  } else {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => { console.log(data); });
  }
}).on('error', (e) => {
  console.error(e);
});
