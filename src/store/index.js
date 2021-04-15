import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services.js';  

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    //Invés de criar um objeto tipo flat (só tem uma propriedade dentro dele - um nível de método) 
    //para separr os dados do endereço, é mais viável criar um objeto só 
    //para facilitar o manipulação dos dados com o Vuex.
    usuario:{
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    usuario_produtos : null
  },
  mutations: {
    //aqui muda o usuário
    UPDATE_LOGIN(state, payload){
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload){
      /* uso do Object.assign() no payload, para combinar objetos (torna o código mais inteligente na hora ;de preencher os forms e inputar os valores em seus respectivos campos) e para evitar a desistruturação do objeto "usuario" */ 
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload){
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload){
      //adicionar os produtos no final da lista com unshit
      state.usuario_produtos.unshit(payload);
    }
  },
  actions: {
    //ação que chama o usuário e seus respectivos produtos 
    getUsuarioProdutos(context){
      api.get(`/produto?usuario_id=${context.state.usuario.id}`).then(
        response => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        }
      );
    },
    getUsuario(context, payload){
      //Uso do return - retorna toda a parte do api para usar o then no dispatch do LoginCriar
      return api.get(`/usuario/${payload}`).then(response => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      })
    },
    criarUsuario(context, payload){
      context.commit("UPDATE_USUARIO", { id: payload.email }); //Atribuindo o e-mail que foi definido como ID
      return api.post("/usuario", payload); //payload é o objeto com todas as informações do usuário
    },
    deslogarUsuario(context){
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
