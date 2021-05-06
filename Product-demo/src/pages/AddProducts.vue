<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <h2>Add Products</h2>
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <label for="first">Product Name</label>
                  <ValidationProvider
                    name="Product name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Product Name"
                      v-model="name"
                    />
                    <span
                      class="block text-danger text-xs absolute bottom-0 left-0"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <label for="company">Product Price</label>
                  <ValidationProvider
                    name="Product price"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Product price"
                      v-model="price"
                    />
                    <span
                      class="block text-danger text-xs absolute bottom-0 left-0"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <!--  row   -->
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      @change="onFileChanged"
                    />
                    <image :src="image"/>
                    <label class="custom-file-label" for="inputGroupFile01">{{
                      image ? image.name : "Choose icon image"
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <label for="email">Description</label>
                  <ValidationProvider
                    name="Description"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="description"
                      placeholder="Description"
                    />
                    <span
                      class="block text-danger text-xs absolute bottom-0 left-0"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <!--  row   -->
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      price: "",
      image: "",
      description: "",
      productImage:""
    };
  },
  methods: {
    onFileChanged(event) {
      this.image = event.target.files[0];
      
      this.imageToBase64(this.image);
    },
    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //console.log("file to base64 result:" + reader.result);
        this.productImage = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },
    onSubmit() {
      let data = {
        productName: this.name,
        productPrice: this.price,
        productImage: this.productImage,
        description: this.description
      };
      this.$store.dispatch("AddProducts", data);
    }
  }
};
</script>

<style>

</style>