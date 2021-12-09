const express = require('express');

//Importando Multer para que seja possível o upload de arquivos
const multer = require('multer');

//Definindo constante que armazena os dados do arquivo upload.js, que contém o objeto responsável por salvar as imagens em disco
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;