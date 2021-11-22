<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-5">
              <b-card-body>
                <b-form @submit.prevent="forgetPasswordSubmit()">
                  <h1>Forget Password</h1>
                  <p class="text-muted">
                    Please enter the email to reset password.
                  </p>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend
                      ><b-input-group-text
                        >@</b-input-group-text
                      ></b-input-group-prepend
                    >
                    <b-form-input
                      type="text"
                      class="form-control"
                      v-model="email"
                      placeholder="Email"
                      autocomplete="email"
                      name="email"
                      v-validate="'required|email'"
                      :class="{ 'is-invalid': verror.has('email') }"
                    />
                    <div
                      v-if="verror.has('email') && !email"
                      class="invalid-feedback"
                    >
                      *Please fill email.
                    </div>
                    <div
                      v-if="verror.has('email') && email"
                      class="invalid-feedback"
                    >
                      *Email must be email format.
                    </div>
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="6" class="text-center">
                      <b-button
                        variant="secondary"
                        class="px-4"
                        @click="cancel()"
                      >
                        Cancel</b-button
                      >
                    </b-col>
                    <b-col cols="6" class="text-center">
                      <b-button
                        type="submit"
                        variant="primary"
                        class="px-4"
                        @click="forgetPasswordSubmit()"
                        :disabled="loading"
                      >
                        <b-spinner small v-if="loading" class="mr-1"></b-spinner
                        >Send</b-button
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
  name: "Signup",
  data() {
    return {
      email: null,
    };
  },
  notifications: {
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: "Error Message",
      message: "Internal Server Error",
    },
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: "Success Message",
      message: "Success",
    },
  },
  watch: {
    error_message(new_val) {
      if (new_val) {
        this.showErrorMsg({ message: new_val });
      }
    },
    success_message(new_val) {
      if (new_val) {
        this.showSuccessMsg({ message: new_val });
      }
    },
  },
  computed: {
    ...mapGetters("auth", {
      _loading: "loading",
      _error_message: "error_message",
      _success_message: "success_message",
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
    success_message: {
      get() {
        return this._success_message;
      },
      set(new_val) {
        return new_val;
      },
    },
  },
  methods: {
    ...mapActions("auth", ["forgetPassword"]),
    forgetPasswordSubmit() {
      this.loading = true;
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.forgetPassword(this.email);
        }
      });
    },
    cancel() {
      router.push("/login");
    },
  },
};
</script>