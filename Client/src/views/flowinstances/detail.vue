<template>
	<div>
		<sticky :className="'sub-navbar'">
			<div class="filter-container">
					{{postObj.customName}}
					<el-tag size="mini" style="margin-left: 10px;">{{postObj.createDate}}</el-tag> 
					<el-tag size="mini">{{postObj.activityName}}</el-tag>
				</div>
		</sticky>
  <div class="createPost-container">
    <el-card class="box-card">
      <p v-html="postObj.frmPreviewHtml"></p>
    </el-card>
    <flow-detail ref="flowEditor" :instance="postObj"></flow-detail>
  </div>
</div>
</template>

<script>
  import FlowDetail from '@/components/FlowEditor/detail' // 流程设计器
  import Sticky from '@/components/Sticky' // 粘性header组件
  import * as apiFlowinstances from '@/api/flowinstances'

  export default {
    name: 'flowinstance-detail',
    components: {
      Sticky,
      FlowDetail
    },
    data() {
      return {
        postObj: {
          customName: '',
          schemeContent: '',
          createDate: '',
          activityName: '',
          code: '',
          activityId: ''
        },
        loading: false
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      apiFlowinstances.get({
        id: id
      }).then(response => {
        this.postObj = response.result
      }).catch(err => {
        console.log(err)
      })
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

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
