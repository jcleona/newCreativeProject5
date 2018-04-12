<template>
  <div>
    <div v-if="loggedIn">
      <build-will/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import UserFeed from './UserFeed';
 import BuildWill from './BuildWill';
 export default {
   name: 'HomePage',
   components: {WelcomePage,UserFeed,BuildWill},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
