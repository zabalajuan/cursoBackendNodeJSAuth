const jwt = require('jsonwebtoken');

const secret = 'miSecreto';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwMzUzMjAzOX0.H7KdapAnKFqLdCBJB8IR6W3f1S3342vY4oNBpm0Sx7Q';

function verifyToken(token, secret){
    return jwt.verify(token, secret);    
}

const payload = verifyToken(token, secret);
console.log(payload);