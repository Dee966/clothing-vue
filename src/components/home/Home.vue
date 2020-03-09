<template>
  <div id="home" class="container">
    <!--    <Hander/>-->

<!--    <swiper :options="swiperOption" ref="mySwiper">-->
<!--      &lt;!&ndash; slides &ndash;&gt;-->
<!--      <swiper-slide v-for="(item,index) in items" :key="index" style="display: flex;justify-content: center">-->
<!--        <router-link :to="'/detail/'+item.goodsId">-->
<!--          <img :src="item.imge" style="width: 600px;height: 300px" id="banner_img">-->
<!--        </router-link>-->
<!--      </swiper-slide>-->
<!--    </swiper>-->
    <div style="margin-bottom: 10px;display: flex;justify-content: center;color: #FF5000"><strong style="font-size: 18px">热门商品</strong></div>
    <swiper :options="swiperOption">
      　　
      <swiper-slide v-for="(item,index) in items" :key="index" style="display: flex;justify-content: center">
        <img :src="item.imge" style="width: 600px;height: 300px" id="banner_img">
      </swiper-slide>
      　　
<!--      <div class="swiper-pagination" slot="pagination"></div>-->
      　　
      <div class="swiper-button-prev" slot="button-prev"></div>
      　　
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <br>

    <div class="home">
      <div v-for="(good,i) in goods" :key="i">
          <router-link :to="'/detail/'+good.goodsId">
            <div id="goods">
              <img :src="good.imge" style="height: 330px">
              <h5 style="color: #ff5000">￥{{good.price}}</h5>
              <p style="margin: auto">&nbsp<span id="baoyou">包邮</span> {{good.name}}</p>
            </div>
          </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
    export default {
      name: "Home",
      data() {
        return {
          swiperOption: {
            // notNextTick: true,
            // loop: true,
            // autoplay: true,
            // speed: 1500,
            // direction: 'horizontal',
            // grabCursor: true,
            // setWrapperSize: true,
            // autoHeight: true,
            // pagination: '.swiper-pagination',
            // paginationClickable: true,
            // mousewheelControl: true,
            // observeParents: true,
            // debugger: true
            pagination: {
              el: '.swiper-pagination',
              clickable: true // 允许点击小圆点跳转
            },
            autoplay: {
              delay: 3000,
              disableOnInteraction: false // 手动切换之后继续自动轮播
            },
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          },
          items: [
          ],
          goods:[]
        }
      },
      components:{
        // swiper,
        // swiperSlider
      },
      methods:{
        getGoods:function(){
          this.axios.get("/goods/goods_show_all").then(res => {
            if (res.data.code != 0){
              alert(res.data.msg)
            } else {
              this.goods = res.data.data
              this.$nextTick(() => {
                this.mySwiper()
              })
            }

          }).catch(err => {
            console.log("请求失败")
          })
        },
        getBanner:function () {
          this.axios.get('/home/rotation_chart').then(res=>{
            if (res.data.code !== 0){
              $("#banner_img").style.dsplay="none";
            }else {
              this.items = res.data.data
              console.log(this.items)
            }
          }).catch(err =>{
            $("#banner_img").style.dsplay="none";
          })
        },
        mySwiper:function () {
          let mySwiper = new Swiper('.swiper-container', {
            // loopAdditionalSlides: 3,
            loop:true,
            speed: 1500,
            pagination: {
              el: 'swiper-pagination',
              // clickable: true // 允许点击小圆点跳转
            },
            autoplay: {
              delay: 2000,
              disableOnInteraction: false // 手动切换之后继续自动轮播
            },
            observer: true, // 启动动态检查器(OB/观众/观看者)
            // observeParents: true, // 修改swiper的父元素时，自动初始化swiper
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            //如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        }
      },
      mounted:function(){ //生命周期
        this.mySwiper()
        this.getBanner()
        console.log(this.items)
        this.getGoods()
        let token = localStorage.getItem('token')
        console.log(token)
      },
      created(){
        this.mySwiper()
      }
    }

</script>

<style scoped>
  #goods{
    width: 250px;
    height: 400px;
    float: left;
    margin-right: 20px;
    margin-top: 10px;
    border: solid #dedede 1px;
  }
  img{
    width: 250px;
    height: 330px;
  }
  #baoyou{
    border: solid #ff5000 1px;
    border-radius: 10px;
    background-color: #ff5000;
    color: white
  }
  #goods:hover{
    border: solid #ff5000 3px;
  }
</style>
