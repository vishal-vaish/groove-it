import {Link} from "react-router-dom";

const Error = () => {
  return(
     <div className="flex items-center justify-center h-screen">
       <div className="text-center">
         <h1 className="text-6xl font-extrabold text-primary">404</h1>
         <p className="mt-2 text-2xl font-semibold text-onNeutralBg">
           Page Not Found
         </p>
         <p className="mt-2 text-secondary">
           The page you are looking for might be in another universe.
         </p>
         <div className="mt-6">
           <Link to="/" className="text-primary hover:underline">
             Go Back home
           </Link>
         </div>
       </div>
     </div>
  )
}

export default Error;
