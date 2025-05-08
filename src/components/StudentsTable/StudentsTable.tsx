import React, { useEffect, useState } from "react";
import { Pagination, Table, Tag, Tooltip } from "antd";
import TableTitle from "./TableTitle";
import TableHeader from "./TableHeader";
import Action from "./Action";
import { useQuery } from "@tanstack/react-query";
import { GetStudentResponseWithCount, getStudents } from "../../api/students";
import {
  GetStudentResponse,
  IFilters,
  StudentUIData,
  TColumns,
  UpdateStudentInformation,
} from "../../types";
import avatar from "../../assets/avatar.svg";
import useDebounceValue from "../../hooks/useDebounceValue";

const columns: TColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div className="flex gap-2">
        <img
          src={record.avatar || avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="capitalize font-semibold">
          {text} <br />#{record.id}
        </span>
      </div>
    ),
    hidden: false,
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
    hidden: false,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    hidden: false,
  },
  {
    title: "Invite Code",
    dataIndex: "inviteCode",
    key: "inviteCode",
    hidden: false,
  },
  {
    title: "Courses Enrolled",
    key: "coursesEnrolled",
    dataIndex: "coursesEnrolled",
    render: (_, { coursesEnrolled }) =>
      coursesEnrolled.length > 1 ? (
        <div className="flex items-center gap-[0.5rem]">
          <Tag color="geekblue" key={coursesEnrolled[0]}>
            {coursesEnrolled[0].toUpperCase()}
          </Tag>
          <Tooltip title={<span>{coursesEnrolled.slice(1).join(", ")}</span>}>
            <p className="bg-blue-200 text-blue-600 px-2 font-semibold rounded-lg">
              +{coursesEnrolled.length - 1}
            </p>
          </Tooltip>
        </div>
      ) : coursesEnrolled.length === 1 ? (
        <Tag color="geekblue" key={coursesEnrolled[0]}>
          {coursesEnrolled[0].toUpperCase()}
        </Tag>
      ) : (
        <span className="text-gray-500">__</span>
      ),
    hidden: false,
  },
  {
    title: "Created At",
    key: "createdAt",
    hidden: false,
    align: "center",
    width: 180,
    dataIndex: "createdAt",
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    defaultSortOrder: "ascend",
    render: (_, record) => <p>{new Date(record.createdAt).toLocaleString()}</p>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <div className="flex justify-center">
          <Action studentInformation={record as UpdateStudentInformation} />
        </div>
      );
    },
    hidden: false,
    align: "center",
  },
];

const StudentsTable: React.FC = () => {
  const [filters, setFilters] = useState<IFilters>({
    phoneMax: 99999999,
    phoneMin: 10000000,
    region: null,
    courses: [],
    createdAt: null,
  });
  const [mappedData, setMappedData] = useState<StudentUIData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounceValue(searchValue, 500);

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { isPending, data } = useQuery<GetStudentResponseWithCount>({
    queryKey: ["students", page, pageSize, filters, debouncedSearchValue],
    queryFn: () => getStudents(pageSize, page, filters, debouncedSearchValue),
    staleTime: 60 * 1000,
  });
  const [currentColumns, setCurrentColumns] = useState<TColumns>(columns);

  const toggleColumnVisibility = (key: string) => {
    setCurrentColumns((prevColumns) =>
      prevColumns?.map((column) =>
        column.key === key ? { ...column, hidden: !column.hidden } : column
      )
    );
  };

  useEffect(() => {
    if (data) {
      const transformedData: StudentUIData[] = data.students.map(
        (item: GetStudentResponse) => {
          return {
            key: item.id,
            name: item.name,
            region: item.region,
            phoneNumber: item.phone_number,
            avatar: item.avatar,
            inviteCode: item.invite_code,
            coursesEnrolled: item.courses_enrolled || [],
            createdAt: item.created_at,
            id: item.id,
            email: item.email,
          };
        }
      );
      setMappedData(transformedData);
    }
  }, [data]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPage(0);
    setPageSize(10);
  };

  return (
    <div className="flex flex-col gap-6">
      <TableTitle nbStudents={data?.count || 0} />
      <TableHeader
        columns={currentColumns}
        toggleColumnVisibility={toggleColumnVisibility}
        handleFiltersApply={(filters: IFilters) => {
          setFilters(filters);
          setPage(0);
          setPageSize(10);
        }}
        search={searchValue}
        setSearch={(value: string) => handleSearchChange(value)}
      />
      <Table<StudentUIData>
        rowSelection={{ type: "checkbox" }}
        columns={currentColumns}
        dataSource={mappedData}
        pagination={false}
        loading={isPending}
        scroll={{ x: true }}
      />
      <div className="flex justify-end">
        <Pagination
          showSizeChanger
          defaultCurrent={page + 1}
          total={data?.count}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          className=""
          onChange={(page, pageSize) => {
            setPage(page - 1);
            setPageSize(pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default StudentsTable;
