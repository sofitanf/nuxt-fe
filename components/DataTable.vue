<template>
  <div class="position-relative">
    <div
      v-if="!noPagination"
      class="d-flex flex-wrap gap-3 justify-content-between align-items-center w-100 mb-4"
    >
      <div class="d-flex flex-column flex-sm-row gap-4">
        <div class="dataTables_length" id="example_length">
          <label
            >Show
            <select
              @change="(e) => changePage(e.target.value)"
              name="example_length"
              aria-controls="example"
              class=""
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries</label
          >
        </div>
        <div v-if="filter" class="positon-relative">
          <button
            @click="showFilter = !showFilter"
            class="filter d-flex align-items-center gap-2 border"
          >
            <i class="bi bi-filter"></i>
            <p>Filter</p>
          </button>
          <div
            class="filter-wrap position absolute"
            :class="showFilter == true ? 'visible' : 'invisible'"
          >
            <slot name="filter"></slot>
          </div>
        </div>
      </div>
      <div v-if="!noSearch" id="example_filter" class="dataTables_filter">
        <label
          ><i class="bi bi-search"></i
          ><input
            @input="(e) => emit('inputSearch', e.target.value)"
            type="text"
            class=""
            placeholder="Type here..."
            aria-controls="example"
        /></label>
      </div>
    </div>
    <div v-if="!showTable" class="table-responsive">
      <table
        id="example"
        class="table dataTable no-footer"
        aria-describedby="example_info"
      >
        <thead>
          <tr>
            <th v-if="numberTable" style="width: 20px">No</th>
            <th
              :class="{ 'no-border': noBorder }"
              class="nowrap"
              v-for="(item, i) in thead"
              :key="i"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <slot name="tbody"></slot>
      </table>
    </div>
    <slot name="tcomponent"></slot>
    <div
      v-if="!noPagination"
      class="d-flex flex-column flex-sm-row gap-2 justify-content-sm-between justify-content-center mt-4 align-items-center"
    >
      <div
        class="dataTables_info"
        id="example_info"
        role="status"
        aria-live="polite"
      >
        Showing
        {{ totalData > 0 ? (paginate?.page - 1) * paginate?.perPage + 1 : 0 }}
        to {{ paginate?.to }} of {{ paginate?.totalPages }} entries
      </div>
      <div
        class="dataTables_paginate paging_simple_numbers"
        id="example_paginate"
      >
        <router-link
          :to="{
            query: {
              ...route.query,
              page: paginate?.page > 1 ? paginate?.page - 1 : 1,
            },
          }"
          class="paginate_button previous"
          :class="{ disabled: paginate.page == 1 }"
          aria-controls="example"
          aria-disabled="true"
          aria-role="link"
          data-dt-idx="previous"
          tabindex="-1"
          id="example_previous"
          ><i class="bi bi-chevron-left"></i
        ></router-link>
        <span>
          <template v-for="index in paginate?.totalPages" :key="index">
            <router-link
              v-if="
                Math.abs(index - paginate.page) < 3 ||
                index == paginate.totalPages - 1 ||
                index == 0
              "
              :to="{ query: { ...route.query, page: index } }"
              class="paginate_button item_paginate"
              :class="{ current: paginate?.page == index }"
              aria-controls="example"
              aria-role="link"
              aria-current="page"
              data-dt-idx="0"
              tabindex="0"
            >
              {{ index }}
            </router-link>
            <!-- <a v-if="index <= 3 || index > paginate.totalPages - 3" class="paginate_button" href="#" aria-controls="example" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0">...</a> -->
          </template>
        </span>
        <router-link
          :to="{
            query: {
              ...route.query,
              page:
                paginate?.nextPageUrl != null
                  ? paginate?.page + 1
                  : paginate?.page,
            },
          }"
          class="paginate_button next"
          :class="{ disabled: paginate?.nextPageUrl == null }"
          aria-controls="example"
          aria-disabled="true"
          aria-role="link"
          data-dt-idx="next"
          tabindex="-1"
          id="example_next"
          ><i class="bi bi-chevron-right"></i
        ></router-link>
      </div>
    </div>
    <div
      v-if="loading && !noLoading"
      class="d-flex justify-content-center position-absolute wrap-loading"
    >
      <p class="loading">Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const emit = defineEmits(['inputSearch', 'selectPerPage']);
const showFilter = ref(false);
const loading = ref(true);
const router = useRouter();
const route = useRoute();
const props = defineProps({
  thead: Array,
  data: Array,
  noBorder: Boolean,
  filter: Boolean,
  numberTable: Boolean,
  showTable: {
    type: Boolean,
    default: false,
  },
  noLoading: {
    type: Boolean,
    default: false,
  },
  noSearch: {
    type: Boolean,
    default: false,
  },
  noPagination: {
    type: Boolean,
    default: false,
  },
  totalPages: Number,
  totalData: Number,
  paginate: {
    type: Object,
    default: {},
  },
});

const table = ref();

const { paginate } = toRefs(props);

const handleClickOutside = (event) => {
  const notifWrapper = document.querySelector('.filter');
  const notifBox = document.querySelector('.filter-wrap');
  if (
    notifWrapper &&
    !notifWrapper.contains(event.target) &&
    notifBox &&
    !notifBox.contains(event.target)
  ) {
    showFilter.value = false;
  }
};

const changePage = (page) => {
  emit('selectPerPage', page);
  router.push({ query: { ...route.query, page: 1 } });
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

defineExpose({
  table,
  loading,
});
</script>

<style>
*:focus {
  outline: none;
}
p {
  margin-bottom: 0;
}
th {
  padding-left: 10px !important;
}
a.item_paginate.first::after {
  content: '...';
}

a.item_paginate.last::before {
  content: '...';
}
.wrap-loading {
  top: 76%;
  left: 40%;
}
.paginate_button {
  padding: 0.3rem 0.7rem;
  min-width: 33px !important;
}
.no-border.sorting_disabled {
  border: none;
}
.dataTables_filter {
  position: relative;
}

.dataTables_filter input {
  width: 240px;
  background: #fff;
  border: 1px solid #dee2e6 !important;
  border-radius: 8px !important;
  padding: 10px 15px 10px 35px !important;
}

.dataTables_filter .bi-search {
  position: absolute;
  left: 15px;
  height: 16px;
  width: 16px;
}
label,
label select {
  color: #919191;
  font-family: var(--text-jkt);
  font-weight: 600;
  font-size: 14px;
}
label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

table.dataTable thead th,
table.dataTable thead td,
table.datatable thead tr {
  color: #8392ab;
  font-family: var(--text-open-sans);
  font-size: 14px;
  font-weight: 700;
  border-bottom: 0.8px solid #dee2e6;
  vertical-align: top;
}

.table > :not(caption) > * > * {
  padding: 10px 0;
  /* border-bottom: 0.8px solid #dee2e6; */
}

table.dataTable tbody th,
table.dataTable tbody td {
  color: #8392ab;
  font-family: var(--text-open-sans);
  font-size: 14px;
  font-weight: 400;
}

table.dataTable tbody tr.v-center td {
  vertical-align: middle;
}

table.dataTable tbody td.bold {
  color: #172b4d;
  font-weight: 600;
}

table.dataTable.no-footer {
  border-bottom: none;
}

.dataTables_wrapper .dataTables_info {
  font-size: 14px;
  font-weight: 400;
  color: #8392ab;
}

.paginate_button.next,
.paginate_button.previous {
  color: #c4cdd5 !important;
}

.dataTables_paginate .paginate_button.current,
.dataTables_paginate .paginate_button.current:hover {
  color: #5e72e4 !important;
  border: 1px solid #5e72e4 !important;
  border-radius: 4px;
  background-color: white !important;
  font-weight: 600;
}

.dataTables_paginate .paginate_button.current,
.dataTables_paginate .paginate_button.current:hover {
  color: none !important;
}

.paginate_button.disabled,
.paginate_button.disabled:hover {
  background-color: #919eab !important;
  border-radius: 5px !important;
}

.paginate_button.disabled i {
  color: #c4cdd5 !important;
}

table.table.white {
  background-color: white !important;
}

.dataTables_paginate .paginate_button {
  font-family: var(--text-poppins);
  font-size: 14px;
  font-weight: 700;
}
.filter p,
.export p {
  font-weight: 600;
  font-size: 0.75rem;
  color: #514eff;
}
.filter,
.export {
  background-color: var(--white) !important;
  padding: 6px 10px;
  border: 0.743802px solid #5e72e4 !important;
  border-radius: 3.71901px;
}
.box_filter {
  background: #f6f9fc !important;
  border: 1px solid #dee2e6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  position: absolute;
  width: 20rem;
  z-index: 1;
  padding: 1.5rem 1rem;
  margin-top: 1rem;
}
.box_filter label {
  font-weight: 600;
  font-size: 0.875rem;
  font-family: var(--text-open-sans);
  color: var(--grey700);
}

input.input-form {
  background-color: var(--white);
  border: 1px solid var(--grey300);
  border-radius: 5px;
  padding: 0 12px;
}

td {
  font-weight: 600 !important;
  padding: 0 10px !important;
  border-bottom: 0.8px solid #dee2e6;
  font-family: 'Open Sans', sans-serif !important;
}

.nowrap {
  white-space: nowrap !important;
}

.dataTables_info {
  font-weight: 400;
  color: #8392ab;
}

.dataTables_paginate .paginate_button.current,
.dataTables_paginate .paginate_button.current:hover {
  color: #5e72e4 !important;
  border: 1px solid #5e72e4 !important;
  border-radius: 4px;
  background-color: #fff !important;
  font-weight: 600;
}

.dataTables_paginate .paginate_button {
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  text-decoration: none !important;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 4px 10px;
  font-weight: 600;
  color: #212b36;
  background-color: #fff;
  border: 1px solid #dfe3e8;
  margin-right: 5px;
  min-width: 33px;
}

.dataTables_paginate .paginate_button:hover {
  color: #5e72e4 !important;
  border: 1px solid #5e72e4 !important;
}

.dataTables_length select {
  border: 1px solid #aaa;
  border-radius: 3px;
  background-color: transparent;
  padding: 4px;
}

.table-responsive label select {
  color: #919191;
  font-family: var(--text-jkt);
  font-weight: 600;
  font-size: 14px;
}
@media only screen and (max-width: 991.98px) {
  label,
  label select,
  .form-control,
  table.dataTable thead th,
  table.dataTable thead td,
  table.datatable thead tr,
  td,
  .dataTables_info,
  .status {
    font-size: 0.875rem;
  }
}
@media only screen and (max-width: 767.98px) {
  label,
  label select,
  .form-control,
  table.dataTable thead th,
  table.dataTable thead td,
  table.datatable thead tr,
  td,
  .dataTables_info,
  .status {
    font-size: 0.75rem;
  }
}
</style>
