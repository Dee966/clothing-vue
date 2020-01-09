<template>
  <div id="manager-search" class="container">
    <!--    <Hander/>-->
    <p style="color: #dc3545">*点击可删除商品</p>
    <div class="search">
      <div v-for="(good,i) in goods" :key="i">
          <div id="goods" @click="open(good.goodsId)">
            <img :src="good.imge" style="height: 330px">
            <h5 style="color: #ff5000">￥{{good.price}}</h5>
            <p style="margin: auto">&nbsp<span id="baoyou">包邮</span> {{good.name}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ManagerSearch",
    data() {
      return {
        goods:[]
      }
    },
    methods: {
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
    mounted:function(){
      this.goods = JSON.parse((localStorage.getItem('result')));
      console.log(this.goods)
    }
  }
</script>

<style>
  #goods{
    width: 250px;
    height: 400px;
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
