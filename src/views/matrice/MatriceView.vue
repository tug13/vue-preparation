<script setup>
import Nav from "../../components/navbar/Nav-bar.vue";
import Sidebar from "../../components/sidebar/Side-bar.vue";
import { ref } from "vue";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
let dimension = 2;
let tabledimension = ref(Number());
let determinant = ref(Number());

let datainput = ref([]);
const createTable = () => {
  datainput.value = [];
  determinant.value = 0;
  if (dimension < 2) {
    dimension = 2;
  }
  if (dimension > 9) {
    dimension = 9;
  }
  for (let i = 0; i < dimension; i++) {
    datainput.value.push(Array(dimension));
  }
  tabledimension.value = dimension;
};

const activeClass = "matrice";

function calculdeterminant(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    if (matrix[i].length !== n) {
      throw new Error("Input matrix must be square");
    }
  }
  if (n === 1) {
    return matrix[0][0];
  }

  let det = 0;
  for (let j = 0; j < n; j++) {
    const minorMatrix = matrix
      .slice(1)
      .map((row) => row.slice(0, j).concat(row.slice(j + 1)));
    const cofactor = matrix[0][j] * calculdeterminant(minorMatrix);
    if (j % 2 === 0) {
      det += cofactor;
    } else {
      det -= cofactor;
    }
  }

  return det;
}
const generermatrice = () => {
  if (!containsNonNumericValues(datainput.value)) {
    let result = calculdeterminant(datainput.value);
    determinant.value = result;
  } else {
    toast.error("Veuillez remplir tout les champs");
  }
};

const remplirauto = () => {
  for (let i = 0; i < tabledimension.value; i++) {
    for (let j = 0; j < tabledimension.value; j++) {
      datainput.value[i][j] =
        Math.floor(Math.random() * (100 - -100 + 1)) + -100;
    }
  }
};

function containsNonNumericValues(matrix) {
  for (const row of matrix) {
    for (const element of row) {
      if (typeof element !== "number" || isNaN(element)) {
        return true;
      }
    }
  }
  return false;
}
</script>

<template>
  <Nav />
  <div id="viewport">
    <Sidebar :activeClass="activeClass" />
    <div id="content">
      <div class="container-fluid">
        <div>
          <h3 class="dashboard-title">Matrix</h3>
          <label>Choisir la dimension de la matrice:</label>
          <input
            v-model="dimension"
            class="choixInput"
            type="number"
            min="2"
            max="9" />
          <button @click="createTable" class="btn btn-info matriceBouton">
            Ok
          </button>
        </div>
        <div class="d-flex matriceTable">
          <table>
            <body>
              <tr v-for="(n, indexp) in tabledimension" :key="indexp">
                <td v-for="(n, index) in tabledimension" :key="index">
                  <input
                    v-model="datainput[indexp][index]"
                    type="number"
                    class="matriceInput" />
                </td>
              </tr>
            </body>
          </table>
        </div>
        <button
          v-if="tabledimension"
          @click="remplirauto"
          class="btn btn-secondary replirauto">
          Remplir auto
        </button>
        <button
          v-if="tabledimension"
          @click="generermatrice"
          class="btn btn-primary">
          Générer
        </button>
        <div class="determinant">
          <label v-if="determinant" for=""
            >Le détérminant est:<span class="font-weight-bold ml-2">{{
              determinant
            }}</span></label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.replirauto {
  margin-right: 5px;
}
.determinant {
  margin-top: 30px;
}
.choixInput {
  width: 60px;
  margin-left: 5px;
}
.matriceBouton {
  margin-left: 15px;
}
.matriceInput {
  margin: 10px;
  border: solid 1px;
  width: 100px;
}
.matriceTable {
  justify-content: center;
  padding-top: 50px;
}
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
