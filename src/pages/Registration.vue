<template>
  <div>
    <div class="container">
      <div class="row m-5 no-gutters shadow-lg">
        <div class="col-md-8 bg-white p-3">
          <h3 class="pb-3">Registration</h3>
          <div class="form-style">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit">
                <div class="form-group pb-3">
                  <ValidationProvider
                    name="Email"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      v-model="email"
                      class="form-control"
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
                      v-model="password"
                      class="form-control"
                    />
                    <span
                      class="block text-danger text-xs absolute bottom-0 left-0"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
                <div class="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    class="form-control"
                  />
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
            <div class="pt-4 text-center">
              Already have a Account.
              <router-link to="/login"><a>Sign In</a></router-link>
            </div>
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
      email: "",
      password: "",
      submitted: false
    };
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