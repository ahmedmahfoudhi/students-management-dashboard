import { Button } from "antd";
import loginImg from "../assets/login.png";
const LoginLeftSide = () => {
  return (
    <div className="w-[44%] bg-auth-pages flex flex-col items-center">
      <div className="h-[40%] flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-8 mt-24">Don't have an account yet ?</h2>
        <Button className="px-12 bg-blue-1 text-white rounded-full py-7 text-[1.4rem]">
          Create an account
        </Button>
      </div>
      <div className="h-[60%] w-full p-10 flex justify-center">
        <img src={loginImg} alt="login" className="object-contain " />
      </div>
    </div>
  );
};

export default LoginLeftSide;
