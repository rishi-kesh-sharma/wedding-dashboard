/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import permissions from './permissions';
export default function access(initialState) {
  // const { currentUser, permissions } = initialState || {};
  const { currentUser } = initialState || {};
  return {
    // access for admin
    canAdmin: currentUser && currentUser.role === 'admin',
    // access for agency
    canAgency: currentUser && currentUser.role === 'agency',
    canReadPageA: currentUser && currentUser.access === 'pageA',

    // can access function
    canAccess: (route) => {
      // console.log(route, 'route');
      // console.log('access.route', route.path, permissions);
      // const isAllowed =
      //   permissions &&
      //   Array.isArray(permissions) &&
      //   permissions.some((permission) => permission.resourceName === route.path);
      // console.log('access.route.isAllowed', isAllowed);
      // return isAllowed;
      return true;
    },

    // check if the element is allowed
    canShow: (element) => {
      // console.log('access.element', element);
      // const isAllowed =
      //   permissions &&
      //   Array.isArray(permissions) &&
      //   permissions.some((permission) => permission.resourceName === element);
      // console.log('access.isAllowed', isAllowed);
      // return isAllowed;
      return true;
    },

    // check if the element is disabled
    isDisabled: (element) => {
      // const isDisabled =
      //   permissions &&
      //   Array.isArray(permissions) &&
      //   permissions.some(
      //     (permission) => permission.resourceName === element && permission.isDisabled,
      //   );
      // return isDisabled;
      return false;
    },
  };
}
