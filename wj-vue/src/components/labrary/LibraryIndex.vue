<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <sidemenu class="s" @indexSelect="listByCategory" ref="sideMenu"></sidemenu>
    </el-aside>
    <el-main>
        <book class="books-area" ref='booksArea'></book>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from "./SideMenu.vue";
import book from "./Book.vue";
export default {
  components: { 'sidemenu': SideMenu 
  ,'book':book
  },
  methods: {
      listByCategory () {
        var _this = this
        var cid = this.$refs.sideMenu.cid
        var url = 'categories/' + cid + '/books'
        this.$axios.get(url).then(resp => {
          if (resp && resp.status === 200) {
            _this.$refs.booksArea.books = resp.data.data
          }
        })
      }
    },
  name: "AppLibrary",
};
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>