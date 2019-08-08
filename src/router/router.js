import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

import csmOrderEditPage from '../components/order-edit-page/order/csm-order-edit-page'
import csmUserInfo from '../components/order-edit-page/user/csm-user-info'
import csmLogisticInfo from '../components/order-edit-page/logistic/csm-logistic-info'
import csmDeliveryInfo from '../components/order-edit-page/delivery/csm-delivery-info'

let router = new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/order',
        },
        {
            path: '/order',
            name: 'order',
            components: {
                content: csmOrderEditPage
            },
        },
        {
            path: '/logistic',
            name: 'logistic',
            components: {
                content: csmLogisticInfo
            },
        },
        {
            path: '/delivery',
            name: 'delivery',
            components: {
                content: csmDeliveryInfo
            },
        },
        {
            path: '/user-profile',
            name: 'userProfile',
            components: {
                content: csmUserInfo
            },
        }
    ]
});

export default router;
