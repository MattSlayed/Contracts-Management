import React from 'react';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped';
  hoverable?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className = '',
      variant = 'default',
      hoverable = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={`w-full text-sm text-left ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={`bg-neutral-bg border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={`divide-y divide-gray-200 ${className}`} {...props}>
      {children}
    </tbody>
  );
});

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { hoverable?: boolean }
>(({ className = '', hoverable = true, children, ...props }, ref) => {
  const hoverStyles = hoverable ? 'hover:bg-primary/5 transition-colors' : '';
  return (
    <tr ref={ref} className={`${hoverStyles} ${className}`} {...props}>
      {children}
    </tr>
  );
});

TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={`px-6 py-3 text-left text-xs font-semibold text-text-primary uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </th>
  );
});

TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={`px-6 py-4 whitespace-nowrap text-text-primary ${className}`}
      {...props}
    >
      {children}
    </td>
  );
});

TableCell.displayName = 'TableCell';
