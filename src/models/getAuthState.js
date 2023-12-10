import { getLoggedInUser } from '@/pages/blogs/service';
import { useState, useCallback, useEffect } from 'react';

export default function useAuthModel() {
  const [auth, setAuth] = useState({ userInfo: null, isAuthenticated: false, token: '' });

  useEffect(() => {
    const dbAuthData = localStorage.getItem('auth');
    if (dbAuthData) {
      const authData = JSON.parse(dbAuthData);
      if (authData && authData.token && authData.userInfo) {
        setAuth({ isAuthenticated: true, token: authData.token, userInfo: authData.userInfo });
      } else localStorage.removeItem('auth');
    }
  }, []);
  console.log(auth);
  const setAuthentication = (data) => {
    const auth = {
      userInfo: data.userInfo,
      permissions: data.permissions,
      isAuthenticated: data.isAuthenticated,
      token: data.token,
    };
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  };

  return {
    auth,
    setAuthentication,
  };
}
