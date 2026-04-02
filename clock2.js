
// ننتظر تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {

    // نحفظ الدالة الأصلية
    const originalDelete = window.deleteCustomTask;

    // نعيد تعريف الدالة مع إضافة تحذير
    window.deleteCustomTask = function(taskId, event) {
        event.stopPropagation();

        const confirmDelete = confirm("⚠️ هل أنت متأكد من حذف هذه المهمة؟");

        if (confirmDelete) {
            originalDelete(taskId, event);
        } else {
            // صوت بسيط عند الإلغاء (اختياري 😏)
            if (typeof playSound === "function") {
                playSound('short');
            }
        }
    };

});
