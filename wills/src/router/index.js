import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
// import SearchResults from '@/components/SearchResults'
import HashTag from '@/components/HashTag'
import UserPage from '@/components/UserPage'
import BuildWill from '@/components/BuildWill'
import ViewWill from '@/components/ViewWill'
import ListWills from '@/components/ListWills'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/hashtag/:hashtag',
      name: 'HashTag',
      component: HashTag
    },
    {
      path: '/user/:userID',
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/buildwill',
      name: 'BuildWill',
      component: BuildWill
    },
    {
      path: '/viewwill/:willID',
      name: 'ViewWill',
      component: ViewWill
    },
    {
      path: '/viewwill',
      name: 'ViewWill',
      component: ViewWill
    },
        {
      path: '/listwills',
      name: 'ListWills',
      component: ListWills
    },
    // {
    //   path: '/user/:userID',
    //   name: 'UserPage',
    //   component: UserPage
    // },
  ]
})
