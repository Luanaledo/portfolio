document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("glicemia-form");
    const inputGlicemia = document.getElementById("nivelGlicemia");
    const historico = document.getElementById("historicoGlicemia");

    // Carrega histórico salvo no localStorage
    carregarHistorico();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const valor = inputGlicemia.value.trim();
        
        if (valor && !isNaN(valor) && valor > 0) {
            adicionarRegistro(valor);
            salvarNoLocalStorage(valor);
            inputGlicemia.value = ""; // Limpa o campo após adicionar
        } else {
            alert("Por favor, insira um valor válido de glicemia.");
        }
    });

    function adicionarRegistro(valor) {
        const novoItem = document.createElement("li");
        novoItem.textContent = `Glicemia registrada: ${valor} mg/dL`;

        // Botão para remover o item
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.style.cursor = "pointer";
        botaoRemover.addEventListener("click", function() {
            novoItem.remove();
            removerDoLocalStorage(valor);
        });

        novoItem.appendChild(botaoRemover);
        historico.appendChild(novoItem);
    }

    function salvarNoLocalStorage(valor) {
        let registros = JSON.parse(localStorage.getItem("glicemia")) || [];
        registros.push(valor);
        localStorage.setItem("glicemia", JSON.stringify(registros));
    }

    function carregarHistorico() {
        let registros = JSON.parse(localStorage.getItem("glicemia")) || [];
        registros.forEach(valor => adicionarRegistro(valor));
    }

    function removerDoLocalStorage(valor) {
        let registros = JSON.parse(localStorage.getItem("glicemia")) || [];
        const index = registros.indexOf(valor);
        if (index !== -1) {
            registros.splice(index, 1);
            localStorage.setItem("glicemia", JSON.stringify(registros));
        }
    }
});

