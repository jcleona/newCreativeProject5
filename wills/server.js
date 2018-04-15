// Express Setup //
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup //
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

// Login //

app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,city: user.city, state:user.state, stateAbbr: user.stateAbbr, id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// Users //

app.post('/api/users', (req, res) => {
  console.log('in post for register: ', req.body.username);
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username, 
      address:req.body.address, state:req.body.state, city:req.body.city, stateAbbr:req.body.stateAbbr, name:req.body.name, role: 'user'});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','name','id', 'city', 'state', 'stateAbbr');
  }).then(user => {
    console.log('end of register in server - user: ', user);
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.get('/api/wills/:id/wills', (req, res) => {
  let id = parseInt(req.params.id);
  console.log('in app.get /api/wills/:id/wills in server.js with id: ', id);
  knex('users').join('wills','users.id','wills.user_id')
    .where('users.id',id)
    .orderBy('title','desc')
    .select('title','wills.id').then(wills => {
    res.status(200).json({wills:wills});
    console.log('returned from app.get wills with wills: ', wills);
  }).catch(error => {
    res.status(500).json({ error });
    console.log('returned from app.get wills with error: ');
  });
});

app.get('/api/wills/:id', (req, res) => {
  let id = parseInt(req.params.id);
  // get user record
  knex('wills').where('id',id).first().select('title','beneficiary','executor').then(will => {
    res.status(200).json({will:will});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.post('/api/users/:id/wills', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('wills').insert({user_id: id, title:req.body.title, beneficiary:req.body.beneficiary, executor:req.body.executor});
  }).then(ids => {
    return knex('wills').where('id',ids[0]).first();
  }).then(will => {
    res.status(200).json({will:will});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.delete('/api/wills/:id', (req, res) => {
  let id = parseInt(req.params.id);
  console.log('in app.delete', id);
  knex('wills').where('id',id).first().then(user => {
    return knex('wills').where({'id':id,}).first().del();
  }).then(wills => {
    res.sendStatus(200);    
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
