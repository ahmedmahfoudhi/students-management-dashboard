import { Button, Dropdown, Switch } from "antd";
import { PiTextColumnsBold } from "react-icons/pi";
import { ColumnBtnProps } from "../../types";

const ColumnBtn = ({ columns, toggleColumnVisibility }: ColumnBtnProps) => {
  if (!columns) return null;
  const columnsItems = columns?.map((column) => {
    if (!column || !column.key || !column.title) return null;
    return {
      label: (
        <div
          className="flex items-center w-[15rem] justify-between"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleColumnVisibility(column.key as string);
          }}
        >
          <p>{column.title as string}</p>
          <Switch checked={!column.hidden} />
        </div>
      ),
      key: column.key,
    };
  });
  return (
    <Dropdown
      menu={{
        items: columnsItems,
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button className="text-violet-900 border-violet-900 rounded-md font-semibold text-[1rem] px-4 py-2">
        <PiTextColumnsBold className="text-violet-900 text-[1.5rem]" />
        <span>Columns</span>
      </Button>
    </Dropdown>
  );
};

export default ColumnBtn;
