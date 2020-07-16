import { mount } from "@vue/test-utils";
import Menu from "@/components/Menu.vue";
describe("Menu", () => {
  it("is mounted correctly", () => {
    const wrapper = mount(Menu);
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
  //   it("is not visible by default", () => {
  //     const wrapper = mount(Menu);
  //     expect(wrapper.isVisible()).toBe(false);
  //   });
});
