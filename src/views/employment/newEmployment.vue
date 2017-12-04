<template>
  <html>
  <div class="index-root">
    <el-form :model="position" :rules="rules" ref="position" label-width="100px" class="demo-ruleForm" label-position="left">
      <div style="margin-left: 80px">
        <el-form-item label="职位分类" prop="title">
          <el-select
            v-model="position.category"
            filterable
            allow-create
            placeholder="请选择职位分类">
            <el-option label="技术开发" value="techDevelop"></el-option>
            <el-option label="生物信息" value="biological_Info"></el-option>
            <el-option label="市场" value="market"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="subtitle">
          <el-input v-model="position.position"></el-input>
        </el-form-item>
        <el-form-item label="工作经验" prop="subtitle">
          <el-input v-model="position.experience"></el-input>
        </el-form-item>
        <el-form-item label="教育经历" prop="subtitle">
          <el-input v-model="position.education"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数" prop="subtitle">
          <el-input v-model="position.numbers"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" prop="subtitle">
          <el-input v-model="position.detail"></el-input>
        </el-form-item>
        <el-form-item label="职位要求" prop="subtitle">
          <el-input v-model="position.requirement"></el-input>
        </el-form-item>
        <el-form-item label="待遇福利" prop="subtitle">
          <el-input v-model="position.welfare"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="subtitle">
          <el-input v-model="position.location"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="time">
          <el-date-picker v-model="position.time" type="datetime" placeholder="选择日期时间" size="large" style="width: 195px">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="position.position_status !== 'edit'" label="招聘状态" prop="status">
          <el-select v-model="position.status" placeholder="请选择招聘">
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="发布" value="published"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" size="medium" style="margin:40px 0 0 600px" @click="newEmployment">创建</el-button>
  </div>
  </html>
</template>
<script>
  import { Notification } from 'element-ui'
  import { createEmployment } from '@/api/employment'
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  import { mapGetters } from 'vuex'
  export default {
    components: { Tinymce, Upload },
    destroyed() {
      this.$store.commit('setPosition', {})
    },
    data() {
      return {
        content: '',
        rules: {
//          title: [
//            { required: true, message: '请输入标题', trigger: 'blur' }
//          ],
//          time: [
//            { required: true, message: '请选择时间', trigger: 'blur' }
//          ],
//          subtitle: [
//            { required: true, message: '请输入内容', trigger: 'blur' }
//          ],
//          content: [
//            { required: true, message: '请输入内容', trigger: 'blur' }
//          ],
//          category: [
//            { required: true, message: '请选择文章分类', trigger: 'blur' }
//          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'position'
      ])
    },
    methods: {
      newEmployment() {
        var time = Math.round(this.position.time) / 1000
        var tmp = {
          'category': this.position.category,
          'position': this.position.position,
          'time': time,
          'experience': this.position.experience,
          'education': this.position.eduction,
          'numbers': this.position.numbers,
          'detail': this.position.detail,
          'requirement': this.position.requirement,
          'welfare': this.position.welfare,
          'location': this.position.location,
          'status': this.position.status
        }
        createEmployment(tmp).then(response => {
          console.log(response)
          Notification({
            title: '成功',
            message: '创建成功',
            type: 'success'
          })
          this.$router.push('/employment/newEmployment')
        })
          .catch(function(error) {
            console.log(error)
            Notification.error({
              title: '错误',
              message: '创建失败'
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

