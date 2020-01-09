<template>
  <div id="search" class="container">
    <!--    <Hander/>-->
    <div class="search">
      <div v-for="(good,i) in goods" :key="i">
          <router-link :to="'/detail/'+good.goodsId">
            <div id="goods">
              <img :src="good.imge" style="height: 330px">
              <h5 style="color: #ff5000">￥{{good.price}}</h5>
              <p style="margin: auto">&nbsp<span id="baoyou">包邮</span> {{good.name}}</p>
            </div>
          </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        goods:[]
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
