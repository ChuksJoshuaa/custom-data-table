import type { DataTableProps, User } from "@/interface/index";
import { useMemo, useState } from "react";

const useDataTable = ({
  data,
  columns,
  pageSize = 10,
  onDeleteSuccess,
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [tableData, setTableData] = useState<User[]>(data);

  const filteredData = useMemo(() => {
    return tableData.filter((item) =>
      columns.some((column) =>
        String(item[column.key as keyof User])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [tableData, searchTerm, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof User];
      const bValue = b[sortConfig.key as keyof User];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (id: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleBulkDelete = () => {
    const deletedIds = Array.from(selectedRows);
    if (onDeleteSuccess) {
      onDeleteSuccess(deletedIds);
    }
    const newData = tableData.filter((item) => !selectedRows.has(item.id));
    setTableData(newData);
    setSelectedRows(new Set());

    if (paginatedData.length === selectedRows.size && currentPage > 1) {
      setCurrentPage(1);
    }
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    handleSort,
    sortConfig,
    searchTerm,
    setSearchTerm,
    filteredData,
    selectedRows,
    handleRowSelect,
    handleBulkDelete,
    setSelectedRows,
    setSortConfig,
    sortedData,
  };
};

export default useDataTable;
