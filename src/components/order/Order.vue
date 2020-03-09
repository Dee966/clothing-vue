<template>
  <div id="order" class="container">
    <h5 style="">订单信息确认</h5><br>
    <ul id="head" class="row">
      <li class="col-md-3">商品</li>
      <li class="col-md-3">商品属性</li>
      <li class="col-md-2">单价</li>
      <li class="col-md-2">数量</li>
      <li class="col-md-2">小计</li>
    </ul>
    <ul id="body" class="row" style="width: 100%;background-color: #f2f7ff;padding: 20px 0px;">
      <li class="col-md-3">
        <div style="width: 100%;" class="row">
          <img :src="goodsMsg.goodsImge" class="col-md-4" style="padding: 0px;height: 60px">
          <div class="col-md-8" style="padding-right: 0px;">{{goodsMsg.goodsName}}</div>
        </div>
      </li>
      <li class="col-md-3">
      尺码：{{goodsMsg.goodsSize}}
      </li>
      <li class="col-md-2">
      {{goodsMsg.goodsPrice}}
      </li>
      <li class="col-md-2">
       x{{goodsMsg.goodsQuantities}}
      </li>
      <li class="col-md-2" style="color: rgb(255, 0, 54);">
       <strong style="font-size: 18px;">{{goodsMsg.goodsTotal}}</strong>
      </li>
    </ul>
    <ul id="send" class="row" style="background-color: #f2f7ff;width: 100%;margin-top: 3px;height: 60px;padding-top: 8px;">
      <li class="col-md-2" style="padding-left: 30px;">运送方式：</li>
      <li class="col-md-10">普通配送 快递 免邮</li>
    </ul>
    <div class="row" style="width: 100%">
      <div class="col-md-7"></div>
      <div class="col-md-5">
        <div style="margin-top: 30px;display: flex;justify-content: flex-end;">
          <span style="margin-top: 4px;">实付款：</span><strong style="font-size: 26px;color: rgb(255, 0, 54);">{{goodsMsg.goodsTotal}}</strong>
        </div>
        <div style="float: right;">
          <strong>寄送至：</strong><span> {{user.address}}</span>
        </div>
        <br>
        <div style="float: right;">
          <strong>收货人：</strong><span> {{user.name}} {{user.telephone}}</span>
        </div>
      </div>
      <div style="margin-top: 10px;width: 100%;padding-right: 15px;">
        <el-button type="danger" style="background-color: #ff0036;float: right;" @click="submitOrder()">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        goodsMsg:[],
        user:[],
        userId:0
      }
    },
    methods:{
      submitOrder:function () {
        let token = localStorage.getItem('token');
        let order = {
          goodsId:this.goodsMsg.goodsId,
          price:this.goodsMsg.goodsPrice,
          quantities: this.goodsMsg.goodsQuantities,
          size:this.goodsMsg.goodsSize,
          userId:this.user.userId
        }
        console.log(order)
        this.axios({
          method: 'post',
          url:'/orders/orders_submit',
          headers: {'Authorization':token},
          data: order
        }).then(res => {
          if (res.data.code != 0){

          } else {
            let order = res.data.data
            localStorage.setItem('order',JSON.stringify(order))
            console.log(res.data.data)
            this.$router.push({name: 'payLink'})
          }
        }).catch(err =>{
          alert("订单提交失败！")
        })
      }
    },
    mounted:function(){
      this.goodsMsg = JSON.parse((localStorage.getItem('goodsMag')));
      this.userId = JSON.parse((localStorage.getItem('userId')));
      let token = localStorage.getItem('token');
      //let token = '966966.c8327425b0eef063b8f6d66c80a49a73';
      this.axios({
        method:'get',
        url:'/user/user_info/',
        headers:{
          'Authorization':token
        }
      }).then(res =>{
        if (res.data.code != 0){
          alert(res.data.msg)
        } else {
          console.log(res.data)
          this.user = res.data.data
          this.user.userId = this.userId
        }
      }).catch(err => {
        alert(err.data.msg)
      })
    },
  }
</script>

<style>
  #head{
    width: 100%;
    color: #9a9a9a;
  }
  #head, #head li {
    list-style: none; /* 将默认的列表符号去掉 */
    padding: 0; /* 将默认的内边距去掉 */
    margin: 0; /* 将默认的外边距去掉 */
    float: left; /* 往左浮动 */
    display: block;
    border-bottom: solid #b2d1ff 2px;
  }
  #head li{
    display: flex;
    justify-content: center;
  }
  #body, #body li {
    list-style: none; /* 将默认的列表符号去掉 */
    padding: 0; /* 将默认的内边距去掉 */
    margin: 0; /* 将默认的外边距去掉 */
    float: left; /* 往左浮动 */
    display: block;
  }
  #body li{
    display: flex;
    justify-content: center;
  }
  #send, #send li{
    list-style: none; /* 将默认的列表符号去掉 */
    padding: 0; /* 将默认的内边距去掉 */
    margin: 0; /* 将默认的外边距去掉 */
    float: left; /* 往左浮动 */
    display: block;
  }
</style>
