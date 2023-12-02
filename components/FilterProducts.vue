<template>
  <v-list elevation="3" rounded>
    <h2 class="mr-4">فیلترها</h2>
    <h4 class="mr-4 mt-6 mb-2">دسته بندی‌ها</h4>
    <v-list-group
      v-for="category in categories"
      :key="category.id"
      v-model="category.enabled"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ category.name }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item-group v-model="selectedCategoryId" color="primary">
        <v-list-item
          v-for="child in categoryChildren(category)"
          :key="child.title"
          :value="child.id"
          @click="gotoCategoryProducts(child.id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ child.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>

    <v-divider class="my-4"></v-divider>

    <h2 class="mr-4 mb-2">فروشگاه‌ها</h2>

    <v-text-field
      v-model="merchantSearch"
      class="mx-4"
      label="جستجوی فروشگاه"
      outlined
    ></v-text-field>

    <v-list-item v-for="merchant in filteredMerchantsList" :key="merchant.id">
      <v-checkbox
        v-model="selectedMerchantIds"
        :label="merchant.name"
        :value="merchant.id"
        dense
        @click="filterByMerchants"
      ></v-checkbox>
    </v-list-item>
  </v-list>
</template>
    
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedMerchantIds: [],
      selectedCategoryId: null,
      merchantSearch: '',
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(val) {
        if (val) {
          this.selectedCategoryId = +val.categoryId
        }
      },
    },
  },
  computed: {
    ...mapState('product', ['categoriesList', 'merchantsList']),
    categories() {
      return this.categoriesList.filter((category) => !category.parent)
    },
    categoryChildren() {
      return (parent) => {
        return this.categoriesList.filter(
          (category) => category.parent === parent.id
        )
      }
    },
    filteredMerchantsList() {
      if (!this.merchantSearch) {
        return this.merchantsList
      } else {
        return this.merchantsList.filter((merchant) =>
          merchant.name.includes(this.merchantSearch)
        )
      }
    },
  },
  mounted() {
    this.$store.dispatch('product/getCategories')
    this.$store.dispatch('product/getMerchants')
  },
  methods: {
    filterByMerchants() {
      this.$router.push({
        query: {
          merchantIds: this.selectedMerchantIds,
        },
      })
    },
    gotoCategoryProducts(categoryId) {
      this.$router.push({
        path: `/products/${categoryId}`,
      })
    },
  },
}
</script>