<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card
          class="elevation-4"
          tile
          :loading="isLoading"
          :disabled="isLoading"
        >
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      label="Amount"
                      name="amount"
                      type="text"
                      v-model="amount"
                      :rules="amountRules"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                      label="Duration"
                      name="duration"
                      type="text"
                      v-model="duration"
                      :rules="durationRules"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="2" class="align-content-center">
                    <v-btn
                      color="primary"
                      class="mt-4"
                      block
                      @click="submit"
                      :disabled="!valid"
                    >
                      Ok
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
        <v-alert
          class="elevation-4 mt-4"
          text
          color="blue"
          v-if="monthlyInstallment"
        >
          Monthlly installment: {{ monthlyInstallment }} EUR
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "LoanWidget",

  data: () => ({
    valid: true,
    amount: "",
    amountRules: [
      v => !!v || "Amount is required",
      v => (v >= 10000 && v <= 100000) || "Should be between 10.000 and 100.000"
    ],
    duration: "",
    durationRules: [
      v => !!v || "Duration is required",
      v => (v >= 1 && v <= 5) || "Should be between 1 and 5"
    ],
    lazy: true,
    isLoading: false,
    monthlyInstallment: ""
  }),

  methods: {
    submit() {
      const isFormValid = this.$refs.form.validate();
      if (isFormValid) {
        this.getLoan();
      }
    },
    async getLoan() {
      this.isLoading = true;

      const { data } = await axios.post("/loan", {
        amount: this.amount,
        duration: this.duration
      });

      this.isLoading = false;
      this.monthlyInstallment = data.monthlyInstallment;
    }
  }
};
</script>
