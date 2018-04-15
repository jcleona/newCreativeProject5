<template>
  <div class="text-left">
    <div id="willForm" class="container">
    <form>
      <p>Login if needed and then fill out the following information: <p>
      <div class="form-group">
        <label for="FormControlInput0">Title</label>
        <input v-model="title" type="text" class="form-control" id="FormControlInput0" placeholder="Give this will a title...">
      </div>
      <div class="form-group">
        <label for="FormControlInput7">To whom would you like to leave your personal property?</label>
        <input v-model="beneficiary" type="name" class="form-control" id="FormControlInput7" placeholder="Full Name...">
      </div>
       <div class="form-group">
        <label for="FormControlInput8">Who would you like to be the executor of your estate?</label>
        <input v-model="executor" type="name" class="form-control" id="FormControlInput8" placeholder="Full Name...">
      </div>
      <div style = "background-color: Gainsboro;" class="text-center form-group form-control btn-outline-secondary">
        <button type="submit" v-on:click.prevent="buildWill" class="btn btn-default">Submit</button><br>
      </div>
      <div v-if="userSubmitted"  style = "background-color: Gainsboro;" class="text-center form-group form-control btn-outline-secondary">
        <button type="submit" v-on:click.prevent="newPage" class="btn btn-default">Click here to see your will in a new page.</button><br>
      </div>
    </form>
    <div>
      <p v-for="part in willParts">
       {{ part }}</p>
    </div>
  </div>
  <br><br><br><br>
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
  },
  created() {
     console.log('user.id: ', this.user.id);
     console.log('user: ', this.user);
     this.userSubmitted = false
  }, 
  methods: {
    newPage: function() {
      console.log('this.will.id', this.will.id,'this.id',this.id, 'will: ', this.will);
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