
<template>
  <v-container>
    <p class="text-h5 my-6 text-primary">Finalize sua compra</p>
    <v-row>
      <v-col :cols="12" md="10">
        <v-stepper
          v-model="step"
          hide-actions
          :items="['Endereço', 'Pagamento', 'Revisão']"
        >
          <template v-slot:item.1>
            <v-card
              flat
              title="Endereço"
            >
              <ShippingForm
                :orderObject="orderForm"
                teste="Aquila"
                @updateForm="updateForm"
              />
            </v-card>
          </template>

          <template v-slot:item.2>
            <v-card
              flat
              title="Pagamento"
            >
              <PaymentOptions />
            </v-card>
          </template>
          <template v-slot:item.3>
            <v-card
              flat
              title="Revisão"
            >...</v-card>
          </template>
          <v-stepper-actions
            next-text="Próximo"
            :disabled="disabled"
            prev-text="Anterior"
            @click:next="steps['next']()"
            @click:prev="steps['prev']()"
            />
        </v-stepper>
      </v-col>
      <v-col>
        <OrderDisplay/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import PaymentOptions from '@/components/PaymentOptions.vue'
  import { IForm } from '@/interfaces/Form'
  import {usePaymentStore} from '@/stores/payment.ts'

  const step = ref(1)
  const orderForm: Ref<IForm> = ref({
    zipCode: null,
    address: null,
    number: null,
    state: null,
    city: null,
    street: null,
    name: null,
    lastName: null,
    email: null,
    neighborhood: null,
  })
  const paymentStore = usePaymentStore()

  function updateForm (data: IForm) : void {
    orderForm.value = data
  }

  const steps = {
    next: () => {
      step.value = step.value + 1
      console.log(orderForm.value)
      paymentStore.setFormData(orderForm.value)
    },
    prev: () => step.value = step.value - 1,
  }

  const disabled = computed(() => {
    if(orderForm.value.name &&
      orderForm.value.email &&
      orderForm.value.address &&
      orderForm.value.number &&
      orderForm.value.city &&
      orderForm.value.zipCode &&
      orderForm.value.neighborhood
    ) return false
    return true
  })

</script>

