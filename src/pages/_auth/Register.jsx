import {useRegister} from "../../lib/action/auth.action.js";
import {useMemo} from "react";
import {registerValidation} from "../../lib/validations/auth.js";
import Form from "../../components/Form.jsx";
import {Link} from "react-router-dom";

const Register = () => {
  const {isSubmitting, register} = useRegister();
  const handleSubmit = async (values) => {
    await register(values);
  }

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "email",
        label: "Email Address",
        props: {
          type: "email",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "username",
        label: "Username",
        props: {
          type: "text",
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
     <section className="register_section">
       <div className="gap-4 my-6 divider flex_justify_center">
         <div className="h-[1px] bg-divider flex-1"/>
         <span className="text-sm text-onNeutralBg">or</span>
         <div className="h-[1px] bg-divider flex-1"/>
       </div>
       <Form
          list={list}
          btnTxt="Register"
          isSubmitting={isSubmitting}
          schema={registerValidation}
          onSubmit={handleSubmit}
       />
       <div className="mt-4 text-xs text-center flex_justify_center text-secondary">
         By signing up, you agree to our Terms of Service and Privacy Policy.
       </div>
       <div className="flex-col gap-2 mt-4 text-sm flex_justify_center text-onNeutralBg">
         <div>
           Have an account?{" "}
           <Link
              to="/login"
              className="text-primary hover:underline underline-offset-2"
           >
             Sign In
           </Link>
         </div>
       </div>
     </section>
  );
};

export default Register;