// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV, REACT_APP_API_URL, REACT_APP_DEFAULT_PAGE_SIZE } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 220,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/login',
      layout: false,
      name: 'login',
      component: './user/Login',
      hideInMenu: true,
    },
    {
      path: '/user',
      redirect: '/user/login',
    },
    {
      name: 'register-result',
      icon: 'smile',
      path: '/register-result',
      component: './user/register-result',
      hideInMenu: true,
    },
    {
      name: 'register',
      icon: 'smile',
      path: '/register',
      component: './user/register',
      hideInMenu: true,
    },
    {
      path: '/forgotpassword',
      layout: false,
      name: 'forgotpassword',
      component: './user/forgotpassword',
      hideInMenu: true,
    },
    {
      path: '/resetpassword',
      layout: false,
      name: 'resetpassword',
      component: './user/resetpassword',
      hideInMenu: true,
    },
    {
      path: '/activateaccount',
      layout: false,
      name: 'activateaccount',
      component: './user/activateaccount',
      hideInMenu: true,
    },

    // event
    {
      name: 'Event',
      icon: 'reconciliation',
      path: '/event/list',
      component: './event/list',
      hideInMenu: false,
      access: 'canAdmin',
    },

    {
      name: 'New',
      icon: 'smile',
      path: '/event/new',
      hideInMenu: true,
      component: './event/entry',
      access: 'canAdmin',
    },
    {
      name: 'Detail',
      icon: 'smile',
      path: '/event/:id',
      component: './event/detail',
      hideInMenu: true,
    },
    {
      name: 'Event Update',
      icon: 'smile',
      path: '/event/edit/:id',
      component: './event/update',
      hideInMenu: true,
      access: 'canAdmin',
    },

    // Todo:Event list for agency

    {
      name: 'Guest New',
      icon: 'smile',
      path: '/event/:id/guest/new/',
      component: './event/update',
      hideInMenu: true,
      access: 'canAdmin',
    },
    {
      name: 'Guest',
      icon: 'smile',
      path: '/event/:id/guest/list',
      component: './event/guest/list',
      hideInMenu: true,
    },
    {
      name: 'Guest Detail',
      icon: 'smile',
      path: '/event/:id/guest/edit/:guestId',
      component: './event/guest/update',
      hideInMenu: true,
      access: 'canAdmin',
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: './dashboard/analysis',
      redirect: '/event/list',
      hideInMenu: true,
      icon: 'dashboard',
      access: 'canAdmin',
    },
    {
      path: '/',
      name: 'dashboard',
      component: './dashboard/analysis',
      redirect: '/event/list',
      hideInMenu: true,
      icon: 'dashboard',
      access: 'canAdmin',
    },

    // team

    {
      path: '/team/new',
      component: './team/entry',
      access: 'canAdmin',
    },
    {
      path: '/team/edit/:id',
      component: './team/update',
      access: 'canAdmin',
    },
    {
      path: '/team/list',
      icon: 'user',
      name: 'Team',
      component: './team/list',
      access: 'canAdmin',
    },

    //Agency

    {
      path: '/agency/new',
      component: './agency/entry',
      access: 'canAdmin',
    },
    {
      path: '/agency/edit/:id',
      component: './agency/update',
      access: 'canAdmin',
    },
    {
      path: '/agency/list',
      icon: 'user',
      name: 'Agency',
      component: './agency/list',
      access: 'canAdmin',
    },
    //FAQ

    {
      path: '/faq/new',
      component: './faq/entry',
      access: 'canAdmin',
    },
    {
      path: '/faq/edit/:id',
      component: './faq/update',
      access: 'canAdmin',
    },
    {
      path: '/faq/list',
      icon: 'reconciliation',
      name: 'FAQ',
      component: './faq/list',
      access: 'canAdmin',
    },
    // Contact

    {
      name: 'Contact',
      path: '/contact/new',
      component: './contact/entry',
      access: 'canAdmin',
      hideInMenu: true,
    },
    {
      path: '/contact/edit/:id',
      component: './contact/update',
      access: 'canAdmin',
      hideInMenu: true,
    },
    {
      path: '/contact/list',
      icon: 'reconciliation',
      name: 'Contact',
      component: './contact/list',
      access: 'canAdmin',
    },
    {
      name: 'Guests',
      icon: 'reconciliation',
      path: '/event/guest/:eventId',
      component: './guest/list',

      hideInMenu: false,
      exact: true,
      access: 'canAgency',
    },

    // blogs
    // {
    //   path: '/blogs/new',
    //   component: './blogs/entry',
    // },
    // {
    //   path: '/blogs/edit/:id',
    //   component: './blogs/update',
    // },
    // {
    //   path: '/blogs/list',
    //   icon: 'reconciliation',
    //   name: 'Blog',
    //   hideInMenu: true,
    //   component: './blogs/list',
    // },
    // {
    //   path: '/contact/list',
    //   icon: 'phone',
    //   name: 'Contacts',
    //   component: './contact/list',

    // },
    // {
    //   path: '/contact/edit/:id',
    //   component: './contact/update',
    // },

    {
      name: 'account',
      icon: 'user',
      path: '/profile',
      hideInMenu: true,
      component: './account/settings',
    },
    {
      hideInMenu: true,
      name: 'exception',
      icon: 'warning',
      path: '/exception',
      routes: [
        {
          component: '404',
          hideInMenu: true,
        },
        {
          path: '/exception',
          redirect: '/exception/403',
        },
        {
          name: '403',
          icon: 'smile',
          path: '/exception/403',
          component: './exception/403',
          hideInMenu: true,
        },
        {
          name: '404',
          icon: 'smile',
          path: '/exception/404',
          component: './exception/404',
        },
        {
          name: '500',
          icon: 'smile',
          path: '/exception/500',
          component: './exception/500',
        },
      ],
    },
    {
      path: '/',
      redirect: '/dashboard/analysis',
      access: 'canAdmin',
    },

    {
      component: '404',
    },
    {
      component: './event/list',
    },
  ],
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh Hot update
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // Or use the online version
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    // {
    //   requestLibPath: "import { request } from 'umi'",
    //   schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
    //   projectName: 'swagger',
    // },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  webpack5: {},
  exportStatic: {},
  define: {
    API_URL: REACT_APP_API_URL || 'http://localhost:5001',
    DEFAULT_PAGE_SIZE: REACT_APP_DEFAULT_PAGE_SIZE || 10,
  },
});
