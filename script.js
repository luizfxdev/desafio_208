/**
 * Função principal que é executada quando o DOM está totalmente carregado
 */
document.addEventListener('DOMContentLoaded', function () {
  // Obter elementos do DOM
  const decodeBtn = document.getElementById('decode-btn');
  const resetBtn = document.getElementById('reset-btn');
  const alphaInput = document.getElementById('alpha');
  const muInput = document.getElementById('mu');
  const omegaInput = document.getElementById('omega');
  const resultDiv = document.getElementById('result');
  const calculationDiv = document.getElementById('calculation');

  /**
   * Decodifica a matriz em zigue-zague diagonal
   * @param {Array<Array<string>>} matrix - Matriz 2D de caracteres
   * @returns {Array<string>} - Array com as strings decodificadas
   */
  function decodeDiagonalZigZag(matrix) {
    if (!matrix || matrix.length === 0) return [];

    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    let calculationSteps = 'Cálculo passo a passo:\n\n';

    // Percorrer todas as diagonais
    for (let line = 0; line < rows + cols - 1; line++) {
      let diagonal = [];
      let stepInfo = `Diagonal ${line + 1}: `;

      // Determinar o ponto de início da diagonal
      let startRow = Math.min(line, rows - 1);
      let startCol = Math.max(0, line - rows + 1);

      stepInfo += `Inicia em [${startRow}][${startCol}], caracteres: `;

      // Percorrer a diagonal
      while (startRow >= 0 && startCol < cols) {
        diagonal.push(matrix[startRow][startCol]);
        stepInfo += `'${matrix[startRow][startCol]}' `;

        startRow--;
        startCol++;
      }

      result.push(diagonal.join(''));
      calculationSteps += stepInfo + `→ "${diagonal.join('')}"\n`;
    }

    calculationDiv.textContent = calculationSteps;
    return result;
  }

  /**
   * Converte a entrada do usuário em uma matriz 2D
   * @returns {Array<Array<string>>} - Matriz 2D de caracteres
   */
  function getInputMatrix() {
    const alpha = alphaInput.value.split(',').map(item => item.trim());
    const mu = muInput.value.split(',').map(item => item.trim());
    const omega = omegaInput.value.split(',').map(item => item.trim());

    // Verificar se todas as colunas têm o mesmo comprimento
    const maxLength = Math.max(alpha.length, mu.length, omega.length);

    // Preencher com strings vazias se necessário
    while (alpha.length < maxLength) alpha.push('');
    while (mu.length < maxLength) mu.push('');
    while (omega.length < maxLength) omega.push('');

    return [alpha, mu, omega];
  }

  /**
   * Formata a matriz para exibição horizontal
   * @param {Array<Array<string>>} matrix - Matriz 2D de caracteres
   * @returns {string} - HTML formatado para exibição
   */
  function formatMatrixHorizontal(matrix) {
    let html = '<div class="matrix-container">';

    // Cabeçalho das colunas
    html += '<div class="matrix-row header">';
    html += '<div class="matrix-cell">α</div>';
    html += '<div class="matrix-cell">μ</div>';
    html += '<div class="matrix-cell">Ω</div>';
    html += '</div>';

    // Linhas da matriz
    for (let i = 0; i < matrix[0].length; i++) {
      html += '<div class="matrix-row">';
      for (let j = 0; j < matrix.length; j++) {
        html += `<div class="matrix-cell">${matrix[j][i] || ' '}</div>`;
      }
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Formata o resultado decodificado para exibição horizontal
   * @param {Array<string>} decoded - Array com as strings decodificadas
   * @returns {string} - HTML formatado para exibição
   */
  function formatDecodedHorizontal(decoded) {
    let html = '<div class="result-container">';
    html += '<div class="result-title">Sequência decodificada:</div>';
    html += '<div class="result-items">';

    decoded.forEach((item, index) => {
      html += `<div class="result-item">
                        <span class="diagonal-number">Diagonal ${index + 1}:</span>
                        <span class="diagonal-chars">${item}</span>
                    </div>`;
    });

    html += '</div></div>';
    return html;
  }

  /**
   * Valida se a entrada do usuário é válida
   * @returns {boolean} - True se a entrada for válida
   */
  function validateInput() {
    if (!alphaInput.value || !muInput.value || !omegaInput.value) {
      alert('Por favor, preencha todas as colunas!');
      return false;
    }
    return true;
  }

  /**
   * Manipulador de evento para o botão DECIFRAR
   */
  decodeBtn.addEventListener('click', function () {
    if (!validateInput()) return;

    const matrix = getInputMatrix();
    const decoded = decodeDiagonalZigZag(matrix);

    resultDiv.innerHTML = `
            <div class="result-section">
                <h3>Matriz de Entrada</h3>
                ${formatMatrixHorizontal(matrix)}
            </div>
            <div class="result-section">
                <h3>Resultado Decodificado</h3>
                ${formatDecodedHorizontal(decoded)}
            </div>
        `;
  });

  /**
   * Manipulador de evento para o botão RETORNAR
   */
  resetBtn.addEventListener('click', function () {
    alphaInput.value = '';
    muInput.value = '';
    omegaInput.value = '';
    resultDiv.textContent = '';
    calculationDiv.textContent = '';
  });

  // Adicionar efeito de hover nos botões (mesmo estilo do exemplo)
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      this.style.background = '#add8e6';
      this.style.color = '#050801';
      this.style.boxShadow = '0 0 5px #add8e6, 0 0 25px #add8e6, 0 0 50px #add8e6, 0 0 200px #03e9f4';
    });

    button.addEventListener('mouseleave', function () {
      this.style.background = '#050801';
      this.style.color = '#add8e6';
      this.style.boxShadow = 'none';
    });
  });
});
