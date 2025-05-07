import { Button } from "antd";
import { IoAddCircle } from "react-icons/io5";
import AddStudentDrawer from "../Drawers/AddStudentDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";

const AddStudentBtn = () => {
  const toggleDrawer = useToggleDrawer();
  return (
    <>
      <Button
        className="text-white border-blue-1 bg-blue-1  rounded-md font-semibold text-[1rem] px-4 py-2"
        onClick={() => toggleDrawer(true, "showDrawerAdd")}
      >
        <IoAddCircle className="text-[1.5rem] font-bold" />
        <span>Add New Student</span>
      </Button>
      <AddStudentDrawer />
    </>
  );
};

export default AddStudentBtn;
