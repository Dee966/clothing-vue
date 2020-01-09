<template>
    <div id="write-appraise">
      <div id="appraise" class="container">
        <br>
        发表评价：
        <textarea class="form-control" rows="3" id="content"></textarea>
        <br>
        <el-button id="appraise-submit" size="small" style="float: right" @click="subAppraise()">提交</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "WriteAppraise",
      data(){
        return{

        }
      },
      methods:{
        subAppraise:function () {
          let content = $("#content").val();
          let ordersListId = localStorage.getItem('ordersListId');
          this.axios.put('/serverName/orders/orders_appraise/'+ordersListId,{appraise:content}).then(res =>{
            if (res.data.code !== 0){
              alert("评价失败")
            } else {
              alert("评价成功")
            }
          }).catch(err =>{
            alert("评价失败")
          })
        }
      }
    }
</script>

<style scoped>
#appraise{
  background-color: #f5f8fa;
}
</style>
