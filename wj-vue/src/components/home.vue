<template>
<div>
    <navmenu></navmenu>
  <router-view/>
  </div>
    
</template>

<script>
import navMenu from './common/NavMenu.vue'
export default {
components:{'navmenu':navMenu},
name:'home'
}
</script>

<style>

</style>