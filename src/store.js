import Vue from 'vue'
import Vuex from 'vuex'

import projects from './assets/json/test.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 项目列表
    projects: projects,
    // 当前正在测试的项目
    project: null,
    // 测试页面/编辑测试功能点页面中，左侧测试功能点菜单被点击的测试点id
    selectedTestMenuId: '',
    // selectedTestMenuId 对应的测试点
    selectedTestItem: null
  },
  mutations: {
    /**
     * 在项目列表页面选择将要测试/编辑的项目
     * @param {*} state
     * @param {*} projectId
     */
    selectProject(state, projectId) {
      state.projects.forEach(element => {
        if (element.id === projectId) {
          state.project = element
        }
      })
    },

    /**
     * 项目测试/编辑时，点击保存按钮保存当前的更改
     * @param {*} state
     * @param {*} project
     */
    saveProject(state, project) {
      state.projects.forEach(element => {
        if (element.id === project.id) {
          element = project
        }
      })
    },

    /**
     * 测试页面/编辑测试功能点页面中，点击左侧功能测试点菜单，选择当前测试/编辑的功能点
     * @param {*} state
     * @param {*} id
     */
    setSelectedTestMenuId(state, id) {
      state.selectedTestMenuId = id

      // 递归遍历state.project，找出id等于state.selectedTestMenuId的测试点（即state.selectedTestItem）
    }
  },
  actions: {}
})
