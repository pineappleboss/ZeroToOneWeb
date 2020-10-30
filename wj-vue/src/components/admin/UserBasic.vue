<template>
  <el-table :data="users" stripe >
    <el-table-column prop="id" label="id" width="100"></el-table-column>
    <el-table-column prop="name" label="用户名" fit width="200"></el-table-column>······
    <el-table-column prop="role" label="角色" width="200"></el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    loadUser() {
      this.$axios.get("/user").then((resp) => {
        if (resp.data.statusCode === 200) {
          this.users = resp.data.data;
        }
      });
    },
    editUser(user){
        this.$router.push({name:'userMessger',params:{user:user}});
        this.$router.replace('/userProfile')
    }
  },
  mounted(){
      this.loadUser();
  }
};
</script>

<style>
</style>