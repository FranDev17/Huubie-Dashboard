function cardMetric(config) {
    const defaults = {
        parent: "#metricsGrid",
        id: "cardMetric",
        title: "Sin título",
        icon: "info",
        type: "simple", // "status", "progress"
        data: {
            main: "0",
            description: "",
            detail: [],
            goal: null
        }
    };

    const settings = Object.assign({}, defaults, config);
    renderCard(settings);
}


function renderCard(settings) {
    const { parent, id, title, icon, type, data } = settings;
    let extraContent = '';

    if (type === "status" && data.detail?.length) {
        extraContent = `
            <div class="flex flex-wrap gap-x-4 bg-slate-900/50 p-3 rounded-xl mt-3">
                ${data.detail.map(d => `
                    <div class="flex items-center gap-2 min-w-[120px]">
                        <div class="flex items-center gap-2">
                            <div class="w-2.5 h-2.5 rounded-full ${d.color}"></div>
                            <span class="text-xs font-medium text-white">${d.value}</span>
                            <span class="text-xs text-slate-400">${d.label}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (type === "progress" && data.goal) {
        extraContent = `
            <div class="space-y-2 w-full mt-3">
                <div class="flex justify-between text-xs">
                    <span class="text-slate-400/60">Progreso</span>
                    <span class="text-slate-300">${data.goal.percentage}%</span>
                </div>
                <div class="h-2 bg-slate-900/50 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                         style="width: ${data.goal.percentage}%">
                    </div>
                </div>
                <div class="text-xs text-slate-400 mt-1">Meta: $${data.goal.target}K</div>
            </div>
        `;
    }

    const html = `
        <article id="${id}" class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
            <div class="text-blue-300 text-sm font-medium mb-4 flex items-center gap-2">
                <span class="p-1.5 bg-blue-500/10 rounded-lg">
                    <span class="material-icons text-base">${icon}</span>
                </span>
                ${title}
            </div>
            <div class="flex justify-between items-start">
                <div>
                    <output class="text-4xl font-bold text-white tracking-tight">${data.main}</output>
                    <p class="text-xs text-slate-400 mt-1">${data.description}</p>
                </div>
            </div>
            ${extraContent}
        </article>
    `;

    $(parent).append(html);
}




window.cardMetric = cardMetric;
