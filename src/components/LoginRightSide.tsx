import { Input, Button, Checkbox, message } from "antd";
import logo from "../assets/logo.webp";
import { Controller, useForm } from "react-hook-form";
import { handleLogin } from "../api/handleLogin";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const LoginRightSide = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await handleLogin(email, password);
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error((error as { message?: string })?.message || "Login failed");
    } finally {
      reset({ email: "", password: "" });
    }
  };

  return (
    <div className="w-[56%] flex flex-col h-screen items-center">
      <img
        src={logo}
        alt="logo"
        className="h-[25%] w-[42%] object-contain mt-28"
      />
      <h1 className="text-4xl">Sign in to your account</h1>
      <div className="w-[80%] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-10 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[1.4rem]">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="py-3 rounded-full"
                    placeholder="Username or email address"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-[1rem]">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[1.4rem]">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    className="py-3 rounded-full"
                    placeholder="Password"
                  />
                )}
              />
              {errors.password && (
                <span className="text-red-500 text-[1rem]">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-[1.4rem]">
                <Checkbox id="remember-me" />
                <label htmlFor="remember-me" className="text-[1.4rem]">
                  Remember me
                </label>
              </div>
              <Button
                htmlType="submit"
                className="px-12 bg-blue-1 text-white rounded-full py-7 text-[1.4rem]"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRightSide;
