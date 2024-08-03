
<template>
  tela de pagamento {{paymentStore.$state.name}}
</template>

<script setup lang="ts">
  import {usePaymentStore} from '@/stores/payment.ts'
  const paymentStore = usePaymentStore()

</script>

