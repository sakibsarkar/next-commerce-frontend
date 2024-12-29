"use client";

import { loginCredentials } from "@/const/auth";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
});

const Login = () => {
  const [login] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const redirect = Cookies.get("redirect");

  const handleLogin = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data, error: err } = await login(values);
      const error: any = err;
      if (error) {
        if (error.status === 401) {
          return toast.error("password didn;t matched", {
            description: "try to remember your password and try again",
          });
        }
        if (error.status === 404) {
          return toast.error("Invalid email address", {
            description: "Enter a valid email adress.",
          });
        }

        return toast.error(error.data?.message || "Unknown error occureds");
      }

      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }

      const authData = {
        user: data.data,
      };
      dispatch(setUser(authData));
      Cookies.set("refreshToken", data.refreshToken, { expires: 30 });
      dispatch(setToken(data.accessToken || ""));

      toast.success("Successfully logged in", {
        description: "Welcome back!",
      });

      redirect ? Cookies.remove("redirect") : "";
      router.replace(redirect || "/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-[15px] bg-transparent py-[50px]">
      <div className="flex items-center justify-center gap-[50px] bg-white p-[15px] rounded-[18px]">
        <div className="w-[500px] h-[500px] overflow-hidden rounded-[15px] hidden lg:flex">
          <Image
            src={"/images/authLady.png"}
            alt="auth"
            width={300}
            className="w-full h-full object-cover"
            height={350}
          />
        </div>
        <div className="max-w-[450px]">
          <h2 className="font-bold mb-6 text-left text-[35px]">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-primaryTxt text-[18px] font-[600]">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-primaryTxt text-[18px] font-[600]">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-[5px]">
                  <h3 className="block text-primaryTxt text-[18px] font-[600]">
                    Quick Login{" "}
                  </h3>
                  <div className="flex items-center justify-start  gap-[10px] flex-wrap mb-[20px]">
                    {loginCredentials.map(({ email, password, label }, i) => (
                      <button
                        key={"login" + i}
                        type="button"
                        className="w-fit bg-main/10 border-[1px] border-main/10 font-[700] text-main rounded-full px-[15px] py-[5px] text-[12px] active:scale-[0.8] hover:bg-main hover:text-white"
                        style={{ transition: "0.3s" }}
                        onClick={() => {
                          setFieldValue("email", email);
                          setFieldValue("password", password);
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-[15px] center gap-[8px] bg-main text-white py-[12px] hover:bg-main/80 rounded-[5px]"
                >
                  Login <LogIn />
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-6 text-start">
            <p className="text-gray-700">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-main font-[600] hover:underline"
              >
                Create Account
              </Link>
            </p>
            <p className="text-gray-700">
              Dont remeber our password?{" "}
              <Link
                href="/forgot-password"
                className="text-main font-[600] hover:underline"
              >
                forgot password
              </Link>
            </p>
          </div>

          <p className="mt-4 text-gray-600 text-sm text-start">
            Note: Your personal data will be used to support your experience
            throughout this website, to manage access to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
