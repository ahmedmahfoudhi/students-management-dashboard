import { Button } from "antd";
import { FaFilter } from "react-icons/fa";

import { MouseEventHandler } from "react";

const FilterBtn = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      onClick={onClick}
      className="text-blue-1 border-blue-1 rounded-md font-semibold text-[1rem] px-4 py-2"
    >
      <FaFilter className=" text-lg" />
      <span>Filter</span>
    </Button>
  );
};

export default FilterBtn;
