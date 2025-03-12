document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("glicemia-form");
    const inputGlicemia = document.getElementById("nivelGlicemia");
    const historico = document.getElementById("historicoGlicemia");

    function verDetalhes(tipo) {
        alert(`Acompanhar ${tipo}`);
    }
    