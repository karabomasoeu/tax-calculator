/**
Note: Handles UI interaction for the Tax Calculator app.
      Depends on taxCalculator.js being loaded first.
 */

function fmt(value) {
  return '$' + value.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function showError(message) {
  const errEl = document.getElementById('error');
  errEl.textContent = message;
  errEl.classList.add('visible');
}

function clearError() {
  const errEl = document.getElementById('error');
  errEl.textContent = '';
  errEl.classList.remove('visible');
}

function calculate() {
  clearError();
  document.getElementById('results').classList.remove('visible');

  const raw = document.getElementById('income').value;
  const income = parseFloat(raw);

  if (raw === '' || isNaN(income) || income < 0) {
    showError('Please enter a valid income amount.');
    return;
  }

  try {
    const summary = getTaxSummary(income);

    document.getElementById('res-tax').textContent = fmt(summary.taxPayable);
    document.getElementById('res-net').textContent = fmt(summary.netIncome);
    document.getElementById('res-eff').textContent = summary.effectiveRate + '%';
    document.getElementById('res-mar').textContent = summary.marginalRate + '%';

    document.getElementById('results').classList.add('visible');
  } catch (e) {
    showError(e.message);
  }
}

// Allow Enter key to trigger calculation
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('income');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') calculate();
    });
  }
});
