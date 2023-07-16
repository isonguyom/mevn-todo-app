<template>
  <div>
    <form action="" @submit.prevent="$emit('create-todo')" method="post">
      <input
        type="text"
        name="newTodo"
        id="newTodo"
        placeholder="Enter todo"
        :value="newTodo"
        @input="$emit('update:newTodo', $event.target.value)"
      />
      <button type="submit">Create todo</button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["create-todo", "update:newTodo"],
  props: ["newTodo"],
};
</script>
