<template>
    <div id="show-order">
      <div class="container">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有订单" name="first">
            <div v-if="ordersNull != 40102">
              <div v-for="(order,i) in orders" :key="i">
                <!--              <div style="width: 100%;height: 36px;background-color: #f1f1f1;padding: 8px 3px">-->
                <!--                <strong>2019-11-11</strong>&nbsp-->
                <!--                订单id：1-->
                <!--              </div>-->
                <div class="row">
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-3" style="padding: 5px 5px">
                        <img :src=order.imge>
                      </div>
                      <div class="col-md-9" style="padding: 5px 5px">
                        <span style="font-size: 12px">{{order.name}}</span><br>
                        <span style="font-size: 10px;color: #9e9e9e">尺码： {{order.size}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-2" style="padding: 5px 5px">￥{{order.price}}</div>
                      <div class="col-md-2" style="padding-top: 5px">x {{order.quantities}}</div>
                      <div class="col-md-4" style="padding-top: 5px">￥ {{order.total}}</div>
                      <div class="col-md-4" style="padding-top: 5px">{{order.state}} <br>订单id:{{order.orderId}} <br>{{timestampToTime(order.orderTime)}} </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="待付款" name="second">
            <div v-if="ordersNull != 40102">
              <div v-for="(order,i) in orders" :key="i">
                <!--              <div style="width: 100%;height: 36px;background-color: #f1f1f1;padding: 8px 3px">-->
                <!--                <strong>2019-11-11</strong>&nbsp-->
                <!--                订单id：1-->
                <!--              </div>-->
                <div class="row" >
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-3" style="padding: 5px 5px">
                        <img :src=order.imge>
                      </div>
                      <div class="col-md-9" style="padding: 5px 5px">
                        <span style="font-size: 12px">{{order.name}}</span><br>
                        <span style="font-size: 10px;color: #9e9e9e">尺码： {{order.size}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-2" style="padding: 5px 5px">￥{{order.price}}</div>
                      <div class="col-md-2" style="padding-top: 5px">x {{order.quantities}}</div>
                      <div class="col-md-4" style="padding-top: 5px">￥ {{order.total}}</div>
                      <div class="col-md-4" style="padding-top: 5px">{{order.state}} <br>订单id:{{order.orderId}} <br>{{timestampToTime(order.orderTime)}} </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="待发货" name="third">
            <div v-if="ordersNull != 40102">
              <div v-for="(order,i) in orders" :key="i">
                <!--              <div style="width: 100%;height: 36px;background-color: #f1f1f1;padding: 8px 3px">-->
                <!--                <strong>2019-11-11</strong>&nbsp-->
                <!--                订单id：1-->
                <!--              </div>-->
                <div class="row">
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-3" style="padding: 5px 5px">
                        <img :src=order.imge>
                      </div>
                      <div class="col-md-9" style="padding: 5px 5px">
                        <span style="font-size: 12px">{{order.name}}</span><br>
                        <span style="font-size: 10px;color: #9e9e9e">尺码： {{order.size}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-2" style="padding: 5px 5px">￥{{order.price}}</div>
                      <div class="col-md-2" style="padding-top: 5px">x {{order.quantities}}</div>
                      <div class="col-md-4" style="padding-top: 5px">￥ {{order.total}}</div>
                      <div class="col-md-4" style="padding-top: 5px">{{order.state}} <br>订单id:{{order.orderId}} <br>{{timestampToTime(order.orderTime)}} </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="待收货" name="fourth">
            <div v-if="ordersNull != 40102">
              <div v-for="(order,i) in orders" :key="i">
                <!--              <div style="width: 100%;height: 36px;background-color: #f1f1f1;padding: 8px 3px">-->
                <!--                <strong>2019-11-11</strong>&nbsp-->
                <!--                订单id：1-->
                <!--              </div>-->
                <div class="row">
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-3" style="padding: 5px 5px">
                        <img :src=order.imge>
                      </div>
                      <div class="col-md-9" style="padding: 5px 5px">
                        <span style="font-size: 12px">{{order.name}}</span><br>
                        <span style="font-size: 10px;color: #9e9e9e">尺码： {{order.size}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-2" style="padding: 5px 5px">￥{{order.price}}</div>
                      <div class="col-md-2" style="padding-top: 5px">x {{order.quantities}}</div>
                      <div class="col-md-4" style="padding-top: 5px">￥ {{order.total}}</div>
                      <div class="col-md-4" style="padding-top: 5px">
                        {{order.state}}
                        <el-button id="login" type="primary" size="mini" style="float: right" @click="openConfirm(order.orderId)">确认收货</el-button>
                        <br>订单id:{{order.orderId}} <br>{{timestampToTime(order.orderTime)}} </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待评价" name="fifth">
            <div v-if="ordersNull != 40102">
              <div v-for="(order,i) in orders" :key="i">
                <!--              <div style="width: 100%;height: 36px;background-color: #f1f1f1;padding: 8px 3px">-->
                <!--                <strong>2019-11-11</strong>&nbsp-->
                <!--                订单id：1-->
                <!--              </div>-->
                <div class="row">
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-3" style="padding: 5px 5px">
                        <img :src=order.imge>
                      </div>
                      <div class="col-md-9" style="padding: 5px 5px">
                        <span style="font-size: 12px">{{order.name}}</span><br>
                        <span style="font-size: 10px;color: #9e9e9e">尺码： {{order.size}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-2" style="padding: 5px 5px">￥{{order.price}}</div>
                      <div class="col-md-2" style="padding-top: 5px">x {{order.quantities}}</div>
                      <div class="col-md-4" style="padding-top: 5px">￥ {{order.total}}</div>
                      <div class="col-md-4" style="padding-top: 5px">
                        <router-link :to="{name:'wriAppraiseLink'}"><span style="cursor:pointer" @click="getListId(order.ordersListId)">{{order.state}}</span></router-link>
                        <br>订单id:{{order.orderId}} <br>{{timestampToTime(order.orderTime)}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br>
        <router-view/>
      </div>
    </div>
</template>

<script>
  import WriteAppraise from './WriteAppraise'
    export default {
        name: "ShowOrder",
      data(){
          return{
            activeName:'first',
            orders:[],
            ordersNull:0,
          }
      },
      components:{
        WriteAppraise
      },
      methods:{
        handleClick:function(tab){
          if (tab.label == '待付款'){
            this.stateOrders(0)
          } else if(tab.label == '待发货'){
            this.stateOrders(1)
          } else if(tab.label == '待收货'){
            this.stateOrders(2)
          } else if(tab.label == '待评价'){
            this.stateOrders(3)
          } else if (tab.label == '所有订单'){
            this.allOrders()
          }

        },
        allOrders:function () {
          let userId = localStorage.getItem('userId')
            this.axios.get('/orders/get_orders/'+userId).then(res =>{
              if (res.data.code != 0){
                this.ordersNull = res.data.code
              } else {
                this.orders = res.data.data
                console.log(this.orders)
              }
            }).catch(err => {
              alert(err.data.msg)
            })
        },
        stateOrders:function (state) {
          let userId = localStorage.getItem('userId')
          this.axios.get('/orders/get_state?state='+state+'&userId='+userId).then(res => {
            if (res.data.code != 0){
              this.ordersNull = res.data.code
            } else {
              this.orders = res.data.data
              console.log(this.orders)
            }
          }).catch(err => {
            alert(err)
          })
        },
        openConfirm:function(orderId){
          this.$confirm('已收货，将订单状态改为：已收货', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.confirmGoods(orderId)
          }).catch(() => {
            console.log("取消")
          });
        },
        confirmGoods:function(orderId){
          console.log(orderId)
          this.axios.put('/orders/confirm_goods/'+orderId).then(res =>{
            if (res.data.code !== 0){
              alert("确认失败")
            }else {
              alert("已确认收货")
              this.$router.go(0);
            }
          }).catch(err =>{
            alert("系统错误")
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
        getListId:function (ordersListId) {
          console.log(ordersListId)
          localStorage.setItem('ordersListId',ordersListId);
        }

      },
      mounted:function () {
          this.allOrders()
      }
    }
</script>

<style scoped>

</style>
