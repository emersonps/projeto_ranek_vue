<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="nome">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email">
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" v-model="senha">
    </div>
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep">
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua">
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="numero">
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade">
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado">
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";

export default {
  computed:{
    //desistrutura par criar um objeto com cada um dos itens (get e set aos respectivos campos)
    ...mapFields({
      //passa os campos
      fields: ["nome","email","senha","cep","rua","numero","bairro","cidade","estado"],
      //passa a base - objeto de UsuarioForm
      base: "usuario",
      //e a mutation
      mutation: "UPDATE_USUARIO" 
    }),
    /* com a função anterior, posso excluir as ações abaixo */ 
    // nome: {
    //   get(){
    //     return this.$store.state.usuario.nome;
    //   },
    //   set(value){
    /* Optei por enviar o value como objeto pelo fato de ao digitar no input, ele substitui o caractere pelo anterior - plugin:mapFields como função helper - dentro de helpers.js */
    //     this.$store.commit("UPDATE_USUARIO", {nome: value});
    //   }
    // },
    // email: {
    //   get(){
    //     return this.$store.state.usuario.email;
    //   },
    //   set(value){
    /* Optei por enviar o value como objeto pelo fato de ao digitar no input, ele substitui o caractere pelo anterior - plugin:mapFields como função helper - dentro de helpers.js */
    //     this.$store.commit("UPDATE_USUARIO", {email: value});
    //   }
    // }
    mostrarDadosLogin(){
      return !this.$store.state.login || this.$route.name === "usuario-editar";
    }
  },
  methods: {
    preencherCep() {
      //para aceitar apenas digitos 
      const cep = this.cep.replace(/\D/g, "");
      if(cep.length === 8){
        getCep(cep).then(response => {
          console.log(response);
          //autopreencher o campo com o logradouro
          this.rua = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.estado = response.data.uf;
          this.cidade = response.data.localidade;

        })
      }
    }
  }
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario{
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
