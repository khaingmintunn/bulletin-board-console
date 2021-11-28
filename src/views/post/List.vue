<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-row>
          <b-col sm="12">
            <h4 class="mt-4 mb-4"><strong>Post List</strong></h4>
            <div class="tableWrapper table-responsive">
              <b-table
                striped
                dark
                :items="posts"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
              >
                <template v-slot:cell(select)="data">
                  <input type="checkbox" />
                </template>
                <template v-slot:cell(edit)="data">
                  <b-button
                    variant="primary"
                    @click="gotoEdit(data.item.post_id)"
                    ><i class="fa fa-pencil mr-2"></i>Edit</b-button
                  >
                </template>
                <template v-slot:cell(delete)="data">
                  <b-button
                    variant="danger"
                    @click="showDeleteModal(data.item.post_id)"
                    ><i class="fa fa-trash mr-2"></i>Delete</b-button
                  >
                </template>
              </b-table>
            </div>
            <nav>
              <b-pagination
                id="pagination"
                class="mt-4"
                :total-rows="posts.length"
                :per-page="perPage"
                v-model="currentPage"
                prev-text="Prev"
                next-text="Next"
                hide-goto-end-buttons
              />
            </nav>
            <div>
              <b-modal
                size="sm"
                class="sm-modal modal-danger"
                no-close-on-backdrop
                ref="deleteModalRef"
                hide-footer
                title="Are you sure?"
              >
                <div class="d-flex justify-content-center mt-4 mb-4">
                  <b-btn
                    class="mr-2"
                    variant="secondary"
                    @click="hideDeleteModal"
                    >Cancel</b-btn
                  >
                  <b-btn
                    variant="danger"
                    @click="deleteSubmit"
                    >Okay</b-btn
                  >
                </div>
              </b-modal>
            </div>
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
  name: "post-list",
  data() {
    return {
      fields: [
        { label: "", key: "select" },
        { label: "Title", key: "title" },
        { label: "Description", key: "text" },
        { label: "Created At", key: "created" },
        { label: "Updated At", key: "updated" },
        { label: "", key: "edit" },
        { label: "", key: "delete" },
      ],
      currentPage: 1,
      perPage: 9,
      selected_post_id: "",
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
  created() {
    this.getPosts();
  },
  computed: {
    ...mapGetters("post", {
      posts: "posts",
      error_message: "error_message",
      success_message: "success_message",
    }),
  },
  methods: {
    ...mapActions("post", ["getPosts", "deletePost"]),
    gotoEdit(post_id) {
      router.push(`/post/edit/${post_id}`);
    },
    showDeleteModal(post_id) {
      this.selected_post_id = post_id;
      this.$refs.deleteModalRef.show();
    },
    hideDeleteModal() {
      this.$refs.deleteModalRef.hide();
    },
    deleteSubmit() {
      this.deletePost(this.selected_post_id);
      this.$refs.deleteModalRef.hide();
    },
  },
};
</script>
