const express = require('express')

const userService = require('../services/userPostsService')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const response = await userService.getUser()
        console.log(response.data);
        res.json(response.data.slice(0, 10));
    } catch (error) {
        res.status(500).send('Erreur de serveur');
    }
})

//Récupérer un utilisateur et ses posts
router.get('/:id/posts', async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId);
      const userResponse = await userService.getUserId(userId);
      const postsResponse = await userService.getPosts();
      const userPosts = postsResponse.data.filter(post => post.userId == userId);
      console.log(userPosts);
      res.json({ user: userResponse.data, posts: userPosts });
    } catch (error) {
      res.status(500).send('Erreur de serveur');
    }
  });
  


module.exports = router
