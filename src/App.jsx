import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./navigation/router.jsx";
import StylesProvider from "./providers/StylesProvider.jsx";
import {ToastContainer} from "react-toastify";
import {useAuthState} from "./lib/actions/auth.action.js";
import {useGetProfile} from "./lib/actions/profile.action.js";
import ThemeProvider from "./providers/ThemeProvider.jsx";

function App() {
  useAuthState();
  useGetProfile();

  return (
    <div className="app">
      <StylesProvider/>
      <ToastContainer/>

      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </div>
  )
}

export default App
