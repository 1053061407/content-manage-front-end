<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
      </el-input>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{Number(scope.$index + 1)}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="标题" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click=handleUpdate(scope.row,scope.row.id) size="medium" >{{scope.row.title}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <div style="float: left">
            </el-button>
            <el-button v-if="scope.row.status!=='published' && scope.row.status!=='top'" size="small" type="success" @click="handlePublish(scope.row.id,scope.row)">发布
            </el-button>
            <el-button v-if="scope.row.status!=='top' && scope.row.status!=='draft'" size="small" @click="handleDraft(scope.row.id,scope.row)">草稿
            </el-button>
            <el-button v-if="scope.row.status!=='deleted'" size="small" type="danger" @click="handleDelete(scope.row.id, scope.$index)">删除
            </el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="update">确 定</el-button>-->
        <router-link to="/carousel/newCarousel">
          <el-button @click="edit" type="primary">编辑</el-button>
        </router-link>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" >
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { fetchAllCarousels, fetchCarouselContent, DeleteCarousel, DraftCarousel, PublishCarousel } from '@/api/carousel'
  import { parseTime } from '@/utils'
  import { Notification } from 'element-ui'

  export default {
    name: 'table_demo',
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 0
        },
        temp: {
          id: undefined,
          remark: '',
          timestamp: 0,
          title: '',
          type: '',
          status: '',
          position: ''
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        showAuditor: false,
        tableKey: 0
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        // 用来取每一页的所有招聘信息
        fetchAllCarousels(this.listQuery).then(response => {
          console.log(response)
          console.log(response.data.data)
          this.list = response.data.data
          // this.total = response.data.total
          this.listLoading = false
        })
          .catch(function(error) {
            console.log(error)
          })
      },
      edit() {
        fetchCarouselContent(this.temp.id).then(response => {
          console.log(response)
          response.data.id = this.temp.id
          response.data.edit_status = true
          this.$store.commit('setCarousel', response.data)
        })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val - 1
        this.getList()
      },
      timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined
          this.listQuery.end = undefined
          return
        }
        this.listQuery.start = parseInt(+time[0] / 1000)
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
      },
      handlePublish(id, row) {
        PublishCarousel(id).then(response => {
          console.log(response.data)
          if (response.data === 1) {
            console.log('xixii')
            console.log(row)
            row.status = 'published'
            Notification({
              title: '成功',
              message: '设置成功',
              type: 'success'
            })
          }
        })
      },
      handleDraft(id, row) {
        DraftCarousel(id).then(response => {
          console.log(response.data)
          console.log(typeof response.data)
          if (response.data === 1) {
            console.log(row)
            row.status = 'draft'
            Notification({
              title: '成功',
              message: '设置成功',
              type: 'success'
            })
          }
        })
      },
      handleDelete(id, index) {
        DeleteCarousel(id).then(response => {
          if (response.data === 1) {
            this.list.splice(index, 1)
            Notification({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
          }
        })
      },
      handleUpdate(row, id) {
        this.temp = Object.assign({}, row)
        console.log(id)
        this.temp.id = id
        this.temp.position = row.position
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      create() {
        this.temp.id = parseInt(Math.random() * 100) + 1024
        this.temp.timestamp = +new Date()
        this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      },
      update() {
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel')
          const tHeader = ['类型', '标题', '状态']
          const filterVal = ['type', 'title', 'status']
          const data = this.formatJson(filterVal, this.list)
          export_json_to_excel(tHeader, data, 'table数据')
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>

