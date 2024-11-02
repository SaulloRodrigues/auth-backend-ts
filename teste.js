import jwt from 'jsonwebtoken';

const secretKey = '123'; // Utilize a mesma chave que seu middleware
const payload = {
    id: crypto.randomUUID(), // ID do usuário
    email: "saullorodriguesfelipe015@gmail.com",
    name: "Saullo Rodrigues",  // Nome do usuário
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expiração em 1 dia
};

const token = jwt.sign(payload, secretKey);
console.log(token); 