<template>
  <div id="appraise">
    <br><br><br>
      <el-tabs v-model="activeName" type="card" @click="getAppraise(msg.goodsId)">
        <el-tab-pane label="商品详情" name="first">{{msg[0].desc}}</el-tab-pane>
         <el-tab-pane label="用户评价" name="second" >
         <div v-for="(appraise,i) in msg[1]">{{i+1}}.{{appraise}}</div>
         </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
  export default {
    name:'Appraise',
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {

    },
    props:{
      msg:Object
    },
    mounted:function(){
      console.log(this.msg)
    }
  };
</script>

<style>
</style>
