<template>
  <div>
    <div class="container">
      <div class="row m-5 no-gutters ">
        <div class="col-md-8 bg-white p-3">
          <h3 class="pb-3">Login</h3>
          <div class="form-style">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="form-group pb-3">
                  <ValidationProvider
                    name="Email"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      class="form-control"
                      v-model="email"
                    />
                    <span
                      class="block text-danger text-xs absolute bottom-0 left-0"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
                <div class="form-group pb-3">
                  <ValidationProvider
                    name="Password"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      v-model="password"
                    />
                    <span
                      class="block text-danger text-xs absolute bottom-0 left-0"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
                <div class="pb-2">
                  <button
                    type="submit"
                    class="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </ValidationObserver>
            <!--<div class="pt-4 text-center">
              Create New Account.
              <router-link to="/registration"><a>Sign Up</a></router-link>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "admin@gmail.com",
      password: "test@1234",
      submitted: false
    };
  },
  methods: {
    onSubmit() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("firebaseLogin", data);
    }
  }
};
</script>

<style scoped>
body{
background: #c9ccd1; 
}
.form-style input{
	border:0;
	height:50px;
	border-radius:0;
border-bottom:1px solid #ebebeb;	
}
.form-style input:focus{
border-bottom:1px solid #007bff;	
box-shadow:none;
outline:0;
background-color:#ebebeb;	
}
.sideline {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
	color:#ccc;
}
button{
height:50px;	
}
.sideline:before,
.sideline:after {
    content: '';
    border-top: 1px solid #ebebeb;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
}

.sideline:after {
    margin: 0 0 0 20px;
}
</style>