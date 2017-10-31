<template>
    <div class="task_list">
      <task-card v-for="(task, index) in allTasks" :key="index" :task="task"></task-card>
      <task-dialog></task-dialog>
      <edit-dialog></edit-dialog>
    </div>
    
</template>

<script>
  import TaskCard from './TaskCard.vue'
  import TaskDialog from './TaskDialog.vue'
  import EditDialog from './EditDialog.vue'
  import DatabaseHelper from './DatabaseHelper.js'

  export default {
    name: 'task-list-main',
    data() {
      return {}
    },
    components: {
      TaskCard,
      TaskDialog,
      EditDialog
    },
    created() {
      DatabaseHelper.getTasks().then((snapshot) => {
        const taskObjArray = [];
        let taskObj = {};
        snapshot.forEach(childSnapshot => {
          taskObj = childSnapshot.exportVal();
          taskObj.key = childSnapshot.key;
          taskObjArray.push(taskObj);
        })
        this.$store.state.tasks = taskObjArray;
      });
    },
    methods: {

    },
    computed: {
      allTasks() {
        return this.$store.state.tasks;
      }
    }
  }
</script>

<style>
  .task_list{
    height:90vh;
    overflow: scroll;
  }
</style>
