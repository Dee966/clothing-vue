<template>
  <div id="detail">
    <!--    <div v-for="(v,i) in info" :key="i">{{v.name}}</div>-->
    <div class="container">
      <div id="goods_detail" class="row">
        <img :src='info.imge' class="col-md-8">
        <div  class="col-md-4">
          <h6><span id="baoyou">包邮</span>&nbsp{{info.name}}</h6>
          <div>
            <ul id="info_ul">
              <li class="row">
                <span class="col-md-3">价格</span>
                <h5 class="col-md-9" style="color: #ff5000;padding: 0px 8px"> ￥ {{info.price}}</h5>
              </li>
              <br>
              <li class="row">
                <span class="col-md-3">配送</span>
                <p class="col-md-9" style="color: #212529;padding: 0px 0px">免邮费，付款后30天内发货</p>
              </li>
              <br>
              <li class="row">
                <span class="col-md-3">尺码</span>
                <div class="col-md-9" id="color">
                  <!--                   <ul id="size" v-for="(size,i) in sizes" :key="i">-->
                  <!--&lt;!&ndash;                     <li style="padding: 5px 10px;border: solid #e4e4e4 1px;float: left;display: block;">&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;                       <div>{{size.goodsSize}}</div>&ndash;&gt;-->
                  <!--                     <input type="radio" :id="size.goodsSize" name="goodsSize" @click="chSize(size.goodsSize)">{{size.goodsSize}}-->
                  <!--&lt;!&ndash;                       <input type="radio" name="goodSize" :value="size.goodsSize" @click="chSize(size.goodsSize)" >{{size.goodsSize}}&ndash;&gt;-->

                  <!--                   </ul>-->
                  <el-radio-group v-for="(size,i) in sizes" :key="i" v-model="goodsSize" size="small">
                    <el-radio-button :label="size.goodsSize"></el-radio-button>
                  </el-radio-group>
                  <input type="hidden" id="sizeRadio" value="">
                </div>
              </li><br>
              <li class="row">
                <span class="col-md-3">数量</span>
                <div class="col-md-9"><el-input-number id="quantities" v-model="num" :min="1" label="描述文字"></el-input-number></div>
              </li>
              <br><br>
              <li style="display: flex;justify-content: space-around;">
                <el-button type="warning" style="background-color: #ffe4d0;color: #ec784c;" @click="buyGoods()">立即购买</el-button>
                <el-button type="danger" style="background-color: #ff4400;" @click="insertCart()">
                  <span style="color: white;" class="el-icon-shopping-cart-2"></span>
                  加入购物车
                </el-button>
              </li>
              <br><br>
              <li class="row">
                <span class="col-md-3">承诺</span>
                <div class="promise;" style="padding-top: 1.4px;"><span  class="el-icon-lock"></span>订单险</div>&nbsp
                <div class="promise"><span class="el-icon-phone-outline"></span>7天无理由</div>&nbsp
                <div class="promise"><span class="el-icon-truck"></span>运费险</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--      <div>{{info}}</div>-->
      <Appraise v-bind:msg="msg"/>
    </div>
  </div>
</template>

<script>
  import Appraise from './Appraise.vue'
  export default {
    name: "Detail",
    data() {
      return {
        info:[],
        imge:'/static/1.jpg',
        sizes:[],
        average:[],
        num:1,
        msg:[],
        goodsSize:""
      }
    },
    components:{
      Appraise,
    },
    methods:{
      getDetail:function (id) {
        this.axios.get('/goods/goods_show/'+id).then(res1 =>{
          this.info = res1.data.data
          console.log(res1.data.data)
          this.axios.get('/orders/goods_appraise/'+id).then(res2 =>{
            if (res2.data.code != 0){
              alert(res2.data.msg)
            } else {
              console.log(res2.data.data.appraise)
              this.msg.push(res1.data.data,res2.data.data)
              console.log(this.msg[1])
            }

          }).catch(err2 => {
            console.log(err)
          })
        }).catch(err1 => {
          console.log("请求失败！")
        })
      },
      getSize:function(id){
        this.axios.get('/goods/goods_size/'+id).then(res =>{
          this.sizes = res.data.data
          console.log(this.sizes)
        }).catch(err =>{
          console.log(err)
        })
      },
      chSize:function(chVal){
        // $("#color").css('color','#979390')
        $("#sizeRadio").val(chVal)
        // $("#"+chVal).css('color','red')
        console.log(chVal)
      },
      buyGoods:function(){
        let token = localStorage.getItem('token')
        if(token === ''){
          alert("未登录或登录失效，请先进行登录");
          this.$router.push({name: 'loginLink'})
        }
        let total = this.info.price * this.num;
        let order = {
          goodsId: this.$route.params.id,
          goodsImge:this.info.imge,
          goodsName:this.info.name,
          goodsSize:this.goodsSize,
          goodsPrice:this.info.price,
          goodsQuantities:this.num,
          goodsTotal:total
        }
        if(order.goodsSize === ''){
          alert("未选择商品尺码")
        } else {
          localStorage.setItem('goodsMag',JSON.stringify(order))
          console.log(order)
          console.log(this.goodsSize)
          // console.log(total)
          this.$router.push({name:'orderLink'})
        }
      },
      insertCart:function () {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId')
        let cart = {
          goodsId:this.$route.params.id,
          price:this.info.price,
          quantities:this.num,
          size:this.goodsSize,
          userId:userId
        }
        if (cart.size === ''){
          alert("未选择商品尺码")
        } else {
          console.log(cart)
          this.axios({
            method:"post",
            url:"/cart/cart_insert",cart,
            headers:{
              'Authorization':token
            },
            data:cart
          }).then(res =>{
            if (res.data.code != 0){
              if (res.data.msg === '未登录或登录失效，请先进行登录'){
                this.$router.push({name: 'loginLink'})
              }
              alert(res.data.msg)
            } else {
              alert("已加入购物车")
            }
          }).catch(err =>{
            alert("加入购物车失败！")
          })
        }

      }
    },
    mounted:function(){
      console.log(this.goodsSize)
      this.getDetail(this.$route.params.id);
      this.getSize(this.$route.params.id);
      // this.getAppraise(this.$route.params.id)
    },
    // create:function(){
    //   this.getAppraise(this.$route.params.id)
    // }
  }
</script>

<style scoped>
  img{
    width: 500px;
    height: 500px;

  }
  /*  #goods_detail{
      width: 100%;
      float: left;
    } */
  #info_ul,#info_ul li{
    list-style: none; /* 将默认的列表符号去掉 */
    padding: 0; /* 将默认的内边距去掉 */
    margin: 0; /* 将默认的外边距去掉 */
  }
  #info_ul,#info_ul li span{
    padding: 2px 0px;
    color: #979390;
  }
  /* #size{*/
  /*  width: 10px;*/
  /*  height: 20px;*/
  /*  padding: 3px 6px;*/
  /*  border: solid #e4e4e4 1px;*/
  /*}*/
  #size {
    width: 50px;
    height: 30px;
    list-style: none; /* 将默认的列表符号去掉 */
    padding: 0; /* 将默认的内边距去掉 */
    margin-bottom: 0px; /* 将默认的外边距去掉 */
    margin-right: 0px;
    /*border: solid #e4e4e4 1px;*/
    float: left; /* 往左浮动 */
    display: block;

  }
  #size input{
    padding: 5px 10px;
    display: flex;
    justify-content: center;
  }
  .promise{
    padding: 2px 0px;
  }
</style>
