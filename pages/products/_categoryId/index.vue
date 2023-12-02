<template>
  <v-flex>
    <v-row>
      <v-col cols="3">
        <filter-products />
      </v-col>
      <v-col cols="9">
        <product-list :products="filteredProducts" />
      </v-col>
    </v-row>
  </v-flex>
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
  computed: {
    filteredProducts() {
      if (!this.$route.query.merchantIds?.length) {
        return this.products
      } else
        return this.products.filter((product) =>
          this.$route.query.merchantIds.includes(String(product.merchantId))
        )
    },
  },

  mounted() {
    this.scroll()
    this.getCategoryProducts()
  },
  methods: {
    async getCategoryProducts() {
      try {
        const params = paramsGenerator(this.params)

        this.$axios.setHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )

        const response = await this.$axios.$post(
          `/products/${this.$route.params.categoryId}?${params}`
        )
        const uniqueCategoryProduct = duplicateHandler(response.data)
        this.products = [...this.products, ...uniqueCategoryProduct]
        this.totalItems = response.totalItems
      } catch (error) {}
    },
    shouldLoadMore() {
      this.params.page++
      if (this.products.length < this.totalItems - 1) {
        this.getCategoryProducts()
      }
    },
    scroll() {
      scrollHandler(this.shouldLoadMore)
    },
  },
}
</script>