<template>
  <div class="login-page bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <h3 class="mb-3">Login Now</h3>
          <div class="bg-white shadow rounded">
            <div class="row">
              <div class="col-md-7 pe-0">
                <div class="form-left h-100 py-5 px-5">
                  <form @submit.prevent="onLogin" class="row g-4">
                    <div class="col-12">
                      <label>Email<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="bi bi-person-fill"></i>
                        </div>
                        <input
                          v-model="login.email"
                          type="email"
                          class="form-control"
                          placeholder="Enter Email"
                          required
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label>Password<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="bi bi-lock-fill"></i>
                        </div>
                        <input
                          v-model="login.password"
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <button
                        type="submit"
                        class="btn btn-primary px-4 float-end mt-4"
                      >
                        login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5 ps-0 d-none d-md-block">
                <div
                  class="form-right h-100 bg-primary text-white text-center pt-5"
                >
                  <i class="bi bi-bootstrap"></i>
                  <h2 class="fs-1">Welcome Back!!!</h2>
                </div>
              </div>
            </div>
          </div>
          <p class="text-end text-secondary mt-3">
            Bootstrap 5 Login Page Design
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $userStore } = useNuxtApp();

const login = ref({
  email: 'admin@gmail.com',
  password: '12345678',
});

const onLogin = async () => {
  try {
    await $userStore.login(login.value);
    navigateTo('/pegawai');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.login-page {
  width: 100%;
  height: 100vh;
  display: inline-block;
  display: flex;
  align-items: center;
}
.form-right i {
  font-size: 100px;
}
</style>
