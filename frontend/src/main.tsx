import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Error from './router.tsx/error.tsx';

import Category from './router.tsx/category.tsx';
import CreateForm from './page/category/createForm.tsx';
import Views from './page/category/views.tsx';
import Edit from './page/category/edit.tsx';


import DishList from './router.tsx/dishlist.tsx';
import CreateDishList from './page/dishlist/create.tsx'
import ViewsDishList from './page/dishlist/views.tsx';
import EditDishList from './page/dishlist/edit.tsx';
import Login from './page/user/login.tsx';
import ListLogin from './page/user/ListLogin.tsx';
import APiExample from './router.tsx/api.tsx';
import GetOrder from './page/order/getOrder.tsx';

const router = 
 createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      /* Category */
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/create",
        element: <CreateForm />,
      },
      {
        path: "/success",
        element: <Category />
      },
      {
        path: "/views",
        element: <Views />,
        children: [
          {
            path: "/views/:id/:handle/:url",
            element: <Views />
          }
        ]
      },
      {
        path: "/edit",
        element: <Edit />,
        children: [
          {
            path: "/edit/:id/:handle/:url",
            element: <Edit />
          }
        ]
      },
      /* Dish List */
      {
        path: "/dishlist",
        element: <DishList />
      },
      {
        path: "/dishlist/create",
        element: <CreateDishList />
      },
      {
        path: "/dishlist/views",
        element: <ViewsDishList />,
        children: [
          {
            path: "/dishlist/views/:id",
            element: <ViewsDishList />
          }
        ]
      },
      {
        path: "/dishlist/edit",
        element: <EditDishList />,
        children: [
          {
            path: '/dishlist/edit/:id',
            element: <EditDishList />
          }
        ]
      },
      /* User */
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/listLogin",
        element: <ListLogin />
      },
      {
        path: "/api",
        element: <APiExample />
      },
      /* Order */
      {
        path: '/order',
        element: <GetOrder />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SwitchTransition>
      <CSSTransition
      key={location.pathname}
      classNames="fade"
      timeout={200}
      unmountOnExit
      >
        <RouterProvider router={router} />
      </CSSTransition>
    </SwitchTransition>
  </StrictMode>,
)
