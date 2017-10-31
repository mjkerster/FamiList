import Vue from 'vue';
import Vuex from 'vuex';
import DatabaseHelper from './DatabaseHelper.js'
import FirebaseApp from './FirebaseApp.js'

Vue.use(Vuex);

function arrayCheck(subject){
  if(!Array.isArray(subject)) {
    const newArray = []
    newArray.push(subject)
    subject = newArray;
  }

  return subject;
}

export default new Vuex.Store({
  state: {
    tasks: [],
    taskToEdit: {},
    sharedRefs: {},
    accounts: [],
    activeUser: {}
  },
  mutations: {
    addTask(state, task) {
      state.tasks = arrayCheck(state.tasks);
      state.tasks.push(task);
      DatabaseHelper.addTask(task);
    },
    setSharedRef(state, paramObj) {
      state.sharedRefs[paramObj.name] = paramObj.refObj
    },
    setTaskToEdit(state, task) {
      state.taskToEdit = task;
    },
    setActiveUser(state, user) {
      state.activeUser = user;
    },
    setAccounts(state, accounts) {
      state.accounts = accounts
    }
  },
  actions: {
    accountValidation({commit}) {
      const appAuth = FirebaseApp.auth;
      
      appAuth.onAuthStateChanged(user => {
        if(user) {
          commit('setActiveUser', user.providerData[0]);
          DatabaseHelper.checkAccountsAndAdd(user.providerData[0]).then(accounts =>{
            console.log('ACCOUNTS ', accounts);
            commit('setAccounts', accounts);
          });
          // DatabaseHelper.addAccount(user.providerData[0]);  TODO:  CHECK GETACCOUNTS BEFORE ADD
        } else {
          FirebaseApp.googleAuthProvider.addScope('profile');
          FirebaseApp.googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
          FirebaseApp.auth.signInWithRedirect(FirebaseApp.googleAuthProvider);
          FirebaseApp.auth.getRedirectResult().then(function(result) {
            console.log('RESULT: ', result);
          })
        }
      });
    }
    // async accountValidation ({commit}) {
    //   const appAuth = FirebaseApp.auth;
    //   let user;
    //   let redirectResult;
    //   console.log('appAuth: ', appAuth);
    //   user = await appAuth.onAuthStateChanged()
    //   if(user) {
    //     console.log('USER: ', user);
    //     commit.setActiveUser(user);
    //   } else {
    //     console.log('Not Signed In');
    //     FirebaseApp.googleAuthProvider.addScope('profile');
    //     FirebaseApp.googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    //     console.log('Not Signed In');
    //     FirebaseApp.auth.signInWithRedirect(FirebaseApp.googleAuthProvider);
    //     redirectResult = await FirebaseApp.auth.getRedirectResult();
    //     console.log('RESULT: ', redirectResult);
    //   }
    // }
  }
});