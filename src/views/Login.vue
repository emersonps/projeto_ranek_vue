<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email">

      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha">

      <button class="btn" @click.prevent="logar">Logar</button>
      <p class="perdeu">
        <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
      </p>
      <LoginCriar />
    </form>
  </section>
</template>

<script>
import LoginCriar from "@/components/LoginCriar.vue";

export default{
  name: "Login",
  components: {
    LoginCriar
  },
  data(){
    return{
      login: {
        email: "",
        senha: "",
      }
    };
  },
  methods: {
    logar(){
      //dispatch - usado para ações - chamada de action
      this.$store.dispatch("getUsuario", this.login.email);
      this.$router.push({name: "usuario"});
    }
  }
};
</script>

<style scoped>
  .login{
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h1{
    text-align: center;
    font-size: 2rem;
    margin-top: 40px;
    color: #87f;
  }

  form{
    display: grid;
  }

  .btn{
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .perdeu{
    text-align: center;
    margin: 20px auto 0 auto;
  }

  .perdeu a:hover{
    color: #87f;
    text-decoration: underline;
  }


</style>