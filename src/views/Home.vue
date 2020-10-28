<template>
  <div>
    <h1>Bienvenido {{ user.email }}</h1>
    <button @click="Salir"> salir</button>
    <div>
      <h1>
        Mis imagenes
      </h1>
    </div>

    
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: {}
    }
  },

  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    fetch('http://localhost:1337/imagenes/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data =>{
        console.log(data)
      })
  },
  
  methods: {
    salir(){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
};
</script>
