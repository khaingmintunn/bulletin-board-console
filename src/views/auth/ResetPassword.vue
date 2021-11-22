<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-5">
              <b-card-body>
                <b-form @submit.prevent="resetPasswordSubmit()">
                  <h1>Reset Password</h1>
                  <p class="text-muted">please type a new password.</p>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend
                      ><b-input-group-text
                        ><i class="icon-lock"></i></b-input-group-text
                    ></b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      v-model="payload.password"
                      placeholder="Password"
                      autocomplete="password"
                      name="password"
                      v-validate="'min:8|max:30|required'"
                      :class="{ 'is-invalid': verror.has('password') }"
                    />
                    <div
                      v-if="verror.has('password') && !payload.password"
                      class="invalid-feedback"
                    >
                      *Please fill password.
                    </div>
                    <div
                      v-if="verror.has('password') && payload.password"
                      class="invalid-feedback"
                    >
                      *The length of password must be between 8 - 30.
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
                      v-model="payload.confirm_password"
                      placeholder="Repeat Password"
                      autocomplete="confirm_password"
                      name="confirm_password"
                      v-validate="'min:8|max:30|required'"
                      :class="{ 'is-invalid': verror.has('confirm_password') || payload.password !== payload.confirm_password }"
                    />
                    <div
                      v-if="
                        verror.has('confirm_password') &&
                        !payload.confirm_password
                      "
                      class="invalid-feedback"
                    >
                      *Please fill repeat password.
                    </div>
                    <div
                      v-if="
                        verror.has('confirm_password') &&
                        payload.confirm_password
                      "
                      class="invalid-feedback"
                    >
                      *The length of password must be between 8 - 30.
                    </div>
                    <div
                      v-if="
                        payload.password &&
                        payload.confirm_password &&
                        payload.confirm_password.length > 7 &&
                        payload.password !== payload.confirm_password
                      "
                      class="invalid-feedback"
                    >
                      *Password and repeat password does not match.
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
                        @click="resetPasswordSubmit()"
                        :disabled="loading"
                      >
                        <b-spinner small v-if="loading" class="mr-1"></b-spinner
                        >Confirm</b-button
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
  name: "SignupSuccess",
  data() {
    return {
      payload: {
        password: null,
        confirm_password: null,
        token_id: null,
      },
    };
  },
  created() {
    this.payload.token_id = this.$route.params.token_id;
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
    ...mapActions("auth", ["resetPassword"]),
    resetPasswordSubmit() {
      this.loading = true;
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.resetPassword(this.payload);
        }
      });
    },
    cancel() {
      router.push("/login");
    },
  },
};
</script>