<template>
  <div class="container my-5">
    <div class="content">
      <h1 class="title">Tambah Pegawai</h1>
      <form @submit.prevent="onSubmit">
        <div class="row my-4">
          <div class="col-lg-6">
            <div class="mb-3">
              <label class="label-input">NIP</label>
              <input
                v-model="form.nip"
                type="text"
                class="form-control"
                name="nip"
                required
              />
              <div v-if="validation?.nip">
                <p class="error-message text-start">
                  {{ validation?.nip[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Tempat Lahir</label>
              <input
                v-model="form.tempat_lahir"
                type="text"
                class="form-control"
                name="tempat_lahir"
                required
              />
              <div v-if="validation?.tempat_lahir">
                <p class="error-message text-start">
                  {{ validation?.tempat_lahir[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Tanggal Lahir</label>
              <input
                v-model="form.tgl_lahir"
                type="date"
                class="form-control"
                name="tgl_lahir"
                required
              />
              <div v-if="validation?.tgl_lahir">
                <p class="error-message text-start">
                  {{ validation?.tgl_lahir[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Nomor. HP</label>
              <input
                v-model="form.no_hp"
                type="text"
                class="form-control"
                name="no_hp"
                required
              />
              <div v-if="validation?.no_hp">
                <p class="error-message text-start">
                  {{ validation?.no_hp[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Agama</label>
              <input
                v-model="form.agama"
                type="text"
                class="form-control"
                name="agama"
                required
              />
              <div v-if="validation?.agama">
                <p class="error-message text-start">
                  {{ validation?.agama[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Jabatan</label>
              <select v-model="form.jabatan_id" class="form-select" required>
                <option
                  v-for="value in data.jabatan"
                  :key="value.id"
                  :value="value.id"
                >
                  {{ value.nama }}
                </option>
              </select>
              <div v-if="validation?.jabatan_id">
                <p class="error-message text-start">
                  {{ validation?.jabatan_id[0] }}
                </p>
              </div>
            </div>

            <div class="mb-3">
              <label class="label-input">Golongan</label>
              <div class="d-flex gap-3">
                <div
                  v-for="value in data.golongan"
                  :key="value.id"
                  class="form-check"
                >
                  <input
                    :value="value.id"
                    v-model="form.gol_id"
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    :id="'flexRadioDefault' + value.id"
                  />
                  <label
                    class="form-check-label"
                    :for="'flexRadioDefault' + value.id"
                  >
                    {{ value.nama }}
                  </label>
                </div>
              </div>
              <div v-if="validation?.gol_id">
                <p class="error-message text-start">
                  {{ validation?.gol_id[0] }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label class="label-input">Nama Lengkap</label>
              <input
                v-model="form.nama"
                type="text"
                class="form-control"
                name="nama"
                required
              />
              <div v-if="validation?.nama">
                <p class="error-message text-start">
                  {{ validation?.nama[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Alamat</label>
              <input
                v-model="form.alamat"
                type="text"
                class="form-control"
                name="alamat"
                required
              />
              <div v-if="validation?.alamat">
                <p class="error-message text-start">
                  {{ validation?.alamat[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Gender</label>
              <select
                required
                class="form-select"
                name="gender"
                v-model="form.gender"
              >
                <option value="L">Laki-Laki</option>
                <option value="P">Perempuan</option>
              </select>
              <div v-if="validation?.gender">
                <p class="error-message text-start">
                  {{ validation?.gender[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">NPWP</label>
              <input
                v-model="form.npwp"
                type="text"
                class="form-control"
                name="npwp"
                required
              />
              <div v-if="validation?.npwp">
                <p class="error-message text-start">
                  {{ validation?.npwp[0] }}
                </p>
              </div>
            </div>

            <div class="mb-3">
              <label class="label-input">Tempat Tugas</label>
              <select
                required
                v-model="form.tempat_tugas_id"
                class="form-select"
              >
                <option
                  v-for="value in data.tempat_tugas"
                  :key="value.id"
                  :value="value.id"
                >
                  {{ value.nama }}
                </option>
              </select>
              <div v-if="validation?.tempat_tugas_id">
                <p class="error-message text-start">
                  {{ validation?.tempat_tugas_id[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Unit Kerja</label>
              <select required v-model="form.unit_kerja_id" class="form-select">
                <option
                  v-for="value in data.unit_kerja"
                  :key="value.id"
                  :value="value.id"
                >
                  {{ value.nama }}
                </option>
              </select>
              <div v-if="validation?.unit_kerja_id">
                <p class="error-message text-start">
                  {{ validation?.unit_kerja_id[0] }}
                </p>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-input">Eselon</label>
              <div class="d-flex gap-3">
                <div
                  v-for="value in data.eselon"
                  :key="value.id"
                  class="form-check"
                >
                  <input
                    :value="value.id"
                    v-model="form.eselon_id"
                    class="form-check-input"
                    type="radio"
                    name="radioEselon"
                    :id="'radioEselon' + value.id"
                  />
                  <label
                    class="form-check-label"
                    :for="'radioEselon' + value.id"
                  >
                    {{ value.nama }}
                  </label>
                </div>
              </div>
              <div v-if="validation?.eselon_id">
                <p class="error-message text-start">
                  {{ validation?.eselon_id[0] }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn_submit border-0">Simpan</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from '@/plugins/axios';
const $axios = axios().provide.axios;
const form = ref({
  nip: '',
  nama: '',
  tempat_lahir: '',
  alamat: '',
  tgl_lahir: '',
  gender: '',
  no_hp: '',
  npwp: '',
  agama: '',
  gol_id: '',
  eselon_id: '',
  tempat_tugas_id: '',
  unit_kerja_id: '',
  jabatan_id: '',
});
const data = ref([]);
const validation = ref([]);
const token = ref('');

// Get source data
const getData = async () => {
  const res = await $axios.get('/data', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = res.data.data;
};

const onSubmit = async () => {
  try {
    await $axios.post('/pegawai', form.value);
    navigateTo('/pegawai');
  } catch (error) {
    validation.value = error.response.data;
  }
};

onMounted(async () => {
  token.value = await localStorage.getItem('token');
  getData();
});
</script>

<style scoped>
.error-message {
  font-size: 0.75rem;
  color: #df2828;
  background: #e2e2e2;
  border-radius: 4px;
  padding: 0.25rem 0.75rem 0.25rem 1.75rem;
  margin-top: 0.25rem;
  position: relative;
  font-family: var(--lato);
  height: 1.75rem;
}
.btn-blue {
  background-color: #514eff !important;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 12px;
}
#profile {
  padding: 6rem 0 8rem;
}
.overflow-y-scroll {
  overflow-y: scroll !important;
}
.title {
  font-weight: 700;
  font-size: 1.5rem;
}
.content {
  margin-top: 2rem;
  background: #fff;
  border: 1px solid #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 2rem;
}
.img_profile {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
}
.label-input {
  font-weight: 500;
  color: rgba(19, 20, 21, 0.35);
  margin-bottom: 0.5rem;
}
.form-select {
  box-shadow: none !important;
}
input,
.label-input,
.form-select {
  font-size: 0.875rem;
  font-family: var(--poppins);
}
.form-control,
.form-select {
  padding: 0.75rem 1.25rem !important;
  background: #fafcfe !important;
  border: 1px solid #e9e9e9 !important;
  border-radius: 8px !important;
}
.btn_submit {
  background: #514eff;
  border-radius: 32px;
  color: white;
  font-family: var(--poppins);
  font-weight: 600;
  padding: 0.75rem 2rem;
}
label.label input[type='file'] {
  position: absolute;
  top: -1000px;
}
.label {
  cursor: pointer;
  border-radius: 8px;
  display: block;
  font-size: 1.25rem;
  position: relative;
  width: max-content;
  width: 125px;
  height: 125px;
}
.img_edit {
  background: #514eff;
  width: 40px;
  height: 40px;
  display: flex;
  padding: 0.5rem;
  border-radius: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
