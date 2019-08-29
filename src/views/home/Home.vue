<template>
  <div class="container">
    <header>
      <div class="title">测试管理器</div>
      <div class="tabs">
        <div class="tabs-tab" @click="tabIndex = 0">
          <div>项目</div>
          <div v-show="tabIndex === 0" class="tabs-tab-nav"></div>
        </div>
        <div class="tabs-tab" @click="tabIndex = 1">
          <div>创建</div>
          <div v-show="tabIndex === 1" class="tabs-tab-nav"></div>
        </div>
        <div class="tabs-tab" @click="tabIndex = 2">
          <div>导入</div>
          <div v-show="tabIndex === 2" class="tabs-tab-nav"></div>
        </div>
      </div>
    </header>
    <main>
      <projects v-if="tabIndex === 0" />
      <create v-if="tabIndex === 1" />
      <import v-if="tabIndex === 2" />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Projects from '@/views/home/components/Projects.vue'
import Create from '@/views/home/components/Create.vue'
import Import from '@/views/home/components/Import.vue'

export default {
  name: 'home',
  components: {
    Projects,
    Create,
    Import
  },
  data() {
    return {
      tabIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: #c8ebdf;
}

.title {
  padding: 16px;
  font-size: 24px;
  text-align: center;
  font-weight: lighter;
}

.tabs {
  display: flex;
  justify-content: center;

  &-tab {
    padding-top: 8px;
    width: 100px;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
    }

    &-nav {
      width: 4px;
      height: 4px;
      border-top: 9px solid transparent;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 9px solid white;
      margin: 0 auto;
    }
  }
}

main {
  height: calc(#{100%} - #{119px});
}
</style>
