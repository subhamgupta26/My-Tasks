var express = require('express');
var router = express.Router();

// var _ = require('underscore');

var userService = new (require('../service/userService.js')).userService();
var taskService = new (require('../service/taskService.js')).taskService();


/* GET users listing. */

router.get('/', function(req, res, next) {

  userService.getUsers(function(err, users) {
    if (err) {
      console.log(err);
      return res.status(500).send('There was a problem finding the users.');
    }
    res.status(200).send(users);
  });
});

router.get('/:userId/tasks', function(req, res, next) {

  userService.getUserById(req.params.userId, function(err, user) {
    if (err) {
      return res.status(500).send('There was a problem finding the user.');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    taskService.getTasksFromIds(user.tasks, function(err, tasks) {
      if (err) {
        return res.status(500).send('There was a problem finding the product.');
      }
      if (!tasks) {
        return res.status(404).send('No product found.');
      }
      res.status(200).send({ response: tasks });
    });
  });
});

router.put('/:userId/addTask', function(req, res, next) {
  console.log('inside user update cart');

  userService.getUserById(req.params.userId, function(err,user){
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: 'There was a problem finding the user.' });
    }
    if (!user) {
      return res.status(404).send({ message: 'No user found.' });
    }
    if (user.tasks.indexOf(req.body.id) > -1) {
      return res
        .status(400)
        .send({ message: 'This product is already in cart.' });
    }
    taskService.addTask(req.body.name, req.body.type, req.body.description, req.body.checkboxes, function(err, task) {
      if (err) {
        return res.status(500).send('There was a problem adding the task.');
      }
      if (!task) {
        return res.status(404).send('cannot add task');
      }
          
    user.tasks.push(task._id);    

    userService.updateUser(user.id, user ,function(err, user){
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: 'There was a problem updating the cart.' });
      }
      if (!user) {
        return res.status(404).send({ message: 'Updation failed' });
      }
      res.status(200).send({ message: 'Update Successful!!' });      
    });
  });
  });
});


router.get('/current', function(req, res, next) {

  userService.getUserById(req.userId, function(err, user){
        if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: 'There was a problem finding the user.' });
    }
    if (!user) {
      return res.status(404).send({ message: 'No user found.' });
    }
    res.status(200).send(user);
  });
});

router.put('/:userId/removeTask', function(req, res, next) {
  console.log('inside user update cart');

  userService.getUserById(req.params.userId, function(err,user){
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: 'There was a problem finding the user.' });
    }
    if (!user) {
      return res.status(404).send({ message: 'No user found.' });
    }
    if (user.tasks.indexOf(req.body.id) < -1) {
      return res
        .status(400)
        .send({ message: 'This product is not in the cart.' });
    }
    taskService.removeTask(req.body._id, function(err, task) {
      if (err) {
        return res.status(500).send('There was a deleting adding the task.');
      }
      if (!task) {
        return res.status(404).send('cannot delete task');
      }
          
    // user.tasks.pop(req.body._id);  
    for( var i = 0; i < user.tasks.length-1; i++){ 
      if ( user.tasks[i] === req.body._id) {
        arr.splice(i, 1); 
      }
   }  

    userService.updateUser(user.id, user ,function(err, user){
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: 'There was a problem updating the task.' });
      }
      if (!user) {
        return res.status(404).send({ message: 'Updation failed' });
      }
      res.status(200).send({ message: 'Update Successful!!' });      
    });
  });
  });
});

module.exports = router;
