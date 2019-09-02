<template>
  <div class="createPost-container">
		<sticky :className="'sub-navbar '">
			<div class="filter-container">
				<el-button v-loading="loading" size="mini" class="filter-item" style="margin-left: 10px;" @click="submitForm">保存
				</el-button>
			</div>
		</sticky>
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <div class="createPost-main-container">
            <el-form-item  prop="name">
              <MDinput name="name" v-model="postForm.name" required :maxlength="100">
                标题
              </MDinput>
            </el-form-item>

        <el-form-item  label="摘要" label-position="top">
          <el-input type="textarea" :rows="3"  placeholder="请输入内容" v-model="postForm.description">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>

        <div class="editor-container">
             <Ueditor ref="ue" v-bind:content="postForm.content" @ready="ueReady"></Ueditor>
        </div>

      </div>
    </el-form>

  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Ueditor from '@/components/Ueditor'
import Sticky from '@/components/Sticky' // 粘性header组件
import * as forms from '@/api/forms'

const defaultForm = {
  id: undefined,
  description: '',
  name: '',
  fields: 0, // 字段个数
  delete: 0, // 删除标记
  enabled: 1,
  contentData: '', // 表单中的控件属性描述
  contentParse: '', // 表单控件位置模板
  content: '' // 未处理的HTML
}

export default {
  name: 'form-detail',
  components: { MDinput, Sticky, Ueditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
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
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        name: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm && this.postForm.description ? this.postForm.description.length : 0
    }
  },
  created() {
    if (!this.isEdit) {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    ueReady() { // ueditor准备好了，来数据吧
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.fetchData({ id: id })
      }
    },
    fetchData(id) {
      forms.get(id).then(response => {
        this.postForm = response.result
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm = Object.assign(this.postForm, this.$refs.ue.getObj())
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true

          forms.add(this.postForm).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    margin: 10px;
		background-color:white;
		padding:10px;
		padding-top:0;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
