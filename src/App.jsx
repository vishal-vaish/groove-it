import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./navigation/router.jsx";
import StylesProvider from "./providers/StylesProvider.jsx";
import {ToastContainer} from "react-toastify";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import {useGetProfile} from "./lib/action/profile.action.js";
import {useAuthState} from "./lib/action/auth.action.js";

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
