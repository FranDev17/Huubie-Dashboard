let chartInstance = null;
let monthlyChartInstance = null;

// ================== GRÁFICAS ==================

const chartData = {
    tipo: {
        labels: ['Conciertos', 'Bodas', 'Conferencias', 'Deportes', 'Otros'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: ['#1C64F1', '#E60001', '#0E9E6E', '#FE6F00', '#7152EC'],
            borderWidth: 0,
            borderRadius: 4
        }]
    },
    localizacion: {
        labels: ['Tapachula', 'Tuxtla Gtz', 'Huixtla', 'Comitan', 'San Cristobal'],
        datasets: [{
            data: [45, 25, 20, 18, 16],
            backgroundColor: ['#1C64F1', '#E60001', '#FE6F00', '#7152EC', '#0E9E6E'],
            borderWidth: 0,
            borderRadius: 4
        }]
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


    // Redimensionamiento
    $(window).resize(function () {
        chartInstance?.resize();
        monthlyChartInstance?.resize();
    });
});

//Datos de prueba
const trendChardData={
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Ganancias Mensuales',
        data: [24000,35000,20000,30000,18000,26000],
        fill: false,
        borderColor: 'rgba(0, 255, 132, 1)',
        tension: 0.3
      }]

}


//Grafica de barras
graficComponent({
  parent: '#graficas',
  id: 'ventasChart',
  icon: 'bar_chart',
  title: 'Ventas por Categoría',
  subtitle: 'Comparativo mensual',
  chartType: 'bar', // <--- Aquí defines que es un gráfico de barras
  chartData: {
    default: monthlyChartData
  },
    defaultCategory: 'default'

});


//Garfica de dona
graficComponent({
  parent: '#graficas',
  id: 'distribucionEventos',
  icon: 'donut_large',
  title: 'Distribución de Eventos',
  subtitle: 'Por tipo o ubicación',
  chartType: 'doughnut',
  chartData: chartData,
  defaultCategory: 'tipo',
  ajustarTam: false
});
//Grafica de lineas
graficComponent({
    parent: '#graficas',
    id: 'gananciasChart',
    icon: 'trending_up',
    title: 'Tendencias',
    subtitle: 'Evolución de ingresos',
    chartType: 'line',
    chartData: {
    default: trendChardData
  },
    defaultCategory: 'default' 
  });
