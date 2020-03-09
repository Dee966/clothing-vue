<template>
    <div id="manager-upload">
      <div class="container">
        <h5>填写商品信息：</h5>
        <form class="form-signin">
          <input type="text" id="name" name="name" class="form-control" placeholder="商品名称" required autofocus><br>
          <input type="text" id="goodsTypeId" name="goodsTypeId" class="form-control" placeholder="商品分类 1：上装 2：下装 3：配件 4：童装" required><br>
          <input type="text" id="price" name="price" class="form-control" placeholder="商品价格" required><br>
          <input type="text" id="desc" name="desc" class="form-control" placeholder="商品描述" required><br>
          <input type="text" id="stock" name="stock" class="form-control" placeholder="商品库存" required><br>
          <p>各码数库存</p>
          <div id="size_stock">
            <input type="hidden" id="goodsSizeS" name="goodsSizeS" value="s">
            <input type="hidden" id="goodsSizeM" name="goodsSizeM" value="m">
            <input type="hidden" id="goodsSizeL" name="goodsSizeL" value="l">
            <input type="hidden" id="goodsSizeXL" name="goodsSizeXL" value="xl">
            <input type="hidden" id="goodsSizeXXL" name="goodsSizeXXL" value="xxl">
            <input type="hidden" id="goodsSizeXXXL" name="goodsSizeXXXL" value="xxxl">
            <input type="hidden" id="goodsSizeAverage" name="goodsSizeAverage" value="average">
            <input type="text" id="s" name="s" class="form-control size_stock" placeholder="s码" required>
            <input type="text" id="m" name="m" class="form-control size_stock" placeholder="m码" required>
            <input type="text" id="l" name="l" class="form-control size_stock" placeholder="l码" required>
            <input type="text" id="xl" name="xl" class="form-control size_stock" placeholder="xl码" required>
            <input type="text" id="xxl" name="xxl" class="form-control size_stock" placeholder="xxl码" required>
            <input type="text" id="xxxl" name="xxxl" class="form-control size_stock" placeholder="xxxl码" required>
            <input type="text" id="average" name="average" class="form-control size_stock" placeholder="均码" required>
          </div>

        </form>
        <br><br><br>
        <form id="upload_imge" enctype="multipart/form-data">
          商品图片上传：<input type="file" id="imge" name="imge">
        </form>

      </div>
      <el-button id="login" type="primary" style="float: right" @click="upload()">上架</el-button>
    </div>
</template>

<script>
    export default {
        name: "ManagerUpload",
      data(){
          return{
            goodsInfo:{},
            imge:''
          }
      },
      methods:{
          upload:function () {
            let formData = new FormData($('#upload_imge')[0]);
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            this.axios.post('/goods/goods_upload',formData,config).then(res => {
              if (res.data.code !== 0){
                alert("上传失败")
              }else {
                this.imge = res.data.data
                this.goodsInfo = {
                  name : $("#name").val(),
                  goodsTypeId : $("#goodsTypeId").val(),
                  price : $("#price").val(),
                  desc : $("#desc").val(),
                  stock : $("#stock").val(),
                  imge : this.imge,
                  goodDate : new Date(),
                  goodsSizeVos : [
                    {
                      goodsSize : $("#goodsSizeS").val(),
                      goodsSizeStock : $("#s").val()
                    },
                    {
                      goodsSize : $("#goodsSizeM").val(),
                      goodsSizeStock : $("#m").val()
                    },
                    {
                      goodsSize : $("#goodsSizeL").val(),
                      goodsSizeStock : $("#l").val()
                    },
                    {
                      goodsSize : $("#goodsSizeXL").val(),
                      goodsSizeStock : $("#xl").val()
                    },
                    {
                      goodsSize : $("#goodsSizeXXL").val(),
                      goodsSizeStock : $("#xxl").val()
                    },
                    {
                      goodsSize : $("#goodsSizeXXXL").val(),
                      goodsSizeStock : $("#xxxl").val()
                    },
                    {
                      goodsSize : $("#goodsSizeAverage").val(),
                      goodsSizeStock : $("#average").val()
                    },
                  ]
                }
                this.axios.post('/goods/goods_insert',this.goodsInfo).then(res =>{
                  if (res.data.code !== 0){
                    alert("上传失败！")
                  } else {
                    alert("上传成功！")
                    this.$router.go(0);
                  }
                }).catch(err => {
                  alert("上传失败！")
                })
              }
            }).catch(err =>{
              alert("上传失败！")
            })
          },
      }
    }
</script>

<style scoped>
.size_stock{
  width: 70px;
  float: left;
  margin-right: 10px
}
</style>
