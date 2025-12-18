import { Link } from 'react-router-dom';
import { Calendar, User, MoreVertical, Package, GripVertical } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

const columns = [
  { id: 'draft', title: 'Draft', color: 'bg-gray-100' },
  { id: 'submitted', title: 'Submitted', color: 'bg-blue-100' },
  { id: 'processing', title: 'Processing', color: 'bg-yellow-100' },
  { id: 'in-transit', title: 'In Transit', color: 'bg-purple-100' },
  { id: 'delivered', title: 'Delivered', color: 'bg-green-100' },
];

const initialOrders = [
  {
    id: 'ORD-3456',
    customer: 'ABC Manufacturing Corp',
    amount: '$12,450',
    status: 'in-transit',
    date: '2025-12-08',
    salesPerson: 'John Doe',
    items: 8,
    expectedDelivery: '2025-12-15',
  },
  {
    id: 'ORD-3455',
    customer: 'XYZ Industries Inc',
    amount: '$8,750',
    status: 'draft',
    date: '2025-12-10',
    salesPerson: 'John Doe',
    items: 5,
    expectedDelivery: '2025-12-17',
  },
  {
    id: 'ORD-3454',
    customer: 'Global Tech Solutions',
    amount: '$15,230',
    status: 'delivered',
    date: '2025-12-05',
    salesPerson: 'John Doe',
    items: 12,
    expectedDelivery: '2025-12-12',
  },
  {
    id: 'ORD-3453',
    customer: 'Premier Manufacturing',
    amount: '$9,870',
    status: 'processing',
    date: '2025-12-07',
    salesPerson: 'Jane Smith',
    items: 6,
    expectedDelivery: '2025-12-14',
  },
  {
    id: 'ORD-3452',
    customer: 'Innovative Systems LLC',
    amount: '$22,340',
    status: 'delivered',
    date: '2025-12-03',
    salesPerson: 'John Doe',
    items: 15,
    expectedDelivery: '2025-12-10',
  },
  {
    id: 'ORD-3451',
    customer: 'Midwest Industrial',
    amount: '$18,900',
    status: 'submitted',
    date: '2025-12-09',
    salesPerson: 'Jane Smith',
    items: 10,
    expectedDelivery: '2025-12-16',
  },
  {
    id: 'ORD-3450',
    customer: 'Tech Innovators Co',
    amount: '$11,200',
    status: 'draft',
    date: '2025-12-11',
    salesPerson: 'John Doe',
    items: 7,
    expectedDelivery: '2025-12-18',
  },
  {
    id: 'ORD-3449',
    customer: 'Industrial Solutions',
    amount: '$16,750',
    status: 'in-transit',
    date: '2025-12-06',
    salesPerson: 'Jane Smith',
    items: 9,
    expectedDelivery: '2025-12-13',
  },
  {
    id: 'ORD-3448',
    customer: 'Premium Parts LLC',
    amount: '$14,320',
    status: 'submitted',
    date: '2025-12-08',
    salesPerson: 'Mike Johnson',
    items: 8,
    expectedDelivery: '2025-12-15',
  },
  {
    id: 'ORD-3447',
    customer: 'Advanced Manufacturing',
    amount: '$21,500',
    status: 'processing',
    date: '2025-12-07',
    salesPerson: 'Sarah Williams',
    items: 13,
    expectedDelivery: '2025-12-14',
  },
];

interface OrderCardProps {
  order: typeof initialOrders[0];
  onStatusChange: (id: string, newStatus: string) => void;
}

function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'ORDER',
    item: { id: order.id, currentStatus: order.status },
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
              <Link to={`/orders/${order.id}`} className="text-gray-900 hover:text-blue-600 transition text-sm block">
                {order.id}
              </Link>
              <p className="text-gray-600 text-xs mt-1 truncate">{order.customer}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Amount</span>
            <span className="text-gray-900">{order.amount}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Package className="w-3 h-3" />
            <span>{order.items} items</span>
          </div>
          {order.status !== 'draft' && order.status !== 'delivered' && (
            <div className="flex items-center gap-1 text-xs text-purple-600">
              <Calendar className="w-3 h-3" />
              <span>ETA: {order.expectedDelivery}</span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{order.date}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>{order.salesPerson.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColumnProps {
  column: typeof columns[0];
  orders: typeof initialOrders;
  onStatusChange: (id: string, newStatus: string) => void;
}

function Column({ column, orders, onStatusChange }: ColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ORDER',
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

  const columnOrders = orders.filter((order) => order.status === column.id);
  
  const columnTotal = columnOrders.reduce((sum, order) => {
    return sum + parseFloat(order.amount.replace('$', '').replace(',', ''));
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
            <h3 className="text-gray-900 text-sm">{column.title}</h3>
          </div>
          <span className="px-2 py-1 bg-white rounded-lg text-gray-700 text-xs">{columnOrders.length}</span>
        </div>
        <div className="text-gray-900 text-lg">
          ${columnTotal.toLocaleString()}
        </div>
      </div>

      <div className="space-y-3">
        {columnOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusChange={onStatusChange}
          />
        ))}

        {columnOrders.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-xs">
              {isOver && canDrop ? 'Drop here' : 'No orders'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrdersKanban() {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    
    // Show success message
    const order = orders.find(o => o.id === id);
    if (order) {
      const statusLabel = columns.find(c => c.id === newStatus)?.title;
      console.log(`Moved ${id} to ${statusLabel}`);
    }
  };

  const getTotalByStatus = (status: string) => {
    return orders
      .filter((order) => order.status === status)
      .reduce((sum, order) => {
        return sum + parseFloat(order.amount.replace('$', '').replace(',', ''));
      }, 0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              orders={orders}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}