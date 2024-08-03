import { IForm } from '@/interfaces/Form.ts'
import { defineStore } from 'pinia'

// Define an interface for the payment form
export const usePaymentStore = defineStore('payment', {
  state: (): IForm => ({
    phone: '',
    zipCode: '',
    address: '',
    number: 0,
    city: '',
    name: '',
    lastName: '',
    email: '',
    neighborhood: '',
  }),
  actions: {
    setFormData (form: IForm): void {
      this.fillState(this.$state, form)
    },
    fillState(state: IForm, payload: Partial<IForm>): void {
      Object.keys(payload).forEach((key) => {
        const field = key as keyof IForm
        if (payload[field] !== undefined && payload[field] !== null) {
          state[field] = payload[field]
        }
      })
    },
  },
})
