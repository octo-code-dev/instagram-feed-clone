// O arquivo index.js é o ponto de entrada na nossa aplicação. Nele realizamos a importação das dependências que vamos utilizar

// Criando uma constante com o nome de express, que possuirá todas as funcionalidades que o express permite utilizar
const express = require('express');

const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Criando uma constante chamada app que recebe a invocação da função express, que cria um servidor que acessaremos posteriormente através do navegador
const app = express();

// Configurando o servidor para aceitar conexões HTTP e WebSocket
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Conexão com o banco de dados em nuvem
mongoose.connect('mongodb+srv://semana:semana@cluster0-hdb1u.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// Criando middleware disponível para toda a aplicação para que toda requisição/rota possa
// utilizar o protocolo WebSocket. O parâmetro next serve para que as requisições seguintes
// a esta também sejam executadas.
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Permitindo que todos os endereços (URLs) de diferentes IP/servidores possam acessar o backend da aplicação. Sem isso, o React não conseguiria acessar o backend da aplicação
app.use(cors());

// Criando rota para acessar os arquivos estáticos (imagens que fizemos o upload)
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Criando um arquivo separado de rotas para declarar as rotas da aplicação
app.use(require('./routes'));

//
server.listen(3333);
