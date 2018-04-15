<template>
  <div id="container" class="column"><br>
    <h2>To build your custom will, login above or create an account below.</h2>
    <form v-on:submit.prevent="register">
      <input class="wide" v-model="username" placeholder="User Name..."><br><br>
      <input class="wide" v-model="name" placeholder="Full Name..."><br/><br>
      <input class="wide" v-model="email" placeholder="Email Address..."><br/>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small><br>
      <input class="wide" v-model="address" placeholder="Address..."><br/><br>
      <input class="wide" v-model="city" placeholder="City..."><br/><br>
      <input class="wide" v-model="stateAbbr" placeholder="State abbreviation..."><br><br>
      <input class="wide" type="password" v-model="password" placeholder="Password...">
      <button class="alternate" type="submit">Register</button><br><br><br>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>
<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
       address: '',
       city: '',
       state: '',
       stateAbbr: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       let table = require( 'datasets-us-states-abbr-names' );
       function getState( abbr ) {
         let st;
         let upperAbbr = abbr.toUpperCase();
         st = table[ upperAbbr ];
         if ( st === void 0 ) {
          st = abbr;
         // throw new Error( 'unrecognized state abbreviation. Value: `' + abbr + '`.' );
       }
       return st;
      }
      this.state = getState( this.stateAbbr );
      this.userSubmitted = true;
      this.$store.dispatch('register',{
	       username: this.username,
         email: this.email,
         password: this.password,
         name: this.name,
         address: this.address,
         city: this.city,
         state: this.state,
         stateAbbr: this.stateAbbr,
       });
     }
   }
 }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 input {
     padding: 2.3vw;
     font-size: 1.8vw;
     border-radius: .5vw;
 }
 button {
     font-size: 1.5vw;
     font-weight: bold;
     padding: .9vw;
     background-color: darkturquoise;
 }
 img {
     width: 100px;
 }
 h1 {
     margin-bottom: 0px;
 }
 h2 {
     margin-top: 0px;
     font-size: 2vw;
     font-weight: normal;
     margin-bottom: 50px;
 }
 #container { 
     margin: 10 auto; 
   /*overflow: auto; */
     padding: 20px 0px 10px 0; 
     width: 80vw; 
     height: 1080px;
 } 
 .wide {
     width: 60vw;
 }
</style>
