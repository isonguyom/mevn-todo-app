<template>
  <ol>
    <li class="todo-item">
      <div>
        <span class="todo-id">{{ todoIndex }}.</span>
        <span>{{ update }}</span>
      </div>
      <div>
        <button class="edit-btn" @click="openEditForm">Edit</button>
        <button @click="$emit('delete-task', todoId)">Delete</button>
      </div>
      <form
        action=""
        id="updateForm"
        :class="{ active: isEdit }"
        @submit.prevent="updateTodo(todoId)"
        method="post"
      >
        <input type="text" name="updateTodo" id="updateTodo" v-model="update" />
        <button type="submit">Save</button>
      </form>
    </li>
  </ol>
</template>

<script>
export default {
  props: ["todo", "todoId", "todos", "todoIndex"],
  emits: ["delete-task"],
  data() {
    return {
      isEdit: false,
      todos: this.todos,
      update: this.todo,
      todoIndex: this.todoIndex,
      todoId: this.todoId,
    };
  },

  methods: {
    openEditForm() {
      if (!this.isEdit) {
        this.isEdit = true;
      }
    },

    updateTodo(id) {
      if (this.update.length > 0) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ todo: this.update }),
        };
        fetch(`api/todos/${id}`, requestOptions)
          .then((res) => res.json())
          .then((data) => (this.todos = data.todo));
        this.isEdit = false;
      }
    },
  },
};
</script>

<style scoped>
ol {
  list-style: none;
}
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  border-bottom: 1px solid rgb(248, 146, 128);
  margin-bottom: 5px;
}

.todo-id {
  margin-right: 0.7em;
}

.edit-btn {
  margin-right: 5px;
}

#updateForm {
  position: absolute;
  display: none;
  width: 100%;
  left: 0;
}

#updateForm input {
  width: 100%;
}

#updateForm.active {
  display: flex;
}
</style>
