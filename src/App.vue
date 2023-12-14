<template>
  <main>
<!--heading-->
<header>
  <img src="./assets/pinia-logo2.svg" alt="pinia logo">
  <h1>Pinia Tasks</h1>
</header>

<!--new task form-->

<div class="new-task-form">
<TaskForm/>
</div>

<!--filter-->
<nav class="filter">
  <button @click="filter = 'all'">All Tasks</button>
  <button @click="filter = 'favs'">Fav Tasks</button>
</nav>

<!--loading-->

<div class="loading" v-if="loading">Loading tasks...</div>
<div class="loading" v-if="addDB">
  <h3>Database</h3>
  <p>I followed a tutorial from the NetNinja for this Task (todo) list. In the tutorial the Tasks are stored locally using JSON Server. I made a change to connect to a firebase realtime server. I didn't want to open access to my Firebase server so instead I have given the ability for anyone to add they're firebase link and test it. </p>
  <p>simply follow the <a href="https://scribehow.com/shared/Setting_up_Firebase_Realtime_Database_for_Project_todo-pinia__s7hv_HRlQ3eKqSP7xsh-Dw" target="_blank">instructions</a> to create a firebase realtime DB and test otherwise you can close this window and use the task list locally</p>
  <AddTaskDB/>
  <a href="#" @click="addDB = !addDB">close</a>
</div>

<!--task list-->
<div class="task-list" v-if="filter === 'all'">
  <p>You have {{ totalCount }} tasks left to do</p>
  <div v-for="task in tasks">
<TaskDetails :task="task" />
  </div>
</div>
<div class="task-list" v-if="filter === 'favs'">
  <p>You have {{ favCount }} tasks left to do</p>
  <div v-for="task in favs">
<TaskDetails :task="task" />
  </div>
</div>

<button @click="taskStore.$reset">reset state</button>
  </main>
</template>

<script>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore.js'
import TaskForm from './components/TaskForm.vue'
import AddTaskDB from './components/AddTaskDB.vue'

  export default {
    components: { TaskDetails, TaskForm, AddTaskDB },
    setup () {
      const taskStore = useTaskStore()

      const { tasks, loading, addDB, favs, totalCount, favCount } = storeToRefs(taskStore)

      //fetch tasks

      taskStore.getTasks()

      const filter = ref('all')

      return { taskStore, filter, tasks, loading, addDB, favs, totalCount, favCount }
    }
    
  }
</script>


