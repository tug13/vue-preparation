<script setup>
import Nav from '../../components/navbar/Nav-bar.vue';
import Sidebar from '../../components/sidebar/Side-bar.vue';
import Modal from '../../components/modal/TestModal.vue';
import { ref } from 'vue';
import axios from 'axios';
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { useToast } from 'vue-toast-notification';
const toast = useToast()
const activeClass = "produits"

let isModalOpen = ref(false);
let dataTable = ref({
  liste:[],
  totalGeneral:0
})
let titleModal = ref("")
let rowtable = ref({
  nom: String(),
  nombre:Number(),
  prix:Number(),
  id:Number()
})
const getApi = (async ()=>{
  await axios.get("http://localhost:3001/produits").then((res) => {
    const totalGeneral = res.data.reduce((accumulator, object) => {
  return accumulator + object.total;
}, 0);
    dataTable.value = {
        liste:[...res.data],
        totalGeneral:totalGeneral}
  })
  
})

const calculTotal = ((produit)=>{
produit.total = produit.nombre * produit.prix
return produit
}) 

const postApi =(async(produit) =>{
    
  isModalOpen.value=false
  let produitFinal = calculTotal(produit)
  if(titleModal.value == "Ajouter"){
    try{
      await axios.post("http://localhost:3001/produits",produitFinal).then(()=>{
      toast.success('Ajouté avec succès')
      getApi()
    })
    }catch (e){
      console.log(e)
      toast.error("Erreur d'ajout")
    }
    
  }
  if(titleModal.value == "Modifier"){
    let row = rowtable.value
    try{
      await axios.patch(`${`http://localhost:3001/produits`}/${row.id}`,produit).then(()=>{
        toast.success("Modifié avec succès")
        getApi()
    })
    }catch (e){
      console.log(e)
      toast.error("Erreur de modification")
    }
  } 
  
  

})

getApi()
const modifier = ((row)=>{
  rowtable.value = {
  nom: row.nom,
  nombre:row.nombre,
  prix:row.prix,
  id:row.id
}

})
const ajouter = (()=>{
  rowtable.value = {
  nom: String(),
  nombre:Number(),
  prix:Number(),
  id:Number()
}

})

const supprimer =((row) => {
  try{
    axios.delete(`${`http://localhost:3001/produits`}/${row.id}`).then(()=>{
      toast.success("Supprimé avec succès")
      getApi()
  })
  }catch(e){
    console.log(e)
    toast.error("Erreur de suppréssion !")
  }
  
})

const closemodal = (()=>{
  isModalOpen.value = false
})
const openmodal = (()=>{
  isModalOpen.value = true
})
</script>

<template>
  
  <Nav/>
  <div id="viewport">
    <Sidebar :activeClass="activeClass"/>
    <div id="content">
      
    <div class="container-fluid">
      <div class="titreLabel">
        <h4>Liste des produits</h4>
      </div>
      <div>
        <div class="boutonAdd">
          <button @click.prevent="openmodal();ajouter();titleModal='Ajouter'"  class="btn btn-primary">Ajouter</button>
        </div>
        <div>
          <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nom</th>
      <th scope="col">Nombre</th>
      <th scope="col">Prix unitaire</th>
      <th>Total</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="data in dataTable.liste" :key="data.id">
      <th scope="row">{{ data.id }}</th>
      <td>{{ data.nom }}</td>
      <td>{{ data.nombre }}</td>
      <td>{{ data.prix }} Ar</td>
      <td>{{ data.total }} Ar</td>
      <td>
        <button @click="openmodal();modifier(data); titleModal='Modifier'" type="button" class="btn btn-info mr-1"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button @click="supprimer(data)" type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
      </td>

    </tr>
    <tr>
      <th scope="row">Total Général:</th>
      <th scope="row">{{ dataTable.totalGeneral }} Ar</th>
    </tr>
  </tbody>
</table>
        </div>
      
      </div>
      
    </div>
  </div>

  </div>
  
  <Modal :isModalOpen="isModalOpen" :titleModal="titleModal" :rowtable="rowtable" @close="closemodal" @produit="postApi" />

</template>

<style scoped>
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
.titreLabel{
  display: flex;
  padding: 20px;
  align-items: start;
}
.boutonAdd{
  display: flex;
  justify-content: end;
  margin-right: 7%;
  margin-bottom: 5px;
}
</style>
