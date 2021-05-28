<template>
  <div class="login">
   
  <Navbar />
  <Log />
  <Footer />
  </div>
</template>

<script>
import Navbar from '@/composants/navbar.vue'
import Log from '@/composants/logIn.vue'
import Footer from '@/composants/footer.vue'
export default {
  name: 'Login', 
  components: {
  Navbar, Log, Footer    
}
}
</script>