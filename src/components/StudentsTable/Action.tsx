import { Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenuProps } from "antd";
import { FaArchive, FaUserEdit } from "react-icons/fa";
import EditStudentDrawer from "../Drawers/EditStudentDrawer";
import DeleteStudentModal from "../Modals/DeleteStudentModal";
import { useState } from "react";
import { UpdateStudentInformation } from "../../types";

const Action = ({
  studentInformation,
}: {
  studentInformation: UpdateStudentInformation;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center gap-2 w-[5rem]">
          <FaUserEdit className="text-lg text-blue-500" />
          <p className="text-md ">Edit</p>
        </div>
      ),
      key: "edit",
      onClick: () => {
        setIsEditDrawerOpen(true);
      },
    },
    {
      label: (
        <div className="flex items-center gap-2 w-[5rem]">
          <FaArchive className="text-lg ml-[-2px] text-red-600" />
          <p className="text-md">Delete</p>
        </div>
      ),
      key: "delete",
      onClick: () => {
        setIsModalOpen(true);
      },
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <BsThreeDotsVertical className="text-gray-500 text-lg cursor-pointer hover:text-gray-700" />
      </Dropdown>
      <EditStudentDrawer
        isDrawerOpen={isEditDrawerOpen}
        setIsDrawerOpen={setIsEditDrawerOpen}
        studentInformation={studentInformation}
      />
      <DeleteStudentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        studentId={studentInformation.id}
      />
    </>
  );
};

export default Action;
