$(document).ready(function () {

    // عرض تفاصيل الكتاب عند تغيير الحالة
    $(".check").change(function () {
        $(this).closest("tr").next(".hidden").toggleClass("visible");
    });

    // دالة التحقق من صحة المدخلات
    function validateForm() {
        var isValid = true;
        var errorMsg = "";

        // التحقق من الرقم الوطني
        var nationalID = $('#nationalID').val();
        var regexNationalID = /^(0[1-9]|1[0-4])[0-9]{9}$/;
        if (!regexNationalID.test(nationalID)) {
            errorMsg += "الرقم الوطني غير صالح. يجب أن يبدأ بالأرقام بين 01-14 متبوعاً بـ 9 أرقام.\n";
            isValid = false;
        }

        // التحقق من الاسم الكامل
        var fullName = $('#fullName').val();
        if (fullName && !/^[أ-ي\s]+$/.test(fullName)) {
            errorMsg += "الاسم المدخل غير صالح. يجب استخدام الأحرف العربية والمسافات فقط.\n";
            isValid = false;
        }

        // التحقق من رقم الجوال
        var mobile = $('#mobile').val();
        if (mobile && !/^09[^12]\d{7}$/.test(mobile)) {
            errorMsg += "رقم الجوال غير صالح. يجب أن يبدأ بـ 09 ويتبعه 8 أرقام.\n";
            isValid = false;
        }

        // التحقق من البريد الإلكتروني
        var email = $('#email').val();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg += "البريد الإلكتروني المدخل غير صالح.\n";
            isValid = false;
        }

        // عرض رسائل الخطأ
        if (!isValid) {
            alert(errorMsg);
        }

        return isValid;
    }

    // عرض النموذج عند الضغط على زر متابعة
    $('#continueButton').click(function () {
        if ($('input[type="radio"]:checked').length > 0) {
            $('#formContainer').fadeToggle();
        } else {
            alert(' Please Chouse a Book..');
        }
    });

    // إغلاق النموذج
    $('#closeForm').click(function () {
        $('#formContainer').fadeToggle();
    });

    // معالجة إرسال النموذج
    $('#propertyForm').on('submit', function (e) {
        e.preventDefault(); 

        if (validateForm()) {
            // جلب تفاصيل الكتاب المحدد
            var selectedDetails = $('input[type="radio"]:checked')
                .closest("tr")
                .next("tr.hidden")
                .find("ul li")
                .map(function () {
                    return $(this).text();
                })
                .get()
                .join('\n');
            
            // عرض رسالة النجاح مع تفاصيل الكتاب
            alert('Succsesfully  ! \n\nتفاصيل الكتاب:\n' + selectedDetails);
            $('#formContainer').slideToggle();
        }
    });
});
