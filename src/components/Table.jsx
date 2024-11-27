import React, { useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { Button } from './Button';

export const Table = ({
  columns,
  data,
  expandButtonLabel = { collapsed: 'Expand', expanded: 'Collapse' },
  onRowClick,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const rowsPerPage = 50;

  const toggleExpandRow = rowId => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSort = field => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = sortField.split('.').reduce((o, i) => o?.[i], a);
    const bValue = sortField.split('.').reduce((o, i) => o?.[i], b);
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-md p-4 bg-white">
      <table className="min-w-full bg-white ring ring-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase cursor-pointer"
                onClick={() => col.accessor && handleSort(col.accessor)}
              >
                <div className="flex gap-1 items-center">
                  {col.header}
                  {sortField === col.accessor && (
                    <span>
                      {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <React.Fragment key={row.id || rowIndex}>
              <tr
                className={`border-t border-gray-200 hover:bg-gray-100 ${
                  rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-gray-700"
                  >
                    {col.extend ? (
                      col.condition ? (
                        col.condition(row) && (
                          <Button
                            className="text-white w-fit py-1 px-2 rounded transition-colors duration-300"
                            onClick={e => {
                              e.stopPropagation();
                              toggleExpandRow(row.id);
                            }}
                          >
                            {expandedRow === row.id
                              ? expandButtonLabel.expanded
                              : expandButtonLabel.collapsed}
                          </Button>
                        )
                      ) : (
                        <Button
                          className="text-white bg-gray-600 hover:bg-gray-700 w-fit py-1 px-2 rounded transition-colors duration-300"
                          onClick={e => {
                            e.stopPropagation();
                            toggleExpandRow(row.id);
                          }}
                        >
                          {expandedRow === row.id
                            ? expandButtonLabel.expanded
                            : expandButtonLabel.collapsed}
                        </Button>
                      )
                    ) : col.accessor ? (
                      col.accessor.split('.').reduce((o, i) => o?.[i], row)
                    ) : (
                      col.element?.(row)
                    )}
                  </td>
                ))}
              </tr>
              {expandedRow === row.id && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="bg-gray-50 p-0 transition-all duration-300 rounded-b-lg"
                  >
                    {columns.find(col => col.extend)?.element(row)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-3 items-center px-4 pt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage * rowsPerPage >= data.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
