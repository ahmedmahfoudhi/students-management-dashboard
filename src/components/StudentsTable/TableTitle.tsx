const TableTitle = ({nbStudents}: {nbStudents: number}) => {
  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-3xl font-bold">Students List</h1>
      <p className="rounded-full bg-violet-100 text-violet-700 border-2 border-violet-700 text-center px-4 py-2 text-md font-semibold">
        {nbStudents} Students
      </p>
    </div>
  );
};

export default TableTitle;
