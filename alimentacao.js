document.addEventListener("DOMContentLoaded", () => {
    carregarRegistros();
});

function adicionarAlimento() {
    const refeicao = document.getElementById("refeicao").value;
    const alimento = document.getElementById("alimento").value;
    const carboidrato = document.getElementById("carboidrato").value;

    if (alimento.trim() === "" || carboidrato.trim() === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const registro = {
        refeicao,
        alimento,
        carboidrato
    };

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));

    exibirRegistro(registro);
    document.getElementById("alimento").value = "";
    document.getElementById("carboidrato").value = "";
}

function exibirRegistro(registro) {
    const lista = document.getElementById("listaAlimentos");
    const item = document.createElement("div");
    item.classList.add("registro-item");
    item.innerHTML = `
        <span><strong>${registro.refeicao}:</strong> ${registro.alimento} (${registro.carboidrato}g carbs)</span>
        <button onclick="removerRegistro(this)">❌</button>
    `;
    lista.appendChild(item);
}

function carregarRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.forEach(exibirRegistro);
}

function calcularInsulina() {
    const carbPorUnidade = parseFloat(document.getElementById('carbPorUnidade').value);
    const carbConsumidos = parseFloat(document.getElementById('carbConsumidos').value);

    if (isNaN(carbPorUnidade) || isNaN(carbConsumidos)) {
        alert("Por favor, insira números válidos.");
        return;
    }

    // Regra de três: (carbConsumidos * 1) / carbPorUnidade
    const unidadesInsulina = (carbConsumidos * 1) / carbPorUnidade;

    document.getElementById('resultado').textContent = `Unidades de insulina necessárias: ${unidadesInsulina.toFixed(2)}`;

    // Atualiza os valores na tela
    document.getElementById('carbPorUnidadeTexto').textContent = `${carbPorUnidade} g de carboidrato`;
    document.getElementById('carbConsumidosTexto').textContent = `${carbConsumidos} g de carboidrato`;
    document.getElementById('insulinaNecessariaTexto').textContent = `${unidadesInsulina.toFixed(2)} unidade de insulina`;
}
