import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";

function RootLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans antialiased text-zinc-200">
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // Everything in this array renders inside the <Outlet /> above
    children: [
      {
        index: true, // "index" means this renders at the exact "/" path
        element: <Hero />,
      },
      {
        // The colon (:) tells the router these are dynamic variables
        path: "dashboard/:gameName/:tagLine",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
