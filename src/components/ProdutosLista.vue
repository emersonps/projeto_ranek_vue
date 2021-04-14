<template>
    <section class="produtos-container">
      <div v-for="produto in produtos" :key="produto.id">
        <img v-if="produtos.fotos" :src="produto.fotos[0].src" alt="produto.fotos[0].titulo">
        <p class="preco">{{produto.preco}}</p>
        <h2 class="titulo">{{produto.nome}}</h2>
        <p>{{produto.descricao}}</p>
        <!-- <p>{{url}}</p> -->
      </div>
    </section>
</template>

<script>
  import { api } from "@/services.js";

  export default{
    data(){
      return{
        produtos: null
      }
    },
    computed: {
      url(){
        //Serializar a informação
        let queryString = "";
        for (let key in this.$route.query){
          queryString += `&${key}=${this.$route.query[key]}`;
        }
        // console.log(queryString);

        // return this.$route.query
        return "/produto?_limit=10" + queryString;
      }
    },
    methods: {
      getProdutos(){
        // Axios - preferi substituir o uso do fetch pela biblioteca axios, pela facilidade que ele nos dá 
        // na conversão dos dados para JSon (pois ele já faz isso automaticamente), e pela prática 
        // nos Gets e Posts
        api.get(this.url).then(response => {
        // api.get(this.url).then(response => {
          // console.log(response);
          this.produtos = response.data;
        });

        // fetch("http://localhost:3000/produto")
        // .then(response => response.json())
        // .then(response => {
        //   this.produtos = response;
        // });
      }
    },
    watch: {
      url(){
        this.getProdutos();
      }
    },
    created() {
      this.getProdutos();
    }
  };
</script>
 
<style>

</style>
