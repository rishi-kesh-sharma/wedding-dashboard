import { PageLoading } from '@ant-design/pro-layout';
import { history, Link, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
const registerPath = '/register';
const forgotpasswordPath = '/forgotpassword';
const resetpasswordPath = '/resetpassword';
const activateaccountPath = '/activateaccount';
const agencyGuestListPath = '/event/guest';
/** loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

import { extend } from 'umi-request';
import { message } from 'antd';
import { useEffect } from 'react';

export async function getInitialState() {
  const initialize = (auth) => {
    return {
      initialize,
      currentUser: auth?.userInfo,
      settings: {
        title: 'Wedding',
        now: new Date().toLocaleString(),
      },
    };
  };

  let authStr = localStorage.getItem('auth');
  if (authStr && JSON.parse(authStr)) {
    return initialize(JSON.parse(authStr));
  }

  return {
    initialize,
    settings: {},
  };
}

// ProLayout api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '',
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      let authStr = localStorage.getItem('auth');

      const { location } = history; // login

      console.log(location.pathname, 'pathname');
      console.log(location.pathname.indexOf(agencyGuestListPath), 'index');
      if (location.pathname.indexOf(agencyGuestListPath) == 0) {
        console.log(location, 'the path');
        return history.push(location.pathname);
      }

      if (!authStr || JSON.parse(authStr).isAuthenticated === false) {
        const allowedPath = [
          loginPath,
          registerPath,
          forgotpasswordPath,
          resetpasswordPath,
          activateaccountPath,
        ];
        let pathname = location.pathname;

        if (pathname.endsWith('/')) {
          pathname = pathname.substring(0, pathname.length - 1);
        }

        if (allowedPath.indexOf(pathname) !== -1) {
          console.log('allowed');
          console.log(location, 'location');
          history.push(location);
        } else history.push(loginPath);
      }
      if (
        authStr &&
        JSON.parse(authStr).isAuthenticated &&
        (location.pathname === loginPath || location.pathname === registerPath)
      ) {
        if (JSON.parse(authStr).role == 'admin') {
          history.push('/event/list');
        } else {
          history.push(location);
        }
      }
    },

    // menuHeaderRender: undefined,
    // 403,
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
