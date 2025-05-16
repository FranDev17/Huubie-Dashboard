let chartInstance = null;
let monthlyChartInstance = null;
let trendChartInstance = null;


// Datos para la gráfica de dona
const chartData = {
    type: {
        labels: ['Conciertos', 'Bodas', 'Conferencias', 'Deportes', 'Otros'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                '#1C64F1', 
                '#E60001', 
                '#0E9E6E', 
                '#FE6F00', 
                '#7152EC'  
            ],
            borderWidth: 0,
            borderRadius: 4
        }]
    },
    location: {
        labels: ['Tapachula', 'Tuxtla Gtz', 'Huixtla', 'Comitan', 'San Cristobal'],
        datasets: [{
            data: [45, 25, 20, 18, 16],
            backgroundColor: [
                '#1C64F1',
                '#E60001',
                '#FE6F00',
                '#7152EC',
                '#0E9E6E'
            ],
            borderWidth: 0,
            borderRadius: 4
        }]
    }
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
        legend: {
            position: 'right',
            labels: {
                color: '#94a3b8',
                padding: 15,
                font: { size: 12 },
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: 8,
            bodyFont: { size: 12 },
            boxPadding: 4
        }
    },
    cutout: '65%',
    animation: {
        animateScale: true,
        animateRotate: true
    }
};

// Datos para la gráfica de barras
const monthlyChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
        {
            label: 'Eventos',
            data: [12, 19, 10, 15, 8, 13],
            backgroundColor: '#1C64F1',
            borderRadius: 6,
            barThickness: 20,
            yAxisID: 'y'
        },
        {
            label: 'Ingresos',
            data: [24, 35, 20, 30, 18, 26],
            backgroundColor: '#0E9E6E',
            borderRadius: 6,
            barThickness: 20,
            yAxisID: 'y1'
        }
    ]
};

const monthlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: '#94a3b8',
                font: { size: 12 },
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: 8,
            bodyFont: { size: 12 },
            boxPadding: 4,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label === 'Ingresos') {
                        return `${label}: $${context.parsed.y}K`;
                    }
                    return `${label}: ${context.parsed.y}`;
                }
            }
        }
    },
    scales: {
        x: {
            ticks: { color: '#94a3b8' },
            grid: { display: false }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            beginAtZero: true,
            ticks: { 
                color: '#94a3b8',
                callback: function(value) {
                    return value + ' eventos';
                }
            },
            grid: { color: '#334155' }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            grid: { 
                drawOnChartArea: false
            },
            ticks: {
                color: '#94a3b8',
                callback: function(value) {
                    return '$' + value + 'K';
                }
            }
        }
    }
};

// Función para actualizar gráfica de dona
function updateChart(type) {
    if (chartInstance) chartInstance.destroy();

    const ctx = document.getElementById('eventChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: chartData[type],
        options: chartOptions
    });
}

// Función para inicializar gráfica de barras
function initMonthlyChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    monthlyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: monthlyChartData,
        options: monthlyChartOptions
    });
}


$(document).ready(function () {
   
    $('.relative.h-[250px]').css('height', '250px');
    
    // Gráfica de dona inicial
    updateChart('type');

    // Tabs de la gráfica de dona
    $('.chart-tab').click(function () {
        $('.chart-tab').removeClass('active bg-[#1C64F1] text-white').addClass('text-slate-400');
        $(this).addClass('active bg-[#1C64F1] text-white').removeClass('text-slate-400');

        updateChart($(this).data('type'));
    });

    // Inicializar gráfica de barras
    initMonthlyChart();
    //inicializar grafica de lineas
    inittrendChart();
    
    $(window).resize(function() {
        if (chartInstance) {
            chartInstance.resize();
        }
        if (monthlyChartInstance) {
            monthlyChartInstance.resize();
        }
    });
});

//Grafica de lineas (tendecia de ganancias)

const trendChardData={
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Ganancias Mensuales',
        data: [24000,35000,20000,30000,18000,26000], // aquí tus datos
        fill: false,
        borderColor: 'rgba(0, 255, 132, 1)',
        tension: 0.3
      }]

}

const trendChartOptions={
    
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: value => `$${value}` // formato dinero
          }
        }
      }
    
}


function inittrendChart() {
    const ctx = document.getElementById('trendChard').getContext('2d');
    trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: trendChardData,
        options: trendChartOptions
    });
}


