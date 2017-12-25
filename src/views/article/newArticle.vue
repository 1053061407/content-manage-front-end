<template>
  <html>
  <div class="container">
    <!--<iconSvg icon-style="style" icon-class="name"></iconSvg>-->
    <!-- style为icon样式，name为icon名字 -->
  </div>
  <div class="index-root">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
      <div style="margin-left: 80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title" type="textarea" autosize style="width: 16rem"></el-input>
        </el-form-item>
        <el-form-item label="文章子标题" prop="subtitle">
          <el-input v-model="ruleForm.subtitle" type="textarea" autosize style="width: 16rem"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="time">
          <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="选择日期时间" size="large" style="width: 195px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="文章分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择文章分类方向">
            <el-option label="行业热点" value="industry"></el-option>
            <el-option label="公司资讯" value="company"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.article_status !== 'edit'" label="文章状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择文章状态">
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="发布" value="published"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图">
          <div style="margin-bottom: 20px;">
            <Upload v-model="ruleForm.cover"></Upload>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div style="margin-top: 60px">
      <div style="width: 800px;margin-left:180px">
        <tinymce :height='300' v-model="ruleForm.content"></tinymce>
      </div>
      <div class='editor-content' v-html='ruleForm.content' style="margin-left: 180px">
      </div>
    </div>
    <el-button v-if="ruleForm.article_status == 'edit'" type="primary" size="medium" style="margin:40px 0 0 900px" @click="updateArticle">保存</el-button>
    <el-button v-else type="primary" size="medium" style="margin:40px 0 0 900px" @click="newArtilce">创建</el-button>
  </div>
  </html>
</template>
<script>
  import { Notification } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { postArticle } from '@/api/article'
  import { updateArticle } from '@/api/article'
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  import iconSvg from '@/components/SvgIcon/index.vue'
  export default {
    components: { Tinymce, Upload, iconSvg },
    destroyed() {
      this.$store.commit('setConditions', {})
    },
    data() {
      return {
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
//          time: [
//            { required: true, message: '请选择时间', trigger: 'blur' }
//          ],
          subtitle: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择文章分类', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'ruleForm'
      ])
    },
    methods: {
      newArtilce() {
        var time = Math.round(this.ruleForm.time) / 1000
        var tmp = {
          'title': this.ruleForm.title,
          'subtitle': this.ruleForm.subtitle,
          'time': time,
          'category': this.ruleForm.category,
          'status': this.ruleForm.status,
          'cover': this.ruleForm.cover,
          'content': this.ruleForm.content
        }
        postArticle(tmp).then(response => {
          console.log(response)
          Notification({
            title: '成功',
            message: '创建成功',
            type: 'success'
          })
          if (this.ruleForm.category === 'company') {
            this.$router.push('/article/companyInfo')
          } else this.$router.push('/article/hotSpot')
        })
          .catch(function(error) {
            console.log(error)
            Notification.error({
              title: '错误',
              message: '创建失败'
            })
          })
      },
      updateArticle() {
        var time = Math.round(this.ruleForm.time) / 1000
        var tmp = {
          'id': this.ruleForm.id,
          'title': this.ruleForm.title,
          'subtitle': this.ruleForm.subtitle,
          'time': time,
          'category': this.ruleForm.category,
          'status': this.ruleForm.status,
          'cover': this.ruleForm.cover,
          'content': this.ruleForm.content
        }
        updateArticle(tmp).then(response => {
          console.log(response)
          Notification({
            title: '成功',
            message: '保存成功',
            type: 'success'
          })
        })
          .catch(function(error) {
            console.log(error)
            Notification.error({
              title: '错误',
              message: '保存失败'
            })
          })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .index-root {
    margin-top: 2rem;
  .el-input {
    width: 12rem;
  }
  p {
    font-size: 1rem;
    color: #48576a;font-weight: 700;
    margin-top: 2rem
  }
  }
</style>

