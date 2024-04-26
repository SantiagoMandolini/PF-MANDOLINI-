document.addEventListener('DOMContentLoaded', function() {
    const carrito = []; 

    function mostrarJuegos(juegos) {
        const listaJuegos = document.getElementById('juegos-container');
        listaJuegos.innerHTML = '';

        if (juegos.length === 0) {
            document.getElementById('resultadoTitulo').textContent = 'Sin resultados';
            return;
        }

        document.getElementById('resultadoTitulo').textContent = 'Juegos Disponibles';

        const row = document.createElement('div');
        row.classList.add('row');

        juegos.forEach((juego, index) => {
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'mb-3');

            const card = document.createElement('div');
            card.classList.add('card');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = `<strong>${juego.nombre}</strong>`;

            const cardInfo = document.createElement('p');
            cardInfo.classList.add('card-text');
            cardInfo.innerHTML = `<strong>Consola:</strong> ${juego.consola} - <strong>Género:</strong> ${juego.genero}`;

            const agregarButton = document.createElement('button');
            agregarButton.classList.add('btn', 'btn-success', 'btn-agregar');
            agregarButton.textContent = 'AÑADIR';
            agregarButton.dataset.index = index;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardInfo);
            cardBody.appendChild(agregarButton);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });

        listaJuegos.appendChild(row);

        const botonesAgregar = document.querySelectorAll('.btn-agregar');
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', () => {
                const juegoIndex = parseInt(boton.dataset.index);
                const juegoSeleccionado = juegos[juegoIndex];
                agregarAlCarrito(juegoSeleccionado);
                Swal.fire('¡Juego añadido al carrito!', '', 'success');
            });
        });
    }

    function filtrarJuegos(juegos, consola, genero) {
        return juegos.filter(juego => {
            const consolaMatch = juego.consola.toLowerCase().includes(consola.toLowerCase());
            const generoMatch = juego.genero.toLowerCase().includes(genero.toLowerCase());
            return consolaMatch && generoMatch;
        });
    }

    const filtrarButton = document.getElementById('filtrar-button');
    if (filtrarButton) {
        filtrarButton.addEventListener('click', () => {
            const consola = document.getElementById('consola-input').value.trim();
            const genero = document.getElementById('genero-input').value.trim();

            const juegosFiltrados = filtrarJuegos(juegos, consola, genero);
            mostrarJuegos(juegosFiltrados);
        });
    }

    const reiniciarButton = document.getElementById('reiniciar-button');
    if (reiniciarButton) {
        reiniciarButton.addEventListener('click', () => {
            document.getElementById('consola-input').value = '';
            document.getElementById('genero-input').value = '';
            document.getElementById('resultadoTitulo').textContent = '';
            document.getElementById('juegos-container').innerHTML = '';
        });
    }

    function agregarAlCarrito(juego) {
        carrito.push(juego);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const carritoElemento = document.getElementById('carrito');
        carritoElemento.innerHTML = ''; 

        carrito.forEach((juego, index) => {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = juego.nombre;

            const eliminarButton = document.createElement('button');
            eliminarButton.classList.add('btn', 'btn-danger', 'btn-eliminar');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.dataset.index = index;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(eliminarButton);
            card.appendChild(cardBody);
            carritoElemento.appendChild(card);
        });

        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const juegoIndex = parseInt(boton.dataset.index);
                eliminarDelCarrito(juegoIndex);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Juego eliminado del carrito!',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        });
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }
});