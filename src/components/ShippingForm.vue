<template>
  <v-form @submit.prevent>
    <v-container>
      <v-alert
        v-if="zipCodeAlertFetchError.enabled"
        closable
        :text="zipCodeAlertFetchError.message"
        type="error"
        class="mb-10"
        @close="zipCodeAlertFetchError.enabled = false"
      ></v-alert>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formComputed.name"
            label="Nome"
            :rules="rules.nameRules"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formComputed.lastName"
            label="Sobrenome"
            :rules="rules.nameRules"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="formComputed.email"
            label="Email"
            :rules="rules.email"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formComputed.zipCode"
            label="CEP"
            :rules="rules.zipCode"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formComputed.address"
            label="Endereço"
            :rules="rules.required"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="formComputed.neighborhood"
            label="Bairro"
            :rules="rules.required"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="formComputed.number"
            label="Número"
            :rules="rules.required"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="formComputed.city"
            label="UF"
            :rules="rules.required"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  import axios from 'axios'
  const emit = defineEmits(['form'])
  const formValue = defineProps(['orderObject'])
  const zipCodeAlertFetchError = ref({
    enabled: false,
    message: null,
  })

  const formComputed = computed({
    get () {
      return formValue.orderObject
    },
    set (value: any) {
      emit('updateForm', value)
    },
  })

  const rules = {
    nameRules: [
      v => !!v || 'Campo Obrigatório',
      v => (v && v.length >= 3) || 'Nome precisa ter mais de 3 caracteres',
    ],
    email:[
      v => isValidEmail(v) || 'Email não é válido',
    ],
    zipCode:[
      v => v.length >= 8 || 'Cep precisa ser maior que 8 caracteres',
    ],
    required: [
      v => !!v || 'Campo Obrigatório',
    ],
  }

  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  async function getZipCode (zipCode: string) : Promise<void> {
    try {
      zipCodeAlertFetchError.value.enabled = false
      const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      if(response.data.erro === 'true') {
        zipCodeAlertFetchError.value = {
          enabled: true,
          message: 'Cep inválido',
        }
      }
      fillAddress(response.data)
    } catch (err) {
      zipCodeAlertFetchError.value = {
        enabled: true,
        message: err.message,
      }
    }
  }

  function fillAddress (data: any): void {
    if (data) {
      formComputed.value = {
        zipCode: data.cep,
        address: data.logradouro,
        city: data.uf,
        neighborhood: data.bairro,
      }
    }
  }

  watch(() => formComputed.value.zipCode, newValue => {
    if (newValue && newValue.length >= 8) {
      getZipCode(newValue)
    }
  })
</script>
