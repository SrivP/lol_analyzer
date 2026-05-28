import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
} from "react-router";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function RootLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans antialiased text-zinc-200">
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // Everything in this array renders inside the <Outlet /> above
    children: [
      {
        index: true, // "index" means this renders at the exact "/" path
        element: <Hero />,
        // didn't know this was a function in react router 👌
        action: heroAction,
      },
      {
        // The colon (:) tells the router these are dynamic variables
        path: "dashboard/:gameName/:tagLine",
        element: <Dashboard />,
      },
    ],
  },
]);

// heroAction written with direct help from AI (didn't know you had to encodeURIComponent values for the URL)

export async function heroAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const gameName = formData.get("gameName");
  const tagLine = formData.get("tagLine");

  if (!gameName || !tagLine) {
    return { error: "Both game name and tag line are required." };
  }

  const gameNameStr = String(gameName).trim();
  const tagLineStr = String(tagLine).trim();

  // personal note: used to ensure spaces and things like that don't mess with the url
  const safeGameName = encodeURIComponent(gameNameStr);
  const safeTagLine = encodeURIComponent(tagLineStr);

  return redirect(`/dashboard/${safeGameName}/${safeTagLine}`);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
