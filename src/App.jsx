import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Building2,
  Menu,
  Navigation,
  Search,
  ShieldCheck,
  UserCircle2,
  Zap,
} from 'lucide-react';

const campusNodes = {
  MAIN_GATE: {
    id: 'MAIN_GATE',
    name: 'Main Entrance Gate',
    category: 'Amenities',
    description: 'Secure main checkpoint, Suraram road access',
    x: 12,
    y: 41,
  },
  CSE_GEN: {
    id: 'CSE_GEN',
    name: 'CSE General Block',
    category: 'Academic',
    description: 'Main Computer Science Engineering labs & classrooms',
    x: 28,
    y: 36,
  },
  CSE_DS: {
    id: 'CSE_DS',
    name: 'CSE (Data Science) Block',
    category: 'Academic',
    description: 'Advanced Data Analytics & server setup labs',
    x: 38,
    y: 52,
  },
  AIML_BLK: {
    id: 'AIML_BLK',
    name: 'AIML Engineering Block',
    category: 'Academic',
    description: 'Artificial Intelligence & Machine Learning Innovation Wing',
    x: 52,
    y: 64,
  },
  CYBER_SEC: {
    id: 'CYBER_SEC',
    name: 'Cyber Security Block',
    category: 'Academic',
    description: 'Secure Systems, Cryptography Lab & Networks wing',
    x: 61,
    y: 48,
  },
  BBA_BLK: {
    id: 'BBA_BLK',
    name: 'Management & BBA Block',
    category: 'Academic',
    description: 'School of Management classrooms & seminar halls',
    x: 73,
    y: 41,
  },
  UNI_LIB: {
    id: 'UNI_LIB',
    name: 'Central University Library',
    category: 'Academic',
    description: 'Multi-floor centralized library and digital resource hub',
    x: 52,
    y: 22,
  },
  HOSTELS: {
    id: 'HOSTELS',
    name: 'Campus Hostels Complex',
    category: 'Hostels',
    description: 'Student residential wings with dining facilities',
    x: 15,
    y: 74,
  },
  CANTEEN: {
    id: 'CANTEEN',
    name: 'Central University Canteen',
    category: 'Food',
    description: 'Main food court serving meals and refreshments',
    x: 32,
    y: 78,
  },
  BAKERY: {
    id: 'BAKERY',
    name: 'Campus Bakery Corner',
    category: 'Food',
    description: 'Quick snacks, confectionery, juices, and coffee spot',
    x: 24,
    y: 67,
  },
  FIRST_AID: {
    id: 'FIRST_AID',
    name: 'First Aid & Wellness Center',
    category: 'Amenities',
    description: 'Emergency medical assistance desk near academic hubs',
    x: 42,
    y: 33,
  },
  VB_COURT: {
    id: 'VB_COURT',
    name: 'Volleyball Court',
    category: 'Sports',
    description: 'Outdoor sand court with floodlighting',
    x: 66,
    y: 73,
  },
  BOX_CRIC: {
    id: 'BOX_CRIC',
    name: 'Box Cricket Arena',
    category: 'Sports',
    description: 'High-fenced synthetic turf arena for box cricket',
    x: 81,
    y: 58,
  },
  FB_COURT: {
    id: 'FB_COURT',
    name: 'Football Ground Turf',
    category: 'Sports',
    description: 'Sprawling field turf for campus soccer events',
    x: 88,
    y: 28,
  },
};

const campusGraph = {
  MAIN_GATE: [
    ['CSE_GEN', 28],
    ['FIRST_AID', 18],
    ['HOSTELS', 42],
  ],
  CSE_GEN: [
    ['MAIN_GATE', 28],
    ['CSE_DS', 24],
    ['FIRST_AID', 18],
    ['UNI_LIB', 34],
  ],
  CSE_DS: [
    ['CSE_GEN', 24],
    ['AIML_BLK', 31],
    ['CYBER_SEC', 24],
  ],
  AIML_BLK: [
    ['CSE_DS', 31],
    ['CYBER_SEC', 22],
    ['BBA_BLK', 30],
    ['BOX_CRIC', 34],
    ['FB_COURT', 42],
  ],
  CYBER_SEC: [
    ['CSE_DS', 24],
    ['AIML_BLK', 22],
    ['BBA_BLK', 22],
    ['UNI_LIB', 35],
  ],
  BBA_BLK: [
    ['CYBER_SEC', 22],
    ['AIML_BLK', 30],
    ['UNI_LIB', 28],
    ['VB_COURT', 38],
  ],
  UNI_LIB: [
    ['CSE_GEN', 34],
    ['CYBER_SEC', 35],
    ['BBA_BLK', 28],
    ['FIRST_AID', 24],
  ],
  HOSTELS: [
    ['MAIN_GATE', 42],
    ['BAKERY', 18],
    ['CANTEEN', 22],
    ['VB_COURT', 45],
  ],
  CANTEEN: [
    ['HOSTELS', 22],
    ['BAKERY', 12],
    ['VB_COURT', 34],
  ],
  BAKERY: [
    ['HOSTELS', 18],
    ['CANTEEN', 12],
    ['FIRST_AID', 24],
  ],
  FIRST_AID: [
    ['MAIN_GATE', 18],
    ['CSE_GEN', 18],
    ['UNI_LIB', 24],
    ['BAKERY', 24],
  ],
  VB_COURT: [
    ['HOSTELS', 45],
    ['CANTEEN', 34],
    ['BBA_BLK', 38],
    ['BOX_CRIC', 32],
  ],
  BOX_CRIC: [
    ['VB_COURT', 32],
    ['AIML_BLK', 34],
    ['FB_COURT', 20],
  ],
  FB_COURT: [
    ['AIML_BLK', 42],
    ['BOX_CRIC', 20],
    ['BBA_BLK', 44],
  ],
};

const categoryFilterConfig = [
  { value: 'All', label: 'All', key: 'All' },
  { value: 'Academic', label: 'Academic Blocks', key: 'Academic' },
  { value: 'Hostels', label: 'Hostels & Food', key: 'Hostels' },
  { value: 'Sports', label: 'Sports Facilities', key: 'Sports' },
  { value: 'Amenities', label: 'Amenities', key: 'Amenities' },
];

const nodeOrder = Object.keys(campusNodes);

export function buildRoute(startId, endId) {
  const distances = {};
  const previous = {};
  const queue = new Set(nodeOrder);

  for (const node of nodeOrder) {
    distances[node] = Number.POSITIVE_INFINITY;
    previous[node] = null;
  }

  distances[startId] = 0;

  while (queue.size > 0) {
    let currentNode = null;
    let currentDistance = Number.POSITIVE_INFINITY;

    for (const node of queue) {
      if (distances[node] < currentDistance) {
        currentDistance = distances[node];
        currentNode = node;
      }
    }

    if (currentNode === null) break;
    queue.delete(currentNode);

    if (currentNode === endId) break;

    for (const [neighbor, weight] of campusGraph[currentNode]) {
      if (!queue.has(neighbor)) continue;
      const candidate = distances[currentNode] + weight;
      if (candidate < distances[neighbor]) {
        distances[neighbor] = candidate;
        previous[neighbor] = currentNode;
      }
    }
  }

  const trail = [];
  let cursor = endId;

  while (cursor) {
    trail.unshift(cursor);
    cursor = previous[cursor];
  }

  if (trail[0] !== startId) {
    return [];
  }

  return trail;
}

export function getRouteSteps(path) {
  if (!path || path.length < 2) {
    return ['Select two destinations to generate a route summary.'];
  }

  const routeSteps = [];

  const routeHints = {
    HOSTELS_BAKERY: 'Exit the Hostels and walk past the Bakery on your left.',
    BAKERY_CANTEEN: 'Continue toward the central canteen area and keep the food court on your right.',
    HOSTELS_CANTEEN: 'Leave the hostel block and head toward the main canteen through the residential lane.',
    MAIN_GATE_CSE_GEN: 'Exit the main gate and follow the academic spine toward the CSE General Block.',
    CSE_GEN_CSE_DS: 'Continue along the technology corridor and head toward the Data Science block.',
    CSE_DS_AIML_BLK: 'Turn deeper into the engineering wing toward the AIML Innovation Block.',
    AIML_BLK_CYBER_SEC: 'Continue east toward the Cyber Security wing and keep the walkway straight.',
    CYBER_SEC_BBA_BLK: 'Follow the central campus walkway toward the management block.',
    BBA_BLK_UNI_LIB: 'Walk toward the central library and keep the open courtyard on your left.',
    UNI_LIB_FIRST_AID: 'Stay on the academic path and approach the First Aid & Wellness desk.',
    FIRST_AID_CSE_GEN: 'Proceed across the campus lane toward the CSE General Block.',
    HOSTELS_VB_COURT: 'Move along the residence edge toward the volleyball court for your next stop.',
    CANTEEN_VB_COURT: 'Follow the active sports path to the outdoor volleyball court.',
    VB_COURT_BOX_CRIC: 'Head toward the box cricket arena on the north sports lane.',
    BOX_CRIC_FB_COURT: 'Continue straight to the football turf across the sports precinct.',
    AIML_BLK_FB_COURT: 'Move toward the open football field on the east side of campus.',
  };

  for (let index = 0; index < path.length - 1; index += 1) {
    const current = path[index];
    const next = path[index + 1];
    const pairKey = `${current}_${next}`;
    const generic = `Continue from ${campusNodes[current].name} toward ${campusNodes[next].name}.`;
    routeSteps.push(routeHints[pairKey] || generic);
  }

  return routeSteps;
}

export { campusNodes, campusGraph, categoryFilterConfig, nodeOrder };

export default function App() {
  const [authMode, setAuthMode] = useState('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', role: 'student' });
  const [studentForm, setStudentForm] = useState({ id: '', password: '' });
  const [staffForm, setStaffForm] = useState({ id: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fromNode, setFromNode] = useState('HOSTELS');
  const [toNode, setToNode] = useState('AIML_BLK');
  const [selectedNodeId, setSelectedNodeId] = useState('AIML_BLK');
  const [activeStaffPanel, setActiveStaffPanel] = useState('navigation');
  const [route, setRoute] = useState(['HOSTELS', 'BAKERY', 'CANTEEN', 'VB_COURT', 'BBA_BLK', 'AIML_BLK']);
  const [initialAlertList, setInitialAlertList] = useState([
    {
      nodeId: 'BOX_CRIC',
      message: 'Box Cricket: Closed for annual maintenance until Oct 10.',
      time: '08:15 AM',
    },
    {
      nodeId: 'CANTEEN',
      message: 'Canteen pathway blocked due to repair work. Use library detour.',
      time: '09:50 AM',
    },
  ]);
  const [alertForm, setAlertForm] = useState({ nodeId: 'BOX_CRIC', message: '' });
  const [alertList, setAlertList] = useState(initialAlertList);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const nodeList = useMemo(() => Object.values(campusNodes), []);
  const filteredNodes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return nodeList.filter((node) => {
      const matchesSearch = !query || node.name.toLowerCase().includes(query) || node.id.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Hostels' && ['Hostels', 'Food'].includes(node.category)) ||
        node.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [nodeList, searchTerm, selectedCategory]);

  const routePath = useMemo(() => buildRoute(fromNode, toNode), [fromNode, toNode]);
  const routeSummary = useMemo(() => getRouteSteps(routePath), [routePath]);
  const selectedNode = campusNodes[selectedNodeId] || campusNodes[toNode];

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    const validId = /^MRV\/\d{4}\/\d{4}$/.test(studentForm.id);
    const validPassword = studentForm.password.length >= 5;

    if (!validId || !validPassword) {
      alert('Student ID format should be MRV/2026/XXXX and password must be at least 5 characters.');
      return;
    }

    setCurrentUser({ name: 'Student User', role: 'student' });
    setIsLoggedIn(true);
  };

  const handleStaffSubmit = (event) => {
    event.preventDefault();
    const validId = staffForm.id.includes('@') || staffForm.id.toLowerCase().includes('staff');
    const validPassword = staffForm.password.length >= 5;

    if (!validId || !validPassword) {
      alert('Enter a valid staff email/ID and a secure password.');
      return;
    }

    setCurrentUser({ name: 'Campus Staff', role: 'staff' });
    setIsLoggedIn(true);
  };

  const handleRouteSearch = () => {
    if (!fromNode || !toNode || fromNode === toNode) {
      setRoute([fromNode]);
      return;
    }

    const generatedPath = buildRoute(fromNode, toNode);
    if (!generatedPath.length) {
      setRoute([fromNode, toNode]);
      return;
    }
    setRoute(generatedPath);
  };

  const handleAddAlert = () => {
    if (!alertForm.message.trim()) {
      alert('Please enter an alert notice before publishing it.');
      return;
    }

    const newAlert = {
      nodeId: alertForm.nodeId,
      message: alertForm.message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAlertList((previous) => [newAlert, ...previous]);
    setAlertForm((previous) => ({ ...previous, message: '' }));
  };

  useEffect(() => {
    if (routePath.length > 1) {
      setSelectedNodeId(routePath[routePath.length - 1]);
    }
  }, [routePath]);

  const handleMapPointerDown = (event) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX - panPosition.x,
      y: event.clientY - panPosition.y,
    };
  };

  const handleMapPointerMove = (event) => {
    if (!isDragging) return;
    setPanPosition({
      x: event.clientX - dragStartRef.current.x,
      y: event.clientY - dragStartRef.current.y,
    });
  };

  const handleMapPointerUp = () => setIsDragging(false);

  const mapNodes = filteredNodes.length ? filteredNodes : nodeList;

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.20),transparent_35%)]" />
          <div className="glass-panel relative z-10 w-full max-w-5xl overflow-hidden rounded-[28px] border border-sky-400/20">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-between bg-slate-950/40 p-8 md:p-12">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                    <Building2 size={14} />
                    MRV University
                  </div>
                  <h1 className="text-4xl font-bold leading-tight text-white">Smart Campus Navigation Portal</h1>
                  <p className="mt-4 max-w-md text-sm text-slate-300">
                    Navigate the 73-acre campus with live wayfinding, academic routes, hostel guidance, and staff safety alerts.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>Campus Snapshot</span>
                    <span>Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                      <p className="text-xl font-bold text-sky-300">14</p>
                      <p className="text-xs text-slate-400">Key nodes</p>
                    </div>
                    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                      <p className="text-xl font-bold text-emerald-300">5</p>
                      <p className="text-xs text-slate-400">Campus routes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-8 flex w-full rounded-full border border-slate-700 bg-slate-900/80 p-1">
                  {['student', 'staff'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAuthMode(mode)}
                      className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        authMode === mode
                          ? 'bg-sky-500 text-white shadow-lg shadow-sky-950/40'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {mode === 'student' ? 'Student Login' : 'Staff/Admin Login'}
                    </button>
                  ))}
                </div>

                {authMode === 'student' ? (
                  <form onSubmit={handleStudentSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Student ID Number</label>
                      <input
                        type="text"
                        value={studentForm.id}
                        onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })}
                        placeholder="MRV/2026/XXXX"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Password</label>
                      <input
                        type="password"
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-sky-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:brightness-110"
                    >
                      Access Dashboard
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleStaffSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Employee ID / Email</label>
                      <input
                        type="text"
                        value={staffForm.id}
                        onChange={(e) => setStaffForm({ ...staffForm, id: e.target.value })}
                        placeholder="staff@mrv.edu.in"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Password</label>
                      <input
                        type="password"
                        value={staffForm.password}
                        onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-sky-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:brightness-110"
                    >
                      Staff Access
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen bg-slate-950 text-slate-100">
          <aside className="glass-panel hidden w-[360px] flex-col border-r border-slate-700/80 bg-slate-950/80 lg:flex">
            <div className="border-b border-slate-700/80 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-300">Campus Pulse</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Smart Route Planner</h2>
                </div>
                <button className="rounded-xl border border-slate-700 p-2 text-slate-300 hover:bg-slate-800">
                  <Menu size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-3">
                <div className="mb-3 flex items-center gap-2 text-sky-300">
                  <Search size={16} />
                  <span className="text-sm font-semibold">Search campus</span>
                </div>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Find a location..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Category filters</p>
                <div className="flex flex-wrap gap-2">
                  {categoryFilterConfig.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        selectedCategory === category.value
                          ? 'border-sky-400 bg-sky-500/20 text-sky-100'
                          : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Navigation size={16} />
                  <span className="text-sm font-semibold">Directions Engine</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.18em] text-slate-400">From</label>
                    <select
                      value={fromNode}
                      onChange={(e) => setFromNode(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400"
                    >
                      {nodeList.map((node) => (
                        <option key={node.id} value={node.id}>{node.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.18em] text-slate-400">To</label>
                    <select
                      value={toNode}
                      onChange={(e) => setToNode(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400"
                    >
                      {nodeList.map((node) => (
                        <option key={node.id} value={node.id}>{node.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleRouteSearch}
                    className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-sky-900/30"
                  >
                    Find Path
                  </button>
                </div>
              </div>

              {currentUser.role === 'staff' && (
                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-200">
                      <ShieldCheck size={16} />
                      <span className="text-sm font-semibold">Staff Tools</span>
                    </div>
                    <div className="flex rounded-full border border-orange-500/30 bg-slate-900/50 p-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setActiveStaffPanel('navigation')}
                        className={`rounded-full px-2 py-1 ${activeStaffPanel === 'navigation' ? 'bg-orange-500 text-white' : 'text-slate-300'}`}
                      >
                        Navigation
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStaffPanel('alerts')}
                        className={`rounded-full px-2 py-1 ${activeStaffPanel === 'alerts' ? 'bg-orange-500 text-white' : 'text-slate-300'}`}
                      >
                        Crowd Reporter
                      </button>
                    </div>
                  </div>

                  {activeStaffPanel === 'alerts' ? (
                    <div className="space-y-3">
                      <select
                        value={alertForm.nodeId}
                        onChange={(e) => setAlertForm({ ...alertForm, nodeId: e.target.value })}
                        className="w-full rounded-xl border border-orange-500/30 bg-slate-950/60 px-3 py-2.5 text-sm text-white"
                      >
                        {nodeList.map((node) => (
                          <option key={node.id} value={node.id}>{node.name}</option>
                        ))}
                      </select>
                      <textarea
                        value={alertForm.message}
                        onChange={(e) => setAlertForm({ ...alertForm, message: e.target.value })}
                        rows={4}
                        placeholder="Box Cricket: Closed for annual maintenance..."
                        className="w-full rounded-xl border border-orange-500/30 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddAlert}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white"
                      >
                        <BellRing size={16} />
                        Post Alert
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm leading-6 text-slate-300">
                      Staff dashboard is active. Crowd alerts will be pinned directly onto the campus route map to assist travelers.
                    </p>
                  )}
                </div>
              )}

              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="mb-3 flex items-center gap-2 text-cyan-300">
                  <Zap size={16} />
                  <span className="text-sm font-semibold">Route Summary</span>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p className="font-semibold text-white">{campusNodes[fromNode].name} → {campusNodes[toNode].name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Distance: {routePath.length > 1 ? routePath.length * 30 : 0}m</p>
                  {routeSummary.map((step, index) => (
                    <div key={`${step}-${index}`} className="flex gap-2 rounded-xl border border-slate-700 bg-slate-950/60 p-2">
                      <span className="mt-0.5 text-cyan-300">{index + 1}.</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Logged in as</p>
                <div className="mt-1 flex items-center gap-2 text-white">
                  <UserCircle2 size={18} className="text-sky-300" />
                  <span className="font-semibold">{currentUser.name}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-200 hover:border-slate-500"
              >
                Log out
              </button>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[28px] border border-slate-700/80 bg-slate-950/80">
              <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                <MapPin size={14} className="text-sky-300" />
                MRV University Map
              </div>

              <div className="absolute right-4 top-4 z-20 flex gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((value) => Math.max(0.7, Number((value - 0.1).toFixed(2))))}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-lg text-white hover:bg-slate-800"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((value) => Math.min(1.8, Number((value + 0.1).toFixed(2))))}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-lg text-white hover:bg-slate-800"
                >
                  +
                </button>
              </div>

              <div
                className="map-grid relative h-[68vh] w-full overflow-hidden cursor-grab active:cursor-grabbing"
                onPointerDown={handleMapPointerDown}
                onPointerMove={handleMapPointerMove}
                onPointerUp={handleMapPointerUp}
                onPointerLeave={handleMapPointerUp}
              >
                <div
                  className="absolute inset-0 transition-transform duration-200"
                  style={{ transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})` }}
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="2" y="2" width="96" height="96" rx="8" fill="rgba(15,118,110,0.05)" stroke="rgba(148,163,184,0.18)" />
                    <path d="M 8 76 L 24 66 L 32 78 L 54 62 L 70 72 L 82 58 L 90 31 L 60 24 L 52 20 L 42 22 L 24 36 Z" fill="rgba(34,197,94,0.08)" stroke="rgba(74,222,128,0.18)" />
                    <path d="M 12 38 L 28 36 L 40 52 L 61 48 L 73 41 L 52 22 L 42 33 Z" fill="rgba(59,130,246,0.06)" stroke="rgba(96,165,250,0.18)" />
                    <path d="M 12 72 L 30 78 L 66 72 L 81 58 L 88 28 L 66 28 L 52 64 Z" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.2)" />
                    {routePath.length > 1 && (
                      <polyline
                        points={routePath.map((nodeId) => `${campusNodes[nodeId].x},${campusNodes[nodeId].y}`).join(' ')}
                        fill="none"
                        stroke="rgba(56,189,248,0.95)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="0 0"
                      />
                    )}
                  </svg>

                  {mapNodes.map((node) => {
                    const isSelected = selectedNodeId === node.id || route.includes(node.id);
                    const alertCount = alertList.filter((alert) => alert.nodeId === node.id).length;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`node-marker ${isSelected ? 'selected' : ''}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                        <span
                          className={`dot flex h-4 w-4 items-center justify-center rounded-full border-2 text-[7px] font-bold ${
                            route.includes(node.id)
                              ? 'border-sky-200 bg-sky-400 text-sky-950'
                              : 'border-slate-950 bg-emerald-400 text-slate-950'
                          }`}
                        >
                          {route.includes(node.id) ? '•' : '○'}
                        </span>
                        {alertCount > 0 && (
                          <span className="route-badge">{alertCount}</span>
                        )}
                        <span className="map-label">{node.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-soft backdrop-blur-md">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Selected Location</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{selectedNode.name}</h3>
                    <p className="text-sm text-slate-300">{selectedNode.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-sky-200">{selectedNode.category}</span>
                    {selectedNodeId && route.includes(selectedNodeId) && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-200">
                        Route Stop
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {alertList.length > 0 && (
              <div className="mt-4 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-orange-200">
                  <AlertTriangle size={16} />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Crowd Alerts</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {alertList.map((alert, index) => (
                    <div key={`${alert.nodeId}-${index}`} className="rounded-xl border border-orange-500/30 bg-slate-950/60 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">{campusNodes[alert.nodeId]?.name}</p>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-orange-200">{alert.time}</span>
                      </div>
                      <p className="text-sm text-slate-300">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}
