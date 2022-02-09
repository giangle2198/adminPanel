const routers = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './dashboard',
  },
  {
    path: '/management',
    name: 'management',
    icon: 'appstore',
    routes: [
      {
        name: 'product',
        path: '/management/products',
        component: './management/product',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'team',
    routes: [
      {
        name: 'user',
        path: '/admin/users',
        icon: 'user',
        routes: [
          {
            name: 'user_inquiry',
            path: '/admin/users/inquiry',
            component: './admin/users',
            exact: true,
          },
          {
            hideInMenu: true,
            name: 'user_edit',
            path: '/admin/users/edit',
            component: './admin/users/component/edit',
            hasBack: true,
            exact: true,
          },
        ]
      },

      {
        name: 'role',
        path: '/admin/roles',
        routes: [
          {
            name: 'role_inquiry',
            path: '/admin/roles/inquiry',
            component: './admin/roles',
            exact: true,
          },
          {
            hideInMenu: true,
            name: 'role_edit',
            path: '/admin/roles/edit',
            component: './admin/roles/component/edit',
            hasBack: true,
            exact: true,
          },
        ]
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];

const routesMap = {};
const fetchRoutesMap = (route: any) => {
  for (let i = 0; i < route.length; i += 1) {
    const currentRoute = route[i];
    if (!currentRoute.routes) {
      routesMap[currentRoute.path] = currentRoute;
    }
    if (Array.isArray(currentRoute.routes)) {
      fetchRoutesMap(currentRoute.routes);
    }
  }
};
fetchRoutesMap(routers);
const getRouteFromMap = (path: string) => {
  return routesMap[path] || {};
};
export { getRouteFromMap };
export default routers;