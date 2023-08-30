<script setup>
import { ref, onMounted } from 'vue'
import loadingImgGif from '@/assets/images/loading.gif'
import CardComp from '@/components/card.vue'
import PersonComp from '~@/components/person.vue'
import FooterComp from '@/components/footer.vue'
import { mockParagraph, mockPersonName } from '@/utils/mock.js'

const presonList = ref([])

onMounted(() => {
  swal({
    title: '请求数据中...',
    showConfirmButton: false,
    imageUrl: loadingImgGif,
  })
  getPersonList()
    .then(res => (presonList.value = res))
    .finally(_ => swal.close())
})

const getPersonList = total => {
  if (!total) total = Math.floor(Math.random() * 30 + 10)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: total }).map(_ => {
          return {
            no: Math.floor(Math.random() * 100000),
            name: mockPersonName(),
            age: Math.floor(Math.random() * 100),
            gender: Math.random() > 0.5 ? '男' : '女',
            country: Math.random() > 0.3 ? '中国' : '美国',
            intro: mockParagraph(5, 30),
          }
        })
      )
    }, 800)
  })
}

const cardRef = ref()
const handleReset = () => cardRef.value?.forEach(c => c.triggleCard(true))
</script>

<template>
  <section class="app-content">
    <h5>人员列表</h5>
    <div class="person-list">
      <CardComp v-for="data in presonList" :key="data.no" ref="cardRef">
        <PersonComp :data="data" />
      </CardComp>
    </div>
    <div>
      <button class="reset" @click="handleReset">Reset</button>
    </div>
  </section>
  <FooterComp />
</template>
<style lang="scss" scoped>
.app-content {
  padding: 2rem;
  height: calc(100vh - 50px);
  overflow: auto;
}
.person-list {
  display: flex;
  flex-wrap: wrap;
}
.reset {
  &:hover {
    background-color: #f1f1f1;
    border-color: var(--theme-color);
  }
  &:active {
    color: var(--theme-color);
  }
  &:focus {
    outline: none;
  }
}
</style>
