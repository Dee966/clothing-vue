<template>
  <div>
    <div class="container">
      <div id="site-nav">
        <ul id="menu">
          <router-link style="color: #212529" :to="{name:'homeLink'}"><li style="">商城首页</li></router-link>
          <li id="back-login" @click="isBackLogin()">欢迎，请登录</li>
          <li>✉ 消息</li>
          <li style="float: right" @click="quitLogin()">退出登录</li>
          <router-link style="color: #212529" :to="{name:'myLink'}"><li style="float: right">个人中心</li></router-link>
          <router-link style="color: #212529" :to="{name:'cartLink'}"><li style="float: right">购物车</li></router-link>
        </ul>
      </div>
      <br>
      <div>
        <span class="md-display-2" id="logo" >服装商城</span>
        <button type="submit" class="btn btn-primary" style="float: right;margin-left: 5px;" @click="search()">搜索</button>
        <form style="float: right;width: 350px">
            <input id="key_word" type="text" class="form-control" placeholder="搜索商品">
        </form>
      </div>
      <br>
      <md-tabs>
        <md-tab id="tab-main" md-label="主页" to="/home"></md-tab>
        <md-tab id="tab-jacket" md-label="上装" to="/jacket/1"></md-tab>
        <md-tab id="tab-pants" md-label="下装" to="/pants/2"></md-tab>
        <md-tab id="tab-parts" md-label="配件" to="/parts/3"></md-tab>
        <md-tab id="tab-shoes" md-label="童装" to="/children/4"></md-tab>
        <md-tab id="tab-cart" md-label="购物车" to="/cart"></md-tab>
        <md-tab id="tab-my" md-label="我的" to="/my"></md-tab>
      </md-tabs>
    </div><br>
  </div>

</template>

<script>
  export default {
    name: 'Hander',
    data () {
      return {
        types:[],
        goods:[],
        activeName:'second'
      }
    },
    components:{

    },
    methods:{
      search:function(){
        let keyWord = $('#key_word').val()
        console.log(keyWord)
        this.axios.get("/serverName/home/search/"+keyWord).then(res => {
          if (res.data.code != 0){
            alert(res.data.msg)
          } else {
            this.goods = res.data.data
            console.log(this.goods)
            localStorage.setItem('result',JSON.stringify(this.goods))
            this.$router.push({name:'searchLink'})
          }

        }).catch(err =>{
          alert(err.data.msg)
        })
      },
      quitLogin:function (){
        localStorage.setItem('token', '')
        localStorage.setItem('state', '')
        this.$router.push({name:'loginLink'})
      },
      isBackLogin:function () {
        let state = $("#back-login").html()
        console.log(state)
        if(state == '欢迎，请登录'){
          this.$router.push({name:'loginLink'})
        } else {
          console.log(state)
        }
      },
      setState:function (){
        let state = localStorage.getItem('state');
        if (state != null && state !== ''){
          $("#back-login").html(state)
        } else {
          $("#back-login").html('欢迎，请登录')
        }
      }
    },
    mounted:function () {
      this.setState()
    }
  }

</script>

<style>
  #logo{
    color: #448aff;
  }
  #site-nav{
    width: 100%;
    height: 35px;
    background-color: #f2f2f2;
  }
  #menu {
    font:12px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
    width: 100%;
  }
  #menu, #menu li {
    list-style: none; /* 将默认的列表符号去掉 */
    padding: 0; /* 将默认的内边距去掉 */
    margin: 0; /* 将默认的外边距去掉 */
    float: left; /* 往左浮动 */
    display: block;
  }
  #menu li{
    padding: 6px;
    width: 100px;
    height: 35px;
    display: flex;
    justify-content: center;
    margin-top: 2px
  }
  #menu li:hover{
    background-color: #ffffff;
  }
</style>
