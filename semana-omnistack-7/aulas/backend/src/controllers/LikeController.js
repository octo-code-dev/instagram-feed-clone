const Post = require('../models/Post');

module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();
        
        //Enviando mensagem utilizando o Socket.IO com o título 'like' para o frontend de que um novo like foi salvo. A variável post contém os dados do novo like salvo e do post. Todos os usuários conectados na aplicação receberão a informação de que mais um like foi dado no post.
        req.io.emit('like', post);

        return res.json(post);
    }
};