<script setup>
import { ref, toRefs, defineProps } from "vue";
const props = defineProps({
  activeClass: String,
});

const { activeClass } = toRefs(props);
let classActive = ref({
  dashboard: "",
  produits: "",
  matrice: "",
});
switch (activeClass.value) {
  case "dashboard":
    classActive.value.dashboard = "activeClass";
    break;
  case "produits":
    classActive.value.produits = "activeClass";
    break;
  // …
  case "matrice":
    classActive.value.matrice = "activeClass";
    break;
  default:
    classActive.value.dashboard = "activeClass";
}
</script>

<template>
  <!-- Sidebar -->
  <div id="sidebar">
    <header>
      <a href="#">My App</a>
    </header>
    <ul class="ulnav">
      <router-link class="router-link" to="dashboard">
        <li :class="classActive.dashboard">Dashboard</li>
      </router-link>
      <router-link to="produits">
        <li :class="classActive.produits">Produits</li>
      </router-link>
      <router-link to="matrice">
        <li :class="classActive.matrice">Matrix</li>
      </router-link>
    </ul>
  </div>
  <!-- Content -->
</template>

<style scoped>
.activeClass {
  background-color: red !important;
  text-decoration: none;
}
ul a {
  text-decoration: none;
}

body {
  overflow-x: hidden;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

/* Toggle Styles */

/* Sidebar Styles */

#sidebar {
  z-index: 0;
  position: fixed;
  left: 250px;
  width: 250px;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  background: #37474f;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#sidebar header {
  background-color: #263238;
  font-size: 20px;
  line-height: 52px;
  text-align: center;
}

#sidebar header a {
  color: #fff;
  display: block;
  text-decoration: none;
}

#sidebar header a:hover {
  color: #fff;
}
#sidebar .ulnav li {
  background: none;
  border-bottom: 1px solid #455a64;
  color: #cfd8dc;
  font-size: 14px;
  padding: 16px 24px;
  cursor: pointer;
}

#sidebar .ulnav li:hover {
  background: none;
  color: #eceff1;
}

#sidebar .ulnav i {
  margin-right: 16px;
}
</style>
