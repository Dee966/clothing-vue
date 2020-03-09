<template>
    <div id="manager-header">
      <div class="container">
        <div style="margin-top: 20px">
          <span class="md-display-1" id="logo" >后台管理系统</span>
          <button type="submit" class="btn btn-primary" style="float: right;margin-left: 5px;" @click="maSearch()">搜索</button>
          <form style="float: right;width: 350px">
            <input id="key_word" type="text" class="form-control" placeholder="搜索商品">
          </form>
        </div>
        <md-tabs>
          <md-tab id="tab-goods" md-label="商品管理" to="/maHeader/maHome"></md-tab>
          <md-tab id="tab-upload" md-label="商品上架" to="/maHeader/maUpload"></md-tab>
          <md-tab id="tab-order" md-label="订单" to="/maHeader/maOrder"></md-tab>
          <md-tab id="tab-banner" md-label="轮播图管理" to="/maHeader/maBanner"></md-tab>
          <md-tab id="tab-user" md-label="用户管理" to="/maHeader/maUser"></md-tab>
        </md-tabs><br>
        <router-view/>
      </div>
    </div>
</template>

<script>
  import ManagerHome from './ManagerHome';
  import ManagerUpload from './ManagerUpload';
  import ManagerOrder from './ManagerOrder';
  import ManagerBanner from './ManagerBanner';
    export default {
        name: "ManagerHeader",
      data(){
          return {
            goods:[]
          }
      },
      components:{
        ManagerHome,
        ManagerUpload,
        ManagerOrder,
        ManagerBanner
      },
      methods: {
        maSearch:function () {
          let keyWord = $("#key_word").val();
          this.axios.get('/home/search/'+keyWord).then(res =>{
            if (res.data.code != 0){
              alert(res.data.msg)
            } else {
              this.goods = res.data.data
              console.log(this.goods)
              localStorage.setItem('result',JSON.stringify(this.goods))
              if (this.$route.path === '/maHeader/maSearch'){
                this.$router.go(0);
              }
              this.$router.push({name:'maSearchLink'})
            }
          }).catch(err =>{
              alert("系统错误！")
          })
        }
      }
    }
</script>

<style scoped>

</style>
