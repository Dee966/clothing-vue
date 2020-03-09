<template>
  <div id="manager-home">
    <div class="container">
      <div v-for="(good,i) in goods" :key="i">
          <div id="goods">
            <img :src="good.imge" style="height: 330px">
            <h5 style="color: #ff5000">￥{{good.price}}</h5>
            <p style="margin: auto">&nbsp<span id="baoyou">包邮</span> {{good.name}}</p><br>
            <span>商品ID：{{good.goodsId}}</span>&nbsp;&nbsp;
            <span>库存：{{good.stock}}</span>
            <br><br>
            <el-button type="primary" icon="el-icon-edit" circle @click="moveEdit(good.goodsId)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="open(good.goodsId)"></el-button>
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
        this.axios.get("/goods/goods_show_all").then(res => {
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
        this.axios.delete('/goods/goods_delete/'+id).then(res =>{
          if (res.data.code !== 0){
            alert("删除失败")
          } else {
            alert("删除成功")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("系统错误！")
        })
      },
      moveEdit(goodId){
        localStorage.setItem('goodId',goodId)
        this.$router.push({path:'/maHeader/maEditGoods/'+goodId})
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
    height: 500px;
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
</style>
