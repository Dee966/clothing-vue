<template>
    <div id="manager_register">
      <div class="container">
        <div style="height: 200px;display: flex;align-items: center;justify-content: center">
          <div style="margin-top: 50px">
            <!--        <img src="resources/imgs/book1.0.png" class="img-responsive img-circle center-block" style="width: 80px;height: 80px">-->

            <h2 class="form-signin-heading text-center">服装商城后台管理系统</h2>
            <img src="static/logo.jfif" style="width: 150px;height: 150px;margin-left: 80px" alt="">
          </div>
        </div>
        <!--    <div style="margin: 15px auto;text-align: center;font-size: 20px">登录</div>-->

        <div style="width: 100%;display: flex;justify-content: center">
          <form class="form-signin" id="login_form" style="width: 30%;">
            <label for="username" class="sr-only">用户名</label>
            <input type="text" id="username" name="username" class="form-control" placeholder="用户名" required autofocus><br>
            <!--          <el-input id="username" placeholder="用户名" ></el-input><br>-->
            <!--          <el-input id="password" placeholder="密码" style="margin-top: 8px"></el-input><br>-->
            <label for="password" class="sr-only">密码</label>
            <input type="password" id="password" name="password" class="form-control" placeholder="密码" required>
            <div class="text-right">
            </div>
            <el-button id="register" type="warning" style="width:100%;margin-top: 8px" @click="register()">立即注册</el-button>
            <br>
            <el-button id="back" type="info" style="width:100%;margin-top: 5px" @click="goBack()">返回登录</el-button>
            <!--        <button id="login" class="btn btn-lg btn-success btn-block" type="button" @click="login()">登录</button>-->
          </form>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "ManagerRegister",
      data(){
          return{

          }
      },
      methods:{
        goBack:function () {
          this.$router.push('/maLogin')
        },
        register:function () {
          let loginVo = {
            username:$("#username").val(),
            password:$("#password").val()
          }
          console.log(loginVo)
          this.axios.post("/manager/manager_register",loginVo).then(res =>{
            if (res.data.code != 0){
              alert(res.data.msg)
            } else {
              console.log(res.data.data)
              let userId = res.data.data
              alert('注册成功')
              this.$router.push({path:'/maLogin'})
            }

          }).catch(err =>{
            alert(err.data.msg)
          })
        }
      }
    }
</script>

<style scoped>

</style>
