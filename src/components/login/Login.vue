<template>
  <div id="login_vue">
    <div class="container">
      <!--    <div style="margin: 15px auto;text-align: center;font-size: 20px">登录</div>-->
      <div style="height: 200px;display: flex;align-items: center;justify-content: center">
        <div style="margin-top: 50px">
          <!--        <img src="resources/imgs/book1.0.png" class="img-responsive img-circle center-block" style="width: 80px;height: 80px">-->
          <h2 class="form-signin-heading text-center">服装商城</h2>
          <img src="static/logo.jfif" style="width: 150px;height: 150px" alt="">
        </div>
      </div>
      <div style="width: 100%;display: flex;justify-content: center">
        <form class="form-signin" id="login_form" style="width: 30%;">
          <label for="username" class="sr-only">用户名</label>
          <input type="text" id="username" name="username" class="form-control" placeholder="用户名" required autofocus><br>
          <!--          <el-input id="username" placeholder="用户名" ></el-input><br><br>-->
          <!--          <el-input id="password" placeholder="密码" ></el-input><br>-->
          <label for="password" class="sr-only">密码</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="密码" required>
          <div class="text-right">
            <router-link to="/register">注册账号</router-link>
            <router-link to="/maLogin">管理员登录</router-link>
          </div>
          <el-button id="login" type="success" style="width:100%" @click="login()">登录</el-button>
          <!--        <button id="login" class="btn btn-lg btn-success btn-block" type="button" @click="login()">登录</button>-->
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        input: ""
      }
    },
    methods: {
      login: function () {
        let loginVo = {
          username: $("#username").val(),
          password: $("#password").val()
        }
        this.axios.post("/login/user_login", loginVo).then(res => {
          if (res.data.code != 0){
            alert(res.data.msg)
          } else {
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userId', res.data.data.userId)
            localStorage.setItem('state', $("#username").val())
            this.$router.push({name: 'homeLink'})
          }
        }).catch(err => {
          alert(err.data.msg)
        })
      }
    },
    mounted: function () {
      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('state'))
    }
  }
</script>

<style scoped>
  .text-right {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
