<template>
	<div class="filter-items">
		<el-button :icon="icons[btn.icon]"  :size="size" v-for="btn of buttons" v-bind:key="btn.Id" class="filter-item" @click="$emit('btn-event',btn.domId)">{{btn.name}}</el-button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'permission-btn',
  data() {
    // todo:兼容layui的样式、图标
    return {
      types: {
        'layui-btn-danger': 'danger',
        'layui-btn-normal': 'primary'
      },
      icons: {
        '&#xe615;': 'el-icon-refresh',
        '&#xe640;': 'el-icon-remove',
        '&#xe642;': 'el-icon-edit',
        '&#xe60a;': 'el-icon-document',
        '&#xe654;': 'el-icon-circle-plus'
      }
    }
  },
  directives: {
    waves
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['modulesTree']),
    buttons: function() {
      var route = this.$route
      var elements = route.meta.elements
      return elements.sort((a, b) => {
        return a.sort > b.sort
      })
      // var _this = this
      // var currentModule = this.modules.find(function(e) {
      //   return e.url.toLowerCase().indexOf(_this.moduleName) >= 0
      // })
      // return currentModule.elements.sort((a, b) => {
      //   return a.sort > b.sort
      // })
    }
  },
  props: {
    moduleName: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.btn-bottom {
    margin-bottom: 0;
}
.filter-items {
    display: inline-block;
    margin-left: 20px;
}
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
