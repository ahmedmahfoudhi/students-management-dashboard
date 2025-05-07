import { Select, SelectProps, Tag } from "antd";
import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { COURSES } from "../constants/courses";
import { ControllerRenderProps } from "react-hook-form";
import { AddStudentInformation } from "../types";

const SelectEnrolledCourses = ({
  field,
}: {
  field: ControllerRenderProps<AddStudentInformation, "coursesEnrolled">;
}) => {
  const tagRender: SelectProps["tagRender"] = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <Select
      options={COURSES.map((course) => ({
        value: course,
        label: course,
      }))}
      showSearch
      placeholder="Select a region"
      tagRender={tagRender}
      mode="multiple"
      maxTagPlaceholder={(omittedValues) => {
        return `+${omittedValues.length} more`;
      }}
      maxTagCount={3}
      prefix={<GiGraduateCap className="h-[20px] w-[20px]" />}
      {...field}
    />
  );
};

export default SelectEnrolledCourses;
