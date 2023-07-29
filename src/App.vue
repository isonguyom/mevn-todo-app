<script setup>
import CreateTodo from "./components/CreateTodo.vue";
import Todos from "./components/Todos.vue";
</script>

<template>
  <div class="container">
    <h1 class="title">MEVN Todo App</h1>

    <CreateTodo @create-todo="addItem" v-model:newTodo="newItem" />
    <section class="todo-list">
      <h3 class="list-caption">Todo Items</h3>
      <div v-if="todos.length < 1">Todo list is empty</div>
      <div v-else>
        <Todos
          v-for="item in todos"
          :key="item._id"
          :todo="item.todo"
          :todoIndex="todos.indexOf(item) + 1"
          :todoId="item._id"
          @delete-task="delItem"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: "",
      todos: [],
      todoId: null,
    };
  },

  methods: {
    addItem() {
      if (this.newItem) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ todo: this.newItem }),
        };
        fetch("api/todos", requestOptions)
          .then((res) => res.json())
          .then((data) => (this.todos = data));

        // POST request using fetch with async/await
        // const requestOptions = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ todo:  this.newItem}),
        // };
        // const res = await fetch(
        //   "api/todos",
        //   requestOptions
        // );
        // this.todos = await res.json();
      }
      this.newItem = "";
    },

    fetchTodos() {
      fetch("api/todos")
        .then((res) => res.json())
        .then((data) => (this.todos = data));

      //using fetch with async/await
      // this.todos = null;
      // const res = await fetch("api/todos");
      // this.todos = await res.json();
    },

    delItem(id) {
      // this.todos = this.todos.filter((i) => i !== item);
      fetch(`api/todos/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => (this.todos = data.todo));
    },
  },

  computed: {
    todoIndexing(item) {
      return (this.todoIndex = this.todos.indexOf(item));
    },
  },

  mounted() {
    this.fetchTodos();
  },

  watch: {
    todos() {
      this.fetchTodos();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
}

.title {
  margin-bottom: 50px;
}

.todo-list {
  margin-top: 50px;
  text-align: left;
  width: 100%;
}

.list-caption {
  margin-bottom: 20px;
}

@media screen and (min-width: 768px) {
  .todo-list {
    width: 80%;
  }
}

@media screen and (min-width: 992px) {
  .todo-list {
    width: 60%;
  }
}
</style>
