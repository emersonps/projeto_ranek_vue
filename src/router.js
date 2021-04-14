Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes:[
    {
      path: "/",
      name: "home",
      component: Home
    }
  ],
  scrollBehavior(){
    return window.scrollTo({top: 0, behavior: "smooth"});
  }
});