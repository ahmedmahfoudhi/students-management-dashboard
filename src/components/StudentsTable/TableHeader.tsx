import { Input } from "antd";

import ColumnBtn from "../Buttons/ColumnBtn";
import FilterBtn from "../Buttons/FilterBtn";
import AddStudentBtn from "../Buttons/AddStudentBtn";
import { useState } from "react";
import Filters from "../Filters";
import { IFilters, TColumns } from "../../types";

export interface TableHeaderProps {
  columns: TColumns;
  toggleColumnVisibility: (key: string) => void;
  handleFiltersApply: (filters: IFilters) => void;
  search: string;
  setSearch: (value: string) => void;
}

const TableHeader = ({
  columns,
  toggleColumnVisibility,
  handleFiltersApply,
  search,
  setSearch,
}: TableHeaderProps) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFilterVisible = () => {
    setFilterVisible((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search"
          className="w-2xl text-[1rem]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-3">
          <ColumnBtn
            columns={columns}
            toggleColumnVisibility={toggleColumnVisibility}
          />
          <FilterBtn onClick={toggleFilterVisible} />
          <AddStudentBtn />
        </div>
      </div>
      {filterVisible && <Filters handleFiltersApply={handleFiltersApply} />}
    </>
  );
};

export default TableHeader;
