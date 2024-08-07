// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

function addTask() {
    const taskText = document.getElementById('todo-input').value;
    if (taskText === '') return;

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = taskText;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
        completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
        saveTasks(); // Save tasks when updated
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', function() {
        li.remove();
        saveTasks(); // Save tasks when removed
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(removeBtn);
    document.getElementById('todo-list').appendChild(li);

    document.getElementById('todo-input').value = '';

    saveTasks(); // Save tasks when a new task is added
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(function(li) {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = task.text;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
            completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
            saveTasks(); // Save tasks when updated
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', function() {
            li.remove();
            saveTasks(); // Save tasks when removed
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        document.getElementById('todo-list').appendChild(li);
    });
}
