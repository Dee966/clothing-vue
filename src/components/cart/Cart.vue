<template>
  <div id="cart">
    <div class="container">
      <div class="row" style="padding: 10px 0px 20px 0px;border-top: solid #e6e6e6">
        <div class="col-md-4"></div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-2">单价</div>
            <div class="col-md-2">数量</div>
            <div class="col-md-2">金额</div>
            <div class="col-md-3">操作</div>
          </div>
        </div>
      </div>

        <div class="row" v-if="cartNull.code != 30101" v-for="(cart,i) in carts" :key="i">
          <div class="col-md-4" style="background-color: #f0f0f0;">
            <div class="row move-top">
              <div class="col-md-5">
                <img :src='cart.goods.imge' style="width: 75px;height: 75px;">
              </div>
              <div class="col-md-7" style="padding-left: 0px">
                <span>{{cart.goods.name}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-8" style="background-color: #f0f0f0;">
            <div class="row move-top">
              <div class="col-md-3" style="height: 80px">
                <div class="move-top" style="color: #999">尺码： {{cart.size}}</div>
              </div>
              <div class="col-md-2">
                <div class="move-top"><strong>￥ {{cart.price}}</strong></div>
              </div>
              <div class="col-md-2">
                <div class="move-top">x {{cart.quantities}}</div>
              </div>
              <div class="col-md-2">
                <div class="move-top"><strong style="color: #ff462b">￥ {{cart.total}}</strong></div>
              </div>
              <div class="col-md-3">
<!--                <el-checkbox label=""></el-checkbox>-->
                <input type="checkbox" class="move-top" :id="cart.cartId">
                <div class="move-top" style="cursor:pointer;float: right" @click="openDelete(cart.cartId)">删除</div>
              </div>
            </div>
          </div>
        </div>


      <el-button type="danger" style="float: right" @click="settlement()">&nbsp结算&nbsp</el-button>


    </div>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data() {
      return {
        carts: [],
        cartNull:[],
        goods: [],
        order: [],
        checkList:[]
      }
    },
    methods: {
      getCarts: function () {
        let token = localStorage.getItem('token');
        //let token = '966966.c8327425b0eef063b8f6d66c80a49a73';
        this.axios({
          method: 'get',
          url: '/cart/cart_show/',
          headers: {
            'Authorization': token
          }
        }).then(res => {
          if (res.data.code !== 0){
            if (res.data.msg === '未登录或登录失效，请先进行登录'){
              this.$router.push({name: 'loginLink'})
            }
            this.cartNull = res.data
            alert(res.data.msg)
          } else {
            console.log(res.data)
            this.carts = res.data.data
          }
        }).catch(err => {
          alert(err.data.msg)
        })
      },
      settlement:function () {
        let userId = localStorage.getItem('userId');
        for (let i=0;i < this.carts.length;i++){
          if (document.getElementById(this.carts[i].cartId).checked === true){
            this.carts[i].userId = userId
            delete this.carts[i].goods
            this.checkList.push(this.carts[i])
          }
        }
        console.log(this.checkList)
        if (this.checkList.length === 0){
          alert('请选择购物车中要购买的商品')
          return
        }
        console.log(this.checkList)
        this.axios.post('/cart/cart_order/',this.checkList).then(res =>{
          if (res.data.code != 0){

          }else {
            let order = res.data.data
            localStorage.setItem('order',JSON.stringify(order))
            console.log(res.data.data)
            this.$router.push({name: 'payLink'})
          }
        }).catch(err =>{
          alert("请求失败")
        })
      },
      openDelete:function(cartId){
        this.$alert('确定要移除该商品出购物车吗？', '提示', {
          confirmButtonText: '删除',
          callback: action => {
            this.deleteCart(cartId)
          }
        });
        //this.deleteCart(cartId)
      },
      deleteCart:function (cartId) {
        console.log(cartId)
        this.axios.delete('/cart/cart_delete/'+cartId).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          }else {
            alert("删除成功！")
            this.$router.go(0);
          }
        }).catch(err =>{
          console.log("请求失败！")
        })
      }
    },

    mounted: function () {
      this.getCarts();
    }
  }
</script>

<style scoped>
  .move-top {
    margin-top: 15px;
  }
</style>
