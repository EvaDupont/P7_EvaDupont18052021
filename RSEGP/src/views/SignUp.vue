<template>
  <div class="signup">
   
  <Navbar />
  <Sign />
  <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Sign from '@/components/signIn.vue'
import Footer from '@/components/footer.vue'
export default {
  name: 'Signup', 
  components: {
  Navbar, Sign, Footer    
}
}
</script>