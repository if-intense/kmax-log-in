/* common.js */
// require jquery

function _htmesc(s) {
	return (s+'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#039;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function isEmpty(value) {
    return (
        value === null || // check for null
        value === undefined || // check for undefined
        value === '' || // check for empty string
        (Array.isArray(value) && value.length === 0) || // check for empty array
        (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
    );
}

const isNumberAllowString = (n) => {
	const type = typeof(n);
	if ( type === 'number' && Number.isFinite(n) ) {
		return true;
	}
	if ( type === 'string' && n.trim() !== '' && Number.isFinite(n - 0) ) {
		return true;
	}
	return false;
};
const isNumber = (n) => {
	if ( typeof(n) === 'number' && n - n === 0 ) {
		return true;
	}
	return false;
};

function to_int(v) {return parseInt(v, 10) || 0;}

// Loader
function _showLoader() {
	if($('.loader-wrap-transparent').length==0){
		$('body').append('<div class="loader-wrap-transparent"><div class="loader">Loading...</div></div>');
	}
}
function _hideLoader() {
	$('.loader-wrap-transparent').remove();
}

// ヘッダー メッセージ
function _showHeaderMessage(message, type='success'){
	$('.c-success_block').remove();
	$('.c-error_block').remove();
	if(type=='success'){
		$('body').prepend('<div class="c-success_block"><p class="c-txt_lh12">'+_htmesc(message)+'</p></div>')
	}else if(type=='error'){
		$('body').prepend('<div class="c-error_block"><p class="c-txt_lh12">'+_htmesc(message)+'</p></div>')
	}
}
function _hideHeaderMessage(){
	$('.c-success_block').remove();
	$('.c-error_block').remove();
}

// モーダル
function _alert_modal(message, cb_ok){
	htm  ='<div class="c-modal js-modal">';
	htm +='<div class="c-modal_bg js-modal-close"></div>';
	htm +='<div class="c-modal_content">';
	htm +='<p class="l-m002">'+_htmesc(message)+'</p>';
	htm +='<div class="c-btn_wrap c-flex_cc">';
	htm +='<a id="confirm_modal_ok" class="l-m0 c-btn c-btn_half c-btn_em">OK</a>';
	htm +='</div>';
	htm +='</div>';
	htm +='</div>';
	$('body').append(htm);
	$('div.js-modal').fadeIn();
	$('#confirm_modal_ok').on('click', function(){
		if(cb_ok) try{ setTimeout(cb_ok, 1);}catch(e){}
		$('div.js-modal').fadeOut().queue(function() {
			this.remove();
		});
		return false;
	});
}

function _confirm_modal(message, cb_ok, cb_cancel){
	htm  ='<div class="c-modal js-modal">';
	htm +='<div class="c-modal_bg js-modal-close"></div>';
	htm +='<div class="c-modal_content">';
	htm +='<p class="l-m002">'+_htmesc(message)+'</p>';
	htm +='<div class="c-btn_wrap c-flex_cc">';
	htm +='<a id="confirm_modal_cancel" class="c-btn c-btn_half">キャンセル</a>';
	htm +='<a id="confirm_modal_ok" class="l-m0 c-btn c-btn_half c-btn_em">OK</a>';
	htm +='</div>';
	htm +='</div>';
	htm +='</div>';
	$('body').append(htm);
	$('div.js-modal').fadeIn();
	$('#confirm_modal_cancel').on('click', function(){
		if(cb_cancel) try{ setTimeout(cb_cancel, 1);}catch(e){}
		$('div.js-modal').fadeOut().queue(function() {
			this.remove();
		});
		return false;
	});
	$('#confirm_modal_ok').on('click', function(){
		if(cb_ok) try{ setTimeout(cb_ok, 1);}catch(e){}
		$('div.js-modal').fadeOut().queue(function() {
			this.remove();
		});
		return false;
	});
}

function _remove_modal(){
	$('.js-modal').remove();
}

$(function(){
	if (!String.prototype.format) {
		String.prototype.format = function () {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function (match, number) {
				return typeof args[number] != 'undefined'? args[number]: match;
			});
		};
	}

	$(document).on('click', '.js-modal-open', function (){
		$('div.js-modal').fadeIn();
		return false;
	});
	$(document).on('click', '.js-modal-close', function (){
		$('div.js-modal').fadeOut().queue(function() {
			this.remove();
		});
		return false;
	});

	// モーダル確認付 aリンク (a.confirm-link)
	$(document).on('click', '.confirm-link', function (){
		var data = $(this).data();
		console.log(data.message);
		var url = $(this).attr('href');

		_confirm_modal(data.message, function(){ location.href=url; }, null);

		return false;
	});
});

//selectが初期値以外を選択しているかを判定
//（生年月日の場合、年部分でのタイトル縮小用）
$(document).on('change', '.c-hd_ctrl', function() {
	var selectVal = $(this).val();
	if (selectVal != "年") {
		$(this).addClass("js_selectfocus");
	} else if (selectVal != "月") {
		$(this).addClass("js_selectfocus");
	} else  if (selectVal != "&nbsp;") {
		$(this).addClass("js_selectfocus");
	} else {
		$(this).removeClass("js_selectfocus");
	}
});
$(".c-hd_ctrl").on('mouseout', function() {
	$(this).blur();
});

$(".c-profimg > img").on("error", function () {
	$(this).attr("src", "img/common/user_img.svg");
});

//アコーディオン
$(function(){
	$(".c-accordion").on("click", function() {
		$(this).toggleClass('selected');
		$(this).next().slideToggle();
	});
});

function history_back(default_url='/'){
	var ref = document.referrer || '';
	var re = new RegExp(location.hostname,"i");

	if(ref.match(re) && window.history.length>0){
		window.history.back();
	}else{
		if(default_url){
			console.log("go: "+default_url)
			location.href = default_url;
		} else location.href = "/";
		//$(this).attr("href")
	}
	return false;
}

//ページ遷移後のスムーススクロール
var headerHeight = $('header').outerHeight();
var urlHash = location.hash;
if (urlHash) {
	$('body,html').stop().scrollTop(0);
	setTimeout(function () {
		var target = $(urlHash);
		var position = target.offset().top - headerHeight;
		$('body,html').stop().animate({
			scrollTop: position
		}, 500);
	}, 100);
}
