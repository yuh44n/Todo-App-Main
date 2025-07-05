const addTodo = document.getElementById('check');

function updateCounter() {
    const items = document.querySelectorAll('#todolist li');
    let count = 0;
    items.forEach(item => {
        if (!item.classList.contains('completed')) {
            count++;
        }
    });
    document.getElementById('left').textContent = `${count} items left`;
}

function filterTodos() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    const todoItems = document.querySelectorAll('#todolist li');
    
    todoItems.forEach(item => {
        if (selectedFilter === 'all') {
            item.style.display = 'block';
        } else if (selectedFilter === 'active') {
            item.style.display = item.classList.contains('completed') ? 'none' : 'block';
        } else if (selectedFilter === 'completed') {
            item.style.display = item.classList.contains('completed') ? 'block' : 'none';
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

updateCounter();
document.getElementById('inputText').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('check').click();
    }
});

addTodo.addEventListener('click',() => {
    const todoText = document.getElementById('inputText').value;
    if (todoText){
        const todoList = document.querySelector('#todolist');
        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;

        todoList.appendChild(todoItem);
        todoItem.draggable = true;
        document.getElementById('inputText').value = '';
        updateCounter();
    }
})

document.getElementById('todolist').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        updateCounter();
    }
});

document.getElementById("clear").addEventListener('click', () => {
    const completedItems = document.querySelector('#todolist').querySelectorAll('.completed');
    completedItems.forEach(item => {
        item.remove();
    });
    completedItems.forEach(item => {
    item.remove();
});
updateCounter();
}
)

const theme = document.getElementById('theme');
theme.addEventListener('click', () => {
    if (theme.src.includes("images/icon-sun.svg")) {
        theme.src = "images/icon-moon.svg";
        document.body.classList.add('light-theme');
        document.querySelector('.background').classList.add('light-theme');
        document.querySelector('.input input').classList.add('light-theme');
        document.querySelector('.list').classList.add('light-theme');
        document.querySelector('.bottom').classList.add('light-theme');
        document.querySelector('.dark-background').classList.add('light-theme');
    } else {
        theme.src = "images/icon-sun.svg";
        document.body.classList.remove('light-theme');
        document.querySelector('.background').classList.remove('light-theme');
        document.querySelector('.input input').classList.remove('light-theme');
        document.querySelector('.list').classList.remove('light-theme');
        document.querySelector('.bottom').classList.remove('light-theme');
        document.querySelector('.dark-background').classList.remove('light-theme');
    }
});

document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', filterTodos);
});

document.getElementById('todolist').addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'LI') {
        e.dataTransfer.setData('text/plain', '');
        e.target.classList.add('dragging');
    }
});

document.getElementById('todolist').addEventListener('dragend', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.remove('dragging');
    }
});

document.getElementById('todolist').addEventListener('dragover', function(e) {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(this, e.clientY);
    if (afterElement == null) {
        this.appendChild(dragging);
    } else {
        this.insertBefore(dragging, afterElement);
    }
});
