<template>
    <div id="manager-banner">
      <div class="container">
        <span style="color: #dc3545">*点击图片可删除轮播图</span><br><br>
        <div id="banner" v-for="(banner,i) in banners" :key="i">
          <img :src="banner.imge" style="width: 600px;height: 300px" @click="openDeleteBanner(banner.rotationId)">
        </div>
        <br>
        <form class="form-signin">
          <input type="text" id="good_id" name="goodId" class="form-control" placeholder="商品ID" required autofocus><br>
        </form>
        <form id="upload_banner" enctype="multipart/form-data">
          轮播图上传：<input type="file" id="baImg" name="imge">
        </form>
        <el-button id="login" type="primary" style="float: right" @click="uplBanner()">上传</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ManagerBanner",
      data() {
          return {
            rotation:{

            },
            imge:'',
            banners:[]
          }
      },
      methods:{
        uplBanner:function () {
          let formData = new FormData($('#upload_banner')[0]);
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.axios.post('/home/rotation_upload',formData,config).then(res =>{
            if (res.data.code !== 0){
              alert("上传失败")
            }else {
              this.imge = res.data.data
              this.rotation = {
                goodsID : $("#good_id").val(),
                imge : this.imge,
                managerId : localStorage.getItem('userId')
              }
              console.log(this.rotation)
              this.axios.post('/home/rotation_insert',this.rotation).then(res =>{
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
        getBanners:function () {
          this.axios.get('/home/rotation_chart').then(res => {
            if (res.data.code !== 0){
              alert("目前还没有轮播图")
            }else {
              this.banners = res.data.data
            }
          }).catch(err => {
            alert("目前还没有轮播图")
          })
        },
        openDeleteBanner:function(bannerId){
          this.$confirm('确定要删除该商品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteBanner(bannerId)
          }).catch(() => {
            console.log("取消")
          });
        },
        deleteBanner:function(bannerId){
          console.log(bannerId)
          this.axios.delete('/home/rotation_delete/'+bannerId).then(res =>{
            if (res.data.code !== 0){
              alert("删除失败")
            } else {
              alert("删除成功！")
              this.$router.go(0);
            }
          }).catch(err =>{
            console.log("删除失败！")
          })
        },
      },
      mounted:function () {
        this.getBanners()
      }
    }
</script>

<style scoped>

</style>
