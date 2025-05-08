import { Button, Drawer, Input, InputNumber, message, Select } from "antd";
import { useState } from "react";
import {
  AddStudentInformation,
  EditDrawerProps,
  UpdateStudentInformation,
} from "../../types";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CgClose } from "react-icons/cg";

import SelectEnrolledCourses from "../SelectEnrolledCourses";
import { BiPhone, BiUser, BiUserPlus } from "react-icons/bi";
import { TUNISIA_REGIONS } from "../../constants/regions";
import { TfiEmail } from "react-icons/tfi";
import UploadFile from "../UploadFile";
import importAvatar from "../../assets/importAvatar.svg";
import addNewUser from "../../assets/AddNewUser.svg";
import { updateStudent } from "../../api/students";

const EditStudentDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  studentInformation,
}: EditDrawerProps) => {
  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const queryClient = useQueryClient();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: UpdateStudentInformation) => updateStudent(data),
  });

  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddStudentInformation>();

  const onSubmit = async (data: AddStudentInformation) => {
    data.avatar = avatarUrl;
    mutation.mutate(
      { ...data, id: studentInformation.id },
      {
        onSuccess: () => {
          reset();
          setAvatarUrl(null);
          message.success("Student updated successfully");
          queryClient.invalidateQueries({ queryKey: ["students"] });
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating student:", error);
          message.error("Failed to update student");
        },
      }
    );
  };

  return (
    <Drawer
      title="Basic Drawer"
      onClose={handleClose}
      open={isDrawerOpen}
      width={600}
    >
      <div className="flex gap-4 items-center p-4 border-b-1 border-gray-200">
        <img src={addNewUser} alt="addNewUser" className="w-[65px] h-[65px]" />
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="font-semibold text-[1.5rem]">Add New Student</h3>
            <p className="text-[1rem]">
              Choose a username and complete all user details.
            </p>
          </div>
          <p
            className="text-center bg-gray-300 text-black  p-2 rounded-full align-end cursor-pointer"
            onClick={handleClose}
          >
            <CgClose className="text-[1rem]" />
          </p>
        </div>
      </div>
      <div className="p-4 flex gap-4 items-center border-b-1 border-gray-200">
        <img
          src={avatarUrl ? avatarUrl : importAvatar}
          alt="avatar"
          className="w-[65px] h-[65px] ml-1 inline-block"
        />
        <div className="w-full">
          <h3 className="font-semibold text-[1.2rem]">Import Avatar</h3>
          <div className="flex justify-between items-center  rounded-2xl mt-2 w-[80%]">
            <UploadFile countFile={1} setAvatarUrl={setAvatarUrl} />
          </div>
        </div>
      </div>
      <div className="py-2 px-3">
        <h1 className="text-[1rem] text-blue-1 bg-gradient-custom  font-semibold my-3  ">
          Information
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[0.9rem] font-[500]">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
                }}
                defaultValue={studentInformation?.name}
                render={({ field }) => (
                  <Input placeholder="Name" prefix={<BiUser />} {...field} />
                )}
              />
              {errors.name && (
                <span className="text-red-500 text-[0.9rem]">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[0.9rem] font-[500]">
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
                defaultValue={studentInformation?.email}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Email address"
                    prefix={<TfiEmail />}
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-[0.9rem]">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="region" className="text-[0.9rem] font-[500]">
                Region
              </label>
              <Controller
                name="region"
                rules={{
                  required: "Region is required",
                }}
                control={control}
                defaultValue={studentInformation?.region}
                render={({ field }) => (
                  <Select
                    showSearch
                    placeholder="Select a region"
                    optionFilterProp="label"
                    // onChange={(value) => {
                    //   handleFilterChange("region", value);
                    // }}
                    onSearch={() => {}}
                    options={TUNISIA_REGIONS.map((region) => ({
                      value: region,
                      label: region,
                    }))}
                    {...field}
                  />
                )}
              />
              {errors.region && (
                <span className="text-red-500 text-[0.9rem]">
                  {errors.region.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="text-[0.9rem] font-[500]">
                Phone Number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{8}$/,
                    message: "Invalid phone number",
                  },
                }}
                defaultValue={studentInformation?.phoneNumber}
                render={({ field }) => (
                  <InputNumber
                    placeholder="Phone Number"
                    prefix={<BiPhone />}
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-[0.9rem]">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="coursesEnrolled"
                className="text-[0.9rem] font-[500]"
              >
                Courses Enrolled
              </label>
              <Controller
                name="coursesEnrolled"
                control={control}
                rules={{
                  required: "Courses enrolled is required",
                }}
                defaultValue={studentInformation?.coursesEnrolled}
                render={({ field }) => {
                  return <SelectEnrolledCourses field={field} />;
                }}
              />
              {errors.coursesEnrolled && (
                <span className="text-red-500 text-[0.9rem]">
                  {errors.coursesEnrolled.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="inviteCode" className="text-[0.9rem] font-[500]">
                Invite Code
              </label>
              <Controller
                name="inviteCode"
                control={control}
                rules={{
                  required: "Invite code is required",
                }}
                defaultValue={studentInformation?.inviteCode}
                render={({ field }) => (
                  <Input {...field} prefix={<BiUserPlus />} />
                )}
              />
              {errors.inviteCode && (
                <span className="text-red-500 text-[0.9rem]">
                  {errors.inviteCode.message}
                </span>
              )}
            </div>
            <Button
              htmlType="submit"
              className="w-[90%] mx-auto bg-blue-1 text-white  py-4 text-[1rem] self-center"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default EditStudentDrawer;
