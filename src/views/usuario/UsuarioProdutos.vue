<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
         <p>{{produto.descricao}}</p>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "UsuarioProdutos",
  components:{
    ProdutoAdicionar,
    ProdutoItem,
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"])
  },
  // puxar produtos quando forem criados
  watch: {
    //Se o usuário demorar um pouco pra pegar pelo servidor, usa-se a watch
    //Caso login mude, ativa também
    login() {
      this.getUsuarioProdutos();
    }
  },
  //Caso o login não exista, não pegará o usuário de início - ver watch para a solução☝...
  //Ao criar o login, ativa o método 
  created(){
    if(this.login){
      this.getUsuarioProdutos();
    }
  }
}
</script>

<style scoped>
  h2{
    margin-bottom: 20px;
  }
</style>