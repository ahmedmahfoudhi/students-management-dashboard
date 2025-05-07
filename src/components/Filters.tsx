import {
  Select,
  Button,
  DatePicker,
  InputNumber,
  Tag,
  SelectProps,
} from "antd";
import { COURSES } from "../constants/courses";
import { TUNISIA_REGIONS } from "../constants/regions";
import { useState } from "react";
import { IFilters } from "../types";
import { Dayjs } from "dayjs";
type TagRender = SelectProps["tagRender"];

const Filters = ({
  handleFiltersApply,
}: {
  handleFiltersApply: (filters: IFilters) => void;
}) => {
  const [filters, setFilters] = useState<IFilters>({
    phoneMin: 10000000,
    phoneMax: 99999999,
    region: null,
    courses: [],
    createdAt: null,
  });
  const handleFilterChange = (
    key: string,
    value:
      | Date
      | number
      | string
      | string[]
      | null
      | [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const tagRender: TagRender = (props) => {
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
        className="inline-block"
      >
        {label}
      </Tag>
    );
  };
  const handleReset = () => {
    setFilters({
      phoneMin: 10000000,
      phoneMax: 99999999,
      region: null,
      courses: [],
      createdAt: null,
    });
    handleFiltersApply(filters);
  };
  return (
    <div>
      <div className="flex gap-12">
        <div>
          <label
            htmlFor="phone_number"
            className="mb-2 inline-block font-semibold text-[1rem]"
          >
            Phone Number
          </label>
          <div className="flex gap-2">
            <InputNumber
              min={10000000}
              max={99999999}
              value={filters.phoneMin}
              onChange={(value) => handleFilterChange("phoneMin", value)}
              className="w-[10rem]"
            />
            <InputNumber
              min={10000000}
              max={99999999}
              value={filters.phoneMax}
              onChange={(value) => handleFilterChange("phoneMax", value)}
              className="w-[10rem]"
            />
          </div>
        </div>
        <div className="w-[10rem]">
          <label className="mb-2 block font-semibold text-[1rem]">Region</label>
          <Select
            className="w-full"
            showSearch
            placeholder="Select a region"
            optionFilterProp="label"
            onChange={(value) => {
              handleFilterChange("region", value);
            }}
            onSearch={() => {}}
            options={TUNISIA_REGIONS.map((region) => ({
              value: region,
              label: region,
            }))}
            value={filters.region}
          />
        </div>
        <div className="w-[10rem]">
          <label className="mb-2 block font-semibold text-[1rem]">
            Enrolled Courses
          </label>
          <Select
            className="w-full flex flex-nowrap  gap-1 overflow-x-hidden overflow-ellipsis"
            showSearch
            mode="multiple"
            placeholder="Select enrolled courses"
            optionFilterProp="label"
            onChange={(value) => {
              handleFilterChange("courses", value);
            }}
            tagRender={tagRender}
            options={COURSES.map((course) => ({
              value: course,
              label: course,
            }))}
            maxTagCount={1}
            maxTagPlaceholder={(omittedValues) => {
              return `+${omittedValues.length} more`;
            }}
            value={filters.courses}
          />
        </div>
        <div>
          <label className="mb-2 inline-block font-semibold text-[1rem]">
            Created At
          </label>
          <DatePicker.RangePicker
            className="w-full"
            onChange={(value) => {
              handleFilterChange("createdAt", value);
            }}
            placeholder={["Start Date", "End Date"]}
            allowClear
            value={filters.createdAt}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <Button
          className="border border-gray-300 text-gray-700 font-semibold rounded-md px-4 py-2"
          onClick={handleReset}
        >
          Clear
        </Button>
        <Button
          type="primary"
          className="bg-blue-1 text-white font-semibold rounded-md px-4 py-2"
          onClick={() => handleFiltersApply(filters)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Filters;
