import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import { FaTrash, FaUndo } from 'react-icons/fa';
import { Button } from './Button';

export const Table = ({
  columns,
  data,
  actions,
  expandedRowRender,
  onRowClick,
  expandButtonLabel = { collapsed: 'Expand', expanded: 'Collapse' },
}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  const toggleExpandRow = rowId => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-md p-4 bg-white">
      <table className="min-w-full bg-white ring ring-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 ">
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <React.Fragment key={row.id || rowIndex}>
              {/* Main Row */}
              <tr
                className={cn(
                  'border-t border-gray-200 hover:bg-gray-100 cursor-pointer',
                  rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                )}
                onClick={() => onRowClick(row)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-gray-700"
                  >
                    {col.accessor.split('.').reduce((o, i) => o[i], row)}
                  </td>
                ))}
                <td
                  className={cn(
                    'p-4 text-sm text-gray-700 flex items-center gap-3',
                  )}
                >
                  {/* Expand Button */}
                  {expandedRowRender && (
                    <Button
                      className="bg-gray-600 hover:bg-gray-700"
                      onClick={e => {
                        e.stopPropagation();
                        toggleExpandRow(row.id);
                      }}
                    >
                      {expandedRow === row.id
                        ? expandButtonLabel.expanded
                        : expandButtonLabel.collapsed}
                    </Button>
                  )}

                  {/* Row Actions */}
                  {actions?.length > 0 &&
                    actions
                      .filter(
                        action => !action.condition || action.condition(row),
                      )
                      .map((action, actionIndex) => (
                        <span
                          key={actionIndex}
                          onClick={e => {
                            e.stopPropagation();
                            action.onClick(row.id);
                          }}
                          className={cn(
                            'px-3 py-1 rounded w-12 flex items-center justify-center',
                          )}
                        >
                          {action.label === 'Delete' ? (
                            <FaTrash />
                          ) : action.label === 'Restore' ? (
                            <FaUndo />
                          ) : (
                            action.label
                          )}
                        </span>
                      ))}
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === row.id && expandedRowRender && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="bg-gray-50 p-0 transition-all duration-300 rounded-b-lg"
                  >
                    <div
                      className={cn(
                        'p-4 transition-opacity duration-300',
                        expandedRow === row.id ? 'opacity-100' : 'opacity-0',
                      )}
                    >
                      {expandedRowRender(row)}
                    </div>
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
