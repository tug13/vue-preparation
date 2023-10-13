<script setup>
import Nav from '../../components/navbar/Nav-bar.vue';
import Sidebar from '../../components/sidebar/Side-bar.vue';
const activeClass = "dashboard"
</script>

<template>
  
  <Nav/>
  <div id="viewport">
    <Sidebar :activeClass="activeClass"/>
    <div id="content">
    <div class="container-fluid">
        <h3 class="dashboard-title">Dashboard</h3>
    </div>
  </div>
  </div>

</template>

<style scoped>
.dashboard-title {
  padding-top: 15px;
}
#content {
  width: 100%;
  position: relative;
  margin-right: 0;
}

#viewport {
  padding-left: 250px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
