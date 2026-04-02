document.addEventListener("DOMContentLoaded", () => {

    // ====== إنشاء مودال التأكيد ======
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
            transition:
