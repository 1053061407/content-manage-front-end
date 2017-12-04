<template>
  <html>
  <div class="index-root">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
      <div style="margin-left: 80px">
        <el-form-item label="前景载入" prop="direction1">
          <el-select v-model="ruleForm.direction1" placeholder="请选择载入方向">
            <el-option label="从上加载" value="fadeInDownSmall"></el-option>
            <el-option label="从下加载" value="fadeInUpSmall"></el-option>
            <el-option label="从左加载" value="fadeInLeftSmall"></el-option>
            <el-option label="从右加载" value="fadeInRightSmall"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前景图链接">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <p>设置背景图片</p>
        <div style="margin-bottom: 20px;">
          <Upload v-model="ruleForm.backgroundImage"></Upload>
        </div>
      </el-form-item>
      <el-form-item>
        <p>修改前景图一</p>
        <div style="margin-bottom: 20px;">
          <Upload v-model="ruleForm.image_url1"></Upload>
        </div>
      </el-form-item>
      <el-form-item>
        <p>修改前景图二</p>
        <div style="margin-bottom: 20px;">
          <Upload v-model="ruleForm.image_url2"></Upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </html>
</template>
<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  export default {
    components: { Tinymce, Upload },
    data() {
      return {
        ruleForm: {
          url: '',
          backgroundImage: '',
          direction1: '',
          image_url1: '',
          image_url2: ''
        },
        rules: {
//          title: [
//            { required: true, message: '请输入标题', trigger: 'blur' }
//          ],
//          content: [
//            { required: true, message: '请输入内容', trigger: 'blur' }
//          ],
//          btnContent: [
//            { required: true, message: '请输入按钮文本', trigger: 'blur' }
//          ],
//          btnUrl: [
//            { required: true, message: '请输入按钮跳转链接', trigger: 'blur' }
//          ],
          direction1: [
            { required: true, message: '请选择载入方向', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  html {
    font-size: 62.5%;
  }
  .index-root {
    margin-top: 2rem;
  .el-input{
    width: 12rem;
  }
  p {
    font-size: 1rem;
    color: #48576a;font-weight: 700;
    margin-top: 2rem
  }
  }
</style>
