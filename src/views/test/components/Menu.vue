<template>
  <div class="container">
    <menu-item v-for="menu in menus" :key="menu.id" :menu="menu" v-on:on-click-close-icon="onClickCloseIcon" v-on:on-select-menu-item="onClickMenuItem" />
  </div>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  props: {
    testType: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['function-test', 'form-test', 'function-test-edit', 'form-test-edit'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      menus: [],
      menusInited: false
    }
  },
  watch: {
    testType: {
      handler() {
        this.setupMenus()
      },
      immediate: true
    }
  },
  methods: {
    setupMenus() {
      this.menusInited = this.menus.length > 0
      this.menus = []
      const project = this.$store.state.project
      switch (this.testType) {
        case 'function-test':
          this.menus = JSON.parse(JSON.stringify(project.test.functionTest))
          break
        case 'function-test-edit':
          this.menus = JSON.parse(JSON.stringify(project.test.functionTest))
          break
        case 'form-test':
          this.menus = JSON.parse(JSON.stringify(project.test.formTest))
          break
        case 'form-test-edit':
          this.menus = JSON.parse(JSON.stringify(project.test.formTest))
          break
      }
      this.setupMenu(this.menus)

      this.selectFirstMenu(this.menus)
    },

    setupMenu(menus) {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i]
        this.$set(menu, 'closed', false)
        this.$set(menu, 'level', menu.id.split('-').length - 1)
        if (menu.children) {
          this.setupMenu(menu.children)
        }
      }
    },

    selectFirstMenu(menus) {
      if (menus[0].children) {
        this.selectFirstMenu(menus[0].children)
      } else {
        const firstMenuId = menus[0].id
        this.$emit('on-select-menu', firstMenuId)
      }
    },

    onClickCloseIcon(id) {
      this.convertColoseState(id, this.menus)
    },

    onClickMenuItem(id) {
      this.$emit('on-select-menu', id)
    },

    convertColoseState(id, menus) {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i]
        if (id.startsWith(menu.id)) {
          if (id === menu.id) {
            menu.closed = !menu.closed
          } else {
            this.convertColoseState(id, menu.children)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
