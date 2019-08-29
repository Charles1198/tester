<template>
  <div class="container">
    <div class="projects">
      <div v-for="project in projects" :key="project.id" class="projects-item">
        <div class="projects-item-icon">
          <i class="el-icon-s-flag"></i>
        </div>
        <div class="projects-item-info">
          <div class="projects-item-info-title">{{ project.name }}</div>
          <div>{{ project.description }}</div>
        </div>
        <div class="projects-item-actions">
          <div class="projects-item-action" @click="onClickTestBtn(project.id)">
            <el-tooltip class="item" effect="dark" content="测试" placement="top">
              <i class="el-icon-setting"></i>
            </el-tooltip>
          </div>
          <div class="projects-item-action" @click="onClickEditBtn(project.id)">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <i class="el-icon-edit"></i>
            </el-tooltip>
          </div>
          <div class="projects-item-action">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <i class="el-icon-view"></i>
            </el-tooltip>
          </div>
          <div class="projects-item-action">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
              <i class="el-icon-top-right"></i>
            </el-tooltip>
          </div>
          <div class="projects-item-action">
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i class="el-icon-delete"></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  computed: {
    projects() {
      return this.$store.state.projects
    }
  },
  methods: {
    onClickTestBtn(id) {
      this.$router.push({ path: '/test', query: { id: id } })
    },
    onClickEditBtn(id) {
      this.$router.push({ path: '/edit', query: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  padding: 100px 80px 0 80px;

  &-item {
    padding: 16px 24px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    background: #f0f8fa;
    border-radius: 8px;

    &:hover {
      box-shadow: 0 2px 8px rgba($color: black, $alpha: 0.15);
    }

    &-info {
      flex: 1;
      padding: 0 16px;

      &-title {
        font-size: 18px;
        font-weight: bold;
      }
    }

    &-actions {
      display: flex;
      align-items: center;
    }

    &-action {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      margin: 0 10px;
      cursor: pointer;

      &:hover {
        background: white;
      }
    }
  }
}
</style>
