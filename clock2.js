document.addEventListener("DOMContentLoaded", () => {

    // ====== إنشاء المودال ======
    const modal = document.createElement("div");
    modal.id = "confirmModal";
    modal.style = `
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

    modal.innerHTML = `
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
                <button id="yesBtn" style="
                    flex:1;
                    padding:10px;
                    border-radius:12px;
                    background:#ef4444;
                ">حذف</button>

                <button id="noBtn" style="
                    flex:1;
                    padding:10px;
                    border-radius:12px;
                    background:rgba(255,255,255,0.1);
                ">إلغاء</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const box = modal.querySelector("#modalBox");

    function openModal() {
        modal.style.pointerEvents = "auto";
        modal.style.opacity = "1";

        setTimeout(() => {
            box.style.transform = "scale(1) translateY(0)";
            box.style.opacity = "1";
        }, 10);
    }

    function closeModal() {
        box.style.transform = "scale(0.8) translateY(20px)";
        box.style.opacity = "0";

        setTimeout(() => {
            modal.style.opacity = "0";
            modal.style.pointerEvents = "none";
        }, 200);
    }

    // ====== تعديل دالة الحذف ======
    const originalDelete = window.deleteCustomTask;
    let currentId = null;

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

});
