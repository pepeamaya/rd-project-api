# rd-project-api
Simple server-side application that accesses user related data through the Spotify Web API.

## Installation:
Clone the project via SSH:
```bash
git clone git@github.com:pepeamaya/rd-project-api.git
```

Or HTTPS:
```bash
git clone https://github.com/pepeamaya/rd-project-api.git
```

```bash
npm install
```

**Before run:** Set the *clientSecret* ID:
```
    const credentials = {
        clientId: '4a59a2fe9e2a47deb6c6b0ecadc3a769',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/dashboard'
}
```

### How to run:
```bash
npm start
```

## About:
* Language: JavaScript
* Framework: Node.js/Express

## License:
[MIT](https://opensource.org/licenses/mit-license.php)