<template>
  <v-flex>
    <template v-if="!products.length">
      <h4 class="text-center">موردی برای نمایش یافت نشد</h4>
    </template>
    <template v-else>
      <v-row no-gutters>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card class="py-4 px-2" height="100%">
            <v-row justify="center">
              <v-img
                :src="product.imageUrl"
                max-height="250"
                max-width="300"
                contain
                :alt="product.name"
              >
              </v-img>
            </v-row>

            <v-card-title>
              {{ product.name }}
            </v-card-title>

            <v-card-text> شروع قیمت از </v-card-text>

            <v-card-actions class="font-weight-bold">
              {{ product.minPrice }} تومان
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-flex>
</template>
  
  <script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>