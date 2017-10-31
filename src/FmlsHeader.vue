<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click="openSideNav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Familist</h2>
    </md-toolbar>
    <md-sidenav class="md-left" ref="sideNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Settings</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <md-avatar>
            <img v-bind:src="activeUser.photoURL" alt="Avatar">
          </md-avatar>
          <span class="display-name">{{ activeUser.displayName }}</span>
          <md-divider class="md-inset"></md-divider>
        </md-list-item>

        <md-list-item>
          <md-icon>inbox</md-icon> <span>Assigned To You</span>
        </md-list-item>

        <md-list-item>
          <md-icon>done</md-icon> <span>Completed</span>
          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </md-list>

    </md-sidenav>
  </div>
</template>

<<script>
export default {
  name: "fmls-header",
  methods: {
    openSideNav() {
      this.$refs['sideNav'].toggle();
    }
  },
  computed: {
    activeUser() {
      console.log('activeUser method: ', this.$store.state.activeUser);
      return this.$store.state.activeUser;
    }
  }
  
}
</script>

<style>
  .avatar{
    margin: 20px;
  }
  .display-name{
    margin-left: 10px
  }
</style>


