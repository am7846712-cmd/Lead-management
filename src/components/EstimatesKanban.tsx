import { Link } from 'react-router-dom';
import { DollarSign, Calendar, User, MoreVertical, GripVertical } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

const columns = [
  { id: 'draft', title: 'Draft', color: 'bg-gray-100' },
  { id: 'sent', title: 'Sent to Customer', color: 'bg-blue-100' },
  { id: 'accepted', title: 'Accepted', color: 'bg-green-100' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-100' },
];

const initialEstimates = [
  {
    id: 'EST-2456',
    customer: 'ABC Manufacturing Corp',
    amount: '$12,450',
    status: 'sent',
    date: '2025-12-08',
    salesPerson: 'John Doe',
    items: 8,
  },
  {
    id: 'EST-2455',
    customer: 'XYZ Industries Inc',
    amount: '$8,750',
    status: 'draft',
    date: '2025-12-10',
    salesPerson: 'John Doe',
    items: 5,
  },
  {
    id: 'EST-2454',
    customer: 'Global Tech Solutions',
    amount: '$15,230',
    status: 'accepted',
    date: '2025-12-05',
    salesPerson: 'John Doe',
    items: 12,
  },
  {
    id: 'EST-2453',
    customer: 'Premier Manufacturing',
    amount: '$9,870',
    status: 'sent',
    date: '2025-12-07',
    salesPerson: 'Jane Smith',
    items: 6,
  },
  {
    id: 'EST-2452',
    customer: 'Innovative Systems LLC',
    amount: '$22,340',
    status: 'accepted',
    date: '2025-12-03',
    salesPerson: 'John Doe',
    items: 15,
  },
  {
    id: 'EST-2451',
    customer: 'Midwest Industrial Supply',
    amount: '$6,580',
    status: 'rejected',
    date: '2025-12-01',
    salesPerson: 'Jane Smith',
    items: 4,
  },
  {
    id: 'EST-2450',
    customer: 'Tech Innovators Co',
    amount: '$11,200',
    status: 'draft',
    date: '2025-12-11',
    salesPerson: 'John Doe',
    items: 7,
  },
  {
    id: 'EST-2449',
    customer: 'Industrial Solutions Ltd',
    amount: '$19,450',
    status: 'sent',
    date: '2025-12-06',
    salesPerson: 'Jane Smith',
    items: 10,
  },
];

interface EstimateCardProps {
  estimate: typeof initialEstimates[0];
  onStatusChange: (id: string, newStatus: string) => void;
}

function EstimateCard({ estimate, onStatusChange }: EstimateCardProps) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'ESTIMATE',
    item: { id: estimate.id, currentStatus: estimate.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragPreview}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all ${
        isDragging ? 'opacity-40 rotate-2 scale-95' : 'opacity-100'
      }`}
    >
      <div
        ref={drag}
        className="p-4 cursor-move hover:bg-gray-50 transition group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2 flex-1">
            <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Link to={`/estimates/${estimate.id}`} className="text-gray-900 hover:text-blue-600 transition block">
                {estimate.id}
              </Link>
              <p className="text-gray-600 text-sm mt-1 truncate">{estimate.customer}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Amount</span>
            <span className="text-gray-900">{estimate.amount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Items</span>
            <span className="text-gray-700">{estimate.items}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{estimate.date}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>{estimate.salesPerson.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColumnProps {
  column: typeof columns[0];
  estimates: typeof initialEstimates;
  onStatusChange: (id: string, newStatus: string) => void;
}

function Column({ column, estimates, onStatusChange }: ColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ESTIMATE',
    drop: (item: { id: string; currentStatus: string }) => {
      if (item.currentStatus !== column.id) {
        onStatusChange(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const columnEstimates = estimates.filter((est) => est.status === column.id);
  
  const columnTotal = columnEstimates.reduce((sum, est) => {
    return sum + parseFloat(est.amount.replace('$', '').replace(',', ''));
  }, 0);

  return (
    <div
      ref={drop}
      className={`bg-gray-50 rounded-xl p-4 min-h-[600px] transition-all ${
        isOver && canDrop ? 'bg-blue-50 ring-2 ring-blue-400' : ''
      } ${canDrop && !isOver ? 'bg-gray-100' : ''}`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${column.color.replace('bg-', 'bg-').replace('-100', '-500')}`}></div>
            <h3 className="text-gray-900">{column.title}</h3>
          </div>
          <span className="px-2 py-1 bg-white rounded-lg text-gray-700 text-sm">{columnEstimates.length}</span>
        </div>
        <div className="text-gray-900 text-xl">
          ${columnTotal.toLocaleString()}
        </div>
      </div>

      <div className="space-y-3">
        {columnEstimates.map((estimate) => (
          <EstimateCard
            key={estimate.id}
            estimate={estimate}
            onStatusChange={onStatusChange}
          />
        ))}

        {columnEstimates.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">
              {isOver && canDrop ? 'Drop here' : 'No estimates'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EstimatesKanban() {
  const [estimates, setEstimates] = useState(initialEstimates);

  const handleStatusChange = (id: string, newStatus: string) => {
    setEstimates((prev) =>
      prev.map((est) =>
        est.id === id ? { ...est, status: newStatus } : est
      )
    );
    
    // Show success message
    const estimate = estimates.find(e => e.id === id);
    if (estimate) {
      const statusLabel = columns.find(c => c.id === newStatus)?.title;
      console.log(`Moved ${id} to ${statusLabel}`);
    }
  };

  const getTotalByStatus = (status: string) => {
    return estimates
      .filter((est) => est.status === status)
      .reduce((sum, est) => {
        return sum + parseFloat(est.amount.replace('$', '').replace(',', ''));
      }, 0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              estimates={estimates}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}