// =========================================================================
// CONFIGURATION: Deployed Google Apps Script Web App URL
// =========================================================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJi5fstpdPXgRx45hU2MGV7OoZ-SAqdWKpVS4rp6V4_dkVRvH6ua8bC9tSM3ZH3PTY/exec';

// Fallback preview dataset (used only if network fetch fails)
const FALLBACK_RECORDS = [
  { firstName: 'Akeem', lastName: 'Morris', className: 'Nunn', grade: '4', timestamp: '2026-11-19 11:15:55', location: "Nunn's Classroom", responder: 'Malanson', responseTimestamp: '2026-11-19 11:48:02', notes: '' },
  { firstName: 'Jomar', lastName: 'Garcia', className: 'Feuerberg', grade: '3', timestamp: '2026-11-19 10:55:08', location: "Feuerberg's Classroom", responder: 'Hills', responseTimestamp: '2026-11-19 11:04:03', notes: '' },
  { firstName: 'Jomar', lastName: 'Garcia', className: 'Feuerberg', grade: '3', timestamp: '2026-11-19 10:11:15', location: "Feuerberg's Classroom", responder: 'Schunemann', responseTimestamp: '2026-11-19 10:19:41', notes: '' },
  { firstName: 'Layla', lastName: 'Rodriguez', className: 'Feuerberg', grade: '3', timestamp: '2026-11-19 09:51:31', location: "Feuerberg's Classroom", responder: 'Rose', responseTimestamp: '2026-11-19 10:11:38', notes: 'During the check-in, the student shared two concerns. She was upset that she had misplaced her turtle comfort toy, and she felt overwhelmed by the amount of reading on the worksheet.' },
  { firstName: 'Jomar', lastName: 'Garcia', className: 'Feuerberg', grade: '3', timestamp: '2026-11-18 12:49:47', location: "Feuerberg's Classroom", responder: 'Lewis', responseTimestamp: '2026-11-18 13:02:47', notes: 'Lewis responded' },
  { firstName: 'Noah', lastName: 'Velez', className: 'Vincelette', grade: '1', timestamp: '2026-11-18 12:44:58', location: "Vincelette's Classroom", responder: 'Thompson', responseTimestamp: '2026-11-18 13:05:34', notes: 'Thompson responded to classroom' },
  { firstName: 'Layla', lastName: 'Rodriguez', className: 'Feuerberg', grade: '3', timestamp: '2026-11-18 09:49:07', location: "Feuerberg's Classroom", responder: 'Malanson', responseTimestamp: '2026-11-18 09:50:00', notes: '' },
  { firstName: 'Dax', lastName: 'Amirault', className: 'Cutler', grade: 'K', timestamp: '2026-11-17 13:53:29', location: "Cutler's Classroom", responder: 'Hills', responseTimestamp: '2026-11-17 13:54:54', notes: '' },
  { firstName: 'Akeem', lastName: 'Morris', className: 'Nunn', grade: '4', timestamp: '2026-11-16 10:14:59', location: 'Hallway', responder: 'Owens', responseTimestamp: '2026-11-16 10:17:03', notes: 'Walked back to class' },
  { firstName: 'Jomar', lastName: 'Garcia', className: 'Feuerberg', grade: '3', timestamp: '2026-11-13 13:54:09', location: 'cafeteria', responder: 'Malanson', responseTimestamp: '2026-11-13 14:21:12', notes: '' },
  { firstName: 'Layla', lastName: 'Rodriguez', className: 'Feuerberg', grade: '3', timestamp: '2026-11-10 12:38:19', location: "Feuerberg's Classroom", responder: 'Hills', responseTimestamp: '2026-11-10 15:02:55', notes: '' },
  { firstName: 'Noah', lastName: 'Velez', className: 'Vincelette', grade: '1', timestamp: '2026-11-06 09:26:41', location: "Vincelette's Classroom", responder: 'Owens', responseTimestamp: '2026-11-06 09:37:20', notes: '' },
  { firstName: 'Akeem', lastName: 'Morris', className: 'Nunn', grade: '4', timestamp: '2026-11-04 09:38:57', location: "Nunn's Classroom", responder: 'Malanson', responseTimestamp: '2026-11-04 09:58:17', notes: '' }
];

const FALLBACK_RESPONDERS = [
  { name: 'Glanovsky', email: 'cglanovsky@crec.org', responses: 0, total: 0 },
  { name: 'Glanovsky2', email: 'cglanovsky@gmail.com', responses: 0, total: 0 },
  { name: 'Malanson', email: 'smalanson@crec.org', responses: 7, total: 1373 },
  { name: 'Owens', email: 'towens@crec.org', responses: 2, total: 1350 },
  { name: 'Schunemann', email: 'kschunemann@crec.org', responses: 1, total: 8 },
  { name: 'Lewis', email: 'slewis@crec.org', responses: 1, total: 13 },
  { name: 'Hills', email: 'ghills@crec.org', responses: 3, total: 39 },
  { name: 'Rose', email: 'merose@crec.org', responses: 1, total: 20 },
  { name: 'Thompson', email: 'kylthompson@crec.org', responses: 1, total: 21 },
  { name: 'Main Office', email: 'aeroeoffice@crec.org', responses: 0, total: 0 }
];

// =========================================================================
// APPLICATION STATE
// =========================================================================
const state = {
  isLive: false,
  rawRecords: [],
  responderDetails: [],
  startDate: '',
  endDate: '',
  activeTab: 'overview',
  scopeType: 'all',
  scopeValue: '',
  overviewTimeBucket: '60',
  elapsedGroupBy: 'responder',
  elapsedEntity: '__ALL__',
  pieDimension: 'grade',
  divisionMode: 'equal',
  intervalMinutes: 60,
  customMinutes: 45,
  hideEmptySlices: true,
  customBlocks: [
    { label: 'Early Morning (Before 9:00)', start: '00:00', end: '09:00' },
    { label: 'Mid-Morning (9:00–11:00)', start: '09:00', end: '11:00' },
    { label: 'Midday / Lunch (11:00–13:00)', start: '11:00', end: '13:00' },
    { label: 'Afternoon (13:00–15:30)', start: '13:00', end: '15:30' },
    { label: 'After School (15:30+)', start: '15:30', end: '24:00' }
  ],
  rawSortCol: 'timestamp',
  rawSortDir: 'desc',
  rawSearch: ''
};

const charts = {
  tod: null,
  dow: null,
  elapsed: null,
  pie: null
};

const CHART_PALETTE = [
  '#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed',
  '#0891b2', '#db2777', '#4f46e5', '#059669', '#ea580c',
  '#0284c7', '#9333ea', '#65a30d', '#e11d48', '#475569'
];

// Monday through Friday only (JS Date.getDay(): 1=Mon ... 5=Fri)
const WEEKDAYS = [
  { name: 'Monday', jsDay: 1 },
  { name: 'Tuesday', jsDay: 2 },
  { name: 'Wednesday', jsDay: 3 },
  { name: 'Thursday', jsDay: 4 },
  { name: 'Friday', jsDay: 5 }
];

// =========================================================================
// UTILITIES: DATE PARSING, ESCAPING, FORMATTING
// =========================================================================
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 3200);
}

function parseTimestamp(str) {
  if (!str) return null;
  const clean = String(str).trim();
  if (!clean || clean.toLowerCase() === 'na' || clean.toLowerCase() === 'n/a') return null;

  // Handle "YYYY-MM-DD HH:MM:SS" safely in local time
  const isoLike = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (isoLike) {
    const [, y, m, d, hh = '0', mm = '0', ss = '0'] = isoLike;
    const dt = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss));
    return isNaN(dt.getTime()) ? null : dt;
  }

  // Handle "MM/DD/YYYY HH:MM:SS AM/PM"
  const usLike = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?)?$/i);
  if (usLike) {
    let [, m, d, y, hh = '0', mm = '0', ss = '0', ampm] = usLike;
    let hour = Number(hh);
    if (ampm) {
      const up = ampm.toUpperCase();
      if (up === 'PM' && hour < 12) hour += 12;
      if (up === 'AM' && hour === 12) hour = 0;
    }
    const dt = new Date(Number(y), Number(m) - 1, Number(d), hour, Number(mm), Number(ss));
    return isNaN(dt.getTime()) ? null : dt;
  }

  const fallback = new Date(clean);
  return isNaN(fallback.getTime()) ? null : fallback;
}

function toYMD(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getMostRecentAugustFirst() {
  const now = new Date();
  const year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  return `${year}-08-01`;
}

function gradeRank(g) {
  const s = String(g || '').trim().toLowerCase();
  if (s === 'prek' || s === 'pk') return -1;
  if (s === 'k') return 0;
  const num = Number(s);
  return isNaN(num) ? 999 : num;
}

function compareGrades(a, b) {
  const ra = gradeRank(a);
  const rb = gradeRank(b);
  if (ra !== rb) return ra - rb;
  return String(a).localeCompare(String(b));
}

function formatMinutes(mins) {
  if (mins === null || mins === undefined || isNaN(mins)) return '—';
  const rounded = Math.round(mins * 10) / 10;
  if (rounded < 60) return `${rounded} min`;
  const h = Math.floor(rounded / 60);
  const m = Math.round(rounded % 60);
  return `${rounded} min (${h}h ${m}m)`;
}

function calcStats(numbers) {
  if (!numbers.length) return { count: 0, avg: null, median: null, min: null, max: null };
  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  return {
    count: sorted.length,
    avg: sum / sorted.length,
    median,
    min: sorted[0],
    max: sorted[sorted.length - 1]
  };
}

/**
 * Calculates elapsed minutes between reqDate and resDate while excluding
 * overnight hours between 5:30 PM (17:30) and 7:30 AM (07:30).
 */
function calculateElapsedMinutes(reqDate, resDate) {
  if (!reqDate || !resDate) return null;
  const startMs = reqDate.getTime();
  const endMs = resDate.getTime();
  if (endMs < startMs) return null;
  if (endMs === startMs) return 0;

  let totalMs = 0;
  let cursor = new Date(reqDate.getFullYear(), reqDate.getMonth(), reqDate.getDate(), 0, 0, 0, 0);
  const endDay = new Date(resDate.getFullYear(), resDate.getMonth(), resDate.getDate(), 0, 0, 0, 0);

  while (cursor <= endDay) {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const d = cursor.getDate();

    // Active daily window: 7:30 AM (07:30) to 5:30 PM (17:30)
    const windowStartMs = new Date(y, m, d, 7, 30, 0, 0).getTime();
    const windowEndMs = new Date(y, m, d, 17, 30, 0, 0).getTime();

    const overlapStart = Math.max(startMs, windowStartMs);
    const overlapEnd = Math.min(endMs, windowEndMs);

    if (overlapEnd > overlapStart) {
      totalMs += overlapEnd - overlapStart;
    }

    cursor = new Date(y, m, d + 1, 0, 0, 0, 0);
  }

  return Math.round((totalMs / (1000 * 60)) * 10) / 10;
}

function normalizeRecords(records) {
  return records.map((r, idx) => {
    const firstName = String(r.firstName || '').trim();
    const lastName = String(r.lastName || '').trim();
    const fullName = `${firstName} ${lastName}`.trim() || '(Unknown Student)';
    const className = String(r.className || '').trim() || '(Unassigned)';
    const grade = String(r.grade || '').trim() || '(Unknown)';
    const location = String(r.location || '').trim() || '(Unknown)';
    const responder = String(r.responder || '').trim();
    const notes = String(r.notes || '').trim();
    const reqDate = parseTimestamp(r.timestamp);
    const resDate = parseTimestamp(r.responseTimestamp);
    const elapsedMinutes = calculateElapsedMinutes(reqDate, resDate);

    return {
      id: idx,
      firstName,
      lastName,
      fullName,
      className,
      grade,
      timestamp: String(r.timestamp || '').trim(),
      reqDate,
      location,
      responder,
      responseTimestamp: String(r.responseTimestamp || '').trim(),
      resDate,
      elapsedMinutes,
      notes
    };
  });
}

// Mark truncated note cells so long notes show '...' and expand/collapse on click
function enhanceTruncatedNotes() {
  document.querySelectorAll('.notes-cell').forEach(cell => {
    const rawText = cell.textContent || '';
    if (rawText === '—' || !rawText.trim()) return;
    if (cell.scrollWidth > cell.clientWidth || rawText.includes('\n')) {
      cell.classList.add('is-truncated');
      cell.title = 'Click to expand or collapse note';
    } else {
      cell.classList.remove('is-truncated');
      cell.removeAttribute('title');
    }
  });
}

// =========================================================================
// DATA LOADING & APPS SCRIPT COMMUNICATION
// =========================================================================
async function loadData() {
  const statusEl = document.getElementById('connectionStatus');
  const labelEl = document.getElementById('connectionLabel');

  labelEl.textContent = 'Syncing records...';
  try {
    const response = await fetch(SCRIPT_URL, { method: 'GET' });
    const json = await response.json();
    if (json.status !== 'success') {
      throw new Error(json.message || 'Failed to load data.');
    }

    state.isLive = true;
    state.rawRecords = normalizeRecords(json.records || []);
    state.responderDetails = json.responderDetails || [];
    statusEl.className = 'status-pill live';
    labelEl.textContent = `Live (${state.rawRecords.length} total records)`;
    renderAll();
    showToast('Synced latest records.');
  } catch (err) {
    console.error(err);
    state.isLive = false;
    statusEl.className = 'status-pill demo';
    labelEl.textContent = 'Offline Preview Data';
    if (!state.rawRecords.length) {
      state.rawRecords = normalizeRecords(FALLBACK_RECORDS);
      state.responderDetails = [...FALLBACK_RESPONDERS];
    }
    renderAll();
    showToast('Could not reach live feed: ' + err.message);
  }
}

async function postAction(payload) {
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Server error');
  }
  if (json.responderDetails) {
    state.responderDetails = json.responderDetails;
  }
}

// =========================================================================
// FILTERING HELPERS
// =========================================================================
function getTimespanFilteredRecords() {
  const start = state.startDate ? parseTimestamp(state.startDate + ' 00:00:00') : null;
  const end = state.endDate ? parseTimestamp(state.endDate + ' 23:59:59') : null;

  return state.rawRecords.filter(r => {
    if (!r.reqDate) return !start && !end;
    if (start && r.reqDate < start) return false;
    if (end && r.reqDate > end) return false;
    return true;
  });
}

function getScopedRecords(records) {
  if (state.scopeType === 'all' || !state.scopeValue) return records;
  return records.filter(r => {
    if (state.scopeType === 'student') return r.fullName === state.scopeValue;
    if (state.scopeType === 'class') return r.className === state.scopeValue;
    if (state.scopeType === 'grade') return r.grade === state.scopeValue;
    if (state.scopeType === 'location') return r.location === state.scopeValue;
    return true;
  });
}

// =========================================================================
// TIME-OF-DAY BUCKETING LOGIC (SUPPORTS 5m, 10m, 15m+ & CUSTOM BLOCKS)
// =========================================================================
function minutesToHHMM(totalMins) {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function hhmmToMinutes(str) {
  const [h, m] = String(str || '00:00').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function bucketRecordsByTimeOfDay(records, mode, intervalMins, hideEmpty, trimToActiveWindow = false) {
  if (mode === 'customBlocks') {
    const counts = state.customBlocks.map(b => ({ label: b.label, count: 0 }));
    let unassigned = 0;

    records.forEach(r => {
      if (!r.reqDate) return;
      const mins = r.reqDate.getHours() * 60 + r.reqDate.getMinutes();
      let matched = false;
      for (let i = 0; i < state.customBlocks.length; i++) {
        const s = hhmmToMinutes(state.customBlocks[i].start);
        const e = hhmmToMinutes(state.customBlocks[i].end);
        if (mins >= s && mins < e) {
          counts[i].count++;
          matched = true;
          break;
        }
      }
      if (!matched) unassigned++;
    });

    if (unassigned > 0) counts.push({ label: 'Other / Uncovered Hours', count: unassigned });
    return hideEmpty ? counts.filter(c => c.count > 0) : counts;
  }

  const step = Math.max(1, Math.min(720, Number(intervalMins) || 60));
  const bucketCount = Math.ceil(1440 / step);
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) {
    const startM = i * step;
    const endM = Math.min(1440, (i + 1) * step);
    buckets.push({
      label: `${minutesToHHMM(startM)}–${minutesToHHMM(endM)}`,
      count: 0
    });
  }

  records.forEach(r => {
    if (!r.reqDate) return;
    const mins = r.reqDate.getHours() * 60 + r.reqDate.getMinutes();
    const idx = Math.min(bucketCount - 1, Math.floor(mins / step));
    buckets[idx].count++;
  });

  if (hideEmpty) {
    return buckets.filter(b => b.count > 0);
  }

  // For fine intervals (5, 10, 15, 30 min) on bar charts, trim dead overnight hours
  if (trimToActiveWindow && step < 60) {
    const firstActive = buckets.findIndex(b => b.count > 0);
    let lastActive = -1;
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].count > 0) { lastActive = i; break; }
    }
    if (firstActive !== -1 && lastActive !== -1) {
      return buckets.slice(firstActive, lastActive + 1);
    }
    const startIdx = Math.floor((7 * 60 + 30) / step);
    const endIdx = Math.min(bucketCount - 1, Math.ceil((16 * 60) / step));
    return buckets.slice(startIdx, endIdx + 1);
  }

  return buckets;
}

// =========================================================================
// RENDER TAB 1: OVERVIEW & DRILL-DOWNS
// =========================================================================
function populateScopeValues(records) {
  const group = document.getElementById('scopeValueGroup');
  const select = document.getElementById('scopeValue');
  const label = document.getElementById('scopeValueLabel');

  if (state.scopeType === 'all') {
    group.style.display = 'none';
    return;
  }
  group.style.display = 'flex';

  let values = [];
  if (state.scopeType === 'student') {
    label.textContent = 'Student:';
    values = [...new Set(records.map(r => r.fullName))].sort((a, b) => a.localeCompare(b));
  } else if (state.scopeType === 'class') {
    label.textContent = 'Class / Teacher:';
    values = [...new Set(records.map(r => r.className))].sort((a, b) => a.localeCompare(b));
  } else if (state.scopeType === 'grade') {
    label.textContent = 'Grade:';
    values = [...new Set(records.map(r => r.grade))].sort(compareGrades);
  } else if (state.scopeType === 'location') {
    label.textContent = 'Location:';
    values = [...new Set(records.map(r => r.location))].sort((a, b) => a.localeCompare(b));
  }

  if (!values.includes(state.scopeValue)) {
    state.scopeValue = values[0] || '';
  }

  select.innerHTML = values.length
    ? values.map(v => `<option value="${escapeHtml(v)}" ${v === state.scopeValue ? 'selected' : ''}>${escapeHtml(v)}</option>`).join('')
    : '<option value="">No records in timespan</option>';
}

function renderOverview() {
  const timeFiltered = getTimespanFilteredRecords();
  populateScopeValues(timeFiltered);
  const scoped = getScopedRecords(timeFiltered);

  const scopeDescriptor = state.scopeType === 'all'
    ? 'Full Dataset'
    : `${state.scopeType.charAt(0).toUpperCase() + state.scopeType.slice(1)}: ${state.scopeValue || 'None'}`;

  // KPIs
  const resolved = scoped.filter(r => r.elapsedMinutes !== null);
  const openCount = scoped.filter(r => !r.responder || r.responder.toLowerCase() === 'na').length;
  const stats = calcStats(resolved.map(r => r.elapsedMinutes));

  // Weekday counts (Monday through Friday only)
  const weekdayCounts = WEEKDAYS.map(wd => ({
    name: wd.name,
    count: scoped.filter(r => r.reqDate && r.reqDate.getDay() === wd.jsDay).length
  }));
  const maxWeekdayVal = Math.max(...weekdayCounts.map(w => w.count));
  const peakDayObj = weekdayCounts.find(w => w.count === maxWeekdayVal && maxWeekdayVal > 0);
  const peakDay = peakDayObj ? peakDayObj.name : '—';

  document.getElementById('overviewKpis').innerHTML = `
    <div class="kpi-card">
      <div class="kpi-label">Total Incidents</div>
      <div class="kpi-value">${scoped.length}</div>
      <div class="kpi-sub">${escapeHtml(scopeDescriptor)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Resolved / Open</div>
      <div class="kpi-value">${scoped.length - openCount} <span style="font-size:15px;color:var(--text-muted);font-weight:600;">/ ${openCount} open</span></div>
      <div class="kpi-sub">Based on responder status</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Avg Elapsed Time</div>
      <div class="kpi-value" style="font-size:21px;">${formatMinutes(stats.avg)}</div>
      <div class="kpi-sub">Excl. 5:30 PM–7:30 AM (${stats.count} timed)</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Median Elapsed Time</div>
      <div class="kpi-value" style="font-size:21px;">${formatMinutes(stats.median)}</div>
      <div class="kpi-sub">Peak Weekday: ${peakDay}</div>
    </div>
  `;

  // Time of Day Chart
  let todBuckets;
  if (state.overviewTimeBucket === 'custom') {
    const activeStep = state.intervalMinutes === 'customMin' ? state.customMinutes : Number(state.intervalMinutes);
    todBuckets = bucketRecordsByTimeOfDay(scoped, state.divisionMode, activeStep, false, true);
  } else {
    todBuckets = bucketRecordsByTimeOfDay(scoped, 'equal', Number(state.overviewTimeBucket), false, true);
  }

  document.getElementById('todChartTitle').textContent = `Time of Day — ${scopeDescriptor}`;
  if (charts.tod) charts.tod.destroy();
  charts.tod = new Chart(document.getElementById('todChart'), {
    type: 'bar',
    data: {
      labels: todBuckets.map(b => b.label),
      datasets: [{
        label: 'Incidents',
        data: todBuckets.map(b => b.count),
        backgroundColor: '#2563eb',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
        x: { ticks: { maxRotation: 45, minRotation: 0 } }
      }
    }
  });

  // Day of Week Chart (Monday–Friday only)
  document.getElementById('dowChartTitle').textContent = `Day of Week — ${scopeDescriptor}`;
  if (charts.dow) charts.dow.destroy();
  charts.dow = new Chart(document.getElementById('dowChart'), {
    type: 'bar',
    data: {
      labels: weekdayCounts.map(w => w.name),
      datasets: [{
        label: 'Incidents',
        data: weekdayCounts.map(w => w.count),
        backgroundColor: '#0891b2',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });

  // Matching Records Table
  document.getElementById('scopeTableTitle').textContent = `Records for ${scopeDescriptor} (${scoped.length})`;
  const tbody = document.getElementById('scopeRecordsBody');
  if (!scoped.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:20px;">No records found for this filter and timespan.</td></tr>';
    return;
  }

  tbody.innerHTML = scoped.map(r => `
    <tr>
      <td><strong>${escapeHtml(r.fullName)}</strong></td>
      <td>${escapeHtml(r.className)}</td>
      <td><span class="badge badge-grade">${escapeHtml(r.grade)}</span></td>
      <td>${escapeHtml(r.timestamp)}</td>
      <td>${escapeHtml(r.location)}</td>
      <td>${r.responder ? escapeHtml(r.responder) : '<span class="badge badge-open">Open</span>'}</td>
      <td>${escapeHtml(r.responseTimestamp || '—')}</td>
      <td>${formatMinutes(r.elapsedMinutes)}</td>
      <td class="notes-cell">${escapeHtml(r.notes || '—')}</td>
    </tr>
  `).join('');

  requestAnimationFrame(enhanceTruncatedNotes);
}

// =========================================================================
// RENDER TAB 2: ELAPSED TIME ANALYSIS
// =========================================================================
function renderElapsed() {
  const timeFiltered = getTimespanFilteredRecords();
  const timedRecords = timeFiltered.filter(r => r.elapsedMinutes !== null);

  const groupBy = state.elapsedGroupBy;
  const entitySelect = document.getElementById('elapsedEntitySelect');
  const entityGroup = document.getElementById('elapsedEntityGroup');

  if (groupBy === 'overall') {
    entityGroup.style.display = 'none';
    state.elapsedEntity = '__ALL__';
  } else {
    entityGroup.style.display = 'flex';
    let keys = [];
    if (groupBy === 'responder') keys = [...new Set(timedRecords.map(r => r.responder || '(Unassigned)'))].sort();
    if (groupBy === 'class') keys = [...new Set(timedRecords.map(r => r.className))].sort();
    if (groupBy === 'grade') keys = [...new Set(timedRecords.map(r => r.grade))].sort(compareGrades);
    if (groupBy === 'student') keys = [...new Set(timedRecords.map(r => r.fullName))].sort();

    if (state.elapsedEntity !== '__ALL__' && !keys.includes(state.elapsedEntity)) {
      state.elapsedEntity = '__ALL__';
    }

    entitySelect.innerHTML = `<option value="__ALL__">All (${keys.length})</option>` +
      keys.map(k => `<option value="${escapeHtml(k)}" ${k === state.elapsedEntity ? 'selected' : ''}>${escapeHtml(k)}</option>`).join('');
  }

  const activeRecords = timedRecords.filter(r => {
    if (groupBy === 'overall' || state.elapsedEntity === '__ALL__') return true;
    if (groupBy === 'responder') return (r.responder || '(Unassigned)') === state.elapsedEntity;
    if (groupBy === 'class') return r.className === state.elapsedEntity;
    if (groupBy === 'grade') return r.grade === state.elapsedEntity;
    if (groupBy === 'student') return r.fullName === state.elapsedEntity;
    return true;
  });

  const overallStats = calcStats(activeRecords.map(r => r.elapsedMinutes));

  document.getElementById('elapsedKpis').innerHTML = `
    <div class="kpi-card">
      <div class="kpi-label">Timed Responses</div>
      <div class="kpi-value">${overallStats.count}</div>
      <div class="kpi-sub">Out of ${timeFiltered.length} total in range</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Average Elapsed Time</div>
      <div class="kpi-value" style="font-size:21px;">${formatMinutes(overallStats.avg)}</div>
      <div class="kpi-sub">Excludes 5:30 PM – 7:30 AM</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Median Elapsed Time</div>
      <div class="kpi-value" style="font-size:21px;">${formatMinutes(overallStats.median)}</div>
      <div class="kpi-sub">50th percentile (resistant to outliers)</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Fastest / Longest</div>
      <div class="kpi-value" style="font-size:18px;">${overallStats.count ? `${overallStats.min}m / ${overallStats.max}m` : '—'}</div>
      <div class="kpi-sub">Min / Max elapsed minutes</div>
    </div>
  `;

  // Build grouped summary rows
  const groupsMap = new Map();
  timedRecords.forEach(r => {
    let key = 'All Timed Incidents';
    if (groupBy === 'responder') key = r.responder || '(Unassigned)';
    else if (groupBy === 'class') key = r.className;
    else if (groupBy === 'grade') key = r.grade;
    else if (groupBy === 'student') key = r.fullName;

    if (!groupsMap.has(key)) groupsMap.set(key, []);
    groupsMap.get(key).push(r);
  });

  let summaryRows = [];
  groupsMap.forEach((recs, key) => {
    const s = calcStats(recs.map(x => x.elapsedMinutes));
    summaryRows.push({ key, ...s, records: recs });
  });

  if (groupBy === 'grade') {
    summaryRows.sort((a, b) => compareGrades(a.key, b.key));
  } else {
    summaryRows.sort((a, b) => (b.avg || 0) - (a.avg || 0));
  }

  // Chart
  if (charts.elapsed) charts.elapsed.destroy();
  if (state.elapsedEntity !== '__ALL__' && groupBy !== 'overall') {
    const sortedInc = [...activeRecords].sort((a, b) => (a.reqDate || 0) - (b.reqDate || 0));
    document.getElementById('elapsedChartTitle').textContent = `Individual Response Times for ${state.elapsedEntity}`;
    charts.elapsed = new Chart(document.getElementById('elapsedChart'), {
      type: 'bar',
      data: {
        labels: sortedInc.map(r => `${r.timestamp} (${r.fullName})`),
        datasets: [{
          label: 'Elapsed Minutes',
          data: sortedInc.map(r => r.elapsedMinutes),
          backgroundColor: '#2563eb',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } }
      }
    });
  } else {
    document.getElementById('elapsedChartTitle').textContent = `Average vs. Median Elapsed Minutes (${groupBy === 'overall' ? 'Overall' : 'By ' + groupBy})`;
    charts.elapsed = new Chart(document.getElementById('elapsedChart'), {
      type: 'bar',
      data: {
        labels: summaryRows.map(r => r.key),
        datasets: [
          {
            label: 'Average (min)',
            data: summaryRows.map(r => Math.round(r.avg * 10) / 10),
            backgroundColor: '#2563eb',
            borderRadius: 5
          },
          {
            label: 'Median (min)',
            data: summaryRows.map(r => Math.round(r.median * 10) / 10),
            backgroundColor: '#16a34a',
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // Table
  const thead = document.getElementById('elapsedTableHead');
  const tbody = document.getElementById('elapsedTableBody');

  if (state.elapsedEntity !== '__ALL__' && groupBy !== 'overall') {
    thead.innerHTML = `
      <tr>
        <th>Student</th>
        <th>Class</th>
        <th>Grade</th>
        <th>Responder</th>
        <th>Request Time</th>
        <th>Response Time</th>
        <th>Elapsed Time</th>
      </tr>
    `;
    tbody.innerHTML = activeRecords.map(r => `
      <tr>
        <td><strong>${escapeHtml(r.fullName)}</strong></td>
        <td>${escapeHtml(r.className)}</td>
        <td>${escapeHtml(r.grade)}</td>
        <td>${escapeHtml(r.responder || '—')}</td>
        <td>${escapeHtml(r.timestamp)}</td>
        <td>${escapeHtml(r.responseTimestamp)}</td>
        <td><strong>${formatMinutes(r.elapsedMinutes)}</strong></td>
      </tr>
    `).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);">No timed responses found.</td></tr>';
  } else {
    thead.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Timed Responses</th>
        <th>Average Elapsed</th>
        <th>Median Elapsed</th>
        <th>Fastest (Min)</th>
        <th>Longest (Max)</th>
      </tr>
    `;
    tbody.innerHTML = summaryRows.map(r => `
      <tr>
        <td><strong>${escapeHtml(r.key)}</strong></td>
        <td>${r.count}</td>
        <td>${formatMinutes(r.avg)}</td>
        <td>${formatMinutes(r.median)}</td>
        <td>${r.min} min</td>
        <td>${r.max} min</td>
      </tr>
    `).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">No timed responses in selected timespan.</td></tr>';
  }
}

// =========================================================================
// RENDER TAB 3: PIE CHARTS & DAY-DIVISION INTERFACE
// =========================================================================
function renderCustomBlocksUI() {
  const list = document.getElementById('customBlockList');
  list.innerHTML = state.customBlocks.map((b, idx) => `
    <div class="custom-block-row">
      <input type="text" data-bidx="${idx}" data-bfield="label" value="${escapeHtml(b.label)}" placeholder="Period Name" style="width: 220px;" />
      <span style="font-size:12px;color:var(--text-muted);">From</span>
      <input type="time" data-bidx="${idx}" data-bfield="start" value="${escapeHtml(b.start === '24:00' ? '23:59' : b.start)}" />
      <span style="font-size:12px;color:var(--text-muted);">To</span>
      <input type="time" data-bidx="${idx}" data-bfield="end" value="${escapeHtml(b.end === '24:00' ? '23:59' : b.end)}" />
      <button class="danger" data-delblock="${idx}">Remove</button>
    </div>
  `).join('');

  list.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('change', e => {
      const idx = Number(e.target.dataset.bidx);
      const field = e.target.dataset.bfield;
      state.customBlocks[idx][field] = e.target.value;
      renderPie();
      if (state.overviewTimeBucket === 'custom') renderOverview();
    });
  });

  list.querySelectorAll('[data-delblock]').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = Number(e.target.dataset.delblock);
      if (state.customBlocks.length <= 1) {
        showToast('Keep at least one time block.');
        return;
      }
      state.customBlocks.splice(idx, 1);
      renderCustomBlocksUI();
      renderPie();
    });
  });
}

function renderPie() {
  const records = getTimespanFilteredRecords();
  const dim = state.pieDimension;

  const builder = document.getElementById('dayDivisionBuilder');
  builder.style.display = dim === 'portionOfDay' ? 'block' : 'none';

  let slices = [];

  if (dim === 'portionOfDay') {
    const step = state.intervalMinutes === 'customMin' ? state.customMinutes : Number(state.intervalMinutes);
    slices = bucketRecordsByTimeOfDay(records, state.divisionMode, step, state.hideEmptySlices, false);
  } else if (dim === 'dayOfWeek') {
    // Monday through Friday only
    slices = WEEKDAYS.map(wd => ({
      label: wd.name,
      count: records.filter(r => r.reqDate && r.reqDate.getDay() === wd.jsDay).length
    }));
  } else {
    const map = new Map();
    records.forEach(r => {
      let key = '';
      if (dim === 'grade') key = r.grade || '(Unknown)';
      else if (dim === 'class') key = r.className || '(Unassigned)';
      else if (dim === 'student') key = r.fullName || '(Unknown)';
      else if (dim === 'location') key = r.location || '(Unknown)';
      else if (dim === 'responder') key = r.responder || '(Open / Unassigned)';
      map.set(key, (map.get(key) || 0) + 1);
    });

    slices = [...map.entries()].map(([label, count]) => ({ label, count }));
  }

  // Arrange all pie chart slices by size (largest to smallest)
  slices.sort((a, b) => (b.count - a.count) || a.label.localeCompare(b.label));

  const total = slices.reduce((acc, s) => acc + s.count, 0);
  const colors = slices.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]);

  if (charts.pie) charts.pie.destroy();
  charts.pie = new Chart(document.getElementById('pieChartCanvas'), {
    type: 'pie',
    data: {
      labels: slices.map(s => s.label),
      datasets: [{
        data: slices.map(s => s.count),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: ctx => {
              const val = ctx.parsed || 0;
              const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
              return ` ${ctx.label}: ${val} (${pct}%)`;
            }
          }
        }
      }
    }
  });

  const tbody = document.getElementById('pieBreakdownBody');
  if (!slices.length || total === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);">No records in the selected timespan.</td></tr>';
    return;
  }

  tbody.innerHTML = slices.map((s, idx) => {
    const pct = ((s.count / total) * 100).toFixed(1);
    return `
      <tr>
        <td>
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colors[idx]};margin-right:6px;"></span>
          <strong>${escapeHtml(s.label)}</strong>
        </td>
        <td>${s.count}</td>
        <td><strong>${pct}%</strong></td>
      </tr>
    `;
  }).join('');
}

// =========================================================================
// RENDER TAB 4: RAW DATA SORTABLE TABLE
// =========================================================================
function renderRawTable() {
  let records = getTimespanFilteredRecords();
  const q = state.rawSearch.trim().toLowerCase();

  if (q) {
    records = records.filter(r =>
      r.fullName.toLowerCase().includes(q) ||
      r.className.toLowerCase().includes(q) ||
      r.grade.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.responder.toLowerCase().includes(q) ||
      r.notes.toLowerCase().includes(q) ||
      r.timestamp.toLowerCase().includes(q)
    );
  }

  const col = state.rawSortCol;
  const dir = state.rawSortDir === 'asc' ? 1 : -1;

  records.sort((a, b) => {
    if (col === 'timestamp') {
      const ta = a.reqDate ? a.reqDate.getTime() : 0;
      const tb = b.reqDate ? b.reqDate.getTime() : 0;
      return (ta - tb) * dir;
    }
    if (col === 'responseTimestamp') {
      const ta = a.resDate ? a.resDate.getTime() : 0;
      const tb = b.resDate ? b.resDate.getTime() : 0;
      return (ta - tb) * dir;
    }
    if (col === 'elapsedMinutes') {
      const va = a.elapsedMinutes === null ? -1 : a.elapsedMinutes;
      const vb = b.elapsedMinutes === null ? -1 : b.elapsedMinutes;
      return (va - vb) * dir;
    }
    if (col === 'grade') {
      return compareGrades(a.grade, b.grade) * dir;
    }
    return String(a[col] || '').localeCompare(String(b[col] || '')) * dir;
  });

  document.querySelectorAll('#tab-raw th.sortable').forEach(th => {
    const ind = th.querySelector('.sort-ind');
    if (th.dataset.sort === col) {
      ind.textContent = state.rawSortDir === 'asc' ? '▲' : '▼';
    } else {
      ind.textContent = '';
    }
  });

  const tbody = document.getElementById('rawTableBody');
  if (!records.length) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;color:var(--text-muted);padding:20px;">No records match the current timespan or search filter.</td></tr>';
    return;
  }

  tbody.innerHTML = records.map(r => `
    <tr>
      <td>${escapeHtml(r.firstName)}</td>
      <td>${escapeHtml(r.lastName)}</td>
      <td>${escapeHtml(r.className)}</td>
      <td><span class="badge badge-grade">${escapeHtml(r.grade)}</span></td>
      <td style="white-space:nowrap;">${escapeHtml(r.timestamp)}</td>
      <td>${escapeHtml(r.location)}</td>
      <td>${r.responder ? escapeHtml(r.responder) : '<span class="badge badge-open">Open</span>'}</td>
      <td style="white-space:nowrap;">${escapeHtml(r.responseTimestamp || '—')}</td>
      <td style="white-space:nowrap;">${r.elapsedMinutes !== null ? r.elapsedMinutes + ' min' : '—'}</td>
      <td class="notes-cell">${escapeHtml(r.notes || '')}</td>
    </tr>
  `).join('');

  requestAnimationFrame(enhanceTruncatedNotes);
}

function exportFilteredCsv() {
  const records = getTimespanFilteredRecords();
  const headers = ['first name', 'last name', 'class', 'grade', 'timestamp', 'location', 'responder', 'response timestamp', 'elapsed minutes', 'notes'];
  const escapeCsv = val => `"${String(val ?? '').replace(/"/g, '""')}"`;
  const lines = [headers.join(',')];
  records.forEach(r => {
    lines.push([
      r.firstName, r.lastName, r.className, r.grade,
      r.timestamp, r.location, r.responder, r.responseTimestamp,
      r.elapsedMinutes ?? '', r.notes
    ].map(escapeCsv).join(','));
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `level2_records_${state.startDate || 'all'}_to_${state.endDate || 'present'}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// =========================================================================
// RENDER TAB 5: MANAGE RESPONDERS
// =========================================================================
function renderRespondersManager() {
  const tbody = document.getElementById('respondersManageBody');
  if (!state.responderDetails.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:18px;">No responders found.</td></tr>';
    return;
  }

  tbody.innerHTML = state.responderDetails.map((r, idx) => `
    <tr>
      <td><strong>${escapeHtml(r.name)}</strong></td>
      <td>${escapeHtml(r.email)}</td>
      <td>${r.responses ?? 0}</td>
      <td>
        <button class="danger" data-del-resp-idx="${idx}">Delete</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-del-resp-idx]').forEach(btn => {
    btn.addEventListener('click', async e => {
      const idx = Number(e.target.dataset.delRespIdx);
      const target = state.responderDetails[idx];
      if (!target) return;
      if (!confirm(`Remove "${target.name}" (${target.email}) from the responders list?`)) return;

      btn.disabled = true;
      btn.textContent = 'Deleting...';
      try {
        await postAction({
          action: 'deleteResponder',
          name: target.name,
          email: target.email
        });
        renderRespondersManager();
        showToast(`Removed ${target.name} from responders.`);
      } catch (err) {
        showToast('Delete failed: ' + err.message);
        btn.disabled = false;
        btn.textContent = 'Delete';
      }
    });
  });
}

// =========================================================================
// MASTER RENDER & EVENT LISTENERS
// =========================================================================
function renderAll() {
  const count = getTimespanFilteredRecords().length;
  document.getElementById('filteredCountBadge').textContent = `Showing ${count} record${count === 1 ? '' : 's'}`;

  renderOverview();
  renderElapsed();
  renderPie();
  renderRawTable();
  renderRespondersManager();
}

function applyTimespanPreset(preset) {
  const today = new Date();
  const endStr = toYMD(today);
  let startStr = '';

  if (preset === 'schoolYear') {
    startStr = getMostRecentAugustFirst();
  } else if (preset === 'last7') {
    const d = new Date(today);
    d.setDate(d.getDate() - 7);
    startStr = toYMD(d);
  } else if (preset === 'last30') {
    const d = new Date(today);
    d.setDate(d.getDate() - 30);
    startStr = toYMD(d);
  } else if (preset === 'thisMonth') {
    startStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
  } else if (preset === 'all') {
    startStr = '';
  }

  state.startDate = startStr;
  state.endDate = preset === 'all' ? '' : endStr;
  document.getElementById('startDate').value = state.startDate;
  document.getElementById('endDate').value = state.endDate;

  document.querySelectorAll('[data-preset]').forEach(b => {
    b.classList.toggle('active', b.dataset.preset === preset);
  });

  renderAll();
}

function init() {
  applyTimespanPreset('schoolYear');

  document.getElementById('refreshBtn').addEventListener('click', loadData);

  // Click-to-expand / click-to-collapse long notes
  document.addEventListener('click', e => {
    const noteCell = e.target.closest('.notes-cell');
    if (noteCell && (noteCell.classList.contains('is-truncated') || noteCell.classList.contains('expanded'))) {
      noteCell.classList.toggle('expanded');
    }
  });

  // Timespan events
  document.getElementById('startDate').addEventListener('change', e => {
    state.startDate = e.target.value;
    document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
    renderAll();
  });
  document.getElementById('endDate').addEventListener('change', e => {
    state.endDate = e.target.value;
    document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
    renderAll();
  });
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => applyTimespanPreset(btn.dataset.preset));
  });

  // Navigation Tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeTab = tab.dataset.tab;
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${state.activeTab}`));
      requestAnimationFrame(enhanceTruncatedNotes);
    });
  });

  // Tab 1: Overview Scope Controls
  document.getElementById('scopeType').addEventListener('change', e => {
    state.scopeType = e.target.value;
    state.scopeValue = '';
    renderOverview();
  });
  document.getElementById('scopeValue').addEventListener('change', e => {
    state.scopeValue = e.target.value;
    renderOverview();
  });
  document.getElementById('overviewTimeBucket').addEventListener('change', e => {
    state.overviewTimeBucket = e.target.value;
    renderOverview();
  });

  // Tab 2: Elapsed Controls
  document.getElementById('elapsedGroupBy').addEventListener('change', e => {
    state.elapsedGroupBy = e.target.value;
    state.elapsedEntity = '__ALL__';
    renderElapsed();
  });
  document.getElementById('elapsedEntitySelect').addEventListener('change', e => {
    state.elapsedEntity = e.target.value;
    renderElapsed();
  });

  // Tab 3: Pie Chart & Day Division Controls
  document.querySelectorAll('#pieDimensionButtons [data-dim]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.pieDimension = btn.dataset.dim;
      document.querySelectorAll('#pieDimensionButtons [data-dim]').forEach(b => b.classList.toggle('active', b === btn));
      renderPie();
    });
  });
  document.getElementById('divisionMode').addEventListener('change', e => {
    state.divisionMode = e.target.value;
    document.getElementById('equalDivisionControls').style.display = state.divisionMode === 'equal' ? 'flex' : 'none';
    document.getElementById('customBlocksControls').style.display = state.divisionMode === 'customBlocks' ? 'block' : 'none';
    renderPie();
  });
  document.getElementById('intervalMinutes').addEventListener('change', e => {
    state.intervalMinutes = e.target.value;
    document.getElementById('customMinutesGroup').style.display = state.intervalMinutes === 'customMin' ? 'flex' : 'none';
    renderPie();
    if (state.overviewTimeBucket === 'custom') renderOverview();
  });
  document.getElementById('customMinutesInput').addEventListener('change', e => {
    state.customMinutes = Math.max(1, Math.min(720, Number(e.target.value) || 45));
    renderPie();
    if (state.overviewTimeBucket === 'custom') renderOverview();
  });
  document.getElementById('hideEmptySlices').addEventListener('change', e => {
    state.hideEmptySlices = e.target.checked;
    renderPie();
  });
  document.getElementById('addCustomBlockBtn').addEventListener('click', () => {
    state.customBlocks.push({ label: 'New Period', start: '12:00', end: '13:00' });
    renderCustomBlocksUI();
    renderPie();
  });
  document.getElementById('resetCustomBlocksBtn').addEventListener('click', () => {
    state.customBlocks = [
      { label: 'Early Morning (Before 9:00)', start: '00:00', end: '09:00' },
      { label: 'Mid-Morning (9:00–11:00)', start: '09:00', end: '11:00' },
      { label: 'Midday / Lunch (11:00–13:00)', start: '11:00', end: '13:00' },
      { label: 'Afternoon (13:00–15:30)', start: '13:00', end: '15:30' },
      { label: 'After School (15:30+)', start: '15:30', end: '24:00' }
    ];
    renderCustomBlocksUI();
    renderPie();
  });
  renderCustomBlocksUI();

  // Tab 4: Raw Data Sorting & Search
  document.querySelectorAll('#tab-raw th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (state.rawSortCol === col) {
        state.rawSortDir = state.rawSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.rawSortCol = col;
        state.rawSortDir = col === 'timestamp' || col === 'responseTimestamp' || col === 'elapsedMinutes' ? 'desc' : 'asc';
      }
      renderRawTable();
    });
  });
  document.getElementById('rawSearchInput').addEventListener('input', e => {
    state.rawSearch = e.target.value;
    renderRawTable();
  });
  document.getElementById('exportCsvBtn').addEventListener('click', exportFilteredCsv);

  // Tab 5: Add Responder Form
  document.getElementById('addResponderForm').addEventListener('submit', async e => {
    e.preventDefault();
    const nameInp = document.getElementById('newResponderName');
    const emailInp = document.getElementById('newResponderEmail');
    const submitBtn = document.getElementById('addResponderSubmitBtn');

    const name = nameInp.value.trim();
    const email = emailInp.value.trim();
    if (!name || !email) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';
    try {
      await postAction({ action: 'addResponder', name, email });
      nameInp.value = '';
      emailInp.value = '';
      renderRespondersManager();
      showToast(`Added ${name} (${email}) to responders.`);
    } catch (err) {
      showToast('Failed to add responder: ' + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Add Responder';
    }
  });

  loadData();
}

window.addEventListener('resize', enhanceTruncatedNotes);
window.addEventListener('DOMContentLoaded', init);
