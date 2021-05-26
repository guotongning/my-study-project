import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DomainList from '@/components/DomainList'
import Domain from '@/components/Domain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/domain/list',
      name: 'DomainList',
      component: DomainList
    },
    {
      path: '/domain/detail',
      name: 'Domain',
      component: Domain
    }
  ]
})
