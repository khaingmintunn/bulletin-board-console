<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <h4 class="mt-4 mb-4"><strong>Post Register</strong></h4>
          </b-col>
          <b-col sm="12">
            <b-card>
              <b-form @submit.prevent="handleSubmit">
                <label for="name"><strong>Title</strong></label>
                <b-row>
                  <b-col cols="8">
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Enter title"
                      v-model="post.title"
                      autocomplete="title"
                      name="title"
                      v-validate="'max:100|required'"
                      :class="{ 'is-invalid': verror.has('title') }"
                    ></b-form-input>
                    <div
                      v-if="verror.has('title') && !post.title"
                      class="invalid-feedback"
                    >
                      *Please fill post title.
                    </div>
                    <div
                      v-if="verror.has('title') && post.title"
                      class="invalid-feedback"
                    >
                      *The length of post title must be between 1 - 100.
                    </div>
                  </b-col>
                  <b-col class="text-danger"><strong>* required</strong></b-col>
                </b-row>

                <label for="device-model" class="mt-3"
                  ><strong>Description</strong></label
                >
                <b-row>
                  <b-col cols="8">
                    <b-form-textarea
                      type="text"
                      class="form-control"
                      placeholder="Enter description"
                      no-resize
                      v-model="post.text"
                      autocomplete="text"
                      name="text"
                      v-validate="'min:4|max:2500|required'"
                      :class="{ 'is-invalid': verror.has('text') }"
                      rows="8"
                      max-rows="8"
                    ></b-form-textarea>
                    <div
                      v-if="verror.has('text') && !post.text"
                      class="invalid-feedback"
                    >
                      *Please fill post description.
                    </div>
                    <div
                      v-if="verror.has('text') && post.text"
                      class="invalid-feedback"
                    >
                      *The length of post description must be between 1 - 100.
                    </div>
                  </b-col>
                  <b-col class="text-danger"><strong>* required</strong></b-col>
                </b-row>
                <b-row>
                  <b-col
                    cols="12"
                    class="d-flex justify-content-center mt-5 mb-4"
                  >
                    <b-btn class="mr-2" variant="secondary" @click="gotoList()"
                      >Cancel</b-btn
                    >
                    <b-btn variant="success" @click="handleSubmit()"
                      >Register</b-btn
                    >
                  </b-col>
                </b-row>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueNotifications from "vue-notifications";
import { router } from "../../router";

export default {
  name: "post-create",
  data() {
    return {
      post: {
        title: "",
        text: "",
      },
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
    ...mapGetters("post", {
      error_message: "error_message",
      success_message: "success_message",
    }),
  },
  methods: {
    ...mapActions("post", ["createPost"]),
    gotoList() {
      router.push("/post/list");
    },
    handleSubmit() {
      this.createPost({ ...this.post });
    },
  },
};
</script>
