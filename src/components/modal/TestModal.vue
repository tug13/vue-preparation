<script setup>
import { defineEmits, defineProps, ref, toRefs, watch } from "vue";
let emit = defineEmits(["close", "produit"]);
const props = defineProps({
  isModalOpen: Boolean,
  titleModal: String,
  rowtable: Object,
});
const { titleModal, rowtable } = toRefs(props);
let produit = ref({
  nombre: Number(),
  nom: String(),
  prix: Number(),
});
watch(props, () => {
  produit.value = rowtable.value;
});

const inputnom = ref(null);
const inputnombre = ref(null);
const inputprix = ref(null);

const submitForm = async () => {
  let value = produit.value;

  if (value.nom && value.nombre && value.prix) {
    emit("produit", produit.value);
  }
  if (!value.nom) {
    inputnom.value.focus();
  }
  if (!value.nombre) {
    inputnombre.value.focus();
  }
  if (!value.prix) {
    inputprix.value.focus();
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="isModalOpen" :class="$style.overlay"></div>
  </transition>
  <transition name="slide-fade">
    <div v-if="isModalOpen" :class="$style.modalContainer">
      <div :class="$style.modal" ref="" role="dialog">
        <header :class="$style.formHeadline">{{ titleModal }}</header>
        <main>
          <form :class="$style.form">
            <div :class="$style.formRow">
              <label for="nom">Nom</label>
              <input
                ref="inputnom"
                v-model="produit.nom"
                placeholder="nom"
                type="text"
                name="nom"
                id="nom"
                required />
            </div>
            <div :class="$style.formRow">
              <label for="nombre">Nombre</label>
              <input
                ref="inputnombre"
                v-model="produit.nombre"
                type="number"
                name="nombre"
                id="nombre" />
            </div>
            <div :class="$style.formRow">
              <label for="prix">Prix</label>
              <input
                ref="inputprix"
                v-model="produit.prix"
                type="number"
                name="prix"
                id="prix" />
            </div>

            <div :class="$style.formActions">
              <button @click.prevent="$emit('close')">Annuler</button>
              <button @click.prevent="submitForm()">Enregistrer</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(2rem);
  opacity: 0;
}
</style>

<style module>
.overlay {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0;
}

.modalContainer {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  z-index: 10;
  background-color: white;
  transform: translateY(-2rem);
}

.form {
  margin: 0;
}

.formHeadline {
  font-size: 1.6rem;
  margin-bottom: 2rem;
}

.formRow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.formRow label {
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
  text-align: left;
  flex-basis: 100%;
}

.formRow input {
  flex-basis: 100%;
  padding: 0.5rem 0.75rem;
}

.formActions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
