<template>
  <div class="col-sm-6 col-md-3 col-lg-2">
    <q-card style="max-width: 300px">
      <q-skeleton height="200px" square />
      <q-card-section>
        <q-skeleton type="text" height="40px"/>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-skeleton type="text" width="100px" height="25px"/>
        <q-skeleton type="text" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
name: "CardShowProduct"
}
</script>

<style scoped>

</style>
