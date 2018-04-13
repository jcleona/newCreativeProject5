<template>
  <div class="text-left">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-warning">
      <a class="navbar-brand" href="#">EasyWill</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/Will">Will</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/ViewWill">View Will</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#/ListWills">List Wills</a>
          </li>
        </ul>
      </div>
    </nav><br><br>
    <div class="container">
      <div>
          <h1 class="text-center">Wills</h1><br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Delete</th>
              <th>Signed&nbsp &nbsp &nbsp &nbsp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" class="form-line text-white">
             <td style = "color: black;">{{ user.name }}</td>
             <td style = "color: black;">{{ user.id }}</td>
             <td style = "color: black; cursor:pointer;" @click="deleteUser(user.id)">&nbsp &nbsp X</td>
             <td ><input style = "color: black; cursor:pointer;" type="checkbox" v-model="user.signed" v-on:click="updateUser(user)" /></td>
            </tr>
          </tbody>
        </table>
      </div>
  <div class="footer">  <p><a style = "color: black;" href="https://github.com/jcleona/Creative-Project-4">See my code on github. <img id="git" src="../assets/GitHub-Mark.png"></a></p>
  </div>
 </div>
 </div>
</template>
<script>
import router from '../router/index.js';
export default {
  name: 'ListWills',
  data () {
    return {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      stateAbbr: '',
      zip: '',
      beneficiary: '',
      executor: '',
      property: '',
      signed: false,
      readyWill: false,
      willParts: []
    }
  },
  computed: {
     users: function() {
       return this.$store.getters.users;
       console.log('computed users: ', users);
     },
     user: function() {
       return this.$store.getters.user;
       console.log('computed user: ', user);
     }
  },
   created: function() {
     this.getUsers();
   },
  methods: {
    updateUser: function(user) {
      this.$store.dispatch('updateUser',{
        id: user.id,
        signed: !user.signed,
       }).then(response => {
        return true;
       }).catch(err => {
       });
     },
    getUser: function(id) {
      this.$store.dispatch('getUser',{
        // id: user.id
        id: this.id,
        });
      // console.log (user);
     },
    getUsers: function() {
      this.$store.dispatch('getUsers');
     },
    deleteUser: function(id) {
      this.$store.dispatch('deleteUser',{
        id: id
        });
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
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   padding-top: 16px;
   width: 100%;
   background-color: DarkTurquoise ;
   color: black !important;
   text-align: center;
}
#git {
  width: 1.4vw;
  height: 1.4vw;
}
input[type=checkbox] {
     transform: scale(2);
     margin-left: 16px;
 }
</style>