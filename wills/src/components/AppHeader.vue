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
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/"> Home </router-link>
            <!-- <a class="nav-link" href="/">Home  -->
              <!-- <span class="sr-only">(current)</span> -->
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/BuildWill"> Build Will </router-link>
            <!-- <a class="nav-link" href="#">Will</a> -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/"> View Will </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style = "color: black;" to="/"> List Wills </router-link>
          </li>
        </ul>
      </div>
    </nav>
</div>

      <!-- <a  style = "color: black;" href="#">EasyWill</a> -->
      <div>
<!--         <ul>
          <li>
          </li>
          <li>
            <a  style = "color: black;" href="#/Will">Will</a>
          </li>
          <li class="nav-item">
            <a  style = "color: black;" class="nav-link" href="#/ViewWill">View Will</a>
          </li>
          <li class="nav-item">
            <a  style = "color: black;" class="nav-link" href="#/ListWills">List Wills</a>
          </li>
        </ul> -->
      </div>
    </nav>


    <div id="container">
      <ul id="menu">
        <li><img id="scroll" src="../assets/scroll2.png"/></li>
        <li><router-link to="/">Home</router-link></li>
        <li class="right" v-if="loggedIn">
  	      <router-link :to="{ name: 'BuildWill', params: {userID: user.id}}">{{user.username}}</router-link> <a @click="logout" href="#">Logout</a></p>
        </li>
        <li class="right" v-else>
        	<form v-on:submit.prevent="login">
        	  <input v-model="email" placeholder="Email Address">
        	  <input v-model="password" type="password" placeholder="Password">
        	  <button class="primary" type="submit">Login</button>
        	</form>
        </li>
      </ul> 
<!--       <div class="footer">  <p><a style = "color: black;" href="https://github.com/jcleona/Creative-Project-4"><br>See my code on github. <img id="git" src="../assets/GitHub-Mark.png"></a><br><br></p>
  </div> -->
     <div class="flexWrapper errorPlace">
       <p v-if="loginError" class="flexRight error">{{loginError}}</p>
     </div>
     <div class="footer">  <p><a style = "color: black;" href="https://github.com/jcleona/Creative-Project-4"><br>See my code on github. <img id="git" src="../assets/GitHub-Mark.png"></a><br><br></p>
     </div>
   </div>
 </nav>
</template>

<script>
 export default {
   name: 'AppHeader',
   data () {
     return {
       keywords: '',
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
     numberFollowing: function() {
       return this.$store.getters.following.length;
     },
     numberFollowers: function() {
       return this.$store.getters.followers.length;
     }
   },
   methods: {
     search: function() {
       this.$router.push({ path: '/search', query: { keywords: this.keywords }})
       this.keywords = '';
     },
     login: function() {
       this.$store.dispatch('login',{
         email: this.email,
         password: this.password,
       }).then(user => {
	 this.email = '';
	 this.password = '';
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
 }
 button {
     font-size: 1.5vw;
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
/* input {
     height: 0.5em;
 }*/

 .right {
     float: right;
 }
 .errorPlace {
     height: 20px;
 }
 #scroll {
     width: 8vw;
     padding-bottom: 5vw; 
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
