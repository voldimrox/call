// index.js

// Variável para armazenar a última informação recebida via HTTP POST
let lastData = '';

// Configuração do servidor HTTP
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convertendo o corpo da requisição para uma string
    });
    req.on('end', () => {
      lastData = body; // Armazenando a última informação recebida
      console.log('Mensagem recebida via HTTP POST:', lastData); // Gerando um log da mensagem recebida
      res.end(); // Respondendo à solicitação POST
    });
  } else if (req.method === 'GET') {
    console.log('Solicitação HTTP GET recebida');
    res.setHeader('Content-Type', 'text/plain');
    res.end(lastData); // Respondendo à solicitação GET com a última informação recebida via POST
  }
});

// Definindo a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Iniciando o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
