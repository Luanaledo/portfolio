const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
    atualizarCalendario();
    atualizarLista();
});

// Função para atualizar o calendário
function atualizarCalendario() {
    const calendar = document.getElementById("calendar");
    const mesTitulo = document.getElementById("mesAtual");
    mesTitulo.innerText = `${meses[mesAtual]} ${anoAtual}`;
    calendar.innerHTML = "";

    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let i = 1; i <= diasNoMes; i++) {
        let day = document.createElement("div");
        day.classList.add("day");
        day.innerText = i;
        day.setAttribute("data-day", i);
        
        // Verifica se tem consumo salvo
        if (localStorage.getItem(`agua-${anoAtual}-${mesAtual}-${i}`)) {
            day.classList.add("active");
        }

        day.addEventListener("click", function () {
            selecionarDia(i);
        });

        calendar.appendChild(day);
    }
}

// Mudar o mês
