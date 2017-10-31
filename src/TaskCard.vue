<template>
  <md-card class="task_card">
    <md-card-header>
      <div class="md-title">
        {{task.title}}
        <md-avatar v-if="task.assign">
          <img :src="task.assign.photoURL" alt="Avatar">
        </md-avatar>
      </div>
      <div class="md-subhead">{{task.createDate}}</div>
    </md-card-header>
    <md-card-content v-if="task.description">
      {{task.description}}
    </md-card-content>
    <md-card-actions>
      <md-button class="md-icon-button md-primary">
        <md-icon>done</md-icon>
      </md-button>
      <md-button class="md-icon-button md-warn">
        <md-icon>delete</md-icon>
      </md-button>
      <md-button @click="editTask()" class="md-icon-button">
        <md-icon>edit</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>  
</template>

<script>
export default {
  name: 'task-card',
  data(){
    return {}
  },
  methods: {
    editTask() {
      this.$store.commit('setTaskToEdit', this.task);
      this.$store.state.sharedRefs['editDialog'].open();
    }
  },
  props: ['task']
}
</script>

<style>
  .task_card {
    margin: 10px 20px
  }
</style>
