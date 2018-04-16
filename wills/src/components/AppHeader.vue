<template>
  <nav>
    <nav>
  <div class="text-left">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-warning">
      <a id="brand" class="navbar-brand">EasyWill</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
<!--           <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/"> Home </router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/BuildWill"> Build Will </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/ViewWill"> View Will </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/ListWills"> List Wills </router-link>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link"  to="/"><a style = "color: black;" @click="logout" >Logout</a></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  </nav>
    <div id="container">
      <ul id="menu">
        <li class="right" v-if="!loggedIn">
          <form v-on:submit.prevent="login">
        <li><img id="scroll" src="../assets/scroll2.png"/></li>
        	  <input v-model="email" placeholder="Email Address">
        	  <input v-model="password" type="password" placeholder="Password">
        	  <button class="primary" type="submit">Login</button>
        	</form>
          <div class="flexWrapper errorPlace">
            <p v-if="loginError" class="flexRight error">{{loginError}}</p><br><br>
          </div>
        </li>
      </ul> 
     <div class="footer">  <p><a style = "color: black;" href="https://github.com/jcleona/newCreativeProject5"><br>See my code on github. <img id="git" src="../assets/GitHub-Mark.png"></a><br><br></p>
     </div>
   </div>
 </nav>
</template>

<script>
import router from '../router/index.js';
 export default {
   name: 'AppHeader',
   data () {
     return {
       email: '',
       password: '',
     }
   },
   computed: {
     user: function() {
       return this.$store.getters.user;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
   },
   methods: {
     login: function() {
       this.$store.dispatch('login',{
         email: this.email,
         password: this.password,
       }).then(user => {
    	 this.email = '';
    	 this.password = '';
       router.push({ path: '/' });
       });
     },
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
 }
</script>

<style scoped>
 input {
     font-size: 1.5vw;
     padding: 1.5vw;
     border-radius: .5vw;
 }
 button {
     font-size: 1.5vw;
     font-weight: bold;
     padding: .9vw;
     background-color: darkturquoise;
 }
 /* Strip the ul of padding and list styling */
 nav {
     /*display: grid;*/
     margin-bottom: 0px;
 }
 ul {
     list-style-type:none;
     margin:0;
     padding:0;
     font-size: 2vw;
 }
 /* Create a horizontal list with spacing */
 li {
     display:inline-block;
     float: left;
     margin: 15px;
     font-size: 2vw;
     padding:0;
     height: 60px;
     text-align: center;
     line-height: 50px;
     color: #666;
 }
 a {
     color: #42b983;
 }
 /*Active color*/
 li a.active {
 }
 /*Hover state for top level links*/
 li:hover a {
 }
 .right {
     float: right;
 }
 .errorPlace {
     height: 2vw;
 }
 #scroll {
     width: 12vw;
     padding: 0 5vw 5vw 0; 
 }
 #container { 
   margin: 10 auto; 
   /*overflow: auto; */
   padding: 120px 0px 0px 0; 
   width: 70vw; 
   height: 300px;
 }
 #brand {
   font-size: 3.5vw;
 }
 .footer {
   list-style-type:none;
   position: fixed;
   left: 0;
   border: 0;
   margin: 0;
   padding: 0;
   font-size: 1.6vw;
   bottom: 0;
   width: 100%;
   background-color: darkturquoise;
   color: black !important;
   text-align: center;
 }
 #git {
   width: 1.4vw;
   height: 1.4vw;
 }
</style>
