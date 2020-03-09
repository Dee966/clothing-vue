<template>
  <div class="container">
    <div class="container">
      <div v-for="(child,i) in children" :key="i">
        <router-link :to="'/detail/'+child.goodsId">
          <div id="goods">
            <img :src="child.imge" style="height: 330px">
            <h5 style="color: #ff5000">￥{{child.price}}</h5>
            <p style="margin: auto"><span id="baoyou">包邮</span> {{child.name}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Hander from '../Hander';
  export default {
    name:'Children',
    data () {
      return {
        name:'童装',
        children:[]
      }
    },
    components:{
      Hander
    },
    methods:{
      getJacket:function (id) {
        this.axios.get("/goods/type_show/"+id).then(res => {
          if (res.data.code != 0){
            alert(res.data.msg)
          } else {
            this.children = res.data.data;
            console.log(this.children)
          }

        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted:function(){
      this.getJacket(this.$route.params.id);
    }
  }
</script>

<style>
  #goods{
    width: 250px;
    height: 410px;
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
