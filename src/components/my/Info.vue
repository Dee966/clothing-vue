<template>
  <div id="update-info" style="background-color: #f5f8fa;height: 500px">
    <div class="container">
      <br>
      <h6>个人信息</h6><br>
      <div class="form-group">
        <input type="text" class="form-control" id="name" placeholder="姓名">
      </div>
      <div class="form-group">
        <input type="tel" class="form-control" id="telephone" placeholder="手机号码">
      </div>
      <!--        <div class="form-group">-->
      <!--        <div style="margin-left: 3px">-->
      <!--          <label class="radio-inline">-->
      <!--            <input type="radio" name="sex-rad" id="inlineRadio1" value="男" @click="chMan('男')"> 男-->
      <!--          </label>-->
      <!--          <label class="radio-inline">-->
      <!--            <input type="radio" name="sex-rad" id="inlineRadio2" value="女" @click="chWomen('女')"> 女-->
      <!--          </label>-->
      <!--        </div>-->
      <div style="margin-top: 20px">
        <el-radio-group v-model="sex" size="small">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
      </div>

      <!--        </div>-->
      <div class="block">
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="选择生日">
        </el-date-picker>
      </div>
      <el-select v-model="value" placeholder="请选择城市" style="margin-bottom: 16px">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          <span style="float: left">{{ item.value }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
        </el-option>
      </el-select>
      <div class="form-group">
        <input type="text" class="form-control" id="wechat" placeholder="微信">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id="address" placeholder="收货地址">
      </div>
      <el-button type="primary" @click="updateInfo()" style="float: right">提交</el-button>
    </div>
  </div>
</template>

<script>
  import UserInfo from '../login/UserInfo'
    export default {
      name: "Info",
      data() {
        return {
          userId:0,
          input:'',
          birthday: '',
          sex: '',
          cities: [{
            value: '北京',
            label: 'Beijing'
          }, {
            value: '上海',
            label: 'Shanghai'
          }, {
            value: '南京',
            label: 'Nanjing'
          }, {
            value: '成都',
            label: 'Chengdu'
          }, {
            value: '深圳',
            label: 'Shenzhen'
          }, {
            value: '广州',
            label: 'Guangzhou'
          }],
          value: ''
        }
      },
      components:{
        UserInfo
      },
      methods:{
        updateInfo:function () {
          let userVo = {
            name:$("#name").val(),
            telephone:$("#telephone").val(),
            sex:this.sex,
            birthday:this.birthday,
            area:this.value,
            wechat:$("#wechat").val(),
            address:$("#address").val()
          }
          let token = localStorage.getItem('token');
          //let token = '966966.c8327425b0eef063b8f6d66c80a49a73';
          this.axios({
            method:'put',
            url:'/serverName/user/update_info/',
            data:userVo,
            headers:{
              'Authorization':token
            }
          }).then(res =>{
            if (res.data.code != 0){
              alert(res.data.msg)
            } else {
              console.log(res.data)
              this.user = res.data.data
              this.$router.go(0)
            }
          }).catch(err => {
            alert(err.data.msg)
          })
        }
      }
    }
</script>

<style scoped>

</style>
