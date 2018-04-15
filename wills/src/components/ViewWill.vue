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
          <li class="nav-item">
            <a class="nav-link" href="#/Will">Will</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#/ViewWill">View Will</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="#/ListWills">List Wills</a>
          </li>
        </ul>
      </div>
    </nav><br><br> -->
    <div class="container">
      <div>
        <h2 class="text-center" v-if="!noUserData">Viewing Will Titled: {{will.title}}</h2><br>
        <h1 class="text-center" v-if="noUserData">Please login if needed  and then select "Build Will" in the menu at the top to enter your information.</h1>
      </div>
    <br>
    <div>
    <div v-if="readyWill">
      <p v-for="part in willParts">
      {{ part }}</p>
    </div>
  </div><br><br><br><br>

 </div>
 </div>
</template>

<script>
// import router from '../router/index.js';
export default {
  name: 'ViewWill',
  data () {
    return {
      // will: {},
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
      readyWill: false,
      noUserData: true,
      willParts: []
    }
  },
  computed: {
     will: function() {
       return this.$store.getters.will;
       console.log('computed will: ', will);
     },     
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

     console.log('before dispatching to getWill, this.will, this.will.user_id: ', this.will, this.will.user_id);
     console.log('between dispatching to getWill, this.will, this.will.user_id: ', this.will, this.will.user_id);
     this.$store.dispatch('getWill',{id:this.$route.params.willID});

     this.$store.dispatch('getUser',{id:this.will.user_id});
     console.log('this.$route.params.willID: ', this.$route.params.willID);
     console.log('after routing to View Will ');
 
     // this.getUser(this.id);
     console.log('after returning from getWill, getUser in View Will ', this.will, this.user);
     if (this.user.name != undefined) {
       this.buildWill();
     } else { 
       this.noUserData = true;
     }

     console.log('after returning from buildWill in View Will ', this.user);
     readyWill: true;
   },
  methods: {
    // addUser: function() {
    //   this.$store.dispatch('addUser',{
    //    text: this.text,
    //    completed: false
    //     });
    //   },
    // getUser: function() {
    //   this.$store.dispatch('getUser',{
    //     // id: user.id
    //     id: this.will.user_id,
    //     });
    //   // console.log (user);
    //  },
    // getWill: function() {
    //   this.$store.dispatch('getWill',{
    //     // id: user.id
    //     id: this.id,
    //     });
    //   // console.log (user);
    //  },
    getUsers: function() {
      this.$store.dispatch('getUsers');
     },
    deleteItem: function(id) {
      this.$store.dispatch('deleteUser', id);
      }, 

    buildWill: function () {
      // getUser()
    console.log ('in buildWill function - this.user, this.will: ', this.user, this.will);


      this.willParts.splice(0, 1, 'LAST WILL AND TESTAMENT OF: ' + this.user.name);
      this.willParts.splice(1, 1, 'I, ' + this.user.name + ', of ' + this.user.city + ', ' + this.user.state + ', being of sound mind and body do hereby declare that this document is my last will and testament. ');
      this.willParts.splice(2, 1, 'In executing such document, I hereby declare that: ');
      this.willParts.splice(3, 1, '1. I revoke all wills and codicils that I have previously made. ');
      this.willParts.splice(4, 1, '2. I am not currently married. I have no children now living, nor have I any deceased children who died and left issue.');
      this.willParts.splice(5, 1, '3. I give all my personal property including or my interest in any such property not otherwise disposed of by this will or in any other manner together with any insurance on said property, to ' + this.will.beneficiary + '.');
      this.willParts.splice(7, 1, '4. I give the residue of my estate as follows: ');
      this.willParts.splice(9, 1, 'II. If the beneficiary named in 3.I does not survive me by thirty (30) days, then I give the rest and residue of my estate to those persons who would have taken said property under the interstate laws of the State of ' + this.user.state + '.');
      this.willParts.splice(10, 1, '5. I nominate ' + this.will.executor + ' as Executor of this Will, to serve without bond. The term "my Executor" as used in this Will shall include any personal representative of my estate.');
      this.willParts.splice(11, 1, 'Signature of ' + this.user.name + ': ___________________________________');
      this.willParts.splice(12, 1, 'On the date written below, ' + this.user.name + ' declared to us that this instrument, consisting of these pages, was his or her Will and requested us to act as witnesses to it. He or she thereupon signed this Will in our presence. We declare under penalty of perjury that the foregoing is true and correct and that this attestation and this declaration are executed on ____________________ (date signed)');
       this.willParts.splice(13, 1, 'Signature of witness: ________________________________________');
       this.willParts.splice(14, 1, 'Signature of witness: ________________________________________');
       this.readyWill = true;
       console.log('this.readyWill = true');
       this.noUserData = false;

    }
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
</style>