<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-5">
              <b-card-body>
                <b-form @submit.prevent="loginSubmit()">
                  <h1>Login</h1>
                  <p class="text-muted">Login to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend
                      ><b-input-group-text
                        ><i class="icon-envelope"></i></b-input-group-text
                    ></b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      v-model="user.email"
                      placeholder="Email"
                      autocomplete="email"
                      name="email"
                      v-validate="'required|email'"
                      :class="{ 'is-invalid': verror.has('email') }"
                    />
                    <div
                      v-if="verror.has('email') && !user.email"
                      class="invalid-feedback"
                    >
                      *Please fill email.
                    </div>
                    <div
                      v-if="verror.has('email') && user.email"
                      class="invalid-feedback"
                    >
                      *Email must be email format.
                    </div>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend
                      ><b-input-group-text
                        ><i class="icon-lock"></i></b-input-group-text
                    ></b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      v-model="user.password"
                      placeholder="Password"
                      autocomplete="password"
                      name="password"
                      v-validate="'min:8|max:30|required'"
                      :class="{ 'is-invalid': verror.has('password') }"
                    />
                    <div
                      v-if="verror.has('password') && !user.password"
                      class="invalid-feedback"
                    >
                      *Please fill password.
                    </div>
                    <div
                      v-if="verror.has('password') && user.password"
                      class="invalid-feedback"
                    >
                      *The length of password must be between 8 - 30.
                    </div>
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="12" class="text-center">
                      <b-button
                        type="submit"
                        variant="primary"
                        class="px-4"
                        @click="loginSubmit()"
                        :disabled="loading"
                      >
                        <b-spinner small v-if="loading" class="mr-1"></b-spinner
                        >Login</b-button
                      >
                    </b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col cols="12" class="text-center">
                      <b-button variant="success" class="px-4" @click="signup()"
                        >Sign up</b-button
                      >
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <b-button variant="link" class="px-0"
                        ><router-link to="/forget-password" custom tag="span"
                          >Forgot password?</router-link
                        ></b-button
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueNotifications from "vue-notifications";
import { router } from "../../router";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  notifications: {
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: "Error Message",
      message: "Internal Server Error",
    },
  },
  watch: {
    error_message(new_val) {
      if (new_val) {
        this.showErrorMsg({ message: new_val });
      }
    },
  },
  computed: {
    ...mapGetters("auth", {
      _loading: "loading",
      _error_message: "error_message",
    }),
    loading: {
      get() {
        return this._loading;
      },
      set(new_val) {
        return new_val;
      },
    },
    error_message: {
      get() {
        return this._error_message;
      },
      set(new_val) {
        return new_val;
      },
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    loginSubmit() {
      this.loading = true;
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.login(this.user);
        }
      });
    },
    signup() {
      router.push("/signup");
    },
  },
};
</script>