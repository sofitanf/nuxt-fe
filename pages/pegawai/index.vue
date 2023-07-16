<template>
  <div class="container my-5">
    <div class="d-flex justify-content-end align-items-center mb-3 gap-3">
      <button
        @click="exportFile"
        class="export d-flex align-items-center gap-2 border"
      >
        <i class="bi bi-download"></i>
        <p>Export</p>
      </button>
      <nuxt-link to="/pegawai/create">
        <button class="btn-sm-violet">+ Tambah Pegawai</button>
      </nuxt-link>
    </div>
    <div class="content">
      <data-table
        ref="table"
        :thead="thead"
        filter
        :paginate="paginate"
        :page="page"
        :totalPages="totalPages"
        :totalData="totalData"
        @input-search="getInputSearch"
        @select-perPage="getSelectPerPage"
      >
        <template v-slot:filter>
          <div class="box_filter">
            <div class="mb-2">
              <label class="mb-2" for="name">Unit Kerja</label>
              <select v-model="unit" class="form-select">
                <option
                  v-for="value in unit_kerja"
                  :key="value.id"
                  :value="value.id"
                >
                  {{ value.nama }}
                </option>
              </select>
            </div>
          </div>
        </template>
        <template v-slot:tbody>
          <tr v-for="(item, i) in pagawaiNumber" :key="i++">
            <td class="">{{ item.lineNumber }}</td>
            <td class="nowrap">{{ item?.nip }}</td>
            <td class="nowrap">{{ item?.nama }}</td>
            <td class="nowrap">{{ item?.unit_kerja?.nama }}</td>
            <td class="py-2">
              <button @click="deleteItem(item.id)" class="btn-red me-2">
                Delete
              </button>
              <nuxt-link :to="'/pegawai/' + item.id">
                <button class="btn-yellow">Edit</button>
              </nuxt-link>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
  </div>
</template>

<script setup>
import axios from '@/plugins/axios';
import DataTable from '@/components/DataTable.vue';
const $axios = axios().provide.axios;
const route = useRoute();
const table = ref();
const perPage = ref(10);
const loading = ref(true);
const page = ref(1);
const totalPages = ref();
const totalData = ref();
const paginate = ref({});
const pegawai = ref([]);
const unit_kerja = ref([]);
const unit = ref('');
const search = ref();
const token = ref('');
const thead = ref(['No', 'NIP', 'Nama', 'Unit Kerja', 'Aksi']);

const pagawaiNumber = computed(() => {
  return pegawai.value.map((item, idx) => {
    return {
      ...item,
      lineNumber: (paginate.value.page - 1) * parseInt(perPage.value) + idx + 1,
    };
  });
});

const getInputSearch = (data) => {
  setTimeout(() => {
    search.value = data;
  }, 1000);
};
const getSelectPerPage = (data) => {
  perPage.value = data;
};

// Delete data
const deleteItem = (id) => {
  $axios.delete(`/pegawai/${id}`);
  getDataPegawai();
};

// Export data
const exportFile = async () => {
  const response = await $axios.get('/export', {
    responseType: 'blob', // Set the response type to blob
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;

  // Extract the filename from the response headers or set a custom filename
  const contentDisposition = response.headers['content-disposition'];
  let filename = 'pegawai.xlsx'; // Set a default filename

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch && filenameMatch.length === 2) {
      filename = filenameMatch[1];
    }
  }

  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Get data pegawai
const getDataPegawai = async () => {
  table.value.loading = true;

  const res = await $axios.get(
    '/pegawai',
    {
      params: {
        unit_kerja_id: unit.value,
        nama: search.value,
        page: page.value,
        per_page: perPage.value,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  table.value.loading = false;
  const data = res.data.data.pegawai;
  pegawai.value = data.data;
  paginate.value = await {
    page: data.current_page,
    totalPages: data.last_page,
    nextPageUrl: data.next_page_url,
    perPage: data.per_page,
    to: data.to,
  };
  totalData.value = data.total;
};

// Get source data
const getData = async () => {
  const res = await $axios.get('/data');
  unit_kerja.value = res.data.data.unit_kerja;
};

onMounted(async () => {
  token.value = await localStorage.getItem('token');
  getData();
  getDataPegawai();
});

watch(
  [route, perPage, search, unit],
  () => {
    page.value = route.query.page;
    getDataPegawai();
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.content {
  margin-top: 2rem;
  background: #fff;
  border: 1px solid #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 2rem;
}
.btn-sm-violet {
  background: #4e45b3;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  color: white;
  border: none;
  white-space: nowrap;
}

.btn-yellow {
  color: white;

  background-color: #e8d10c !important;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.875rem;
}

.btn-red {
  color: white;

  background-color: #dc2626 !important;
  padding: 8px 12px !important;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.875rem;
}
</style>
