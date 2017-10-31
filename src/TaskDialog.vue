<template>
  <div>
    <md-dialog md-open-from="#addbtn" md-close-to="#addbtn" ref="taskDialog">
      <md-dialog-title>Create New Task</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Title</label>
            <md-input v-model="task.title" required type="text"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Description</label>
            <md-textarea v-model="task.description"></md-textarea>
          </md-input-container>
          <assignment-toggle :assignmentOptions="accounts"></assignment-toggle>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="closeDialog('taskDialog')">Cancel</md-button>
        <md-button class="md-raised md-primary" @click="createTask('taskDialog')">Create</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button id="addbtn" @click="openDialog('taskDialog')" class="md-fab md-fab-bottom-right">
        <md-ink-ripple />
        <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import moment from '../node_modules/moment/min/moment.min.js'
  import DatabaseHelper from './DatabaseHelper.js'
  import AssignmentToggle from './AssignmentToggle.vue'

  export default {
    name: 'task-dialog',
    data() {
        return {
          task: {},
          options:[
            {
              photoURL: 'https://lh4.googleusercontent.com/-AawSX1HE6zk/AAAAAAAAAAI/AAAAAAAAAv4/Ut0LBjElFfk/photo.jpg',
              active: true
            },
            {
              photoURL: 'https://lh4.googleusercontent.com/-AawSX1HE6zk/AAAAAAAAAAI/AAAAAAAAAv4/Ut0LBjElFfk/photo.jpg',
              active: false
            }
          ]
        }
    },
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
        this.task = {};
      },
      createTask(ref) {
        const assignment = this.options.filter(function(element) {
          return (element.active === true);
        });

        this.task.assign = assignment[0];
        this.task.createDate = moment().format('MMMM Do YYYY');
        this.$store.commit('addTask',this.task);
        this.closeDialog(ref);
      }
    },
    computed: {
      accounts() {
        return this.$store.state.accounts;
      }
    },
    components: {
      AssignmentToggle
    }
  }
</script>

<style>
  
</style>
