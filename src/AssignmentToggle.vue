<template>
<div>
  <label class="assign-label">Assign</label>
  <span class="assignment" v-for="(assignmentOption, index) in assignmentOptions" :key="index">
    <md-avatar :class="{'md-large': assignmentOption.active}">
      <img :src="assignmentOption.photoURL" alt="Avatar" @click="toggleClass(index, $event)">
    </md-avatar>
  </span>
</div>  
</template>

<script>
export default {
  name: 'assignment-toggle',
  data(){
    return {}
  },
  methods: {
    toggleClass(index, event) {
      let removeActive = document.getElementsByClassName('md-large');

      for(var i = 0; i < removeActive.length; i++){
        removeActive[i].classList.remove('md-large');
      }
      event.target.parentElement.classList.add('md-large');
      this.assignmentOptions.forEach(function(element, idx) {
        if(idx === index){
          element.active = true;
        }
        else {
          element.active = false;
        }
      });
    }
  },
  props: ['assignmentOptions']

}
</script>

<style>
  .assignment{
    margin: 20px 10px;
  }
  .assign-label{
    display: block;
    margin: 30px 0px 10px;
    top: 23px;
    left: 0;
    pointer-events: none;
    transition-duration: .3s;
    color: rgba(0, 0, 0, 0.54);
    font-size: 16px;
    line-height: 20px;
  }
</style>

