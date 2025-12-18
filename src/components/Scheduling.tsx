import { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, Pause, Calendar, User, Package, Wrench, ChevronRight, X } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const machines = [
  { id: 'M1', name: 'Machine 1', status: 'active' },
  { id: 'M2', name: 'Machine 2', status: 'active' },
  { id: 'M3', name: 'Machine 3', status: 'maintenance' },
  { id: 'M4', name: 'Machine 4', status: 'active' },
];

const timeSlots = [
  { id: 'morning', label: 'Morning', hours: '6:00 - 14:00' },
  { id: 'afternoon', label: 'Afternoon', hours: '14:00 - 22:00' },
  { id: 'night', label: 'Night', hours: '22:00 - 6:00' },
];

const initialUnscheduledJobs = [
  {
    id: 'J001',
    title: 'Hydraulic Pump Assembly',
    orderId: 'ORD-3456',
    customer: 'ABC Manufacturing',
    quantity: 150,
    deadline: '2025-12-15',
    priority: 'High',
    estimatedTime: '4h',
    machineType: 'Any',
    notes: 'Customer requested early delivery',
  },
  {
    id: 'J002',
    title: 'Valve Component Production',
    orderId: 'ORD-3457',
    customer: 'XYZ Industries',
    quantity: 200,
    deadline: '2025-12-16',
    priority: 'Normal',
    estimatedTime: '6h',
    machineType: 'Machine 1-2',
    notes: '',
  },
  {
    id: 'J003',
    title: 'Bearing Housing Parts',
    orderId: 'ORD-3458',
    customer: 'Global Tech',
    quantity: 100,
    deadline: '2025-12-13',
    priority: 'Urgent',
    estimatedTime: '3h',
    machineType: 'Any',
    notes: 'Rush order - expedite processing',
  },
  {
    id: 'J004',
    title: 'Gasket Production Run',
    orderId: 'ORD-3459',
    customer: 'Premier Mfg',
    quantity: 500,
    deadline: '2025-12-18',
    priority: 'Normal',
    estimatedTime: '8h',
    machineType: 'Machine 3-4',
    notes: '',
  },
];

const initialScheduledJobs = [
  {
    id: 'J005',
    title: 'Shaft Machining',
    orderId: 'ORD-3450',
    customer: 'Tech Solutions',
    machineId: 'M1',
    shift: 'morning',
    status: 'in-progress',
    priority: 'Normal',
    estimatedTime: '5h',
    deadline: '2025-12-12',
    quantity: 80,
    machineType: 'Machine 1',
    notes: '',
  },
  {
    id: 'J006',
    title: 'Flange Assembly',
    orderId: 'ORD-3451',
    customer: 'Industrial Co',
    machineId: 'M2',
    shift: 'morning',
    status: 'scheduled',
    priority: 'High',
    estimatedTime: '4h',
    deadline: '2025-12-14',
    quantity: 120,
    machineType: 'Machine 2',
    notes: 'Quality check required',
  },
  {
    id: 'J007',
    title: 'Bracket Cutting',
    orderId: 'ORD-3452',
    customer: 'Auto Parts Inc',
    machineId: 'M4',
    shift: 'afternoon',
    status: 'delayed',
    priority: 'Urgent',
    estimatedTime: '3h',
    deadline: '2025-12-11',
    quantity: 200,
    machineType: 'Machine 4',
    notes: 'Material delayed - reschedule needed',
  },
  {
    id: 'J008',
    title: 'Connector Production',
    orderId: 'ORD-3453',
    customer: 'Electronics Ltd',
    machineId: 'M1',
    shift: 'afternoon',
    status: 'completed',
    priority: 'Normal',
    estimatedTime: '2h',
    deadline: '2025-12-10',
    quantity: 300,
    machineType: 'Machine 1',
    notes: '',
  },
];

const statusConfig = {
  scheduled: { color: 'bg-blue-100 border-blue-400 text-blue-700', icon: Clock },
  'in-progress': { color: 'bg-yellow-100 border-yellow-400 text-yellow-700', icon: Pause },
  delayed: { color: 'bg-red-100 border-red-400 text-red-700', icon: AlertCircle },
  completed: { color: 'bg-green-100 border-green-400 text-green-700', icon: CheckCircle },
};

const priorityColors = {
  Normal: 'bg-gray-100 text-gray-700',
  High: 'bg-orange-100 text-orange-700',
  Urgent: 'bg-red-100 text-red-700',
};

interface UnscheduledJobCardProps {
  job: typeof initialUnscheduledJobs[0];
  onJobClick: (job: any) => void;
}

function UnscheduledJobCard({ job, onJobClick }: UnscheduledJobCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'JOB',
    item: { ...job, isUnscheduled: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={() => onJobClick(job)}
      className={`bg-white rounded-lg border-2 border-gray-200 p-3 cursor-move hover:border-blue-400 hover:shadow-md transition ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 text-sm truncate">{job.title}</p>
          <p className="text-gray-500 text-xs mt-1">{job.orderId}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${priorityColors[job.priority as keyof typeof priorityColors]}`}>
          {job.priority}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{job.estimatedTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Package className="w-3 h-3" />
          <span>{job.quantity}</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-1 text-xs text-gray-500">
        <Calendar className="w-3 h-3" />
        <span>Due: {job.deadline}</span>
      </div>
    </div>
  );
}

interface ScheduledJobCardProps {
  job: typeof initialScheduledJobs[0];
  onJobClick: (job: any) => void;
}

function ScheduledJobCard({ job, onJobClick }: ScheduledJobCardProps) {
  const statusInfo = statusConfig[job.status as keyof typeof statusConfig];
  const StatusIcon = statusInfo.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'JOB',
    item: { ...job, isUnscheduled: false },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={() => onJobClick(job)}
      className={`${statusInfo.color} rounded-lg border-2 p-3 cursor-move hover:shadow-lg transition ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm truncate">{job.title}</p>
          <p className="text-xs opacity-75 mt-1">{job.orderId}</p>
        </div>
        <StatusIcon className="w-4 h-4 flex-shrink-0 ml-2" />
      </div>
      <div className="flex items-center gap-2 text-xs opacity-90">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{job.estimatedTime}</span>
        </div>
        <span className={`px-2 py-0.5 rounded ${priorityColors[job.priority as keyof typeof priorityColors]}`}>
          {job.priority}
        </span>
      </div>
    </div>
  );
}

interface TimeSlotCellProps {
  machineId: string;
  shift: string;
  jobs: typeof initialScheduledJobs;
  onDrop: (job: any, machineId: string, shift: string) => void;
  onJobClick: (job: any) => void;
}

function TimeSlotCell({ machineId, shift, jobs, onDrop, onJobClick }: TimeSlotCellProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'JOB',
    drop: (item: any) => {
      onDrop(item, machineId, shift);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const slotJobs = jobs.filter((j) => j.machineId === machineId && j.shift === shift);

  return (
    <div
      ref={drop}
      className={`min-h-[120px] p-2 border-r border-b border-gray-200 transition ${
        isOver && canDrop ? 'bg-blue-50 ring-2 ring-inset ring-blue-400' : 'bg-gray-50'
      }`}
    >
      <div className="space-y-2">
        {slotJobs.map((job) => (
          <ScheduledJobCard key={job.id} job={job} onJobClick={onJobClick} />
        ))}
        {slotJobs.length === 0 && (
          <div className="h-full min-h-[100px] flex items-center justify-center">
            <p className="text-gray-400 text-xs">
              {isOver && canDrop ? 'Drop here' : 'Empty'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Scheduling() {
  const [unscheduledJobs, setUnscheduledJobs] = useState(initialUnscheduledJobs);
  const [scheduledJobs, setScheduledJobs] = useState(initialScheduledJobs);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleDrop = (job: any, machineId: string, shift: string) => {
    if (job.isUnscheduled) {
      // Move from unscheduled to scheduled
      setUnscheduledJobs((prev) => prev.filter((j) => j.id !== job.id));
      setScheduledJobs((prev) => [
        ...prev,
        {
          ...job,
          machineId,
          shift,
          status: 'scheduled',
        },
      ]);
    } else {
      // Move between slots
      setScheduledJobs((prev) =>
        prev.map((j) =>
          j.id === job.id ? { ...j, machineId, shift } : j
        )
      );
    }
  };

  const handleRemoveJob = (jobId: string) => {
    const job = scheduledJobs.find((j) => j.id === jobId);
    if (job) {
      setScheduledJobs((prev) => prev.filter((j) => j.id !== jobId));
      setUnscheduledJobs((prev) => [...prev, job]);
    }
    setSelectedJob(null);
  };

  const totalScheduled = scheduledJobs.length;
  const freeMachines = machines.filter((m) => m.status === 'active').length - 
    new Set(scheduledJobs.filter(j => j.shift === 'morning').map(j => j.machineId)).size;
  const maintenanceMachines = machines.filter((m) => m.status === 'maintenance').length;
  const delayedJobs = scheduledJobs.filter((j) => j.status === 'delayed').length;
  const highPriorityJobs = [...scheduledJobs, ...unscheduledJobs].filter(
    (j) => j.priority === 'High' || j.priority === 'Urgent'
  ).length;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div>
            <h1 className="text-gray-900">Production Scheduling</h1>
            <p className="text-gray-600 mt-1">Plan jobs, assign machines, and manage daily operations</p>
          </div>
        </div>

        {/* Workload Summary */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-xs mb-1">Scheduled Jobs</p>
                  <p className="text-blue-900 text-2xl">{totalScheduled}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-xs mb-1">Free Machines</p>
                  <p className="text-green-900 text-2xl">{freeMachines}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-3 border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs mb-1">Under Maintenance</p>
                  <p className="text-gray-900 text-2xl">{maintenanceMachines}</p>
                </div>
                <Wrench className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-xs mb-1">Delayed Jobs</p>
                  <p className="text-red-900 text-2xl">{delayedJobs}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-xs mb-1">High Priority</p>
                  <p className="text-orange-900 text-2xl">{highPriorityJobs}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Timeline View */}
          <div className="flex-1 overflow-auto">
            <div className="min-w-max">
              {/* Timeline Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
                <div className="flex">
                  <div className="w-40 px-4 py-3 border-r border-gray-200">
                    <p className="text-gray-700">Machines</p>
                  </div>
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="flex-1 min-w-[280px] px-4 py-3 border-r border-gray-200">
                      <p className="text-gray-900">{slot.label}</p>
                      <p className="text-gray-500 text-xs mt-1">{slot.hours}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machine Lanes */}
              {machines.map((machine) => (
                <div key={machine.id} className="flex border-b border-gray-200">
                  <div className="w-40 px-4 py-3 border-r border-gray-200 bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">{machine.name}</p>
                      <p className="text-xs mt-1">
                        {machine.status === 'maintenance' ? (
                          <span className="text-orange-600 flex items-center gap-1">
                            <Wrench className="w-3 h-3" />
                            Maintenance
                          </span>
                        ) : (
                          <span className="text-green-600">Active</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="flex-1 min-w-[280px]">
                      <TimeSlotCell
                        machineId={machine.id}
                        shift={slot.id}
                        jobs={scheduledJobs}
                        onDrop={handleDrop}
                        onJobClick={setSelectedJob}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Job Detail Panel */}
          {selectedJob && (
            <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                <h3 className="text-gray-900">Job Details</h3>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-gray-900 text-lg">{selectedJob.title}</h4>
                  <p className="text-blue-600 text-sm mt-1">{selectedJob.orderId}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Priority</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm ${priorityColors[selectedJob.priority as keyof typeof priorityColors]}`}>
                      {selectedJob.priority}
                    </span>
                  </div>
                  {selectedJob.status && (
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Status</p>
                      <span className="text-gray-900 text-sm capitalize">{selectedJob.status.replace('-', ' ')}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Customer</p>
                      <p className="text-gray-900 text-sm">{selectedJob.customer}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Quantity</p>
                      <p className="text-gray-900 text-sm">{selectedJob.quantity} units</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Estimated Time</p>
                      <p className="text-gray-900 text-sm">{selectedJob.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Deadline</p>
                      <p className="text-gray-900 text-sm">{selectedJob.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Required Machine</p>
                      <p className="text-gray-900 text-sm">{selectedJob.machineType}</p>
                    </div>
                  </div>
                </div>

                {selectedJob.notes && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-500 text-xs mb-2">Notes</p>
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{selectedJob.notes}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {selectedJob.machineId && (
                    <>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Edit Schedule
                      </button>
                      <button
                        onClick={() => handleRemoveJob(selectedJob.id)}
                        className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                      >
                        Remove from Schedule
                      </button>
                    </>
                  )}
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    View Order Details
                    <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}