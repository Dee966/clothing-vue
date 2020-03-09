<template>
    <div id="my">
      <div class="container">
        <div class="row">
          <div id="my-menu" class="col-md-2">
            <div style="color: #ff4401;font-size: 15px">全部功能</div>
            <router-link :to="{name:'cartLink'}">
              <div style="margin-top: 8px;cursor:pointer">我的购物车</div>
            </router-link>
            <router-link :to="{name:'showOrdLink'}">
              <div style="margin-top: 8px;cursor:pointer">所有订单</div>
            </router-link>
          </div>
          <div id="my-info" class="col-md-10">
            <div class="row">
              <div class="col-md-4">
                <img src="/static/4.jfif" alt="">
                <em>{{user.name}}</em>
              </div>
              <div class="col-md-4">
                <em style="color: #748c9c;cursor:pointer">余额： {{balance}}</em><br><br>
                <em style="color: #748c9c;cursor:pointer">手机号码： {{user.telephone}}</em>
              </div>
              <div class="col-md-4">
                <router-link :to="{name:'myInfoLink'}"><em style="color: #748c9c;cursor:pointer">编辑个人资料</em></router-link>
                <br><br>
                <em style="color: #748c9c;cursor:pointer">收货地址： {{user.address}}</em>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10" style="padding: 0px">
            <router-view/>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import Info from './Info'
    export default {
      name: "My",
      data() {
        return {
          user:[],
          balance:[]
        }
      },
      components:{
        Info
      },
      methods:{
        getUserInfo:function () {
          let token = localStorage.getItem('token');
         // let token = '966966.c8327425b0eef063b8f6d66c80a49a73';
          this.axios({
            method:'get',
            url:'/user/user_info/',
            headers:{
              'Authorization':token
            }
          }).then(res =>{
            if (res.data.code !== 0){
              if (res.data.msg === '未登录或登录失效，请先进行登录'){
                this.$router.push({name: 'loginLink'})
              }
              alert(res.data.msg)
            } else {
              console.log(res.data)
              this.user = res.data.data
            }
          }).catch(err => {
            alert(err.data.msg)
          })
        },
        getBalance:function () {
          let token = localStorage.getItem('token');
          //let token = '966966.c8327425b0eef063b8f6d66c80a49a73';
          this.axios({
            method:'get',
            url:'/user/user_balance/',
            headers:{
              'Authorization':token
            }
          }).then(res =>{
            if (res.data.code != 0){
              alert(res.data.msg)
            } else {
              console.log(res.data)
              this.balance = res.data.data
            }

          }).catch(err => {
            alert(err.data.msg)
          })
        }
      },
      mounted:function () {
        this.getUserInfo()
        this.getBalance()
      }
    }
</script>

<style scoped>
  #my-menu{
    height: 100px;
  }
  #my-info{
    height: 100px;
    padding: 10px 0px 5px 0px;
    background-color: #f5f8fa;
  }
  img {
    width: 55px;
    height: 55px;
    margin: 0px 12px;
  }
</style>
