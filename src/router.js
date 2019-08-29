import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test/Test.vue'),
      children: [
        {
          path: '',
          name: 'function-test',
          component: () => import('@/views/test/components/FunctionTest.vue'),
          meta: { label: '功能测试', test: true }
        },
        {
          path: 'form-test',
          name: 'form-test',
          component: () => import('@/views/test/components/FormTest.vue'),
          meta: { label: '表单测试', test: true }
        }
      ]
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('./views/test/Test.vue'),
      children: [
        {
          path: '',
          name: 'function-test-edit',
          component: () => import('@/views/test/components/FunctionTest.vue'),
          meta: { label: '功能测试', test: false }
        },
        {
          path: 'form-test-edit',
          name: 'form-test-edit',
          component: () => import('@/views/test/components/FormTest.vue'),
          meta: { label: '表单测试', test: false }
        }
      ]
    }
  ]
})
