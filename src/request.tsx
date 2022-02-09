import { extend } from 'umi-request';
import { history } from 'umi';
import * as jwt from 'jsonwebtoken';

const loginPath = '/user/login';

const setJWT = (jwtStr: string | null) => {
  if (jwtStr) {
    window.localStorage.setItem('jwt', jwtStr);
  }
};

const removeJWT = () => {
  window.localStorage.removeItem('jwt');
};

const getJWT = (): string => {
  const jwtStr = window.localStorage.getItem('jwt');
  return jwtStr || '';
};

const parseJWT = (): any => {
  const jwtStr = window.localStorage.getItem('jwt');
  if (jwtStr) {
    return jwt.decode(jwtStr);
  }
  return '';
};

// const CurrentUrl = (path: string, historyRouter: any) => {
//   const { pathname, search } = historyRouter.location;
//   const metadata = `${pathname}${search}`;
//   return `${path}&metadata=${encodeURIComponent(metadata)}`;
// };

// const NewURLRedirect = (path: string, historyRouter: any) => {
//   let currentPathName = path;
//   let currentURL;
//   try {
//     currentURL = new URL(path);
//     const existedMeta = currentURL.searchParams.get('meta');
//     if (existedMeta) {
//       return `${currentURL.pathname}${currentURL.search}`;
//     }
//     currentPathName = currentURL.pathname;
//   } catch (err) {
//     console.log(err);
//   }
//   const { pathname, search } = historyRouter.location;
//   const metadata = `${pathname}${search}`;
//   if (pathname === currentPathName) {
//     return `${metadata}`;
//   }
//   return `${currentPathName}?metadata=${encodeURIComponent(metadata)}`;
// };

const msRequest = extend({
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler: (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      removeJWT();
      //   let path = window.location.pathname;
      //   let nextURL;
      //   if (path !== loginPath) {
      //     nextURL = CurrentUrl(`${path}`, history);
      //     path = loginPath;
      //   }
      //   nextURL = NewURLRedirect(
      //     `${window.location.origin}${path}?metadata=${encodeURIComponent(nextURL || '')}`,
      //     history,
      //   );
      //   history.push(nextURL);
      history.push(loginPath);
    }
    throw error;
  },
});

msRequest.interceptors.request.use((_, options) => {
  return {
    options: {
      ...options,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    },
  };
});

msRequest.interceptors.response.use((response) => {
  if (response.status === 200) {
    setJWT(response.headers.get('Grpc-Metadata-Authorization'));
  }
  return response;
});

export { msRequest, setJWT, removeJWT, getJWT, parseJWT };
