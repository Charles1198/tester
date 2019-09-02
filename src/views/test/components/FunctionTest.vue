<template>
  <div v-if="testItem" class="p20">
    <div v-if="isTest">
      <el-divider content-position="left">功能测试点</el-divider>
      <div class="pl pr pb">{{ testItem.name }}</div>
      <el-divider content-position="left">测试步骤</el-divider>
      <div class="pl pr pb">{{ testItem.testStep }}</div>
      <el-divider content-position="left">预期结果</el-divider>
      <div class="pl pr pb">{{ testItem.expectantResult }}</div>
      <el-divider content-position="left">测试结果</el-divider>
      <div class="pl pr pb">
        <el-input v-model="testItem.testResult" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" placeholder="测试结果" />
      </div>
      <el-divider content-position="left">备注</el-divider>
      <div class="pl pr pb">
        <el-input v-model="testItem.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" placeholder="备注" />
      </div>
      <el-divider content-position="left">测试状态</el-divider>
      <div class="pl pr pb">
        <el-radio-group>
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
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" :placeholder="testItem.testStep" />
      </div>
      <el-divider content-position="left">预期结果</el-divider>
      <div class="pl pr pb">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" :placeholder="testItem.expectantResult" />
      </div>
      <el-divider content-position="left">测试状态</el-divider>
      <div class="pl pr pb">
        <el-radio-group>
          <el-radio :label="3">待测试</el-radio>
          <el-radio :label="6">通过</el-radio>
          <el-radio :label="9">不通过</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <el-button type="success" @click="onClickSaveBtn">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'functionTest',
  data() {
    return {
      isTest: this.$router.history.current.meta.test,
      testItem: null
    }
  },
  computed: {
    selectedTestItem() {
      return this.$store.state.selectedTestItem
    }
  },
  watch: {
    selectedTestItem: {
      handler() {
        this.testItem = this.selectedTestItem
      },
      immediate: true
    }
  },
  methods: {
    onClickSaveBtn() {
      this.$store.commit('saveChange', this.testItem)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
