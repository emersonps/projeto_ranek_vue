<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
         <p>{{produto.descricao}}</p>
         <button class="deletar" @click="deletarProduto(produto.id)">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js"

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
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id){
      const confirmar = window.confirm("Deseja remover este produto?");
      if(confirmar){
        api.delete(`/produto/${id}`)
        .then(() => {
          this.getUsuarioProdutos();
        }).catch(error => {
          console.log(error.response);
        });
      }
    }
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

  .list-enter,
  .list-leave-to{
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }

  .list-enter-active,
  .list-leave-active{
    transition: all .3s
  }

  .deletar{
    position: absolute;
    top: 0px;
    right: 0px;
    background: url("../../assets/remove.svg") no-repeat center center;
    height: 24px;
    width: 24px;
    text-indent: -140px;
    overflow: hidden;
    cursor: pointer;
    border: none;
  }
</style>