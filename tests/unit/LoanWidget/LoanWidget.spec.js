import Vue from "vue";
import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import LoanWidget from "@/components/LoanWidget.vue";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

Vue.use(Vuetify);

describe("LoanWidget.vue", () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);

    wrapper = mount(LoanWidget, {
      localVue
    });
  });

  it("matches snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("shows error when amount is wrong", async () => {
    const amountInput = wrapper.find('input[name="amount"]');
    amountInput.setValue("1");

    await wrapper.vm.$nextTick();

    amountInput.trigger("input");

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Should be between 10.000 and 100.000");
  });

  it("submit button is disabled when form is invalid", async () => {
    await wrapper.vm.$nextTick();

    const durationInput = wrapper.find('input[name="duration"]');
    const submitButton = wrapper.find("button");

    durationInput.setValue("7");

    await wrapper.vm.$nextTick();

    durationInput.trigger("input");

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Should be between 1 and 5");
    expect(submitButton.is("[disabled]")).toBeTruthy();
  });

  it("shows error when duration is wrong", async () => {
    const durationInput = wrapper.find('input[name="duration"]');
    durationInput.setValue("7");

    await wrapper.vm.$nextTick();

    durationInput.trigger("input");

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Should be between 1 and 5");
  });

  it("fetches async when a button is clicked", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("/loan").reply(200, {
      amount: "10000.00",
      duration: "5",
      monthlyInstallment: "5390.61"
    });

    wrapper.find('input[name="amount"]').setValue("10000");
    wrapper.find('input[name="duration"]').setValue("5");
    wrapper.find("button").trigger("click");

    //this part has to be improved :'((
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.monthlyInstallment).toBe("5390.61");
  });
});
