<template>
  <div>
    <div class="menu">
      <!-- 缩进 -->
      <div v-for="n in menu.level" :key="n" class="menu-gap"></div>
      <!-- 打开/关闭 图标 -->
      <div v-if="menu.children" class="menu-icon" @click="onClickCloseIcon(menu.id)">
        <i v-if="menu.closed" class="el-icon-arrow-right"></i>
        <i v-else class="el-icon-arrow-down"></i>
      </div>
      <!-- 缩进根节点 -->
      <div v-else class="menu-icon" />
      <!-- 非根节点 -->
      <div v-if="menu.children" class="menu-label" @click="onClickCloseIcon(menu.id)">{{ menu.name }}</div>
      <!-- 根节点 -->
      <div v-else class="menu-label" @click="onClickMenuItem(menu.id)">{{ menu.name }}</div>

      <div v-if="isTest" v-show="!menu.children" class="menu-dashed-line"></div>
      <!-- 是否通过 -->
      <div v-if="isTest" v-show="!menu.children">
        <i v-show="menu.status === 0" class="el-icon-error" style="color: #F56C6C"></i>
        <i v-show="menu.status === 1" class="el-icon-success" style="color: #67C23A"></i>
        <div v-show="menu.status === 2" class="icon-circle"></div>
      </div>
    </div>
    <!-- 子节点 -->
    <div v-if="!menu.closed && menu.children">
      <menu-item v-for="subMenu in menu.children" :key="subMenu.id" :menu="subMenu" v-on:on-click-close-icon="onClickCloseIcon" v-on:on-select-menu-item="onClickMenuItem" />
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'MenuItem',
  components: {
    MenuItem
  },
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isTest: this.$router.history.current.meta.test
    }
  },
  methods: {
    onClickCloseIcon(id) {
      this.$emit('on-click-close-icon', id)
    },

    onClickMenuItem(id) {
      this.$emit('on-select-menu-item', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 16px;

  &-gap {
    width: 16px;
  }

  &-icon {
    cursor: pointer;
    width: 24px;
    display: flex;
    align-items: center;
  }

  &-label {
    cursor: pointer;
    line-height: 30px;
  }

  &-dashed-line {
    border-top: 2px dashed #eee;
    flex: 1;
    margin: 0 12px;
  }
}

.icon-circle {
  width: 10px;
  height: 10px;
  margin-right: 1px;
  border: 2px solid #909399;
  border-radius: 50%;
}
</style>
