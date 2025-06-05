let chartInstance = null;
let monthlyChartInstance = null;

// ================== GRÁFICAS ==================

const chartData = {
    type: {
        labels: ['Conciertos', 'Bodas', 'Conferencias', 'Deportes', 'Otros'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: ['#1C64F1', '#E60001', '#0E9E6E', '#FE6F00', '#7152EC'],
            borderWidth: 0,
            borderRadius: 4
        }]
    },
    location: {
        labels: ['Tapachula', 'Tuxtla Gtz', 'Huixtla', 'Comitan', 'San Cristobal'],
        datasets: [{
            data: [45, 25, 20, 18, 16],
            backgroundColor: ['#1C64F1', '#E60001', '#FE6F00', '#7152EC', '#0E9E6E'],
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
                label: function (context) {
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
                callback: value => `${value} eventos`
            },
            grid: { color: '#334155' }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            grid: { drawOnChartArea: false },
            ticks: {
                color: '#94a3b8',
                callback: value => `$${value}K`
            }
        }
    }
};

function updateChart(type) {
    if (chartInstance) chartInstance.destroy();

    const ctx = document.getElementById('eventChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: chartData[type],
        options: chartOptions
    });
}

function initMonthlyChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    monthlyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: monthlyChartData,
        options: monthlyChartOptions
    });
}

//  INICIALIZACIÓN 

$(document).ready(function() {
    
    $("#metricsGrid").empty();

    const cards = [
        {
            parent: "#metricsGrid",
            id: "cardEventos",
            title: "Total Eventos",
            icon: "event",
            type: "status",
            data: {
                main: "245",
                description: "+12% respecto al período anterior",
                detail: [
                    { label: "Confirmados", value: 183, color: "bg-green-500" },
                    { label: "Pendientes", value: 42, color: "bg-yellow-400" },
                    { label: "Cancelados", value: 20, color: "bg-red-400" }
                ]
            }
        },
        {
            parent: "#metricsGrid",
            id: "cardIngresos",
            title: "Ingresos Totales",
            icon: "payments",
            type: "progress",
            data: {
                main: "$2510K",
                description: "+8% respecto al período anterior",
                goal: {
                    current: 2510,
                    target: 3200,
                    percentage: 78
                }
            }
        },
        {
            parent: "#metricsGrid",
            id: "cardCotizaciones",
            title: "Cotizaciones Pendientes",
            icon: "query_stats",
            type: "simple",
            data: {
                main: "78",
                description: "+5% respecto al mes anterior"
            }
        }

        
    ];

    // Crear las cards
    cards.forEach(card => cardMetric(card));

    // Iniciar gráficas
    updateChart('type');
    initMonthlyChart();

    // Tabs de gráfica de dona
    $('.chart-tab').click(function () {
        $('.chart-tab').removeClass('active bg-[#1C64F1] text-white').addClass('text-slate-400');
        $(this).addClass('active bg-[#1C64F1] text-white').removeClass('text-slate-400');
        updateChart($(this).data('type'));
    });

    // Redimensionamiento
    $(window).resize(function () {
        chartInstance?.resize();
        monthlyChartInstance?.resize();
    });
});
