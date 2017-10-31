<template>
  <div>
    <md-dialog ref="editDialog">
      <md-dialog-title>Edit Task</md-dialog-title>

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
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="closeDialog">Cancel</md-button>
        <md-button class="md-raised md-primary" @click="editTask()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import DatabaseHelper from './DatabaseHelper.js'

  export default {
    name: 'edit-dialog',
    data() {
        return {}
    },
    mounted() {
      this.$store.commit('setSharedRef', {name: 'editDialog', refObj:this.$refs['editDialog']});
    },
    methods: {
      closeDialog() {
        this.$refs['editDialog'].close();
      },
      editTask() {
        DatabaseHelper.updateTask(this.$store.state.taskToEdit);
        this.closeDialog();
      }
    },
    computed: {
      task() {
        return this.$store.state.taskToEdit;
      }
    }
  }
</script>

<style>
  
</style>
