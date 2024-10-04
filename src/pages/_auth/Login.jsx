import {useMemo} from "react";
import {useLogin} from "../../lib/action/auth.action.js";
import Form from "../../components/Form.jsx";
import {loginValidation} from "../../lib/validations/auth.js";
import {Link} from "react-router-dom";

const Login = () => {
  const {isSubmitting, login} = useLogin();

  const handleSubmit = (values) => {
    login(values);
  };

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "email",
        label: "Email address",
        props: {
          type: "email",
          placeholder: "",
        },
      },

      {
        type: "input",
        name: "password",
        label: "Password",
        props: {type: "password", placeholder: ""},
      },
    ];
  }, []);

  return (
     <section className="login_section">
       <div className="flex items-center justify-center gap-4 my-6 divider">
         <div className="h-[1px] bg-divider flex-1"/>
         <span className="text-sm text-onNeutralBg">or</span>
         <div className="h-[1px] bg-divider flex-1"/>
       </div>
       <Form
          list={list}
          btnTxt="Login"
          isSubmitting={isSubmitting}
          schema={loginValidation}
          onSubmit={handleSubmit}
          defaultValues={{
            email: "vishalvaish123@test.com",
            password: "vishalvaish123",
          }}
       />
       <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-onNeutralBg">
         <div>
           Forgot Password?{" "}
           <Link
              to="/reset-password"
              className="text-primary hover:underline underline-offset-2"
           >
             Reset
           </Link>
         </div>
         <div>
           No account?{" "}
           <Link
              to="/register"
              className="text-primary hover:underline underline-offset-2"
           >
             Sign up
           </Link>
         </div>
       </div>
     </section>
  )
}

export default Login