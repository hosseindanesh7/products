<template>
  <div>
    <product-list :products="products" />
  </div>
</template>


<script>
import {
  paramsGenerator,
  duplicateHandler,
  scrollHandler,
} from '~/util/index.js'

export default {
  data() {
    return {
      products: [],
      params: {
        size: 10,
        page: 1,
      },
      totalItems: null,
    }
  },
  mounted() {
    this.scroll()
    this.getProducts()
  },
  methods: {
    async getProducts() {
      try {
        const params = paramsGenerator(this.params)

        this.$axios.setHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )

        const response = await this.$axios.$post(`/products?${params}`)
        const uniqueCategoryProduct = duplicateHandler(response.data)
        this.products = [...this.products, ...uniqueCategoryProduct]
        this.totalItems = response.totalItems
      } catch (error) {}
    },
    shouldLoadMore() {
      this.params.page++
      if (this.products.length < this.totalItems - 1) {
        this.getProducts()
      }
    },
    scroll() {
      scrollHandler(this.shouldLoadMore)
    },
  },
}
</script>