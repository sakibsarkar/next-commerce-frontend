const TableDataFetching = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full h-full bg-[#ffffffb9] absolute top-0 left-0 center flex-col ${
        className || ""
      }`}
    >
      Loading....
      <div className="w-8 h-8 border-4 border-primary rounded-full animate-spin border-t-transparent" />
    </div>
  );
};

export default TableDataFetching;
