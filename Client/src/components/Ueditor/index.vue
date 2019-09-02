<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  import './leipiFormDesign'
  export default {
    name: 'Ueditor',
    data() {
      return {
        editor: null,
        fields: 0,
        editorContent: this.content
      }
    },
    props: {
      content: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      var _this = this
      if (window.ue !== undefined) {
        window.ue.destroy()
      }
      // this.editor = window.UE.getEditor('editor', this.config) // 初始化UE
      // 表单设计器
      _this.editor = window.UE.getEditor('editor',
        {
          toolleipi: true, // 是否显示，设计器的 toolbars
          textarea: 'design_content',
          // 这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
          toolbars: [[
            'fullscreen', 'source',
            '|', 'undo', 'redo',
            '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat',
            '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist',
            '|', 'fontfamily', 'fontsize',
            '|', 'indent',
            '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'horizontal',
            '|', 'inserttable', 'deletetable', 'mergecells', 'splittocells']],
          wordCount: false,
          elementPathEnabled: false,
          autoHeightEnabled: true,
          initialFrameHeight: 430
        })
      window.ue = _this.editor
      _this.editor.addListener('ready', function() {
        _this.$emit('ready') // 通知父节点编辑器准备完毕
      })
    },
    watch: {
      content: function(val, oldVal) {
        if (val !== undefined && val !== '') {
          window.ue.setContent(val)
        }
      }
    },
    methods: {
      getObj() { // 获取内容方法
        var content = this.editor.getContent()
        return window.leipiFormDesign.parse_form(content, this.fields)
      },
      destroyed() {
        this.editor.destroy()
      }
    }
  }
</script>