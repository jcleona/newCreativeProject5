<template>
  <div class="text-left">
    <div class="container">
      <div>
          <br><h1 class="text-center">Wills</h1><br>
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

    }
  },
  computed: {
     user: function() {
       return this.$store.getters.user;
       console.log('computed user: ', user);
     },
     // users: function() {
     //   return this.$store.getters.users;
     //   console.log('computed users: ', users);
     // },
     will: function() {
       return this.$store.getters.will;
     },
     wills: function() {
       return this.$store.getters.wills;
     }, 
  },
   created: function() {
    console.log('in created of ListWills');
     // this.getWills();
     console.log('this.user.id: ', this.user.id);
     console.log('this.will.id: ', this.will.id);
    this.$store.dispatch('getWills', this.will.id);

     // this.$store.dispatch('getUser',{id:this.will.user_id});
   },
  methods: {
    // updateWill: function(user) {
    //   this.$store.dispatch('updateWill',{
    //     id: user.id,
    //     signed: !will.signed,
    //    }).then(response => {
    //     return true;
    //    }).catch(err => {
    //    });
    //  },
    // getUser: function(id) {
    //   this.$store.dispatch('getUser',{
    //     // id: user.id
    //     id: this.id,
    //     });
    //   // console.log (user);
    //  },
    getWills: function() {
      this.$store.dispatch('getWills');
     },
    // deleteWill: function(id) {
    //   this.$store.dispatch('deleteWill',id);
    //   }, 
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
/*.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   padding-top: 16px;
   width: 100%;
   background-color: DarkTurquoise ;
   color: black !important;
   text-align: center;
}*/
/*#git {
  width: 1.4vw;
  height: 1.4vw;
}*/
/*input[type=checkbox] {
     transform: scale(2);
     margin-left: 16px;
 }*/
</style>