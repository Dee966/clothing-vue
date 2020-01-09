<template>
    <div id="pay">
      <div class="container">
        <h5>下单成功！请支付</h5>
        <div id="pay_head">
          <span><strong>{{timestampToTime(order.orderTime)}}</strong></span> <span>订单id：{{order.orderId}}</span>
        </div>
        <div id="pay_body" class="row" style="margin: 0px 0px">
          <div class="col-md-3">姓名：{{order.name}}</div>
          <div class="col-md-3" style="padding: 0px 0px">手机号码：{{order.telephone}}</div>
          <div class="col-md-3">收货地址：{{order.address}}</div>
          <div class="col-md-3">订单状态：{{stateJudge(order.state)}}</div>
          <div style="margin-left: 70%">
            <strong style="font-size: 20px;color: #ff4401">需支付：￥ {{order.total}}</strong>
          </div>
        </div>
        <br>
        <el-button type="danger" style="background-color: #ff0036;float: right;" @click="pay()">立即支付</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Pay",
      data() {
        return {
          order:[]
        }
      },
      methods:{
        pay:function () {
          this.axios.put("/serverName/orders/order_pay/"+this.order.orderId).then(res =>{
            if (res.data.code != 0){
              alert("支付失败！")
            } else {
              alert("支付成功！")
              this.$router.push({name: 'homeLink'})
            }
          })
        },
        timestampToTime:function (timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
          let strDate = Y+M+D;
          return strDate;
        },
        stateJudge:function (state) {
          if (state == 0) return '待支付';
          if (state == 1) return '待发货';
          if (state == 2) return '待收货';
          if (state == 3) return '待评价';
        }
      },
      mounted:function () {
        this.order = JSON.parse(localStorage.getItem('order'))
        console.log(this.order)
      }
    }
</script>

<style scoped>
  #pay_head{
    width: 100%;
    height: 40px;
    padding-top: 10px;
    background-color: #f5f5f5;
  }
  #pay_body{
    border: solid #f1f1f1 1px;
    width: 100%;
    height: 100px;
    padding: 10px;
  }
</style>
