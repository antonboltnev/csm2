import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

import csmTableFilters from '../components/table-inner-components/csm-table-filters'
import csmTableBody from '../components/table-inner-components/csm-table-body'

let router = new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/tab_all',
        },
        {
            path: '/tab_all',
            name: 'tabAll',
            components: {
                tableHead: csmTableFilters,
                tableBody: csmTableBody
            },
        },
        {
            path: '/tab_escalation',
            name: 'tabEscalation',
            components: {
                tableHead: csmTableFilters,
                tableBody: csmTableFilters
            },
        },
        {
            path: '/tab_in-work',
            name: 'tabInWork',
            components: {
                tableHead: csmTableFilters,
                tableBody: csmTableBody
            },
        },
        {
            path: '/tab_new',
            name: 'tabNew',
            components: {
                tableHead: csmTableFilters,
                tableBody: csmTableBody
            },
        }
    ]
});

export default router;
