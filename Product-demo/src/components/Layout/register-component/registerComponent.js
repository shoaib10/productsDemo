import Header from '../../Layout/Header.vue';
import ProductHome from '../../../pages/ProductHome.vue';

export const registerComponents = (Vue) => {
    Vue.component('Header', Header);
    Vue.component('ProductHome', ProductHome);

}