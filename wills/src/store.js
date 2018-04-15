import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    user: {},
    will: {},
    wills: [],
    loggedIn: false,
    loginError: '',
    registerError: '',
    feed: [],
    userView: [],
    feedView: [],
  },
  getters: {
    user: state => state.user,
    will: state => state.will,
    wills: state => state.wills,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    userView: state => state.userView,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setWill (state, will) {
      state.will = will;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setWills (state, wills) {
      state.wills = wills;
    },
  },
actions: {
    // Registration, Login //
register(context,user) {
  console.log('in register: ', user);
  return axios.post("/api/users",user).then(response => {
  	context.commit('setUser', response.data.user);
  	context.commit('setLogin',true);
  	context.commit('setRegisterError',"");
  	context.commit('setLoginError',"");
        }).catch(error => {
  	context.commit('setLogin',false);
  	context.commit('setLoginError',"");
  	if (error.response) {
  	  if (error.response.status === 403)
  	    context.commit('setRegisterError',"That email address already has an account.");
  	  else if (error.response.status === 409)
  	    context.commit('setRegisterError',"That user name is already taken.");
  	  return;
  	}
  	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
        });
  },
login(context,user) {
  return axios.post("/api/login",user).then(response => {
  	context.commit('setUser', response.data.user);
  	context.commit('setLogin',true);
  	context.commit('setRegisterError',"");
  	context.commit('setLoginError',"");
        }).catch(error => {
  	context.commit('setLogin',false);
  	context.commit('setRegisterError',"");
  	if (error.response) {
  	  if (error.response.status === 403 || error.response.status === 400)
  	    context.commit('setLoginError',"Invalid login.");
  	    context.commit('setRegisterError',"");
  	    return;
	}
	console.log(error);
	context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
 logout(context,user) {
    context.commit('setUser', {});
    context.commit('setWill', {});
    context.commit('setLogin',false);
    },
 getUser(context,user) {
    return axios.get("/api/users/" + user.id).then(response => {
  	context.commit('setUserView',response.data.user);
        }).catch(err => {
  	console.log("getUser failed:",err);
      });
    },
 getWill(context,user) {
    return axios.get("/api/wills/" + context.state.will.id).then(response => {
    context.commit('setWill',response.data.will);
        }).catch(err => {
    console.log("getWill failed:",err);
      });
    },

 getWills(context,user) {
      console.log('in getWills in store with user: ', context.state.user.id);
      return axios.get("/api/wills/" + context.state.user.id+ "/wills").then(response => {
      context.commit('setWills',response.data.wills);
      console.log('response.data.wills: ', response.data.wills);
          }).catch(err => {
      console.log("getWills failed:",err);
      });
    },

  addWill(context,will) {
      console.log('in addWill to add a will for user.id: ', context.state.user.id, 'with title: ', will.title);
      return axios.post("/api/users/" + context.state.user.id + "/wills",will).then(response => {
      console.log('response.data.will: ', response.data.will);
	    context.commit('setWill',response.data.will);
      console.log('after adding to database will: ', response.data.will);
      }).catch(err => {
      console.log("addWill failed:",err);
      });
    },
 
  deleteWill(context,id) {
    console.log('in deleteWill with id: ', id);
      return axios.delete("/api/wills/" + id).then(response => {
	  context.dispatch('getWills');
      }).catch(err => {
	  console.log("deleteWill failed:",err);
      });
    },
  }
});
