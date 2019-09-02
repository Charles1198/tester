import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import projects from './assets/json/test.json'

Vue.use(Vuex)

const projectName = 'tester'
const serverUrl = 'http://test-api-tomcat.bqteam.com/charles-service-api-0.0.1/api/v1/common/kv'

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
      if (id.startsWith('fu')) {
        state.selectedTestItem = setupTestItem(id, state.project.test.functionTest)
      } else if (id.startsWith('fo')) {
        state.selectedTestItem = setupTestItem(id, state.project.test.formTest)
      }
    },

    saveChange(state, testItem) {
      // 递归遍历state.project，找出id等于testItem.id的测试点，进行替换
      if (testItem.id.startsWith('fu')) {
        state.selectedTestItem = saveChange(testItem, state.project.test.functionTest)
      } else if (testItem.id.startsWith('fo')) {
        state.selectedTestItem = saveChange(testItem, state.project.test.formTest)
      }

      const projectsString = JSON.stringify(state.projects)
      axios
        .post(serverUrl, {
          k: projectName,
          v: projectsString
        })
        .then(function(response) {
          // eslint-disable-next-line no-console
          console.log(response)
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  },
  actions: {}
})

export function setupTestItem(id, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (id.startsWith(item.id)) {
      if (id === item.id) {
        return item
      } else {
        return setupTestItem(id, item.children)
      }
    }
  }
}

export function saveChange(testItem, items) {
  const id = testItem.id

  for (let i = 0; i < items.length; i++) {
    if (id.startsWith(items[i].id)) {
      if (id === items[i].id) {
        items[i] = testItem
        return testItem
      } else {
        return saveChange(testItem, items[i].children)
      }
    }
  }
}
