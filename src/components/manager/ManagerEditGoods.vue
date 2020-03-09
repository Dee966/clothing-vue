<template>
    <div id="edit_goods">
      <el-form ref="form" label-width="80px">
      <el-form-item label="商品ID">
        <el-input v-model="goods.goodsId" style="width: 10%"></el-input>
      </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="goods.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="价钱">
          <el-input v-model="goods.price" style="width: 20%"></el-input> 元
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="goods.desc" style="width: 100%"></el-input>
        </el-form-item>
        <p>各码数库存</p>
        <div class="size_stock" v-for="(goodsSize,i) in goods.goodsSizes" :key="i">
          <el-form-item :label="goodsSize.goodsSize">
            <el-input v-model="goodsSize.goodsSizeStock" style="width: 15%"></el-input> &nbsp; 件
          </el-form-item>
        </div>
        <el-button type="primary" @click="edit">提交</el-button>
      </el-form>

    </div>
</template>

<script>
    export default {
        name: "ManagerEditGoods",
      data(){
          return{
            goods:{},
          }
      },
      methods:{
          getGoodsAndSize(goodsId){
            this.axios.get("/goods/get_edit/"+goodsId).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
                return
              }
              this.goods = res.data.data
              console.log(this.goods)
            }).catch(err =>{
              alert("系统错误")
            })
          },
        edit(){
            this.axios.post("/manager/edit",this.goods).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
                return
              }
              alert('修改成功')
              this.$router.go(0);
            }).catch(err =>{
              alert('系统错误')
            })
        }
      },
      mounted() {
        this.getGoodsAndSize(this.$route.params.id);
      }
    }
</script>

<style scoped>
  .size_stock{
    /*width: 150px;*/
    /*float: left;*/
    /*display: flex;*/
    /*margin-right: 10px*/
  }
</style>
