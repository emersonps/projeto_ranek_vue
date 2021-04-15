export function serialize(obj){
  let queryString = "";
  for (let key in obj){
    queryString += `&${key}=${obj[key]}`;
  }
  return queryString;
}

// mapFields - Recebe uma opção - um objeto com options 
export function mapFields(options) {
  const object = {};
  //Nessas opções tem 3 itens: Fields = campos que queremos mapear
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        // Base = caso queira usuário ou não
        return this.$store.state[options.base][field];
      },
      set(value) {
        //Mutação
        this.$store.commit(options.mutation, { [field]: value });
      }
    };
  }
  //Retorno do resultado
  return object;
}