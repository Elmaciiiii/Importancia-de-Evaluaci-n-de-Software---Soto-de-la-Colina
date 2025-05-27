const form = document.getElementById("triangleForm");
const resultado = document.getElementById("resultado");
const limpiarBtn = document.getElementById("limpiar");

// Función para mostrar resultados o mensajes de error
function mostrarResultado(mensaje, esError = false) {
  resultado.textContent = mensaje;
  resultado.style.display = "block";
  if (esError) {
    resultado.classList.add("error"); // Añade la clase 'error' para los estilos CSS
  } else {
    resultado.classList.remove("error"); // Remueve la clase 'error'
  }
}

// Limpiar campos y ocultar resultado
function limpiarCampos() {
  document.getElementById("lado1").value = "";
  document.getElementById("lado2").value = "";
  document.getElementById("lado3").value = "";
  resultado.style.display = "none";
  resultado.classList.remove("error"); // Asegúrate de quitar la clase de error al limpiar
}

// Solo permitir números, comas o puntos en los campos de entrada
["lado1", "lado2", "lado3"].forEach(id => {
  document.getElementById(id).addEventListener("input", (e) => {
    // Reemplaza cualquier caracter que no sea un número, coma o punto
    let value = e.target.value.replace(/[^0-9.,]/g, "");

    // Asegura que solo haya un punto o una coma para decimales
    const dotCount = (value.match(/\./g) || []).length;
    const commaCount = (value.match(/,/g) || []).length;

    if (dotCount > 1) {
      value = value.substring(0, value.indexOf('.')) + '.' + value.substring(value.indexOf('.') + 1).replace(/\./g, '');
    }
    if (commaCount > 1) {
      value = value.substring(0, value.indexOf(',')) + ',' + value.substring(value.indexOf(',') + 1).replace(/,/g, '');
    }

    // Si hay un punto y una coma, normaliza a un punto (o coma si prefieres)
    if (dotCount >= 1 && commaCount >= 1) {
      // Reemplaza la coma por un punto si ya hay un punto
      value = value.replace(/,/, '.');
    }
    e.target.value = value;
  });
});


form.addEventListener("submit", function (e) {
  e.preventDefault();

  let lado1Str = document.getElementById("lado1").value.trim();
  let lado2Str = document.getElementById("lado2").value.trim();
  let lado3Str = document.getElementById("lado3").value.trim();

  // Validar si los campos están vacíos después de trim
  if (!lado1Str || !lado2Str || !lado3Str) {
    mostrarResultado("Error: Ingrese las longitudes para los tres lados del triángulo.", true);
    return;
  }

  // Convertir comas a puntos antes de parseFloat para unificar la entrada
  const lado1 = parseFloat(lado1Str.replace(",", "."));
  const lado2 = parseFloat(lado2Str.replace(",", "."));
  const lado3 = parseFloat(lado3Str.replace(",", "."));

  // Verificar si son números válidos y mayores a cero
  if (isNaN(lado1) || isNaN(lado2) || isNaN(lado3) || lado1 <= 0 || lado2 <= 0 || lado3 <= 0) {
    mostrarResultado("Error: Ingrese valores numéricos positivos para las longitudes de los lados.", true);
    return;
  }

  // Validar si los lados forman un triángulo válido (condición de desigualdad triangular)
  if (lado1 + lado2 <= lado3 || lado1 + lado3 <= lado2 || lado2 + lado3 <= lado1) {
    mostrarResultado(`Error: Los lados no forman un triángulo válido. La suma de dos lados debe ser mayor que el tercer lado.`, true);
    return;
  }

  let tipo = "";
  if (lado1 === lado2 && lado2 === lado3) {
    tipo = `El triángulo es: Equilátero.`;
  } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
    tipo = `El triángulo es: Isósceles.`;
  } else {
    tipo = `El triángulo es: Escaleno.`;
  }

  mostrarResultado(tipo);
});

limpiarBtn.addEventListener("click", limpiarCampos);