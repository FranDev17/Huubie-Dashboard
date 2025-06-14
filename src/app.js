let chartInstance = null;
let monthlyChartInstance = null;
let trendChartInstance = null;


// Datos para la gráfica de dona
const chartData = {
    tipo: {
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
    localizacion: {
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


//Grafica de lineas (tendecia de ganancias)

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
    parent: '#graficaspt2',
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






  //Lista 

const infoeventos=[
  {
    title: "Concierto de Rock",
    subtitle1: { icon: "event", text: "15 de mayo, 2025" },
    subtitle2: { icon: "", text: "Auditorio Nacional" },
    detail: "$500"
  },
  {
    title: "Conferencia de Tecnología",
    subtitle1: { icon: "event", text: "18 de mayo, 2025" },
    subtitle2: { icon: "", text: "Centro de Convenciones" },
    detail: "$250"
  }
]
  


 new ListaInfo({
     parent: "graficaspt2",
     id: "listaEventos",
     title: "Próximos Eventos",
     subtitle: "Eventos programados para los próximos días",
     iconTitle: "calendar_month",
     items: infoeventos
 })