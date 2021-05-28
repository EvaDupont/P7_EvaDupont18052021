<template>
  <div class="signup">
   
  <Navbar />
  <Sign />
  <Footer />
  </div>
</template>

<script>
import Navbar from '@/composants/navbar.vue'
import Sign from '@/composants/signIn.vue'
import Footer from '@/composants/footer.vue'
export default {
  name: 'Signup', 
  components: {
  Navbar, Sign, Footer    
}
}
</script>