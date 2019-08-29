<template>
  <div class="container">
    <div class="header">
      <div class="header-project">
        <div class="header-project-back" @click="onClickBackBtn">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="header-project-name">项目一</div>
      </div>
      <div class="header-tabs">
        <div v-for="route in routes" :key="route.routeName" class="header-tabs-tab" @click="onClickTab(route)">
          <div>{{ route.routeLabel }}</div>
          <div v-show="currentRouteName === route.routeName" class="header-tabs-tab-nav"></div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="menu">
        <Menu v-if="currentRouteName" :testType="currentRouteName" v-on:on-select-menu="onSelectMenu"></Menu>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu'
const lsKeyProjectId = 'lsKeyProjectId'

export default {
  name: 'test',
  components: {
    Menu
  },
  data() {
    return {
      currentRouteName: '',
      currentRouteLabel: '',
      testRoutes: [
        {
          routeName: 'function-test',
          routeLabel: '功能测试'
        },
        {
          routeName: 'form-test',
          routeLabel: '表单测试'
        }
      ],
      editRoutes: [
        {
          routeName: 'function-test-edit',
          routeLabel: '功能测试'
        },
        {
          routeName: 'form-test-edit',
          routeLabel: '表单测试'
        }
      ],
      routes: [],
      edited: true
    }
  },
  beforeDestroy() {
    localStorage.removeItem(lsKeyProjectId)
  },
  mounted() {
    this.currentRouteName = this.$router.history.current.name
    this.currentRouteLabel = this.$router.history.current.meta.label

    this.routes = this.$router.history.current.meta.test
      ? this.testRoutes
      : this.editRoutes

    let projectId
    if (localStorage.getItem(lsKeyProjectId)) {
      projectId = localStorage.getItem(lsKeyProjectId)
    } else {
      projectId = this.$route.query.id
      localStorage.setItem(lsKeyProjectId, projectId)
    }
    this.$store.commit('selectProject', projectId)
  },
  methods: {
    onClickTab(route) {
      this.currentRouteName = route.routeName
      this.currentRouteLabel = route.routeLabel
      this.$router.push({ name: route.routeName })
    },

    onSelectMenu(id) {
      this.$store.commit('setSelectedTestMenuId', id)
    },

    onClickBackBtn() {
      if (this.edited) {
        this.$confirm('', '是否保存更改？', {
          confirmButtonText: '保存',
          cancelButtonText: '不保存',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              message: '更改已保存',
              type: 'success'
            })
            this.$router.push('/')
          })
          .catch(() => {
            this.$router.push('/')
          })
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 66px;
$menu-width: 300px;

.header {
  position: relative;
  background: #c8ebdf;
  height: $header-height;
  display: flex;
  align-items: center;
  box-shadow: 2px 0 10px rgba($color: black, $alpha: 0.15);

  &-project {
    display: flex;
    align-items: center;
    width: $menu-width;
    margin-right: 20px;

    &-back {
      padding: 10px 6px 10px 16px;
      cursor: pointer;
    }

    &-name {
      color: #2c3e50;
      font-size: 16px;
    }
  }

  &-divider {
    width: 4px;
    height: 50%;
    margin-right: 20px;
    background: white;
  }

  &-tabs {
    display: flex;

    &-tab {
      position: relative;
      width: 100px;
      height: $header-height;
      text-align: center;
      line-height: $header-height;
      cursor: pointer;

      &:hover {
        background: #f1f1f1;
      }

      &-nav {
        position: absolute;
        bottom: 2px;
        left: 20px;
        width: 60px;
        height: 4px;
        border-radius: 2px;
        background: white;
      }
    }
  }
}

.body {
  display: flex;
  height: calc(#{100%} - #{$header-height});
}

.menu {
  width: $menu-width;
  height: 100%;
  background: white;
  box-shadow: 2px 0 10px rgba($color: black, $alpha: 0.15);
}

.main {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
}
</style>
