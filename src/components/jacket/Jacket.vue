<template>
  <div class="container">
    <!--    <h1>Jacket</h1>-->
    <div v-for="(jacket,i) in jackets" :key="i">
      <router-link :to="'/detail/'+jacket.goodsId">
        <div id="goods">
          <img :src="jacket.imge">
          <h5 style="color: #ff5000">￥{{jacket.price}}</h5>
          <p style="margin: auto"><span id="baoyou">包邮</span> {{jacket.name}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Hander from "../Hander"
  export default {
    name: "Jacket",
    data () {
      return {
        name:'上装',
        jackets:[]
      }
    },
    components:{
      Hander
    },
    methods:{
      // toLogin:function () {
      //   this.axios.post('/serverName/login/user_login',{username:'966966',password:'966966'})
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // },
      getJacket:function (id) {
        this.axios.get("/serverName/goods/type_show/"+id).then(res => {
          if (res.data.code != 0){
            alert(res.data.msg)
          } else {
            this.jackets = res.data.data;
            console.log(this.jackets)
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

<style scoped>
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
