const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('index')
  /*
  res.json({
    msg: "Successful GET to '/' route"
  });*/
});

router.post('/', (req, res) => {

  var info = {};

  if (req.body.recipeName){
    info['recipeName'] = req.body.recipeName;
    console.log(req.body.recipeName);
  }

  if (req.body.recipeUrl){
    info['recipeUrl'] = req.body.recipeUrl;
    console.log(req.body.recipeUrl);
  }

  res.render('index',{recipeName:info['recipeName'],recipeUrl:info['recipeUrl'],recipe:null});

  /*
  res.json({
    msg: "Successful POST to '/' route"
  });
  */
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});


module.exports = router;
