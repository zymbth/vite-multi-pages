<script setup>
import { ref, reactive, onMounted } from 'vue'
import DialogComp from '@/components/dialog.vue'
import AddressComp from '~@/components/address.vue'
import FooterComp from '@/components/footer.vue'
import loadingImgGif from '@/assets/images/loading.gif'

const addressList = ref([])
const currAddress = reactive({
  no: null,
  data: {},
})

onMounted(() => {
  swal({
    title: '请求数据中...',
    showConfirmButton: false,
    imageUrl: loadingImgGif,
  })
  setTimeout(() => {
    addressList.value = [
      {
        no: '001',
        name: '张大',
        province: '广东省',
        city: '广州市',
        area: '黄埔区',
        address: 'xxx路xx号',
      },
      {
        no: '002',
        name: '王二',
        province: '北京市',
        city: '市辖区',
        area: '海淀区',
        address: 'xxx路xx号',
      },
      {
        no: '003',
        name: '苏三',
        province: '江西省',
        city: '九江市',
        area: '浔阳区',
        address: 'xxx路xx号',
      },
      {
        no: '004',
        name: '赵四',
        province: '湖北省',
        city: '武汉市',
        area: '武昌区',
        address: 'xxx路xx号',
      },
    ]
    swal.close()
  }, 800)
})

const visi = ref(false)
const handleClick = p => {
  currAddress.no = p.no
  currAddress.data = p
  visi.value = true
}
</script>

<template>
  <section class="app-content">
    <h5>地址列表：</h5>
    <div class="address-list">
      <div v-for="p in addressList" :key="p.no" @click="handleClick(p)">
        <b>{{ p.name }}</b>
        {{ p.province }}/{{ p.city }}/{{ p.area }} {{ p.address }}
      </div>
    </div>
    <DialogComp v-model="visi">
      <AddressComp :data="currAddress.data" />
    </DialogComp>
  </section>
  <FooterComp />
</template>
<style lang="scss" scoped>
.app-content {
  padding: 2rem;
  height: calc(100vh - 50px);
  overflow: auto;
}
.address-list > div {
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);
  user-select: none;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &:hover {
    background-color: #f1f1f1;
  }
  &:active {
    color: var(--theme-color);
  }
}
</style>
