import { Button, Layout, message } from "antd";
import logo from "../assets/logo.webp";
import { CgLogOut } from "react-icons/cg";
import { handleLogout } from "../api/handleLogout";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

export interface ParentProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<ParentProps> = ({ children }) => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await handleLogout();
      message.success("Logout successful");
      navigate("/login");
    } catch (error) {
      message.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider width="25%" className="bg-white text-white">
        <img src={logo} alt="Logo" className="" />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-lg flex justify-end items-center">
          <Button
            icon={<CgLogOut />}
            className="bg-white"
            onClick={logoutUser}
          />
        </Header>
        <Content>{children}</Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  );
};
