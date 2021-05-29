<template>
  <div class="login">
   
  <Navbar />
  <Log />
  <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Log from '@/components/logIn.vue'
import Footer from '@/components/footer.vue'
export default {
  name: 'Login', 
  components: {
  Navbar, Log, Footer    
}
}
</script>