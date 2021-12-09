const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

//O que está entre chaves é um objeto que conterá os métodos do controller
module.exports = {
    async index(req, res){

        //o símbolo de menos (-) é para ordernar em ordem decrescente
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`

        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )

        //Deleta a imagem original
        fs.unlinkSync(req.file.path);

        //Salva post no banco de dados
        const post =  await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //Enviando mensagem utilizando o Socket.IO com o título 'post' para o frontend de que um novo post foi salvo. A variável post contém os dados do novo post salvo. Todos os usuários conectados na aplicação receberão a informação de que há um novo post.
        req.io.emit('post', post);

        return res.json(post);
    },
};