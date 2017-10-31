import Vue from 'vue'
import VueMaterial from 'vue-material'
import store from './FmlsStore.js'
import App from './App.vue'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' }).then(function(reg) {
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
    
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

Vue.use(VueMaterial);
new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
