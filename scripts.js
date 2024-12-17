const addTaskboard = document.querySelector('.add-taskboard');
const tasksKeeper = document.querySelector('.tasks-keeper');

let draggedItem = null; // Referencia al ítem arrastrado

// Función principal para inicializar drag and drop
function initializeDragAndDrop() {
    const tasksItems = document.querySelectorAll('.tasks-list-item');
    const tasksLists = document.querySelectorAll('.tasks-list');

    tasksItems.forEach(item => {
        item.draggable = true;

        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            setTimeout(() => item.classList.add('hide'), 0); // Ocultar temporalmente
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.classList.remove('hide'); // Mostrar nuevamente
                draggedItem = null; // Resetear la referencia
            }, 0);
        });
    });

    tasksLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir soltar
        });

        list.addEventListener('drop', () => {
            if (draggedItem && draggedItem.parentElement !== list) {
                list.appendChild(draggedItem); // Mover sin duplicar
            }
        });
    });
}

// Función para agregar un nuevo contenedor dinámicamente
addTaskboard.addEventListener('click', () => {
    tasksKeeper.insertAdjacentHTML('beforeend',
        `
        <article class="tasks-container">
            <div class="tasks-header">
                <h3 class="tasks-name">Name</h3>
                <div class="tasks-buttons">
                    <button class="btn">+</button>
                    <button class="btn">Set</button>
                </div>
            </div>
            <ul class="tasks-list">
                <li class="tasks-list-item" draggable="true">Task 1</li>
                <li class="tasks-list-item" draggable="true">Task 2</li>
            </ul>
        </article>
        `
    );

    initializeDragAndDrop(); // Re-inicializar drag and drop para los nuevos elementos
});

// Llamada inicial para los elementos existentes al cargar la página
initializeDragAndDrop();
