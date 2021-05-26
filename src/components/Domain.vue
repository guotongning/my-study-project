<template>
  <div>
    <router-link :to="{name:'DomainList'}">
      返回列表页
    </router-link>
    <div>
      <p>描述：{{ domain.description }}</p>
      <p>域名：{{ domain.domain }}</p>
      <p>状态：{{ domain.status }}</p>
      <p>创建于：{{ domain.createTime }}</p>
      <p>最后修改时间：{{ domain.updateTime }}</p>
    </div>
  </div>
</template>

<script>
import DomainList from './DomainList'

export default {
  name: 'Domain',
  data () {
    return {
      domain: {}
    }
  },
  mounted () {
    this.$http.get('api/demo/domain/get/' + this.$route.query.id)
      .then(
        resSuccess => {
          this.domain = JSON.parse(JSON.stringify(resSuccess.body.data))
          this.domain.createTime = this.timeFormat(this.domain.createTime)
          this.domain.updateTime = this.timeFormat(this.domain.updateTime)
          this.domain.status = this.domain.status === 1 ? '使用中' : '禁用中'
        },
        resError => {
          console.error(resError)
        }
      )
  },
  methods: {
    timeFormat (timeStamp) {
      return DomainList.methods.timeFormat(timeStamp)
    }
  }
}
</script>

<style scoped>

</style>
