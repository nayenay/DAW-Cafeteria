let cliente = 1;

function calcularPrecio() {
  const nombre = document.getElementById('nombre').value.trim();
  const bebida = document.getElementById('drink').value;
  const tamaño = document.getElementById('ounce').value;
  const shots = parseInt(document.getElementById('shots').value);

  if (!nombre || !bebida || !tamaño || !shots) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Precios base por tipo de bebida
  const preciosBase = {
    americano: 25,
    cappuccino: 30,
    espresso: 28,
    latte: 32,
  };

  // Ajuste por tamaño
  const ajusteTamaño = {
    8: 0,
    12: 5,
    16: 10,
  };

  const precioBase = preciosBase[bebida];
  const extraTamaño = ajusteTamaño[tamaño];
  const extraShots = (shots - 1) * 3;

  const precioFinal = precioBase + extraTamaño + extraShots;

  agregarPedido(nombre, bebida, tamaño, shots, precioFinal);
  cliente++;
}

function agregarPedido(nombre, bebida, tamaño, shots, precio) {
  const tabla = document.getElementById('tabla').getElementsByTagName('tbody')[0];
  const fila = tabla.insertRow();

  fila.insertCell().innerText = cliente;
  fila.insertCell().innerText = nombre;
  fila.insertCell().innerText = bebida.charAt(0).toUpperCase() + bebida.slice(1);
  fila.insertCell().innerText = tamaño + ' oz';
  fila.insertCell().innerText = shots;
  fila.insertCell().innerText = '$' + precio.toFixed(2);

  const celdaEstatus = fila.insertCell();
  celdaEstatus.innerText = 'En preparación';

  const celdaEntregado = fila.insertCell();
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.disabled = true;
  celdaEntregado.appendChild(checkbox);

  // Simular el cambio de estatus automático
  setTimeout(() => {
    celdaEstatus.innerText = 'Preparado';
  }, 3000); // 3 segundos

  setTimeout(() => {
    celdaEstatus.innerText = 'En espera de entrega';
    checkbox.disabled = false;
  }, 6000); // 6 segundos

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      celdaEstatus.innerText = 'Entregado';
    } else {
      celdaEstatus.innerText = 'En espera de entrega';
    }
  });
}
