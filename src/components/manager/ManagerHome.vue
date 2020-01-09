<template>
  <div id="manager-home">
    <div class="container">
      <p style="color: #dc3545">*点击可删除商品</p>
      <div v-for="(good,i) in goods" :key="i">
          <div id="goods" @click="open(good.goodsId)">
            <img :src="good.imge">
            <h5 style="color: #ff5000">￥{{good.price}}</h5>
            <p style="margin: auto">&nbsp<span id="baoyou">包邮</span> {{good.name}}</p><br>
            <div>商品ID：{{good.goodsId}}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ManagerHeader from "./ManagerHeader";
  export default {
    name: "ManagerHome",
    data(){
      return{
        goods:[]
      }
    },
    components: {
      ManagerHeader
    },
    methods:{
      getGoods:function(){
        this.axios.get("/serverName/goods/goods_show_all").then(res => {
          if (res.data.code != 0){
            alert(res.data.msg)
          } else {
            this.goods = res.data.data
            console.log(this.goods)
          }

        }).catch(err => {
          console.log("请求失败")
        })
      },
      open(id) {
        this.$confirm('确定要删除该商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteGoods(id)
        }).catch(() => {
          console.log("取消")
        });
      },
      deleteGoods:function (id) {
        this.axios.delete('/serverName/goods/goods_delete/'+id).then(res =>{
          if (res.data.code !== 0){
            alert("删除失败")
          } else {
            alert("删除成功")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("系统错误！")
        })
      }
    },
    mounted:function(){ //生命周期
      this.getGoods();
    }
  }
</script>

<style scoped>
  #goods{
    width: 250px;
    height: 440px;
    float: left;
    margin-right: 20px;
    margin-top: 10px;
    border: solid #dedede 1px;
  }
  img{
    width: 250px;
    height: 330px;
  }
  #baoyou{
    border: solid #ff5000 1px;
    border-radius: 10px;
    background-color: #ff5000;
    color: white
  }
  #goods:hover{
    border: solid #ff5000 3px;
  }
</style>
