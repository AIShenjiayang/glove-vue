<template>
  <div>
    <sticky :className="'sub-navbar '">
      <el-button v-if="active>0" size="mini" style="margin-left: 10px;" type="primary" @click="pre">上一步</el-button>
      <el-button v-if="active<1" size="mini" style="margin-left: 10px;" @click="next">下一步</el-button>
      <el-button v-loading="loading" size="mini" style="margin-left: 10px;" type="success" @click="submitForm">保存
      </el-button>
    </sticky>
    <div class="createPost-container">
      <el-form class="form-container" :model="postObj" :rules="rules" ref="postObj">
        <el-steps class="steps" :active="active" finish-status="success">
          <el-step title="选择模板"></el-step>
          <el-step title="基础信息"></el-step>
        </el-steps>
        <!--选择模板-->
        <div class="createPost-main-container" v-show="active==0">
          <el-tabs type="border-card" class="border-b-none" @tab-click="handleTabClick">
            <template v-for="item in flowschemes">
              <el-tab-pane :label="item.schemeName" :key="item.id" :id="item.id">
                <form ref="frmData">
                  <p v-html="frmPreview"></p>
                </form>
              </el-tab-pane>
            </template>
          </el-tabs>
          <div class="editor">
            <flow-editor ref="flowEditor" :scheme-content="postObj.schemeContent"></flow-editor>
          </div>
        </div>

        <!--编辑基础信息-->
        <div class="createPost-main-container" v-show="active==1">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题" label-width="100px" prop="schemeNameRule">
                <el-input name="name" v-model="postObj.schemeName" required style="max-width: 200px;">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="100px" label="模板编号:">
                <el-input type="text" v-model="postObj.schemeCode" style="max-width: 200px;">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="100px" label="发布时间:" class="postInfo-container-item">
                <el-date-picker v-model="postObj.createDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="100px" label="重要性(占位):" class="postInfo-container-item">
                <el-rate style="margin-top:8px;" :max='3' :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"
                  :high-threshold="3">
                </el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="100px" label="摘要:">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="postObj.description">
                </el-input>
                <span class="word-counter" v-if="contentShortLength">{{contentShortLength}}字</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    formatTime
  } from '@/utils/index'
  import MDinput from '@/components/MDinput'
  import FlowEditor from '@/components/FlowEditor' // 流程设计器
  import Sticky from '@/components/Sticky' // 粘性header组件
  import * as apiFlowschemes from '@/api/flowschemes'
  import * as apiFlowinstances from '@/api/flowinstances'
  import * as apiForms from '@/api/forms'

  // 默认的实例信息
  const defaultObj = {
    id: undefined,
    code: new Date().getTime(),
    frmId: '',
    description: '',
    customName: '',
    schemeContent: '', // 流程模板内容
    frmContentData: '', // 表单中的控件属性描述
    frmContentParse: '' // 表单控件位置模板
  }

  export default {
    name: 'flowinstance-add',
    components: {
      MDinput,
      Sticky,
      FlowEditor
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(null)
        } else {
          callback()
        }
      }
      return {
        postObj: Object.assign({}, defaultObj),
        loading: false,
        flowschemes: [], // 选择的流程模板列表
        fields: 0, // 表单数据元素个数
        currentSchemeId: '',
        currentScheme: null, // 当前选中的流程模板
        frmPreview: '',
        active: 0,
        rules: {
          schemeNameRule: [{
            validator: validateRequire
          }],
          frmRule: [{
            validator: validateRequire
          }]
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.postObj.description ? this.postObj.description.length : 0
      }
    },
    created() {
      apiFlowschemes.getList().then(response => {
        // 获取模板列表
        this.flowschemes = response.data
        this.onSchemeChange(this.flowschemes[0].id)
      })
    },
    methods: {
      next() {
        if (this.active++ > 1) this.active = 0
      },
      pre() {
        if (this.active-- < 0) this.active = 0
      },
      handleTabClick(tab) {
        var val = tab.$attrs.id
        this.onSchemeChange(val)
      },
      onSchemeChange(val) {
        // 预览表单和流程
        var _this = this
        this.currentScheme = this.flowschemes.find(u => u.id === val)
        this.postObj.frmId = this.currentScheme.frmId
        this.postObj.customName = this.currentScheme.schemeName + formatTime('yyyy-MM-dd hh:mm:ss')
        this.postObj.schemeContent = this.currentScheme.schemeContent // 流程模板内容
        apiForms
          .get({
            id: this.currentScheme.frmId
          })
          .then(response => {
            this.frmPreview = response.result.html // 表单预览的数据
            _this.postObj.frmContentData = response.result.contentData
            _this.postObj.frmContentParse = response.result.contentParse
            _this.fields = response.result.fields // 表单属性的个数
          })
      },
      submitForm() {
        var _this = this
        this.$refs.postObj.validate(valid => {
          if (valid) {
            this.loading = true
            if (this.postObj.schemeContent === '') {
              this.$message({
                message: '请选择一个流程模板',
                type: 'error'
              })
              this.loading = false
              return
            }

            const frmdata = {}
            for (let i = 1; i <= this.fields; i++) {
              const name = 'data_' + i
              frmdata[name] = _this.$refs.frmData[name].value
            }
            Object.assign(_this.postObj, frmdata)

            apiFlowinstances.add(this.postObj).then(() => {
              this.loading = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
            this.loading = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'src/styles/mixin.scss';

  .createPost-container {
    margin: 10px;
    padding: 10px;
    background-color: white;
    min-height: 100%;

    .createPost-main-container {
      max-width: 1000px;
      margin: 0 auto;
      margin-top: 40px;
    }
  }

  .steps {
    max-width: 1000px;
    margin: 0 auto;

    .el-step__main {
      margin-left: -21px;
    }
  }

  .edit-btns {
    padding: 20px;
  }

  .el-tabs--border-card {
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
  }

  .el-tabs--border-card.border-b-none {
    border-bottom: 0 !important;
  }

  .editor {
    padding: 15px;
    border: 1px solid #dcdfe6;
    border-top: 0;
  }

</style>
