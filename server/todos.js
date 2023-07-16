import express from "express";
const router = express.Router();
import Todo from "./models/todosSchema.js";

router
  .route("/")

  // create a todo
  .post(function (req, res) {
    const todo = new Todo(); // create a new instance of the Todo model

    todo.todo = req.body.todo; // set the todo (comes from the request)

    // save the bear and check for errors
    todo.save().then(function () {
      try {
        res.json({ message: "Todo created!" });
      } catch (err) {
        res.send(err);
      }
    });
  })

  // get all the todos
  .get(function (_req, res) {
    Todo.find({}).then(function (todos) {
      try {
        res.json(todos);
      } catch (err) {
        res.send(err);
      }
    });
  });

router
  .route("/:id")

  // get the todo with that id
  .get(function (req, res) {
    Todo.findById(req.params.id).then(function (todo) {
      try {
        res.json(todo);
      } catch (err) {
        res.send(err);
      }
    });
  })

  // update the todo with this id
  .put(function (req, res) {
    // use our bear model to find the bear we want
    Todo.findById(req.params.id).then(function (todo) {
      try {
        todo.todo = req.body.todo; // update the todo info

        // save the todo
        todo.save().then(function () {
          try {
            res.json({ message: "Todo updated!" });
          } catch (err) {
            res.send(err);
          }
        });
      } catch (err) {
        res.send(err);
      }
    });
  })

  // delete the todo with this id
  .delete(function (req, res) {
    Todo.deleteOne({ _id: req.params.id }).then(function () {
      try {
        res.json({ message: "Successfully deleted" });
      } catch (err) {
        res.send(err);
      }
    });
  });

//Routes will go here
export default router;
