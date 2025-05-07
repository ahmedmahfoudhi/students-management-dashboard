import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message, Modal } from "antd";
import { FaArchive } from "react-icons/fa";
import { deleteStudent } from "../../api/students";
interface DeleteStudentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  studentId: number;
}

const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  studentId,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteStudent(id),
    onSuccess: () => {
      message.success("Student deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
      message.error("Failed to delete student");
    },
  });
  const handleOk = () => {
    mutation.mutate(studentId);
  };

  const handleCancel = () => {
    console.log("Cancel");
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <h1 className="text-center text-2xl mt-16 font-semibold text-gray-700 relative z-1">
          Delete Student
        </h1>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      okButtonProps={{
        className: "w-5/12 bg-red-600 text-white hover:bg-red-800 font-bold",
      }}
      styles={{
        footer: {
          display: "flex",
          justifyContent: "space-evenly",
          borderTop: "2px solid rgb(235 235 235)",
          padding: "0.7rem 0 0",
        },
      }}
      cancelButtonProps={{
        className:
          "text-center font-bold self-st w-5/12 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 hover:border-gray-300 ",
      }}
      okText="Delete"
      cancelText="Cancel"
    >
      <div className="flex flex-col justify-center absolute -top-[4rem] right-[50%] translate-x-1/2 bg-white rounded-full  h-32 w-32">
        <FaArchive className="text-4xl text-red-600 mx-auto mb-4 " />
      </div>
      <p className="my-12 text-center text-[1rem] text-gray-600 font-extralight">
        Are you sure you want to delete this user? This action cannot be
        undone..
      </p>
    </Modal>
  );
};

export default DeleteStudentModal;
