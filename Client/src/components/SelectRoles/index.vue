<template>
  <div>
    <treeselect :default-expand-level="3" :options="orgs" :multiple="false" :show-count="true" @select="onSelect" @input="input"></treeselect>
    <el-transfer v-model="selectRoles" :data="orgRoles" @change="handleChange" :titles="['系统角色', '已选角色']"></el-transfer>
  </div>
</template>

<script>
  import {
    listToTreeSelect
  } from '@/utils'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import * as login from '@/api/login'
  import * as apiRoles from '@/api/roles'

  export default {
    name: 'select-roles',
    components: {
      Treeselect
    },
    props: ['roles'],
    data() { // todo:兼容layui的样式、图标
      return {
        selectRoles: this.roles,
        orgRoles: [], // 该组织的全部角色
        orgs: []
      }
    },
    watch: {
      roles(val) { // 因为组件只挂载一次，后期只能通过watch来改变selectusers的值
        this.selectRoles = val
      }
    },
    mounted() {
      console.log('mounted')
      var _this = this
      login.getOrgs().then(response => {
        var orgs = response.result.map(function(item, index, input) {
          return {
            id: item.id,
            label: item.name,
            parentId: item.parentId
          }
        })
        var tree = listToTreeSelect(orgs)
  
        _this.orgs = tree
        _this.getOrgRoles('')

        console.log(_this.selectRoles)
      })
    },
    methods: {
      getOrgRoles(orgId) {
        var _this = this
        apiRoles.getList({ orgId: orgId }).then(response => {
          _this.orgRoles = response.data.map(function(item, index, input) {
            return { key: item.id, label: item.name }
          })
        })
      },
      onSelect: function(node, instanceId) {
        this.getOrgRoles(node.id)
      },
      input: function(node, instanceId) {
        if (node === undefined) { // 清空选择
          this.getOrgRoles('')
        }
      },
      handleChange(value, direction, movedKeys) {
        console.log(JSON.stringify(this.selectRoles))
        this.$emit('roles-change', this.selectRoles)
      }
    }
  }

</script>

<style scoped>
 .el-transfer{
   margin-top:10px;
 }
</style>
