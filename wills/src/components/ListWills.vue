<template>
  <div class="text-left">
    <div class="container">
      <div>
        <br><h1 class="text-center">Wills</h1><br>
        <div v-if="loggedIn">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Title of Will</th>
              <th>ID</th>
              <th>Delete</th>
              <!-- <th>Signed&nbsp &nbsp &nbsp &nbsp</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="will in wills" class="form-line text-white">
             <td style = "color: black;">{{ will.title }}</td>
             <td style = "color: black;">{{ will.id }}</td>
             <td style = "color: black; cursor:pointer;" @click="deleteWill(will.id)">&nbsp &nbsp X</td>
             <!-- <td ><input style = "color: black; cursor:pointer;" type="checkbox" v-model="user.signed" v-on:click="updateUser(user)" /></td> -->
            </tr>
          </tbody>
        </table>
       </div>
      <div v-else>
       <br><br><h2>Please login and then click 'List Wills' to see your wills.</h2>
      </div>
   </div>
  </div>
 </div>
</template>
<script>
import router from '../router/index.js';
export default {
  name: 'ListWills',
  props: ['users', 'wills'],
  data () {
    return {
      signed: false,
    }
  },
  computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     user: function() {
       return this.$store.getters.user;
       console.log('computed user: ', user);
     },
     will: function() {
       return this.$store.getters.will;
     },
     wills: function() {
       return this.$store.getters.wills;
     }, 
  },
  created: function() {
     console.log('in created of ListWills');
     this.$store.dispatch('getWills', this.will.id);
   },
  methods: {
    getWills: function() {
      this.$store.dispatch('getWills');
     },
    deleteWill: function(id) {
      console.log('just before dispatching deleteWill with id: ', id);
      this.$store.dispatch('deleteWill',id);
      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>