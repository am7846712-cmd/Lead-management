import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X, DollarSign, User, Calendar, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Estimate } from '../App';

interface EstimatesKanbanViewProps {
  show: boolean;
  onClose: () => void;
  estimates: Estimate[];
  onUpdateStatus: (id: string, status: Estimate['status']) => void;
  onViewDetails: (estimate: Estimate) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

interface KanbanColumn {
  id: Estimate['status'];
  title: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: 'draft', title: 'Draft', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-300' },
  { id: 'pending', title: 'Pending Approval', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-300' },
  { id: 'approved', title: 'Approved', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-300' },
  { id: 'rejected', title: 'Rejected', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-300' },
  { id: 'converted', title: 'Converted to Order', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-300' },
];

interface EstimateCardProps {
  estimate: Estimate;
  onViewDetails: (estimate: Estimate) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function EstimateCard({ estimate, onViewDetails, onApprove, onReject }: EstimateCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ESTIMATE',
    item: { id: estimate.id, currentStatus: estimate.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onViewDetails(estimate)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-gray-900 text-sm font-mono mb-1">{estimate.id}</p>
          <p className="text-gray-600 text-xs">{estimate.customer}</p>
        </div>
        <Eye className="w-4 h-4 text-gray-400" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <User className="w-3 h-3 text-gray-400" />
        <p className="text-gray-500 text-xs">{estimate.createdBy}</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-3 h-3 text-green-600" />
        <p className="text-green-700 text-sm font-mono">${estimate.total.toLocaleString()}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{estimate.createdDate}</span>
        </div>
        <span>{estimate.createdTime}</span>
      </div>

      {estimate.status === 'pending' && (
        <div className="flex gap-2 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onApprove(estimate.id)}
            className="flex-1 px-2 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition flex items-center justify-center gap-1"
          >
            <CheckCircle className="w-3 h-3" />
            Approve
          </button>
          <button
            onClick={() => onReject(estimate.id)}
            className="flex-1 px-2 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
          >
            <XCircle className="w-3 h-3" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

interface ColumnProps {
  column: KanbanColumn;
  estimates: Estimate[];
  onDrop: (estimateId: string, newStatus: Estimate['status']) => void;
  onViewDetails: (estimate: Estimate) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function KanbanColumnComponent({ column, estimates, onDrop, onViewDetails, onApprove, onReject }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ESTIMATE',
    drop: (item: { id: string; currentStatus: Estimate['status'] }) => {
      if (item.currentStatus !== column.id) {
        onDrop(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const columnEstimates = estimates.filter(est => est.status === column.id);
  const totalValue = columnEstimates.reduce((sum, est) => sum + est.total, 0);

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[280px] ${column.bgColor} rounded-lg p-4 border-2 ${column.borderColor} ${
        isOver ? 'ring-4 ring-blue-300 ring-opacity-50' : ''
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`${column.textColor} text-sm`}>{column.title}</h3>
          <span className={`px-2 py-1 ${column.bgColor} ${column.textColor} text-xs rounded-full border ${column.borderColor}`}>
            {columnEstimates.length}
          </span>
        </div>
        <p className={`${column.textColor} text-xs font-mono`}>
          Total: ${totalValue.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
        {columnEstimates.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs">
            Drop estimates here
          </div>
        ) : (
          columnEstimates.map(estimate => (
            <EstimateCard
              key={estimate.id}
              estimate={estimate}
              onViewDetails={onViewDetails}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function EstimatesKanbanView({
  show,
  onClose,
  estimates,
  onUpdateStatus,
  onViewDetails,
  onApprove,
  onReject,
}: EstimatesKanbanViewProps) {
  if (!show) return null;

  const handleDrop = (estimateId: string, newStatus: Estimate['status']) => {
    onUpdateStatus(estimateId, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[95vw] h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl">Estimates Pipeline - Kanban View</h2>
            <p className="text-blue-100 text-sm mt-1">Drag and drop estimates to update their status</p>
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
              const columnEstimates = estimates.filter(est => est.status === column.id);
              const totalValue = columnEstimates.reduce((sum, est) => sum + est.total, 0);
              return (
                <div key={column.id} className={`${column.bgColor} rounded-lg p-3 border ${column.borderColor}`}>
                  <p className={`${column.textColor} text-xs mb-1`}>{column.title}</p>
                  <p className={`${column.textColor} text-xl font-mono`}>{columnEstimates.length}</p>
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
                  estimates={estimates}
                  onDrop={handleDrop}
                  onViewDetails={onViewDetails}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              ))}
            </div>
          </DndProvider>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            Total Estimates: {estimates.length} | Total Value: ${estimates.reduce((sum, est) => sum + est.total, 0).toLocaleString()}
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
