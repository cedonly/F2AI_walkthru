// ===== QUALITY MODULE =====
// NCR data generation, table rendering, filtering, sorting

// ===== DATA GENERATION =====
function buildQualityData() {
  var operations = ['CNC Machining','Welding','Grinding','Heat Treat','NDT Inspection','Assembly','Coating','Forming','Boring','Turning','Milling','Blasting'];
  var defects = ['Dimensional out of tolerance','Surface crack detected','Porosity in weld','Incomplete penetration','Hardness out of spec','Material traceability gap','Wrong alloy used','Coating adhesion failure','Thread damage','Concentricity deviation','Surface roughness exceeded','Misalignment detected','Inclusion found in X-ray','Blow hole in casting','Delamination noted','Hydrogen embrittlement suspect'];
  var statuses = ['Open','Awaiting Disposition','In Review','Closed - Use As-Is','Closed - Rework'];
  var severities = ['Minor','Major','Critical'];
  var parts = ['Pump bracket','Valve body','Motor mount','Deck plate insert','Bearing housing','Pipe spool assembly','Stanchion base','Structural bracket','Rudder bearing assembly','Anchor chain stopper','Hatch frame','Propeller shaft section','Hull insert plate','Bulkhead stiffener','Foundation pad'];

  var seed = 67890;
  var r = function() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  var pick = function(a) { return a[Math.floor(r() * a.length)]; };

  var data = [];
  var now = new Date('2026-02-14T12:00:00');

  for (var i = 0; i < 30; i++) {
    var daysBack = i < 5 ? Math.floor(r() * 5) :
                   i < 12 ? 5 + Math.floor(r() * 14) :
                   i < 22 ? 19 + Math.floor(r() * 30) :
                   49 + Math.floor(r() * 60);

    var created = new Date(now);
    created.setDate(created.getDate() - daysBack);

    var status;
    if (daysBack < 5) status = pick(['Open','Open','Awaiting Disposition']);
    else if (daysBack < 19) status = pick(['Awaiting Disposition','In Review','In Review','Open']);
    else if (daysBack < 49) status = pick(['In Review','Closed - Use As-Is','Closed - Rework','Closed - Rework']);
    else status = pick(['Closed - Use As-Is','Closed - Rework','Closed - Rework','Closed - Use As-Is']);

    var severity;
    if (daysBack < 5) severity = pick(['Major','Critical','Minor']);
    else severity = pick(severities);

    var qty = 1 + Math.floor(r() * 8);
    var jobIdx = Math.floor(r() * 50);

    data.push({
      id: 'NCR-' + String(100 + i).padStart(3, '0'),
      job: 'J-2026-' + String(100 + jobIdx).padStart(3, '0'),
      part: pick(parts),
      operation: pick(operations),
      defect: pick(defects),
      qty: qty,
      status: status,
      age: daysBack,
      severity: severity
    });
  }

  data.sort(function(a, b) { return b.age - a.age; });
  return data;
}

var qualityData = buildQualityData();

// ===== RENDERING =====
function renderQualityTable() {
  var tbody = document.getElementById('quality-tbody');
  if (!tbody) return;

  var statusMap = {
    'Open': 'badge-red',
    'Awaiting Disposition': 'badge-yellow',
    'In Review': 'badge-cyan',
    'Closed - Use As-Is': 'badge-emerald',
    'Closed - Rework': 'badge-green'
  };

  var severityMap = {
    'Critical': '<span class="badge badge-red">Critical</span>',
    'Major': '<span class="badge badge-yellow">Major</span>',
    'Minor': '<span class="badge" style="background:rgba(107,114,128,.15);color:var(--steel-300)">Minor</span>'
  };

  var html = '';
  qualityData.forEach(function(d) {
    var statusCls = statusMap[d.status] || '';
    var statusBadge = '<span class="badge ' + statusCls + '">' + d.status + '</span>';
    var ageStr = d.age === 0 ? 'Today' : d.age === 1 ? '1 day' : d.age + ' days';
    var ageColor = d.age > 30 ? 'var(--danger)' : d.age > 14 ? 'var(--warning)' : 'var(--steel-300)';

    html += '<tr onclick="navigateTo(\'ncr-detail\')"'
      + ' data-status="' + d.status + '" data-severity="' + d.severity + '"'
      + ' data-age="' + d.age + '" data-job="' + d.job + '"'
      + ' data-operation="' + d.operation + '">'
      + '<td style="color:var(--cyan-400);font-weight:600;font-family:var(--font-mono)">' + d.id + '</td>'
      + '<td style="font-family:var(--font-mono);font-size:12px;color:var(--steel-300)">' + d.job + '</td>'
      + '<td>' + d.part + '</td>'
      + '<td>' + d.operation + '</td>'
      + '<td style="max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + d.defect + '</td>'
      + '<td style="text-align:center">' + d.qty + '</td>'
      + '<td>' + statusBadge + '</td>'
      + '<td style="color:' + ageColor + ';font-weight:600;font-size:12px">' + ageStr + '</td>'
      + '<td>' + (severityMap[d.severity] || '') + '</td>'
      + '</tr>';
  });
  tbody.innerHTML = html;
  updateQualityCount();
}

function updateQualityCount() {
  var rows = document.querySelectorAll('#quality-tbody tr');
  var visible = 0;
  rows.forEach(function(r) { if (r.style.display !== 'none') visible++; });
  var el = document.getElementById('quality-row-count');
  if (el) el.textContent = visible + ' NCRs';
}

// ===== FILTER SYSTEM =====
var qualityFilters = { operation:'', statuses:[], severities:[], ageFrom:'', ageTo:'', search:'' };

function toggleQualityFilterPanel() {
  var panel = document.getElementById('quality-filter-panel');
  var btn = document.getElementById('quality-funnel');
  if (panel) panel.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

function readQualityFilterPanel() {
  var opInput = document.querySelector('#cb-quality-operation input');
  qualityFilters.operation = opInput?.dataset.selected || '';
  qualityFilters.statuses = [];
  document.querySelectorAll('#ck-quality-status .ck-item.checked').forEach(function(el) {
    qualityFilters.statuses.push(el.dataset.val);
  });
  qualityFilters.severities = [];
  document.querySelectorAll('#ck-quality-severity .ck-item.checked').forEach(function(el) {
    qualityFilters.severities.push(el.dataset.val);
  });
}

function applyQualityFilters() {
  readQualityFilterPanel();
  var search = (document.getElementById('quality-search')?.value || '').toLowerCase();
  var rows = document.querySelectorAll('#quality-tbody tr');
  var visible = 0;
  rows.forEach(function(row) {
    var text = row.textContent.toLowerCase();
    var show = true;
    if (search && !text.includes(search)) show = false;
    if (show && !matchesSearchPills('quality', text)) show = false;
    if (show && qualityFilters.operation && row.dataset.operation !== qualityFilters.operation) show = false;
    if (show && qualityFilters.statuses.length > 0 && !qualityFilters.statuses.includes(row.dataset.status)) show = false;
    if (show && qualityFilters.severities.length > 0 && !qualityFilters.severities.includes(row.dataset.severity)) show = false;
    row.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  var el = document.getElementById('quality-row-count');
  if (el) el.textContent = visible + ' NCRs';
  renderQualityFilterChips();
}

function renderQualityFilterChips() {
  var container = document.getElementById('quality-filter-chips');
  if (!container) return;
  var html = renderSearchPillsHtml('quality');
  if (qualityFilters.operation) html += '<span class="fb-chip">' + qualityFilters.operation + '<span class="mi fb-chip-x" onclick="clearQualityFilter(\'operation\')">close</span></span>';
  qualityFilters.statuses.forEach(function(s) {
    html += '<span class="fb-chip">' + s + '<span class="mi fb-chip-x" onclick="clearQualityFilter(\'status\',\'' + s + '\')">close</span></span>';
  });
  qualityFilters.severities.forEach(function(p) {
    html += '<span class="fb-chip">' + p + '<span class="mi fb-chip-x" onclick="clearQualityFilter(\'severity\',\'' + p + '\')">close</span></span>';
  });
  container.innerHTML = html;
}

function clearQualityFilter(key, val) {
  if (key === 'operation') {
    qualityFilters.operation = '';
    var inp = document.querySelector('#cb-quality-operation input');
    if (inp) { inp.value = ''; delete inp.dataset.selected; }
  } else if (key === 'status') {
    document.querySelectorAll('#ck-quality-status .ck-item.checked').forEach(function(el) {
      if (el.dataset.val === val) el.classList.remove('checked');
    });
  } else if (key === 'severity') {
    document.querySelectorAll('#ck-quality-severity .ck-item.checked').forEach(function(el) {
      if (el.dataset.val === val) el.classList.remove('checked');
    });
  }
  applyQualityFilters();
}

function resetQualityFilters() {
  qualityFilters = { operation:'', statuses:[], severities:[], ageFrom:'', ageTo:'', search:'' };
  var search = document.getElementById('quality-search');
  if (search) search.value = '';
  searchPillStore.quality = [];
  var opInp = document.querySelector('#cb-quality-operation input');
  if (opInp) { opInp.value = ''; delete opInp.dataset.selected; }
  document.querySelectorAll('#quality-filter-panel .ck-item.checked').forEach(function(el) { el.classList.remove('checked'); });
  qualityActiveViewKey = '';
  updateQualitySvBtnLabel();
  applyQualityFilters();
}

// ===== SAVED VIEWS =====
var qualitySavedViews = {};
var qualityActiveViewKey = '';
var qualitySvNextId = 1;

function toggleQualitySavedViews() {
  var pop = document.getElementById('quality-sv-pop');
  var wrap = document.getElementById('quality-sv-wrap');
  if (!pop) return;
  pop.classList.toggle('open');
  if (wrap) wrap.classList.toggle('open', pop.classList.contains('open'));
  if (pop.classList.contains('open')) renderQualitySvList();
}

function closeQualitySavedViews() {
  var pop = document.getElementById('quality-sv-pop');
  var wrap = document.getElementById('quality-sv-wrap');
  if (pop) pop.classList.remove('open');
  if (wrap) wrap.classList.remove('open');
}

function renderQualitySvList() {
  var list = document.getElementById('quality-sv-list');
  if (!list) return;
  var html = '<div class="sv-item' + (qualityActiveViewKey === '' ? ' active' : '') + '" onclick="loadQualitySavedView(\'\')"><span>All NCRs</span></div>';
  Object.keys(qualitySavedViews).forEach(function(key) {
    var v = qualitySavedViews[key];
    var isActive = qualityActiveViewKey === key;
    html += '<div class="sv-item' + (isActive ? ' active' : '') + '" data-key="' + key + '" onclick="loadQualitySavedView(\'' + key + '\')">';
    html += '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + v.name + '</span>';
    html += '<span class="sv-actions"><button class="sv-act" onclick="event.stopPropagation();deleteQualitySv(\'' + key + '\')" title="Delete"><span class="mi" style="font-size:14px">close</span></button></span>';
    html += '</div>';
  });
  list.innerHTML = html;
}

function updateQualitySvBtnLabel() {
  var label = document.getElementById('quality-sv-btn-label');
  if (!label) return;
  label.textContent = (qualityActiveViewKey && qualitySavedViews[qualityActiveViewKey]) ? qualitySavedViews[qualityActiveViewKey].name : 'All NCRs';
}

function captureQualityCurrentFilters() {
  var f = {};
  var opInput = document.querySelector('#cb-quality-operation input');
  if (opInput && opInput.dataset.selected) f.operation = opInput.dataset.selected;
  var statuses = [];
  document.querySelectorAll('#ck-quality-status .ck-item.checked').forEach(function(el) { statuses.push(el.dataset.val); });
  if (statuses.length) f.statuses = statuses;
  var severities = [];
  document.querySelectorAll('#ck-quality-severity .ck-item.checked').forEach(function(el) { severities.push(el.dataset.val); });
  if (severities.length) f.severities = severities;
  if (searchPillStore.quality.length) f.searchPills = searchPillStore.quality.map(function(p) { return p.text; });
  return f;
}

function loadQualitySavedView(viewKey) {
  qualityFilters = { operation:'', statuses:[], severities:[], ageFrom:'', ageTo:'', search:'' };
  var search = document.getElementById('quality-search');
  if (search) search.value = '';
  searchPillStore.quality = [];
  var opInp = document.querySelector('#cb-quality-operation input');
  if (opInp) { opInp.value = ''; delete opInp.dataset.selected; }
  document.querySelectorAll('#quality-filter-panel .ck-item.checked').forEach(function(el) { el.classList.remove('checked'); });
  qualityActiveViewKey = viewKey;
  updateQualitySvBtnLabel();
  closeQualitySavedViews();
  if (!viewKey || !qualitySavedViews[viewKey]) { applyQualityFilters(); return; }
  var v = qualitySavedViews[viewKey].filters;
  if (v.operation) { var i = document.querySelector('#cb-quality-operation input'); if(i){ i.value=v.operation; i.dataset.selected=v.operation; } }
  if (v.statuses && v.statuses.length) {
    document.querySelectorAll('#ck-quality-status .ck-item').forEach(function(el) {
      if (v.statuses.includes(el.dataset.val)) el.classList.add('checked');
    });
  }
  if (v.severities && v.severities.length) {
    document.querySelectorAll('#ck-quality-severity .ck-item').forEach(function(el) {
      if (v.severities.includes(el.dataset.val)) el.classList.add('checked');
    });
  }
  if (v.searchPills && v.searchPills.length) {
    searchPillStore.quality = v.searchPills.map(function(t) { return {text: t}; });
  }
  applyQualityFilters();
}

function saveQualitySvFromModal(name) {
  var key = 'quality-custom-' + (qualitySvNextId++);
  qualitySavedViews[key] = { name: name, filters: captureQualityCurrentFilters() };
  qualityActiveViewKey = key;
  updateQualitySvBtnLabel();
  closeSvModal();
  applyQualityFilters();
}

function deleteQualitySv(key) {
  delete qualitySavedViews[key];
  if (qualityActiveViewKey === key) { qualityActiveViewKey = ''; updateQualitySvBtnLabel(); loadQualitySavedView(''); }
  renderQualitySvList();
}

document.addEventListener('click', function(e) {
  var wrap = document.getElementById('quality-sv-wrap');
  if (wrap && !wrap.contains(e.target)) closeQualitySavedViews();
});

// ===== SORTING =====
var qualitySortField = 'age';
var qualitySortDir = 'desc';

function sortQualityCol(field) {
  if (qualitySortField === field) {
    qualitySortDir = qualitySortDir === 'asc' ? 'desc' : 'asc';
  } else {
    qualitySortField = field;
    qualitySortDir = field === 'age' ? 'desc' : 'asc';
  }
  applyQualitySort();
  updateQualitySortIndicators();
}

function pickQualitySort(el) {
  var sort = el.dataset.sort;
  var parts = sort.split('-');
  qualitySortField = parts[0];
  qualitySortDir = parts[1];
  el.parentNode.querySelectorAll('.sort-opt').forEach(function(o) { o.classList.remove('active'); });
  el.classList.add('active');
  var label = document.getElementById('quality-sort-label');
  if (label) label.textContent = el.textContent;
  var pop = document.getElementById('quality-sort-pop');
  if (pop) pop.classList.remove('open');
  applyQualitySort();
  updateQualitySortIndicators();
}

function applyQualitySort() {
  var tbody = document.getElementById('quality-tbody');
  if (!tbody) return;
  var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
  var field = qualitySortField;
  var dir = qualitySortDir === 'asc' ? 1 : -1;

  var statusOrder = { 'Open':0, 'Awaiting Disposition':1, 'In Review':2, 'Closed - Rework':3, 'Closed - Use As-Is':4 };
  var severityOrder = { 'Critical':0, 'Major':1, 'Minor':2 };

  rows.sort(function(a, b) {
    var va, vb;
    if (field === 'age') { va = parseInt(a.dataset.age)||0; vb = parseInt(b.dataset.age)||0; return dir * (va - vb); }
    if (field === 'status') { va = statusOrder[a.dataset.status]||0; vb = statusOrder[b.dataset.status]||0; return dir * (va - vb); }
    if (field === 'severity') { va = severityOrder[a.dataset.severity]||0; vb = severityOrder[b.dataset.severity]||0; return dir * (va - vb); }
    if (field === 'operation') { va = a.dataset.operation; vb = b.dataset.operation; return dir * va.localeCompare(vb); }
    return 0;
  });
  rows.forEach(function(row) { tbody.appendChild(row); });
}

function updateQualitySortIndicators() {
  document.querySelectorAll('#page-quality .th-sort').forEach(function(th) {
    var arrow = th.querySelector('.sort-arrow');
    if (th.dataset.sort === qualitySortField) {
      th.classList.add('th-sort-active');
      if (arrow) arrow.textContent = qualitySortDir === 'asc' ? 'arrow_upward' : 'arrow_downward';
    } else {
      th.classList.remove('th-sort-active');
      if (arrow) arrow.textContent = 'arrow_downward';
    }
  });
}
