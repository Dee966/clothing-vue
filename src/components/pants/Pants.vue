<template>
  <div class="container">
    <div class="container">
      <div v-for="(pant,i) in pants" :key="i">
        <router-link :to="'/detail/'+pant.goodsId">
          <div id="goods">
            <img :src="pant.imge" style="height: 330px">
            <h5 style="color: #ff5000">￥{{pant.price}}</h5>
            <p style="margin: auto"><span id="baoyou">包邮</span> {{pant.name}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Hander from '../Hander.vue'
  export default {
    name:'Pants',
    data () {
      return {
        name:'Pants',
        pants:[]
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
            this.pants = res.data.data;
            console.log(this.pants)
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
