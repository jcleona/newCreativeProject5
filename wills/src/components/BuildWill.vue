<template>
  <div class="text-left">
<!--     <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-warning">
      <a class="navbar-brand" href="#">EasyWill</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">Will</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/ViewWill">View Will</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/ListWills">List Wills</a>
          </li>
        </ul>
      </div>
    </nav> -->

    <div id="willForm" class="container">
    <form>
      <p>Finish your will by filling out the following information: <p>
      <div class="form-group">
        <label for="FormControlInput0">Title</label>
        <input v-model="title" type="text" class="form-control" id="FormControlInput0" placeholder="Give this will a title...">
      </div>
<!--       <div class="form-group">
        <label for="FormControlInput1">Name</label>
        <input v-model="name" type="text" class="form-control" id="FormControlInput1" placeholder="Full Name...">
      </div>
       <div class="form-group">
        <label for="FormControlInput2">Email address</label>
        <input v-model="email" type="email" class="form-control" id="FormControlInput2" placeholder="name@example.com">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="FormControlInput3">Street address</label>
        <input v-model="address" type="text" class="form-control" id="FormControlInput3" placeholder="123 Main St.">
      </div>
       <div class="form-group">
        <label for="FormControlInput4">City</label>
        <input v-model="city" type="text" class="form-control" id="FormControlInput4" placeholder="Enter city...">
      </div>
      <div class="form-group">
        <label for="FormControlInput5">State</label>
        <input v-model="stateAbbr" type="text" class="form-control" id="FormControlInput5" placeholder="Enter two-letter state abbreviation...">
      </div> -->
  <!--     <div class="form-group">
        <label for="FormControlInput6">Zip</label>
        <input autocomplete="section-red shipping postal-code" v-model="zip" type="text" class="form-control" id="FormControlInput6" placeholder="Enter zip...">
      </div> -->
      <div class="form-group">
        <label for="FormControlInput7">To whom would you like to leave your personal property?</label>
        <input v-model="beneficiary" type="name" class="form-control" id="FormControlInput7" placeholder="Full Name...">
      </div>
       <div class="form-group">
        <label for="FormControlInput8">Who would you like to be the executor of your estate?</label>
        <input v-model="executor" type="name" class="form-control" id="FormControlInput8" placeholder="Full Name...">
      </div>
<!--       <div class="form-group">
        <label for="FormControlTextarea">List your personal property:</label>
        <textarea v-model="property" class="form-control" id="FormControlTextarea" rows="6"></textarea>
      </div> -->
      <div style = "background-color: Gainsboro;" class="text-center form-group form-control btn-outline-secondary">
        <button type="submit" v-on:click.prevent="buildWill" class="btn btn-default">Submit</button><br>
      </div>
<!--       <div v-if="userSubmitted" style = "background-color: Gainsboro;" class="text-center form-group form-control btn-outline-secondary">
        <button type="submit" v-on:click.prevent="buildWill" class="btn btn-default">Click Here to see your will below.</button><br>
      </div> -->
      <div v-if="userSubmitted"  style = "background-color: Gainsboro;" class="text-center form-group form-control btn-outline-secondary">
        <button type="submit" v-on:click.prevent="newPage" class="btn btn-default">Click here to see your will in a new page.</button><br>
      </div>
    </form>
    <!-- <a href="#/ViewWill">Click Here to See Your Will in a new page</a><br> -->
    <div>
    <!-- <div v-if="readyWill"> -->
      <p v-for="part in willParts">
       {{ part }}</p>
    </div>
  </div>
  <br><br><br><br>
<!--   <div class="footer">  <p><a style = "color: black;" href="https://github.com/jcleona/Creative-Project-4">See my code on github. <img id="git" src="../assets/GitHub-Mark.png"></a></p>
  </div> -->
 </div>
</template>

<script>
import router from '../router/index.js';
export default {
  name: 'BuildWill',
  props: ['users'],
  data () {
    return {
      id: '',
      title: '',
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      stateAbbr: '',
      // zip: '',
      beneficiary: '',
      executor: '',
      // property: '',
      userSubmitted: false,
      readyWill: false,
      willParts: [],
      willID: '',
    }
  },
  computed: {

     user: function() {
       return this.$store.getters.user;
     },
     will: function() {
       return this.$store.getters.will;
     },

     // users: function() {
     //   return this.$store.getters.users;
     //   console.log('computed users: ', users);
     // },
     // user: function() {
     //   return this.$store.getters.user;
     //   console.log('computed user: ', user);
     // }
  },
  created() {
         // this.$store.dispatch('getFeed');
     // this.$store.dispatch('getUser',{id:this.$route.params.userID});
     console.log('user.id: ', this.user.id);
     console.log('user: ', this.user);
     this.userSubmitted = false
  }, 
  methods: {

    newPage: function() {

      console.log('in newPage function')
          //   router.push({ name: link.name, params: link.params})
          // } ,;
          // logout: function ( ) {
          //   $.ajax({
          //     url: this.url + 'auth/logout',
          //     success: data => {
          //       router.push({name: 'Auth'});
      // let willID = this.will.id;
      console.log('this.will.id', this.will.id,'this.id',this.id, 'will: ', this.will);
      // console.log('willID: ', willID, ' this.user.id: ', this.user.id);
      router.push({ name: 'ViewWill', params: { willID: this.will.id} });
      console.log('in newPage function with user.id: ', this.user.id);
    },
    addUser: function() {
      console.log('in addUser');
      this.$store.dispatch('addUser',{
       name: this.name,
       email: this.email,
       address: this.address,
       city: this.city,
       state: this.state,
       stateAbbr: this.stateAbbr,
       zip: this.zip,
       beneficiary: this.beneficiary,
       executor: this.executor,
       // property: this.property,
       readyWill: false
        });
      console.log('finishing addUser, user.id: ', this.user.id);
      },
    getUser: function() {
      this.$store.dispatch('getUser');
     },  
    getUsers: function() {
      this.$store.dispatch('getUsers');
     },


    // addWill: function() {
    //   console.log('IN addWill FUNCTION, beneficiary: ' this.user.beneficiary);
    //    this.$store.dispatch('addWill',{
    //      user.id: this.user.id,
    //      user.title: this.user.title,
    //      user.beneficiary: this.user.beneficiary,
    //      user.executor: this.user.executor,
    //    });
   //     .then(tweet => {
   // // this.text = "";
   // //     });
   //    this.userSubmitted = true;
   //  },

    buildWill: function () {
      console.log('in buildWill function: ', this.will);

         this.$store.dispatch('addWill',{
         user_id: this.user.id,
         title: this.title,
         beneficiary: this.beneficiary,
         executor: this.executor,
       });


      this.willParts.splice(0, 1, 'LAST WILL AND TESTAMENT OF: ' + this.user.name);
      this.willParts.splice(1, 1, 'I, ' + this.user.name + ', of ' + this.user.city + ', ' + this.user.state + ', being of sound mind and body do hereby declare that this document is my last will and testament. ');
      this.willParts.splice(2, 1, 'In executing such document, I hereby declare that: ');
      this.willParts.splice(3, 1, '1. I revoke all wills and codicils that I have previously made. ');
      this.willParts.splice(4, 1, '2. I am not currently married. I have no children now living, nor have I any deceased children who died and left issue.');
      this.willParts.splice(5, 1, '3. I give all my personal property or my interest in any such property not otherwise disposed of by this will or in any other manner together with any insurance on said property, to ' + this.beneficiary + '.');
      this.willParts.splice(6, 1, '4. I give the residue of my estate as follows: ');
      // this.willParts.splice(8, 1, 'I. To '  + this.secondaryBeneficiary + ', should such person survive me by thirty (30) days.');
      this.willParts.splice(7, 1, 'II. If the beneficiary named in 3.I does not survive me by thirty (30) days, then I give the rest and residue of my estate to those persons who would have taken said property under the interstate laws of the State of ' + this.user.state + '.');
      this.willParts.splice(8, 1, '5. I nominate ' + this.executor + ' as Executor of this Will, to serve without bond. The term "my Executor" as used in this Will shall include any personal representative of my estate.');
      this.willParts.splice(9, 1, 'Signature of ' + this.user.name + ': ___________________________________');
      this.willParts.splice(10, 1, 'On the date written below, ' + this.user.name + ' declared to us, that this instrument, consisting of these pages, was his or her Will and requested us to act as witnesses to it. He or she thereupon signed this Will in our presence. We declare under penalty of perjury that the foregoing is true and correct and that this attestation and this declaration are executed on ____________________ (date signed)');
       this.willParts.splice(11, 1, 'Signature of witness: ________________________________________');
       this.willParts.splice(12, 1, 'Signature of witness: ________________________________________');
       this.readyWill = true;
       this.userSubmitted = true;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: #262626;
  font-size: 2vw;
}
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
input {
  font-size: 2vw;
  padding: 3vw;
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
</style>