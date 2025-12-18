import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X, DollarSign, User, Calendar, Eye, Package, Truck, CheckCircle } from 'lucide-react';
import { Order } from '../App';

interface OrdersKanbanViewProps {
  show: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
  onViewDetails: (order: Order) => void;
}

interface KanbanColumn {
  id: Order['status'];
  title: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: any;
}

const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: 'pending', title: 'Pending', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-300', icon: Clock },
  { id: 'processing', title: 'Processing', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-300', icon: Package },
  { id: 'shipped', title: 'Shipped', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-300', icon: Truck },
  { id: 'delivered', title: 'Delivered', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-300', icon: CheckCircle },
  { id: 'cancelled', title: 'Cancelled', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-300', icon: X },
];

// Import Clock icon
import { Clock } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ORDER',
    item: { id: order.id, currentStatus: order.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const StatusIcon = KANBAN_COLUMNS.find(col => col.id === order.status)?.icon || Package;

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onViewDetails(order)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-gray-900 text-sm font-mono mb-1">{order.id}</p>
          <p className="text-gray-600 text-xs">{order.customer}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon className="w-4 h-4 text-gray-400" />
          <Eye className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <User className="w-3 h-3 text-gray-400" />
        <p className="text-gray-500 text-xs">{order.createdBy}</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-3 h-3 text-green-600" />
        <p className="text-green-700 text-sm font-mono">${order.total.toLocaleString()}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{order.createdDate}</span>
        </div>
        <span>{order.createdTime}</span>
      </div>

      {order.items && order.items.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-gray-500 text-xs">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}

interface ColumnProps {
  column: KanbanColumn;
  orders: Order[];
  onDrop: (orderId: string, newStatus: Order['status']) => void;
  onViewDetails: (order: Order) => void;
}

function KanbanColumnComponent({ column, orders, onDrop, onViewDetails }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ORDER',
    drop: (item: { id: string; currentStatus: Order['status'] }) => {
      if (item.currentStatus !== column.id) {
        onDrop(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const columnOrders = orders.filter(ord => ord.status === column.id);
  const totalValue = columnOrders.reduce((sum, ord) => sum + ord.total, 0);
  const ColumnIcon = column.icon;

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[280px] ${column.bgColor} rounded-lg p-4 border-2 ${column.borderColor} ${
        isOver ? 'ring-4 ring-blue-300 ring-opacity-50' : ''
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ColumnIcon className={`w-4 h-4 ${column.textColor}`} />
            <h3 className={`${column.textColor} text-sm`}>{column.title}</h3>
          </div>
          <span className={`px-2 py-1 ${column.bgColor} ${column.textColor} text-xs rounded-full border ${column.borderColor}`}>
            {columnOrders.length}
          </span>
        </div>
        <p className={`${column.textColor} text-xs font-mono`}>
          Total: ${totalValue.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
        {columnOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs">
            Drop orders here
          </div>
        ) : (
          columnOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function OrdersKanbanView({
  show,
  onClose,
  orders,
  onUpdateStatus,
  onViewDetails,
}: OrdersKanbanViewProps) {
  if (!show) return null;

  const handleDrop = (orderId: string, newStatus: Order['status']) => {
    onUpdateStatus(orderId, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[95vw] h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl">Orders Pipeline - Kanban View</h2>
            <p className="text-green-100 text-sm mt-1">Drag and drop orders to update their fulfillment status</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Statistics Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4">
            {KANBAN_COLUMNS.map(column => {
              const columnOrders = orders.filter(ord => ord.status === column.id);
              const totalValue = columnOrders.reduce((sum, ord) => sum + ord.total, 0);
              const ColumnIcon = column.icon;
              return (
                <div key={column.id} className={`${column.bgColor} rounded-lg p-3 border ${column.borderColor}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <ColumnIcon className={`w-4 h-4 ${column.textColor}`} />
                    <p className={`${column.textColor} text-xs`}>{column.title}</p>
                  </div>
                  <p className={`${column.textColor} text-xl font-mono`}>{columnOrders.length}</p>
                  <p className={`${column.textColor} text-xs font-mono mt-1`}>
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <DndProvider backend={HTML5Backend}>
            <div className="flex gap-4 h-full">
              {KANBAN_COLUMNS.map(column => (
                <KanbanColumnComponent
                  key={column.id}
                  column={column}
                  orders={orders}
                  onDrop={handleDrop}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </DndProvider>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            Total Orders: {orders.length} | Total Value: ${orders.reduce((sum, ord) => sum + ord.total, 0).toLocaleString()}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
