const ramos = [
  {
    nombre: "Fundamentos de los Alimentos y Nutrición",
    id: "fundamentos",
    requisitos: [],
    semestre: 1
  },
  {
    nombre: "Alimentos",
    id: "alimentos",
    requisitos: [],
    semestre: 1
  },
  {
    nombre: "Química General y Orgánica",
    id: "quimica_general",
    requisitos: [],
    semestre: 1
  },
  {
    nombre: "Química de los Alimentos",
    id: "quimica_alimentos",
    requisitos: ["quimica_general"],
    semestre: 2
  },
  {
    nombre: "Técnicas Dietéticas",
    id: "tecnicas_dieteticas",
    requisitos: ["quimica_alimentos"],
    semestre: 3
  },
  {
    nombre: "Bromatología y Tecnología de los Alimentos",
    id: "bromatologia",
    requisitos: ["tecnicas_dieteticas"],
    semestre: 4
  },
  // Puedes seguir agregando todos los ramos de la malla aquí...
];

// Estado de cada ramo
const estado = {};

const grid = document.querySelector('.grid');

function crearMalla() {
  ramos.forEach(ramo => {
    estado[ramo.id] = {
      aprobado: false,
      bloqueado: ramo.requisitos.length > 0
    };

    const div = document.createElement('div');
    div.className = 'ramo' + (ramo.requisitos.length > 0 ? ' bloqueado' : '');
    div.dataset.id = ramo.id;
    div.innerText = ramo.nombre;
    div.addEventListener('click', () => aprobarRamo(ramo.id));
    grid.appendChild(div);
  });
}

function aprobarRamo(id) {
  if (estado[id].bloqueado || estado[id].aprobado) return;

  estado[id].aprobado = true;
  const div = document.querySelector(`[data-id="${id}"]`);
  div.classList.add('aprobado');
  div.classList.remove('bloqueado');

  // Desbloquear los ramos que dependan de este
  ramos.forEach(ramo => {
    if (estado[ramo.id].bloqueado) {
      const requisitosCumplidos = ramo.requisitos.every(req => estado[req].aprobado);
      if (requisitosCumplidos) {
        estado[ramo.id].bloqueado = false;
        const r = document.querySelector(`[data-id="${ramo.id}"]`);
        r.classList.remove('bloqueado');
      }
    }
  });
}

crearMalla();

