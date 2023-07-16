<template>
  <Navbar />
  <NuxtPage />
</template>
<script setup>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
const { $userStore } = useNuxtApp();

onMounted(() => {
  if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
    $userStore.getUser();
  } else {
    navigateTo('/');
  }
});
</script>
