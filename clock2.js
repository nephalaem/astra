document.addEventListener("DOMContentLoaded", () => {

    // تخزين الدالة الأصلية للحذف
    const originalDelete = window.deleteCustomTask;
    let currentId = null;

    // إنشاء مودال الحذف (كما عندك)
    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmModal";
    confirmModal.style = `
        position:fixed;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:rgba(0,0,0,0.6);
        backdrop-filter:blur(8px);
        z-index:9999;
        opacity:0;
        pointer-events:none;
        transition:0.3s;
    `;
    confirmModal.innerHTML = `
        <div id="modalBox" style="
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.1);
            backdrop-filter:blur(20px);
            padding:25px;
            border-radius:20px;
            text-align:center;
            width:90%;
            max-width:300px;
            color:white;
            transform:scale(0.8) translateY(20px);
            opacity:0;
            transition:0.3s;
        ">
            <h3 style="margin-bottom:10px;">⚠️ تأكيد الحذف</h3>
            <p style="opacity:0.6; font-size:14px;">هل أنت متأكد؟</p>
            <div style="display:flex; gap:10px; margin-top:20px;">
                <button id="yesBtn" style="flex:1; padding:10px; border-radius:12px; background:#ef4444;">حذف</button>
                <button id="noBtn" style="flex:1; padding:10px; border-radius:12px; background:rgba(255,255,255,0.1);">إلغاء</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmModal);
    const box = confirmModal.querySelector("#modalBox");

    function openModal() {
        confirmModal.style.pointerEvents = "auto";
        confirmModal.style.opacity = "1";
        setTimeout(() => {
            box.style.transform = "scale(1) translateY(0)";
            box.style.opacity = "1";
        }, 10);
    }
    function closeModal() {
        box.style.transform = "scale(0.8) translateY(20px)";
        box.style.opacity = "0";
        setTimeout(() => {
            confirmModal.style.opacity = "0";
            confirmModal.style.pointerEvents = "none";
        }, 200);
    }

    // إعادة تعريف الحذف
    window.deleteCustomTask = function(taskId, event) {
        event.stopPropagation();
        currentId = taskId;
        openModal();
    };
    document.getElementById("yesBtn").onclick = () => {
        if (currentId !== null) {
            originalDelete(currentId, { stopPropagation: () => {} });
        }
        closeModal();
    };
    document.getElementById("noBtn").onclick = () => {
        closeModal();
        if (typeof playSound === "function") playSound('short');
    };

    // ====== إضافة زر الترس لكل مهمة ======
    const originalRender = window.renderTasksList;
    window.renderTasksList = function() {
        originalRender(); // نرسم المهام كما كانت

        // بعد الرسم، نضيف زر الترس لكل مهمة
        document.querySelectorAll("#tasksList .task-item").forEach(item => {
            if (!item.querySelector(".edit-btn")) {
                const editBtn = document.createElement("button");
                editBtn.innerHTML = "⚙️";
                editBtn.className = "edit-btn";
                editBtn.style = `
                    position:absolute;
                    top:8px;
                    right:32px;
                    background:rgba(255,255,255,0.05);
                    border:none;
                    padding:4px 8px;
                    border-radius:12px;
                    cursor:pointer;
                `;
                item.style.position = "relative";
                item.appendChild(editBtn);

                editBtn.addEventListener("click", e => {
                    e.stopPropagation();
                    const taskId = item.getAttribute("onclick").match(/\d+/)[0];
                    openEditModal(taskId);
                });
            }
        });
    };

    // ====== مودال التعديل ======
    const editModal = document.createElement("div");
    editModal.id = "editModal";
    editModal.style = `
        position:fixed;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:rgba(0,0,0,0.6);
        backdrop-filter:blur(8px);
        z-index:9999;
        opacity:0;
        pointer-events:none;
        transition:0.3s;
    `;
    editModal.innerHTML = document.getElementById("taskModal").innerHTML;
    document.body.appendChild(editModal);

    function openEditModal(taskId) {
        const task = customTasks.find(t => t.id == taskId);
        if (!task) return;

        // نسخ بيانات المهمة في المودال
        editModal.querySelector("#newTaskName").value = task.name;
        editModal.querySelector("#newTaskMinutes").value = Math.floor(task.seconds / 60);
        editModal.querySelector("#newTaskSeconds").value = task.seconds % 60;
        editModal.querySelector("#newTaskRecurring").value = task.recurring;

        editModal.style.pointerEvents = "auto";
        editModal.style.opacity = "1";
        editModal.style.display = "flex";

        setTimeout(() => {
            editModal.querySelector("#modalBox").style.transform = "scale(1) translateY(0)";
            editModal.querySelector("#modalBox").style.opacity = "1";
        }, 10);

        // تعديل حفظ المهمة
        const saveBtn = editModal.querySelector("button[onclick='addCustomTask()']");
        saveBtn.onclick = () => {
            task.name = editModal.querySelector("#newTaskName").value;
            task.seconds = parseInt(editModal.querySelector("#newTaskMinutes").value) * 60
                            + parseInt(editModal.querySelector("#newTaskSeconds").value);
            task.recurring = editModal.querySelector("#newTaskRecurring").value;

            localStorage.setItem('astra_clock_tasks', JSON.stringify(customTasks));
            renderTasksList();
            closeEditModal();
        };
    }
    function closeEditModal() {
        const box = editModal.querySelector("#modalBox");
        box.style.transform = "scale(0.8) translateY(20px)";
        box.style.opacity = "0";
        setTimeout(() => {
            editModal.style.opacity = "0";
            editModal.style.pointerEvents = "none";
        }, 200);
    }

});
