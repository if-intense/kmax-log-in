/* login.js */

//validation
$.validator.addMethod("regex", function(value, element, reg_str) {
	var re = new RegExp(reg_str);
	return re.test(value);
}, "入力値が正しくありません");
$(function () {
	$(".js-validate").validate({
		errorElement: 'p',
		errorClass: "is-error",
		errorPlacement: function (error, element) {
			if (element.is(':radio, :checkbox')) {
				error.appendTo(element.parent());
			} else {
				error.insertAfter(element.parent());
			}
			//入力し直した時の判定
			$('input', 'textarea').on('keyup', function () {
				if (!$(this).valid()) {
					error.insertAfter(element.parent());
				} else {
					$(this).parent().removeClass("is-error");
				}
			});
			//selectを再選択した場合の判定
			$(document).on('change', 'select', function () {
				if ($(this).valid()) {
					$("p[id=^" + this + "]").removeClass("is-error");
				}
			});
		},
		rules: {
			email: {
				required:true,
				email :true
			},
			password: {
				required:true,
				minlength: 8,
				maxlength: 30
			},
		},
		messages: {
			email: {
				required: "メールアドレスを入力してください",
				email : "有効なメールアドレスを入力してください"
			},
			password: {
				required: "パスワードを入力してください"
			},
		}
	});
});
