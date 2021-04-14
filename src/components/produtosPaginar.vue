<template>
  <ul v-if="paginasTotal > 1">
    <router-link :to="{query: query(1)}">◀</router-link>
    <li v-for="pagina in paginas" :key="pagina">        
      <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
    </li>
    <router-link :to="{query: query(paginasTotal)}"> ▶ </router-link>
  </ul>
</template>

<script>
export default{
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1
    },
    produtosTotal:{
      type: Number,
      default: 1
    }
  },
 methods: {
  //  Paginação foi usado o atributo page (Ex: ?_page=1, ?_page=2) para linkar as págnia à navegação.
  // - Foi feito uma divisão do produtoTotal com produtosPorPagina. O resultado foi arredondado para cima usando o Math.ceil(resultado)
  // - Erro: ao pesquisar, por exemplo, um item e listar apenas dois, a paginação, no primeiro instante, virá correta, mas ao clicar pra irmos para a página 2, por exemplo, a rota perde o valor e lista o total de páginas real, e não o da pesquisa atual.
  // 	Solução: Criar um método para desestruturar a query atual, e pegar o novo query da pesquisa. 
  query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina,
      };
    }
  },
  computed: {
    // Range de paginação: retonar um array com o total de páginas que eu quero no momento.
    // Primeiro tenho que saber qual a página atual pra mostrar a quantidade de página a mais.
    paginas(){
      const current = Number(this.$route.query._page);
      const range = 3;
      const offset = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];

      for (let i = 1 ; i <= total ; i++){
        pagesArray.push(i);
      }
      
      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return pagesArray;
      // console.log(pagesArray);
    },
    paginasTotal(){
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    }
  }
}
  
</script>

<style>
ul{
  grid-column: 1/-1;
}

li{
  display: inline-block;
}

li a{
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover{
  background: #87f;
  color: #fff;
}


  
</style>
