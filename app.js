const express = require('express');
const yargs = require('yargs');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Task = require('./models/task');

const app = express();

const PORT = process.env.PORT || 3000;

const mongoURI = "mongodb+srv://upanshu:sinewave@tasks-app.yk0zv.mongodb.net/Tasks-app?retryWrites=true&w=majority"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log(chalk.bgGreen.black("    Connected to mongoDB      ")))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(chalk.bgCyanBright.black(`Server listening on port ${PORT} `));
})

let command = yargs.argv._[0];
let description = yargs.argv.desc;

switch(command) {
  case 'add':
    const task = new Task({
      description: description 
    });

    task.save()
      .then((result) => {
        console.log(chalk.yellowBright(`New Task "${description}" Created`));
      })
      .catch((err) => {
        console.log(err);
      });
    break;

  case 'read':
    Task.find({ completed: false }, (err, docs) => {
      console.log(chalk.blueBright('Tasks not Completed:'));
      docs.forEach((doc => {
        console.log(`Task: ${doc.description}\t Completed: ${doc.completed}`);
      }));
    });
    break;
  
  case 'update':
    const filter = { description: description };
    const update = {
      $set: { completed: true }
    };
    Task.updateOne(filter, update)
      .then(result => {
        console.log(chalk.greenBright(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`));
      });
    break;

  case 'delete':
    Task.findOne({ description: description })
      .then(res => {
        let id = res._id;
        Task.findByIdAndDelete(id)
          .then(result => {
            console.log(chalk.redBright.bold(`Task "${result.description}" deleted `));
          })
      });
    break;
}