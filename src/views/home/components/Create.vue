<template>
  <div class="container">
    <div class="create">
      <div class="create-item">
        <div class="create-item-label">项目名</div>
        <el-input v-model="input" placeholder="项目名"></el-input>
      </div>
      <div class="create-item">
        <div class="create-item-label">项目描述</div>
        <el-input v-model="input" placeholder="项目描述"></el-input>
      </div>
      <div class="create-item">
        <div class="create-item-label">项目类型</div>
        <el-radio-group v-model="projectType">
          <el-radio label="web">web</el-radio>
          <el-radio label="app">app</el-radio>
        </el-radio-group>
      </div>
      <div class="create-actions">
        <div class="create-actions-item">
          <el-button icon="el-icon-close">取消</el-button>
        </div>
        <div class="create-actions-item">
          <el-button icon="el-icon-check" type="success">创建</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data() {
    return {
      projectType: 'web'
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  padding-top: 80px;
  width: 400px;
  margin: 0 auto;

  &-item {
    margin-bottom: 36px;

    &-label {
      margin-bottom: 8px;
    }
  }

  &-actions {
    display: flex;

    &-item {
      flex: 1;
      padding: 0 4px;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
