function graficComponent(config) {
  const defaults = {
    parent: 'body',
    id: 'trendCard',
    icon: 'trending_up',
    title: 'Tendencias',
    subtitle: 'Subtítulo aquí',
    //chartType: 'line',
    chartData: null,
    defaultCategory: null,
    class: '',
    json: {},
    onClick: null,
    ajustarTam:true
  };

  const settings = Object.assign({}, defaults, config);
  const initialKey = settings.defaultCategory || Object.keys(settings.chartData)[0];
  const chartId = `${settings.id}-chart`;

  const hasMultipleCategories = Object.keys(settings.chartData).length > 1;
  const $card = $(`
    <section id="${settings.id}" class="bg-[#111827] text-white p-6 rounded-3xl border border-slate-700/50 shadow-lg ${settings.class}">
      <header class="mb-4 flex items-center gap-3">
        <span class="p-2 bg-[#0E9E6E]/20 rounded-lg">
          <span class="material-icons text-[#0E9E6E] text-lg">${settings.icon}</span>
        </span>
        <div>
          <h2 class="font-semibold text-white text-sm">${settings.title}</h2>
          <p class="text-xs text-white/50">${settings.subtitle}</p>
        </div>
        ${hasMultipleCategories ? `
            <div id="${settings.id}-buttons" class="ml-auto flex gap-2">
                ${Object.keys(settings.chartData).map(key => `
                    <button data-key="${key}" class="chart-tab active bg-[#1C64F1] px-2.5 py-1 rounded-md text-xs font-medium text-white transition-all duration-300">${key}</button>
                `).join('')}
            </div>` : ''}
      </header>
      <div class="w-full flex justify-center ${settings.chartType === 'doughnut' ? ' w-[410px]' : ''}">
        <canvas id="${chartId}" class="w-3/4"></canvas>
      </div>
    </section>
  `);

    
  if (typeof settings.onClick === 'function') {
    $card.on('click', settings.onClick);
  }

  $(settings.parent).append($card);

  const ctx = document.getElementById(chartId).getContext('2d');
  let chart = new Chart(ctx, {
    type: settings.chartType,
    data: settings.chartData[initialKey],
    options: {
      responsive: true,
      maintainAspectRatio: settings.ajustarTam,
      plugins: {
        legend: {
          labels: { color: '#fff' },
           position: settings.chartType === 'doughnut' ? 'right' : 'top',

        },
      },
      scales: (settings.chartType === 'doughnut') ? {} : {
        x: {
          ticks: { color: 'white' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: 'white' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });

  // Cambiar dataset si hay selector
  if (hasMultipleCategories) {
  $(`#${settings.id}-buttons button`).on('click', function () {
    const selectedKey = $(this).data('key');
    chart.data = settings.chartData[selectedKey];
    chart.update();

    // Opcional: Estilo activo
    $(`#${settings.id}-buttons button`).removeClass('bg-white/20 font-semibold');
    $(this).addClass('bg-white/20 font-semibold');
  });
}
}
