<template>
  <q-page>
    <q-tree
      default-expand-all
      node-key="id"
      @lazy-load="onLazyLoad"
      :nodes="products"
    />
  </q-page>
</template>

<script>
import Product from "../model/Product";
import _ from "lodash";

export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    async onLazyLoad({ node, key, done, fail }) {
      console.log(node.id);
      done(await this.getProducts(this.$store.state.user.id, node.id));
    },
    async getProducts(userId, parentId) {
      return _.map(
        await Product.getByParentIdUri(this.$store.state.user.id, parentId),
        o => {
          return {
            id: o.id,
            label: `${o.product_name}(${o.product_desc})`,
            lazy: true
          };
        }
      );
    }
  },
  async mounted() {
    this.products = await this.getProducts(this.$store.state.user.id, null);
  }
};
</script>

<style>
</style>