<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor: </span> 
            {{compra.vendedor_id}}
          </p>
        </ProdutoItem> 
      </div>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import {api} from "@/services.js";
import {mapState} from "vuex";

export default {
  components: {
    ProdutoItem
  },
  data(){
    return {
      compras: null,
    };
  }, 
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then(response => {
        this.compras = response.data; 
      });
    }
  },
  watch: {
    login(){
      this.getCompras();
    }
  },
  created(){
    if(this.login){
      this.getCompras();
    }
  }
};
</script>

<style>
  
</style>