<template>
  <div id="app">
    <fmls-header></fmls-header>
    <task-list-main></task-list-main>
  </div>
</template>

<script>
import FmlsHeader from './FmlsHeader.vue'
import TaskListMain from './TaskListMain.vue'
import FirebaseApp from './FirebaseApp.js'

export default {
  name: 'app',
  data() {
    return {
      appName: 'FamiList'
    }
  },
  beforeCreate() {
    this.$store.dispatch('accountValidation');
    // const appAuth = FirebaseApp.auth;
    // console.log('appAuth: ', appAuth);
    // appAuth.onAuthStateChanged(user => {
    //   if(user) {
    //     console.log('USER: ', user);
    //     this.checkLoggedInUser(user);
    //   } else {
    //     console.log('Not Signed In');
    //     FirebaseApp.googleAuthProvider.addScope('profile');
    //     FirebaseApp.googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    //     console.log('Not Signed In');
    //     FirebaseApp.auth.signInWithRedirect(FirebaseApp.googleAuthProvider);
    //     FirebaseApp.auth.getRedirectResult().then(function(result) {
    //       console.log('RESULT: ', result);
    //     })
    //   }
    // });
  },
  methods: {
    checkLoggedInUser(user) {
      this.$store.commit('setActiveUser', user);
      return true; // TODO: FINISH 
    }    
  },
  components: {
    FmlsHeader,
    TaskListMain
  },
}
</script>

<style>
  input[type='text'],
  input[type='number'],
  textarea {
    font-size: 16px;
  }
</style>
