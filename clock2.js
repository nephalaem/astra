function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.style = `
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:8px 12px;
        margin-bottom:6px;
        background:rgba(255,255,255,0.05);
        border-radius:12px;
        position:relative;
    `;
    li.dataset.taskId = task.id;

    // نص المهمة
    const span = document.createElement("span");
    span.textContent = `${task.name} - ${task.seconds}s - ${task.recurring}`;

    // زر التعديل ⚙️
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "⚙️";
    editBtn.style = `
        background:rgba(255,255,255,0.05);
        border:none;
        padding:4px 8px;
        border-radius:12px;
        cursor:pointer;
        margin-right:6px;
    `;

    // زر الحذف 🗑️
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑️";
    deleteBtn.style = `
        background:#ef4444;
        border:none;
        padding:4px 8px;
        border-radius:12px;
        cursor:pointer;
    `;

    // أحداث الأزرار
    editBtn.addEventListener("click", e => {
        e.stopPropagation();
        openEditModal(task.id);
    });

    deleteBtn.addEventListener("click", e => {
        e.stopPropagation();
        deleteCustomTask(task.id, e);
    });

    // إضافة العناصر إلى li
    const buttonsDiv = document.createElement("div");
    buttonsDiv.style.display = "flex";
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);

    return li;
}

// رسم المهام
function renderTasksList() {
    const list = document.getElementById("tasksList");
    list.innerHTML = "";
    customTasks.forEach(task => {
        list.appendChild(createTaskElement(task));
    });
}
