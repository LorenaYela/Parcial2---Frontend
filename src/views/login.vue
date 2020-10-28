
<template>
  <div> 
    <h1> Iniciar sesión</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email">
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" id="password">
      </div>
      <div v-if="error">
        <span style="color: red"> las credenciales no son correctas</span>
      </div>
      <button type="submit" > Iniciar sesión</button>
    </form>
  </div> 

</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      email: "",
      password: "",
      error: false,
    }
  },

  methods: {
    login() {
    //  console.log("jsw")
    this.error = false
      fetch('http://localhost:1337/auth/local', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          identifier: this.email,
          password: this.password
        }),
      }).then(async (response)=>{
          if(!response.ok){
            throw await response.json()
          }

        return response.json()
      })
      .then((data)=>{
        localStorage.setItem('token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        this.$router.push('/')
        //console.log(data)

      })
      .catch((err)=>{
        this.error = true
        //console.log("ERROR")
      });
     },
   },
 }
</script>
