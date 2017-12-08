<template>
  <html>
  <div class="index-root">
    <el-form :model="carousel" :rules="rules" ref="carousel" label-width="100px" class="demo-ruleForm" label-position="left">
      <div style="margin-left: 80px">
        <el-form-item label="轮播图分类">
          <el-select v-model="carousel.type" placeholder="请选择分类">
            <el-option label="分类一" value="1"></el-option>
            <el-option label="分类二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轮播图状态">
          <el-select v-model="carousel.status" placeholder="请选择分类">
            <el-option label="发布" value="published"></el-option>
            <el-option label="草稿" value="draft"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="carousel.type == 1">
          <el-form-item label="标题" prop="title">
            <el-input v-model="carousel.title" type="textarea" autosize style="width: 16rem"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="carousel.content" type="textarea" autosize style="width: 16rem"></el-input>
          </el-form-item>
          <el-form-item label="按钮文本" prop="btnContent">
            <el-input v-model="carousel.button.text" type="textarea" autosize style="width: 16rem"></el-input>
          </el-form-item>
          <el-form-item label="按钮链接" prop="btnUrl">
            <el-input v-model="carousel.button.url" type="textarea" autosize style="width: 16rem"></el-input>
          </el-form-item>
          <p class="pStyle">载入方向</p>
          <el-form-item label="图一">
            <el-select v-model="carousel.img1.moveto" placeholder="请选择载入方向">
              <el-option label="从上加载" value="fadeInDownSmall"></el-option>
              <el-option label="从下加载" value="fadeInUpSmall"></el-option>
              <el-option label="从左加载" value="fadeInLeftSmall"></el-option>
              <el-option label="从右加载" value="fadeInRightSmall"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图二">
            <el-select v-model="carousel.img2.moveto" placeholder="请选择载入方向">
              <el-option label="从上加载" value="fadeInDownSmall"></el-option>
              <el-option label="从下加载" value="fadeInUpSmall"></el-option>
              <el-option label="从左加载" value="fadeInLeftSmall"></el-option>
              <el-option label="从右加载" value="fadeInRightSmall"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <p>设置背景图片</p>
            <div style="margin-bottom: 20px;">
              <Upload v-model="carousel.backgroundImage"></Upload>
            </div>
          </el-form-item>
          <el-form-item>
            <p>修改右侧图一</p>
            <div style="margin-bottom: 20px;">
              <Upload v-model="carousel.img1.url"></Upload>
            </div>
          </el-form-item>
          <el-form-item>
            <p>修改右侧图二</p>
            <div style="margin-bottom: 20px;">
              <Upload v-model="carousel.img2.url"></Upload>
            </div>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="轮播图名称">
            <el-input v-model="carousel.title"></el-input>
          </el-form-item>
          <el-form-item label="前景载入">
            <el-select v-model="carousel.img1.moveto" placeholder="请选择载入方向">
              <el-option label="从上加载" value="fadeInDownSmall"></el-option>
              <el-option label="从下加载" value="fadeInUpSmall"></el-option>
              <el-option label="从左加载" value="fadeInLeftSmall"></el-option>
              <el-option label="从右加载" value="fadeInRightSmall"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前景图链接">
            <el-input v-model="carousel.url"></el-input>
          </el-form-item>
          <el-form-item>
            <p>设置背景图片</p>
            <div style="margin-bottom: 20px;">
              <Upload v-model="carousel.backgroundImage"></Upload>
            </div>
          </el-form-item>
          <el-form-item>
            <p>修改前景图一</p>
            <div style="margin-bottom: 20px;">
              <Upload v-model="carousel.img1.url"></Upload>
            </div>
          </el-form-item>
          <el-form-item>
            <p>修改前景图二</p>
            <div style="margin-bottom: 20px;">
              <Upload v-model="carousel.img2.url"></Upload>
            </div>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="updateCarousel" v-if="carousel.edit_status == true">保存</el-button>
          <el-button type="primary" @click="newCarousel" v-else>立即创建</el-button>
        </el-form-item>
        </div>
      <div >

      </div>
    </el-form>
  </div>
  </html>
</template>
<script>
  import { Notification } from 'element-ui'
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  import { createCarousel, updateCarousel } from '@/api/carousel'
  import { mapGetters } from 'vuex'
  export default {
    components: { Tinymce, Upload },
    destroyed() {
      this.$store.commit('setCarousel', {
        id: '',
        title: '',
        status: '',
        content: '',
        type: '1',
        category: '',
        button: {
          text: '',
          url: ''
        },
        img1: {
          moveto: '',
          url: ''
        },
        img2: {
          moveto: '',
          url: ''
        },
        btnContent: '',
        btnUrl: '',
        direction1: '',
        direction2: '',
        backgroundImage: '',
        image_url1: '',
        image_url2: '',
        url: ''
      })
    },
    data() {
      return {
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
          ],
          direction2: [
            { required: true, message: '请选择载入方向', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'carousel'
      ])
    },
    methods: {
      newCarousel() {
        if (this.carousel.type === '1') {
          var tmp = {
            type: '1',
            status: this.carousel.status,
            title: this.carousel.title,
            content: this.carousel.content,
            button: {
              text: this.carousel.button.text,
              url: this.carousel.button.url
            },
            background: this.carousel.backgroundImage,
            img1: {
              url: this.carousel.img1.url,
              moveto: this.carousel.img1.moveto
            },
            img2: {
              url: this.carousel.img2.url,
              moveto: this.carousel.img2.moveto
            }
          }
        } else {
          tmp = {
            type: '2',
            status: this.carousel.status,
            title: this.carousel.title,
            background: this.carousel.backgroundImage,
            img1: {
              url: this.carousel.img1.url,
              moveto: this.carousel.img1.moveto
            },
            img2: {
              url: this.carousel.img2.url,
              moveto: this.carousel.img2.moveto
            },
            url: this.carousel.url
          }
        }
        createCarousel(tmp).then(response => {
          console.log(tmp)
          console.log(response)
          Notification({
            title: '成功',
            message: '创建成功',
            type: 'success'
          })
          this.$router.push('/carousel/allCarousel')
        })
          .catch(function(error) {
            console.log(error)
//            Notification.error({
//              title: '错误',
//              message: '创建失败'
//            })
          })
      },
      updateCarousel() {
        if (this.carousel.type === '1') {
          var tmp = {
            type: '1',
            status: this.carousel.status,
            title: this.carousel.title,
            content: this.carousel.content,
            button: {
              text: this.carousel.button.text,
              url: this.carousel.button.url
            },
            background: this.carousel.backgroundImage,
            img1: {
              url: this.carousel.img1.url,
              moveto: this.carousel.img1.moveto
            },
            img2: {
              url: this.carousel.img2.url,
              moveto: this.carousel.img2.moveto
            }
          }
        } else {
          tmp = {
            type: '2',
            status: this.carousel.status,
            title: this.carousel.title,
            background: this.carousel.backgroundImage,
            img1: {
              url: this.carousel.img1.url,
              moveto: this.carousel.img1.moveto
            },
            img2: {
              url: this.carousel.img2.url,
              moveto: this.carousel.img2.moveto
            },
            url: this.carousel.url
          }
        }
        updateCarousel(tmp).then(response => {
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
    width: 16rem;
  }
  p {
    font-size: 1rem;
    color: #48576a;font-weight: 700;
    margin-top: 2rem
  }
  }
</style>
