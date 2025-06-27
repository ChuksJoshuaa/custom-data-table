import useDataTable from "@/components/DataTable/useDataTable";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import type { DataTableProps, User } from "@/interface";

const DataTable = ({ data, columns, pageSize = 10 }: DataTableProps) => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    handleSort,
    sortConfig,
    searchTerm,
    setSearchTerm,
    selectedRows,
    handleRowSelect,
    handleBulkDelete,
    sortedData,
    setSelectedRows,
  } = useDataTable({
    data,
    columns,
    pageSize,
  });

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow tw-relative">
      <div className="p-4 flex justify-between items-center">
        <SearchBar
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {selectedRows.size > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Delete Selected ({selectedRows.size})
          </button>
        )}
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={
                  selectedRows.size === paginatedData.length &&
                  paginatedData.length > 0
                }
                onChange={() => {
                  if (selectedRows.size === paginatedData.length) {
                    setSelectedRows(new Set());
                  } else {
                    const newSelectedRows = new Set(selectedRows);
                    paginatedData.forEach((item) =>
                      newSelectedRows.add(item.id)
                    );
                    setSelectedRows(newSelectedRows);
                  }
                }}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && (
                    <span className="ml-1">
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === "asc" ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )
                      ) : (
                        <svg
                          className="w-4 h-4 opacity-30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <tr
                key={item.id}
                className={
                  selectedRows.has(item.id) ? "bg-blue-50" : "hover:bg-gray-50"
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleRowSelect(item.id)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </td>
                {columns.map((column) => {
                  const value = item[column.key as keyof User];
                  return (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          sortedDataLength={sortedData.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DataTable;
