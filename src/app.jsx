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

      // check if the pathname is agency guest list path
      if (location.pathname.indexOf(agencyGuestListPath) == 0) {
        // set eventId to localStorage
        localStorage.setItem(
          'eventId',
          location.pathname.split('/')[location.pathname.split('/').length - 1],
        );

        // push to the agency guest list path
        return history.push(`${location?.pathname}`);
      }

      // check if the agency is authenticated then push every route to the /event/guest/:eventId
      if (
        authStr &&
        JSON.parse(authStr).isAuthenticated &&
        JSON.parse(authStr).userInfo.role == 'agency'
      ) {
        history.push(`/event/guest/${localStorage.getItem('eventId')}`);
      }
      // check is the admin is not authenticated
      if (!authStr || JSON.parse(authStr).isAuthenticated === false) {
        // if not authenticated still allow for the following paths
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

        // check if  pathname is  in allowed path
        if (allowedPath.indexOf(pathname) !== -1) {
          // if allowed push to the respective location
          history.push(location);
        }
        // else push to login path
        else history.push(loginPath);
      }
      console.log(JSON.parse(authStr), 'authstr');

      // if admin is authenticated and if the pathname is login path or register path
      if (
        authStr &&
        JSON.parse(authStr).isAuthenticated &&
        (location.pathname === loginPath || location.pathname === registerPath)
      ) {
        // if the role is admin
        if (JSON.parse(authStr).role == 'admin') {
          // push to event/list
          history.push('/event/list');
        } else {
          // else push to the respective location
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
