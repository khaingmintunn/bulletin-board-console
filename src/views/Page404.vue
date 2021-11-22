<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">THE PAGE YOU REQUESTED COULD NOT BE FOUND</h4>
            <p class="text-muted">ERROR 404 - PAGE NOT FOUND</p>
          </div>
          <b-button onClick="javascript:history.go(-1)">Back to previous</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>