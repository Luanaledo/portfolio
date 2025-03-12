document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const atividadesList = document.getElementById("atividadesList");

    // Criar calendário dinâmico
    for (let i = 1; i <= 30; i++) {
        let day = document.createElement("div");
        day.classList.add("day");
        day.innerText = i;
        day.setAttribute("data-day", i);
        
        // Verifica se tem atividade salva no localStorage
        if (localStorage.getItem(`dia-${i}`)) {
            day.classList.add("active");
        }

        day.addEventListener("click", function () {
            selecionarDia(i);
        });

        calendar.appendChild(day);
    }
});

// Função para salvar atividade
function salvarAtividade() {
    const input = document.getElementById("atividadeInput");
    const atividade = input.value.trim();
    const diaSelecionado = document.querySelector(".day.selected");

    if (atividade === "" || !diaSelecionado) {
        alert("Selecione um dia e digite uma atividade!");
        return;
    }

    const dia = diaSelecionado.getAttribute("data-day");
    localStorage.setItem(`dia-${dia}`, atividade);

    // Atualizar visualmente
    diaSelecionado.classList.add("active");
    atualizarLista();
    input.value = "";
}

// Função para atualizar a lista de atividades registradas
function atualizarLista() {
    atividadesList.innerHTML = "";

    for (let i = 1; i <= 30; i++) {
        let atividade = localStorage.getItem(`dia-${i}`);
        if (atividade) {
            let item = document.createElement("li");
            item.innerText = `Dia ${i}: ${atividade}`;
            atividadesList.appendChild(item);
        }
    }
}

// Função para selecionar um dia no calendário
function selecionarDia(dia) {
    const dias = document.querySelectorAll(".day");
    dias.forEach(d => d.classList.remove("selected"));

    const diaSelecionado = document.querySelector(`.day[data-day='${dia}']`);
    diaSelecionado.classList.add("selected");
}

// Atualizar a lista ao carregar a página
atualizarLista();

