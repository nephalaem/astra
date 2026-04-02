function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.style.position = "relative";
    li.dataset.taskId = task.id; // أهم شيء

    li.innerHTML = `
        <span>${task.name} - ${task.seconds}s - ${task.recurring}</span>
        <button class="edit-btn" style="
            position:absolute; top:8px; right:32px;
            background:rgba(255,255,255,0.05);
            border:none; padding:4px 8px; border-radius:12px;
            cursor:pointer;">⚙️</button>
        <button class="delete-btn" style="
            position:absolute; top:8px; right:8px;
            background:#ef4444; border:none;
            padding:4px 8px; border-radius:12px; cursor:pointer;">🗑️</button>
    `;

    // حدث الحذف
    li.querySelector(".delete-btn").addEventListener("click", e => {
        e.stopPropagation();
        deleteCustomTask(task.id, e);
    });

    // حدث التعديل
    li.querySelector(".edit-btn").addEventListener("click", e => {
        e.stopPropagation();
        openEditModal(task.id);
    });

    return li;
}

// ثم عند رسم المهام:
function renderTasksList() {
    const list = document.getElementById("tasksList");
    list.innerHTML = "";
    customTasks.forEach(task => {
        list.appendChild(createTaskElement(task));
    });
}
