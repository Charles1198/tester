<template>
  <div class="p20">
    <div v-if="isTest">
      <el-divider content-position="left">功能测试点</el-divider>
      <div class="pl pr pb">{{ testItem.name }}</div>
      <el-divider content-position="left">测试步骤</el-divider>
      <div class="pl pr pb">{{ testItem.testResult }}</div>
      <el-divider content-position="left">预期结果</el-divider>
      <div class="pl pr pb">{{ testItem.expectantResult }}</div>
      <el-divider content-position="left">测试结果</el-divider>
      <div class="pl pr pb">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" placeholder="测试结果" />
      </div>
      <el-divider content-position="left">备注</el-divider>
      <div class="pl pr pb">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" placeholder="备注" />
      </div>
      <el-divider content-position="left">测试状态</el-divider>
      <div class="pl pr pb">
        <el-radio-group v-model="radio">
          <el-radio :label="3">待测试</el-radio>
          <el-radio :label="6">通过</el-radio>
          <el-radio :label="9">不通过</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-else>
      <el-divider content-position="left">功能测试点</el-divider>
      <div class="pl pr pb">
        <el-input :placeholder="testItem.name" />
      </div>
      <el-divider content-position="left">测试步骤</el-divider>
      <div class="pl pr pb">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" :placeholder="testItem.testResult" />
      </div>
      <el-divider content-position="left">预期结果</el-divider>
      <div class="pl pr pb">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" :placeholder="testItem.expectantResult" />
      </div>
      <el-divider content-position="left">测试状态</el-divider>
      <div class="pl pr pb">
        <el-radio-group v-model="radio">
          <el-radio :label="3">待测试</el-radio>
          <el-radio :label="6">通过</el-radio>
          <el-radio :label="9">不通过</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formTest',
  data() {
    return {
      isTest: this.$router.history.current.meta.test,
      testItem: null
    }
  },
  computed: {
    selectedTestMenuId() {
      return this.$store.state.selectedTestMenuId
    }
  },
  watch: {
    selectedTestMenuId: {
      handler() {
        const project = this.$store.state.project
        this.setupTestItem(this.selectedTestMenuId, project.test.formTest)
      },
      immediate: true
    }
  },
  methods: {
    setupTestItem(id, items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (id.startsWith(item.id)) {
          if (id === item.id) {
            this.testItem = item
          } else {
            this.setupTestItem(id, item.children)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
