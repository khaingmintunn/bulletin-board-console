<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-5">
              <b-card-body>
                <h1 v-if="!success_message && !error_message">...</h1>
                <h2 v-else-if="success_message" class="text-success">
                  Signup Success!
                </h2>
                <h2 v-else class="text-danger">Signup Failed!</h2>
                <b-col cols="6" class="text-center mt-5">
                  <b-button variant="primary" class="px-4" @click="gotoLogin()"
                    >Login</b-button
                  >
                </b-col>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import { router } from '../../router'

export default {
  name: 'signup-confirm',
  created() {
    this.signupConfirm(this.$route.params.token_id)
  },
  notifications: {
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Error Message',
      message: 'Internal Server Error',
    },
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Success Message',
      message: 'Success',
    },
  },
  watch: {
    error_message(new_val) {
      if (new_val) {
        this.showErrorMsg({ message: new_val })
      }
    },
    success_message(new_val) {
      if (new_val) {
        this.showSuccessMsg({ message: new_val })
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      _loading: 'loading',
      _error_message: 'error_message',
      _success_message: 'success_message',
    }),
    loading: {
      get() {
        return this._loading
      },
      set(new_val) {
        return new_val
      },
    },
    error_message: {
      get() {
        return this._error_message
      },
      set(new_val) {
        return new_val
      },
    },
    success_message: {
      get() {
        return this._success_message
      },
      set(new_val) {
        return new_val
      },
    },
  },
  methods: {
    ...mapActions('auth', ['signupConfirm']),
    gotoLogin() {
      router.push('/login')
    },
  },
}
</script>