<template>
  <nav class="navbar sticky-top bg-body-tertiary">
    <div class="container-fluid d-flex justify-content-end">
      <a @click.prevent="logout" class="navbar-brand cursor-pointer" href=""
        >Logout</a
      >
    </div>
  </nav>
</template>
<script setup>
const { $userStore } = useNuxtApp();

const logout = async () => {
  try {
    await $userStore.logout();
    navigateTo('/');
  } catch (error) {
    console.log(error);
  }
};
</script>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
