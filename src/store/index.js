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
    }
  },
  mutations: {
    //aqui muda o usuário
    UPDATE_LOGIN(state, payload){
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload){
      /* uso do Object.assign() no payload, para combinar objetos (torna o código mais inteligente na hora ;de preencher os forms e inputar os valores em seus respectivos campos) e para evitar a desistruturação do objeto "usuario" */ 
      state.usuario = Object.assign(state.usuario, payload);
    }
  },
  actions: {
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
    }
  }
})
