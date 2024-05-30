const express = require('express')

const userService = require('../services/userPostsService')
const router = express.Router()
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'public/images' });

//Récupérer et enregistrer les posts dans data.json
router.post('/', async (req, res) => {
  try {
    const response = await userService.getPosts();
    const posts = response.data.slice(0, 10);
    fs.writeFile('data.json', JSON.stringify(posts, null, 2), (err) => {
      if (err) return res.status(500).send('Err');
      res.send('Posts enrgst dans data.json');
    });
  } catch (error) {
    res.status(500).send('Erreur de serveur');
  }
});


//Récupérer les posts depuis data.json
router.get('/allposts', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Err');
    res.json(JSON.parse(data));
  });
});


//Récupérer un post spécifique depuis data.json
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Err');
    const posts = JSON.parse(data);
    const post = posts.find(p => p.id == postId);
    if (!post) return res.status(404).send('err post non trouvé');
    res.json(post);
  });
});

//Créer un fichier dans le dossier public/images
router.post('/files', upload.single('file'), (req, res) => {
  res.send('succès');
});

module.exports = router
