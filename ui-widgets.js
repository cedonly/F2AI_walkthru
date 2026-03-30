// ===== UI WIDGETS =====
// Dropdowns, date pickers, sort popups, UI interactions


// ===== CUSTOM SELECT (replaces native <select>) =====
function toggleFpSelect(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  // Close other open custom selects
  document.querySelectorAll('.fp-custom-select.open').forEach(w => {
    if (w.id !== wrapId) w.classList.remove('open');
  });
  wrap.classList.toggle('open');
}

function pickFpSelect(wrapId, el) {
  const wrap = document.getElementById(wrapId);
  wrap.querySelectorAll('.fp-select-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  const label = wrap.querySelector('[id$="-label"]');
  if (label) label.textContent = el.textContent;
  wrap.classList.remove('open');
}

function resetFpSelect(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.querySelectorAll('.fp-select-opt').forEach(o => o.classList.remove('active'));
  const first = wrap.querySelector('.fp-select-opt');
  if (first) first.classList.add('active');
  const label = wrap.querySelector('[id$="-label"]');
  if (label && first) label.textContent = first.textContent;
}

function setFpSelect(wrapId, val) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.querySelectorAll('.fp-select-opt').forEach(o => {
    o.classList.toggle('active', o.dataset.val === val);
  });
  const active = wrap.querySelector('.fp-select-opt.active');
  const label = wrap.querySelector('[id$="-label"]');
  if (label && active) label.textContent = active.textContent;
}

// Close custom selects on outside click
document.addEventListener('click', function(e) {
  document.querySelectorAll('.fp-custom-select.open').forEach(wrap => {
    if (!wrap.contains(e.target)) wrap.classList.remove('open');
  });
});

// ===== CUSTOM DATE PICKER =====
const dpMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const dpDays = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function toggleDatePicker(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  // Close other open date pickers
  document.querySelectorAll('.dp-wrap.open').forEach(w => {
    if (w.id !== wrapId) w.classList.remove('open');
  });
  const wasOpen = wrap.classList.contains('open');
  wrap.classList.toggle('open');
  if (!wasOpen) {
    const stored = wrap.dataset.value;
    let d;
    if (stored) {
      const parts = stored.split('-');
      d = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      d = new Date();
    }
    wrap._dpYear = d.getFullYear();
    wrap._dpMonth = d.getMonth();
    renderCalendar(wrap);
  }
}

function renderCalendar(wrap) {
  const cal = wrap.querySelector('.dp-cal');
  const year = wrap._dpYear;
  const month = wrap._dpMonth;
  const today = new Date();
  const selectedVal = wrap.dataset.value || '';

  // First day of month, days in month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  let html = '<div class="dp-nav">';
  html += '<button class="dp-nav-btn" onclick="event.stopPropagation();dpNav(\'' + wrap.id + '\',-1)"><span class="mi">chevron_left</span></button>';
  html += '<span class="dp-month-label">' + dpMonths[month] + ' ' + year + '</span>';
  html += '<button class="dp-nav-btn" onclick="event.stopPropagation();dpNav(\'' + wrap.id + '\',1)"><span class="mi">chevron_right</span></button>';
  html += '</div>';

  html += '<div class="dp-weekdays">';
  dpDays.forEach(d => { html += '<div class="dp-weekday">' + d + '</div>'; });
  html += '</div>';

  html += '<div class="dp-days">';
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrev - i;
    html += '<div class="dp-day other-month" onclick="event.stopPropagation();dpPickDay(\'' + wrap.id + '\',' + year + ',' + (month - 1) + ',' + day + ')">' + day + '</div>';
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    let cls = 'dp-day';
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) cls += ' today';
    if (dateStr === selectedVal) cls += ' selected';
    html += '<div class="' + cls + '" onclick="event.stopPropagation();dpPickDay(\'' + wrap.id + '\',' + year + ',' + month + ',' + d + ')">' + d + '</div>';
  }
  // Next month days to fill grid
  const totalCells = firstDay + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    html += '<div class="dp-day other-month" onclick="event.stopPropagation();dpPickDay(\'' + wrap.id + '\',' + year + ',' + (month + 1) + ',' + d + ')">' + d + '</div>';
  }
  html += '</div>';

  html += '<div class="dp-footer">';
  html += '<button class="dp-footer-btn" onclick="event.stopPropagation();clearDatePicker(\'' + wrap.id + '\')">Clear</button>';
  html += '<button class="dp-footer-btn today-btn" onclick="event.stopPropagation();dpPickToday(\'' + wrap.id + '\')">Today</button>';
  html += '</div>';

  cal.innerHTML = html;
}

function dpNav(wrapId, dir) {
  const wrap = document.getElementById(wrapId);
  wrap._dpMonth += dir;
  if (wrap._dpMonth > 11) { wrap._dpMonth = 0; wrap._dpYear++; }
  if (wrap._dpMonth < 0) { wrap._dpMonth = 11; wrap._dpYear--; }
  renderCalendar(wrap);
}

function dpPickDay(wrapId, y, m, d) {
  // Handle month overflow
  const date = new Date(y, m, d);
  const val = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  const wrap = document.getElementById(wrapId);
  wrap.dataset.value = val;
  wrap.classList.add('has-value');
  const textEl = wrap.querySelector('.dp-text');
  textEl.textContent = dpMonths[date.getMonth()].substring(0, 3) + ' ' + date.getDate() + ', ' + date.getFullYear();
  textEl.classList.remove('dp-empty');
  wrap.classList.remove('open');
}

function dpPickToday(wrapId) {
  const t = new Date();
  dpPickDay(wrapId, t.getFullYear(), t.getMonth(), t.getDate());
}

function clearDatePicker(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  delete wrap.dataset.value;
  wrap.classList.remove('has-value', 'open');
  const textEl = wrap.querySelector('.dp-text');
  const isFrom = wrapId.includes('from');
  textEl.textContent = isFrom ? 'From' : 'To';
  textEl.classList.add('dp-empty');
}

function setDatePicker(wrapId, val) {
  const wrap = document.getElementById(wrapId);
  if (!wrap || !val) return;
  const parts = val.split('-');
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  wrap.dataset.value = val;
  wrap.classList.add('has-value');
  const textEl = wrap.querySelector('.dp-text');
  textEl.textContent = dpMonths[date.getMonth()].substring(0, 3) + ' ' + date.getDate() + ', ' + date.getFullYear();
  textEl.classList.remove('dp-empty');
}

// Close date pickers on outside click
document.addEventListener('click', function(e) {
  document.querySelectorAll('.dp-wrap.open').forEach(wrap => {
    if (!wrap.contains(e.target)) wrap.classList.remove('open');
  });
});

// ===== SORT POPOVER =====
function toggleSortPop(popId) {
  const pop = document.getElementById(popId);
  if (!pop) return;
  const wrap = pop.closest('.sort-wrap');
  // Close any other open sort popovers first
  document.querySelectorAll('.sort-wrap.open').forEach(w => {
    if (w !== wrap) { w.classList.remove('open'); w.querySelector('.sort-pop')?.classList.remove('open'); }
  });
  pop.classList.toggle('open');
  if (wrap) wrap.classList.toggle('open');
}

function closeSortPop(pop) {
  pop.classList.remove('open');
  const wrap = pop.closest('.sort-wrap');
  if (wrap) wrap.classList.remove('open');
}

function pickDashSort(el) {
  const pop = el.closest('.sort-pop');
  pop.querySelectorAll('.sort-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  dashSortVal = el.dataset.sort;
  document.getElementById('dash-sort-label').textContent = el.textContent;
  closeSortPop(pop);
  sortCarousel();
}

function pickRfqSort(el) {
  const pop = el.closest('.sort-pop');
  pop.querySelectorAll('.sort-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  rfqSortVal = el.dataset.sort;
  document.getElementById('rfq-sort-label').textContent = el.textContent;
  closeSortPop(pop);
  sortRfqTable();
  updateSortIndicators();
}

// Close sort popovers when clicking outside
document.addEventListener('click', function(e) {
  document.querySelectorAll('.sort-pop.open').forEach(pop => {
    const wrap = pop.closest('.sort-wrap');
    if (wrap && !wrap.contains(e.target)) closeSortPop(pop);
  });
});

// ===== INIT =====
// Render RFQ table data
renderRfqTable();
renderRfqCards();
// Initialize report KPI colors with dynamic thresholds
renderReportsPeriod('bid', '12M');
renderReportsPeriod('production', 'Today');
renderReportsPeriod('quality', 'Quarter');
renderReportsPeriod('utilization', 'Today');
// Start on dashboard
navigateTo('dashboard');
