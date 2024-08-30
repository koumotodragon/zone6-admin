import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeLayout from './pages/HomeLayout';
import { Error } from "./pages/Error";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AddVideo } from './pages/AddVideo'
import { AllVideos } from "./pages/AllVideos";
import { AddTages } from "./pages/AddTages";
import { Video } from "./pages/Video";

import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as allvideosLoader } from "./pages/AllVideos";
import { loader as tagLoader } from "./pages/AddTages";
import { loader as addvideoLoader } from "./pages/AddVideo";
import { loader as videoLoader } from "./pages/Video";
import { action as loginAction } from "./pages/Login";
import { action as addVideoActon } from "./pages/AddVideo";
import { action as tagAction } from "./pages/AddTages";
import { action as videoAction } from "./pages/Video";


export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Login />,
        action: loginAction(),
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(),
      },
      {
        path: 'dashboard',
        element: <Dashboard queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddVideo />,
            loader: addvideoLoader(queryClient),
            action: addVideoActon(queryClient),
          },
          {
            path: 'all-videos',
            element: <AllVideos />,
            loader: allvideosLoader(queryClient),
          },
          {
            path: 'tags',
            element: <AddTages />,
            loader: tagLoader(queryClient),
            action: tagAction(queryClient),
          },
          {
            path: 'video/:id',
            element: <Video />,
            loader: videoLoader(queryClient),
            action: videoAction(queryClient),
          }
        ],
      },
    ]
  }
]);

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
