<template>
  <div>
    <div class="col-md-4">
      <input
        type="text"
        v-model="search"
        class="form-control"
        placeholder="Search products.."
      />
    </div>
    <div>
      <br />
      <b-card-group deck>
        <div v-for="(data, index) in getProducts" :key="index">
          <!--:img-src=" data.productImage" -->
          <b-card
            :title="data.productName"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              {{ data.productPrice }}
            </b-card-text>
            <b-card-text>
              {{ data.description }}
            </b-card-text>
            <b-button variant="primary" class=" btn mr-1" @click="edit(index, data)">
              Edit</b-button
            >

            <b-button variant="danger" class=" btn mr-1" @click="remove(index, data)">
              delete</b-button
            >
          </b-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    return this.$store.dispatch("getProducts");
  },
  data() {
    return {
      products: this.$store.getters.getProducts,
      search: ""
    };
  },
  mounted() {},
  methods: {
    edit(index, data) {
      let product = {
        index: index,
        data: data
      };
      this.$store.dispatch("editProduct", product);
    },
    remove(index, data) {
      console.log("index", index, data);
      let product = {
        index: index,
        id: data.id
      };
      this.$store.dispatch("removeProduct", product);
    }
  },
  computed: {
    getProducts() {
      return this.$store.getters.getProducts.filter(product => {
        return product.productName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style>

</style>