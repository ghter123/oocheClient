
export default [
  {
    path: '/default',
    component: () => import('layouts/default'),
    children: [
      { path: 'home', component: () => import('pages/Home') },
      { path: 'CustomerOrders', component: () => import('pages/CustomerOrders') },
      { path: 'appoint', component: () => import('pages/appoint') },
      { path: 'orders', component: () => import('pages/orders') },
      { path: 'orderDetail', component: () => import('pages/OrderDetail') },
      { path: 'Products', component: () => import('pages/Products') },
      { path: 'OrderQueue', component: () => import('pages/OrderQueue') },
      { path: 'AppointSucc', component: () => import('pages/AppointSucc') },
      { path: 'My', component: () => import('pages/My') },
      { path: 'supplierHome', component: () => import('pages/supplierHome') },
      { path: 'supplierOrderList', component: () => import('pages/supplierOrderList') },
      { path: 'userEdit', component: () => import('pages/UserEdit') },
      { path: 'comment', name: 'comment', component: () => import('pages/Comment')},
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  },

  {
    path: '/',
    component: () => import('pages/Login')
  },

  {
    path: '/register',
    component: () => import('pages/Register')
  },

  {
    path: '/anonymous',
    component: () => import('pages/Anonymous')
  },
]
