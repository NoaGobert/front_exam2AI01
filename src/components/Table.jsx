import { cn } from '@/utils/cn';
import React, { useState } from 'react';
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

  const toggleExpandRow = rowId => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
        <thead>
          <tr className="bg-gray-100 rounded-t-lg">
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
          {data.map((row, rowIndex) => (
            <React.Fragment key={row.id || rowIndex}>
              {/* Main Row */}
              <tr
                className={cn(
                  'border-t border-gray-200  hover:bg-gray-100 cursor-pointer',
                  rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                )}
                onClick={() => onRowClick(row)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 text-sm text-gray-700"
                  >
                    {col.accessor.split('.').reduce((o, i) => o[i], row)}
                  </td>
                ))}
                <td className="px-4 py-3 text-sm text-gray-700 flex justify-end space-x-3">
                  {/* Expand Button */}
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

                  {/* Row Actions */}
                  {actions?.length > 0 &&
                    actions
                      .filter(
                        action => !action.condition || action.condition(row),
                      )
                      .map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          onClick={e => {
                            e.stopPropagation();
                            action.onClick(row.id);
                          }}
                          className={cn(
                            'px-3 py-1 text-white rounded w-24', // Ensure equal width with w-24 or adjust width as needed
                            action.className,
                          )}
                        >
                          {action.label}
                        </Button>
                      ))}
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === row.id && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="bg-gray-50 p-0 transition-all duration-300"
                  >
                    <div
                      className={cn(
                        'p-4 transition-opacity duration-300 ',
                        expandedRow === row.id ? 'opacity-100' : 'opacity-0',
                      )}
                    >
                      {expandedRowRender ? expandedRowRender(row) : null}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
