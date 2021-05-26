<template>
  <div class="table">
    <h5>{{ title }}</h5>
    <table v-bind:title="tableName">
      <tr class="tableHead">
        <td>域名</td>
        <td>描述</td>
        <td>状态</td>
        <td>创建时间</td>
        <td>修改时间</td>
        <td>操作</td>
      </tr>
      <tr v-for="domain in domainList" :key="domain.id" class="tableBody">
        <td>{{ domain.domain }}</td>
        <td>{{ domain.description }}</td>
        <td>{{ domain.status }}</td>
        <td>{{ domain.createTime }}</td>
        <td>{{ domain.updateTime }}</td>
        <router-link :to="{name:'Domain',query:{id:domain.id}}">详情</router-link>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '域名列表页',
      tableName: '域名列表',
      domainList: []
    }
  },
  mounted () {
    this.$http.get('api/demo/domain/list').then(successRes => {
      let result = JSON.parse(JSON.stringify(successRes))
      for (const domain of result.body.data) {
        domain.status = domain.status === 1 ? '启用中' : '禁用中'
        domain.createTime = this.timeFormat(domain.createTime)
        domain.updateTime = this.timeFormat(domain.updateTime)
      }
      this.domainList = result.body.data
    }, errorRes => {
      console.error(errorRes)
    })
  },
  methods: {
    timeFormat (timeStamp) {
      let time = new Date(timeStamp)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hours = time.getHours()
      let minutes = time.getMinutes()
      let seconds = time.getSeconds()
      return year + '-' + this.addZero(month) + '-' + this.addZero(date) + ' ' + this.addZero(hours) + ':' + this.addZero(minutes) + ':' + this.addZero(seconds)
    },
    addZero (num) {
      return num < 10 ? '0' + num : num
    }
  }
}
</script>

<style scoped>
td {
  border: 0 solid;
}

.table {
  font-size: 10px;
  width: 600px;
  position: absolute;
  left: 55%;
  top: 50%;
  transform: translate(-45%, -50%);
}

.tableHead {
  background-color: #9fc4dc;
}

.tableBody {
  background-color: #f4f5f1;
}
</style>
