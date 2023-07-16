import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  todo: String,
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
