import { defineStore } from "pinia";


export const useTaskStore = defineStore('taskStore', {
state: () => ({
    tasks: [],
    loading: false,
    addDB: false,
}),
getters: {
    favs() {
        return this.tasks.filter(t => t.isFav)
    },
    favCount() {
        return this.tasks.reduce((p, c) => {
return c.isFav ? p + 1 : p
        }, 0)
    },
    totalCount: (state) => {
return state.tasks.length
    }
},
actions : {
    async AddDbURL(url, data) {
        try {
            const res = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            console.log('Data successfully added to Firebase!');
        } catch (error) {
            console.error('Error:', error);
        }
    },
    async getTasks(){

        const storedURL = localStorage.getItem('db-url');

        if(storedURL) {
            this.loading = true;
            const res = await fetch(`${storedURL}`)
            const data = await res.json()
    
            this.tasks = data;
            this.loading = false;
            this.addDB = false;

        } else {
            this.addDB = true;
        }
    },
    async addTask(task) {
        this.tasks.push(task)

        const res = await fetch('https://pinia-tasks-8bc9c-default-rtdb.firebaseio.com/tasks.json', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })

        if(res.error) {
            console.log(res.error)
        }
    },
   async deleteTask(id){
this.tasks = this.tasks.filter(t => {
    return t.id !== id
})

const res = await fetch('https://pinia-tasks-8bc9c-default-rtdb.firebaseio.com/tasks/' + id + '.json', {
    method: 'DELETE',
})

if(res.error) {
    console.log(res.error)
}
    },
   async toggleFav(id){
const task = this.tasks.find(t => t.id === id)
task.isFav = !task.isFav

const res = await fetch('https://pinia-tasks-8bc9c-default-rtdb.firebaseio.com/tasks/' + id + '.json', {
    method: 'PATCH',
    body: JSON.stringify({isFav: task.isFav}),
    headers: {'Content-Type': 'application/json'}
})

if(res.error) {
    console.log(res.error)
}
    }
}
})