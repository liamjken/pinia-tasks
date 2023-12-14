<template>
    <form @submit="handleURLSubmit">
    <input 
    type="text"
    placeholder="Enter Firebase URL here..."
    v-model="dbURL">
    <button>Add</button>
    </form>
    </template>

<script>
import { useTaskStore } from '../stores/TaskStore';
import { ref } from 'vue';

    export default {
        setup(){
    const taskStore = useTaskStore()

    const dbURL = ref('')

    const handleURLSubmit = () => {
        if (dbURL.value.length > 0) {
            const data = [
            {
                "id": 2033,
                "isFav": true,
                "title": "Build Awesome Website"
            },
            {
                "id": 5218,
                "isFav": false,
                "title": "Develop Consistent Brand"
            },
            {
                "id": 8803,
                "isFav": false,
                "title": "Create SEO Strategy"
            }
        ];
  const firebaseURL = dbURL.value.toString() + 'tasks.json';

  localStorage.setItem('db-url', firebaseURL);

            taskStore.AddDbURL(`${firebaseURL}?print=silent`, data)
            dbURL.value = ''
        }
    }
    return { handleURLSubmit, dbURL }
        }
        
    }
</script>