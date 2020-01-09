<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <Hander/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Hander from "./components/Hander";

export default {
  name: 'App',
  data() {
    return {
      tabType:true,
    }
  },
  components:{
    Hander
  },
  watch:{
    $route(e){
      if (e.name == 'homeLink'){
        this.$router.go(0)
      }else if (e.name == 'loginLink'){
        this.$router.go(0)
        console.log(123)
      }
    }
  },
  methods:{
  }
}
</script>

<style>
</style>
