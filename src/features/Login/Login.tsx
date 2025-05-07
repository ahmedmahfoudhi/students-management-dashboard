import LoginLeftSide from "../../components/LoginLeftSide";
import LoginRightSide from "../../components/LoginRightSide";
const Login = () => {
  return (
    <div className="h-screen flex justify-between">
      <LoginLeftSide />
      <LoginRightSide />
    </div>
  );
};

export default Login;
