const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';

let LIST;
let id;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-ES', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

// Funcion Agregar Tarea

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  } 

  const REALIZADO = realizado ? check : uncheck; 
  const LINE = realizado ? lineThrough : '';

  const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `;
  lista.insertAdjacentHTML('beforeend', elemento);
}

// Funcion Tarea Realizada

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

// Funcion Tarea Eliminada

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
  console.log(LIST);
}

// Evento para escuchar el enter y para habilitar el boton

botonEnter.addEventListener('click', () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
    localStorage.setItem('TODO', JSON.stringify(LIST));
    id++;
    input.value = '';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key == 'Enter') {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
      localStorage.setItem('TODO', JSON.stringify(LIST));

      input.value = '';
      id++;
      console.log(LIST);
    }
  }
});

lista.addEventListener('click', function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  console.log(elementData);

  if (elementData == 'realizado') {
    tareaRealizada(element);
  } else if (elementData == 'eliminado') {
    tareaEliminada(element);
    console.log('elimnado');
  }
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

let data = localStorage.getItem('TODO');
if (data) {
  LIST = JSON.parse(data);
  console.log(LIST);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(array) {
  array.forEach(function (item) {
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
  });
}
