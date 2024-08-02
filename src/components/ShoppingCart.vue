
<template>
  <v-container>
    <p class="text-h5 my-6 text-primary">Finalize sua compra</p>
    <v-row>
      <v-col :cols="12" md="10">
        <v-stepper :items="['Endereço', 'Pagamento']"
          next-text="Próximo"
          prev-text="anterior"
          >
          <template v-slot:item.1>
            <v-card title="Endereço" flat>
              <ShippingForm/>
            </v-card>
          </template>

          <template v-slot:item.2>
            <v-card title="Pagamento" flat>...</v-card>
          </template>
        </v-stepper>
      </v-col>
      <v-col>
        <OrderDisplay/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
  .v-stepper__step__step.primary {
    background-color: red !important;
    border-color: red !important;
}
</style>