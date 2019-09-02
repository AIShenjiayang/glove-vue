<!--流程设计界面-->
<template>
  <div>
     <div id="flowPanel"></div>

      <el-dialog class="dialog-mini" width="650px" v-el-drag-dialog :title="temp.name" :visible.sync="dialogFormVisible">
				<el-form :rules="rules" ref="dataForm" :model="temp" label-width="100px">
					<el-form-item size="small" :label="'Id'" prop="id">
						<el-input v-model="temp.id" style="width: 200px;" readonly disabled></el-input>
					</el-form-item>

					<el-form-item size="small" :label="'名称'" prop="name">
						<el-input v-model="temp.name"></el-input>
					</el-form-item>

					 <el-form-item size="small" :label="'执行权限'" prop="NodeDesignate">
						<el-select class="filter-item" style="width:100%" v-model="temp.setInfo.NodeDesignate" placeholder="请选择">
							<el-option v-for="item in  NodeDesignates" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

					 <el-form-item size="small" :label="'指定用户'" v-if="temp.setInfo.NodeDesignate ==='SPECIAL_USER'" prop="NodeDesignateUsers">
							<select-users :users="temp.setInfo.NodeDesignateData.users" v-on:users-change="usersChange"></select-users>
					 </el-form-item>

					 <el-form-item size="small" :label="'会签类型'" v-if="temp.type=='fork'" prop="NodeConfluenceType">
						<el-select class="filter-item" v-model="temp.setInfo.NodeConfluenceType" placeholder="请选择">
							<el-option v-for="item in  NodeConfluenceTypes" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

				</el-form>
				<div slot="footer">
					<el-button size="small" slot="footer" @click="dialogFormVisible = false">取消</el-button>
					<el-button size="small" slot="footer" type="primary" @click="updateData">确认</el-button>
				</div>
    </el-dialog>
  </div>
</template>
<script>
  import 'jquery'
  import './flowlayout'
  import '@/assets/flow/GooFlow.css'
import elDragDialog from '@/directive/el-dragDialog'
  import SelectUsers from '@/components/SelectUsers'

  export default {
    name: 'flow-editor',
    components: { SelectUsers },
    props: {
      schemeContent: String,
      isEdit: Boolean,
      isPreview: Boolean
    },
    directives: {
      elDragDialog
    },
    data() {
      return {
        orgs: [], // treeselect选择中的部门
        flowDesignPanel: null,
        dialogFormVisible: false,
        NodeConfluenceTypes: [
          { id: 'all', name: '全部通过' },
          { id: 'one', name: '至少一个通过' }
        ],
        NodeDesignates: [
          { id: 'SPECIAL_USER', name: '指定用户' },
          { id: 'ALL_USER', name: '所有人' },
          { id: 'SPECIAL_ROLE', name: '指定角色' }
        ],
        NodeRejectTypes: [
          { id: '0', name: '前一步' },
          { id: '1', name: '第一步' },
          { id: '2', name: '某一步' },
          { id: '3', name: '用户指定' },
          { id: '4', name: '不处理' }
        ],
        temp: {
          id: undefined,
          name: '',
          type: '',
          setInfo: {
            NodeRejectType: 0, // 驳回类型
            NodeConfluenceType: '', // 会签方式
            NodeDesignate: '', // 节点权限方式
            NodeDesignateData: { // 节点指定操作人
              users: [],
              roles: []
            }
          }
        },
        rules: {
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      var _this = this // 记录vuecomponent
      this.flowDesignPanel = $('#flowPanel').flowdesign({
        height: '600',
        haveTool: !_this.isPreview,
        OpenNode: function(obj) {
          if (obj.type === 'start round mix' || obj.type === 'end round') {
            alert('开始节点与结束节点不能设置')
            return false
          }

          _this.resetTemp()
          _this.temp = Object.assign(_this.temp, obj) // copy obj
          _this.dialogFormVisible = true
          _this.$nextTick(() => {
            _this.$refs['dataForm'].clearValidate()
          })
        },
        OpenLine: function(id, object) {
          alert('暂不能设置分支条件')
          return
        }
      })
    },

    watch: {
      schemeContent(val) {
        if (val !== undefined && val !== '-1') {
          this.flowDesignPanel.loadData(JSON.parse(val))
        }
      }
    },
  
    methods: {
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          type: 'node',
          setInfo: {
            NodeConfluenceType: 'all', // 会签方式
            NodeDesignate: 'ALL_USER', // 节点权限方式
            NodeDesignateData: { // 节点指定操作人
              users: [],
              roles: []
            }
          }
        }
      },
      updateData() { // 更新提交
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // const tempData = Object.assign({}, this.temp)
            // 设置节点的附加信息
            this.flowDesignPanel.SetNodeEx(this.temp.id, this.temp)
            this.dialogFormVisible = false
          }
        })
      },
      usersChange(users) { // 可执行用户
        this.temp.setInfo.NodeDesignateData.users = users
      },
      getSchemeContent() {
        var content = this.flowDesignPanel.exportDataEx()
  
        return JSON.stringify(content)
      }
    }
  }
</script>

<style>
#draw_flowPanel{
  width: 100vW  
}
.GooFlow .item_round table {
    padding: 10px;
}
.GooFlow table {
    padding: 6px 10px;
    border-radius: 2px;
}
.GooFlow div .rs_close {
    right: -6px;
    top: 2px;
    width: 20px;
    height: 20px;
		font-size: 16px;
		color:red;
}
</style>
