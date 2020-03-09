<template>
    <div id="ma_user">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="userId"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="wechat"
          label="微信">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="dialogVisible = true,rows = scope.row" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        style="margin-left: 40%"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="pages">
      </el-pagination>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <span>确定要删除该会员吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="dialogVisible = false,delCus()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ManagerUser",
      data(){
          return{
            tableData:[],
            dialogVisible:false,
            rows:[],
            pages:0
          }
      },
      methods:{
        delCus(){
          this.axios.delete('/user/delete/'+this.rows.userId).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            alert('删除成功')
          }).catch(err =>{
            alert('系统错误')
          })
        },
        listUser(){
          let page = 1;
          this.axios.get('/user/list/'+page).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            this.pages = res.data.data.pages * 10
            this.tableData = res.data.data.list
            // this.tableData = res.data.data
            // this.$router.go(0);
          }).catch(err =>{
            alert('系统错误')
          })
        },
        handleCurrentChange(val){
          let page = `${val}`;
          this.axios.get('/user/list/'+page).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            this.pages = res.data.data.pages * 10
            this.tableData = res.data.data.list
            // console.log(this.pages)
          }).catch(err =>{
            alert('系统错误')
          })
        }
      },
      mounted(){
          this.listUser();
      }
    }
</script>

<style scoped>

</style>
