import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Category from './router.tsx/category.tsx';
import CreateForm from './page/category/createForm.tsx';
import Views from './page/category/views.tsx';
import Error from './router.tsx/error.tsx';
import Delete from './page/category/delete.tsx';
import Update from './page/category/edit.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/create",
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
            path: "/views/:category_id",
            element: <Views />
          }
        ]
      },
      {
        path: "/edit",
        element: <Update/>,
        children: [
          {
            path: "/edit/:category_id"
          }
        ]
      },
      {
        path: "/delete/:category_id",
        element: <Delete/>
      }
    ],
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
