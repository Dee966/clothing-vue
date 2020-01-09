<template>
    <div class="manager-order">
      <div class="container" v-for="(order,i) in orders" :key="i">
        <div id="pay_head">
          <span><strong>{{timestampToTime(order.orderTime)}}</strong></span> <span>订单id：{{order.orderId}}</span>
        </div>
        <div id="pay_body" class="row" style="margin: 0px 0px">
          <div class="col-md-3">姓名：{{order.name}}</div>
          <div class="col-md-3" style="padding: 0px 0px">手机号码：{{order.telephone}}</div>
          <div class="col-md-3">收货地址：{{order.address}}</div>
          <div class="col-md-3">
            订单状态：{{stateJudge(order.state)}}
            <el-button size="mini" type="primary" v-if="stateJudge(order.state) === '待发货'" @click="stateOpen(order.orderId)">已发货</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "ManagerOrder",
    data() {
      return {
        orders:[]
      }
    },
    methods: {
      getAllOrder: function () {
        this.axios.get('/serverName/orders/orders_show_all').then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            this.orders = res.data.data
            console.log(this.orders)
          }
        }).catch(err =>{
          console.log("请求失败")
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
      },
      stateOpen:function (orderId) {
        this.$confirm('已发货，将订单状态改为：已发货', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeState(orderId)
        }).catch(() => {
          console.log("取消")
        });
      },
      changeState:function (orderId) {
        let managerId = localStorage.getItem('userId')
        this.axios.put('/serverName/orders/orders_log',{managerId:managerId,orderId:orderId}).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.ms)
          } else {
            alert("修改成功！")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("请求失败！")
        })
      }
    },
    mounted: function () {
      this.getAllOrder()
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
