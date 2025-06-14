class ListaInfo {
    constructor(options) {
        const defaults = {
            parent: "root",
            id: "lista-info",
            title: "Título Principal",
            subtitle: "Descripción breve de la lista",
            iconTitle: "fa fa-calendar",
            items: [],
            class: ""
        };

        this.opts = Object.assign({}, defaults, options);
        this.render();
    }

    render() {
        const o = this.opts;

        const container = $(`
            <div id="${o.id}" class="bg-[#1E293B] text-white p-6 rounded-3xl border border-slate-700/50 shadow-lg ${o.class}">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <i class="material-icons">${o.iconTitle}</i> ${o.title}
                    </h3>
                    <p class="text-sm text-slate-400">${o.subtitle}</p>
                </div>
                <ul class="divide-y divide-slate-700">
                    ${o.items.map(item => this.renderItem(item)).join("")}
                </ul>
            </div>
        `);

        $(`#${o.parent}`).append(container);
    }

    renderItem(item) {
        const initials = item.title.split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();

        return`
        <li class="bg-[#1E293B] p-4 rounded-xl shadow-sm">
            <div class="flex justify-between gap-3 items-start">
                <!-- Sección Izquierda -->
                <div class="flex gap-3 items-start">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-sm font-bold text-blue-400">
                        ${initials}
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm font-semibold text-white">${item.title}</p>
                        <div class="text-xs text-slate-400 flex items-center gap-1 mt-1">
                            ${item.subtitle1.icon ? `<i class="material-icons text-xs">${item.subtitle1.icon}</i>` : ""} ${item.subtitle1.text}
                        </div>
                        <p class="text-xs text-slate-500">${item.subtitle2.text}</p>
                    </div>
                </div>

                <!-- Sección Derecha -->
                <div class="text-sm font-semibold -top-2/4 text-slate-300 text-right whitespace-nowrap">
                    ${item.detail}
                </div>
            </div>
        </li>`;
    }
}
