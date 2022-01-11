// グローバル定数を定義する
function define(name, value){
  Object.defineProperty(window, name, { 
   get: function(){return value;},
   set: function(){throw(name+' is already defined !!');},
  });
}

var firebaseConfig = location.hostname.toLowerCase()=='kamismax.kamisma.com' ? {
	apiKey: "AIzaSyCr0xAMqTyUEA-iJEESDxPbNOzAo_EBUVQ",
	authDomain: "kamismax.firebaseapp.com",
	projectId: "kamismax",
	storageBucket: "kamismax.appspot.com",
	messagingSenderId: "923435460647",
	appId: "1:923435460647:web:0f6f14bf993ce3a93f4602",
	measurementId: "G-3CBR2PL4RC"
} : {
	apiKey: "AIzaSyBB1l58ICBCrbaynn86PnRrezR9V-ogbrU",
	authDomain: "kamismax-dev.firebaseapp.com",
	projectId: "kamismax-dev",
	storageBucket: "kamismax-dev.appspot.com",
	messagingSenderId: "261598252893",
	appId: "1:261598252893:web:d5ad516f97fbf10a4c22b4",
	measurementId: "G-VQ6BLPBJ7J",
};
var signin_callback_successed = false;
var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			signin_callback_successed = true;
			console.log("ui: signInSuccessWithAuthResult");
			console.log(authResult);
			return false;
		},
		signInFailure: function(error) {
			console.log("ui: signInFailure");
		},
		uiShown: function() {
			// The widget is rendered.
			console.log("ui: uiShown");

			if($('.loader-wrap').length){
				if($('#firebaseui-auth-container .firebaseui-callback-indicator-container').length){
					// Firebaseのインディケーターが表示されている場合、その間はローダーを表示し続ける
					const target = document.getElementById('firebaseui-auth-container')
					const observer = new MutationObserver(records => {
						if($('#firebaseui-auth-container .firebaseui-callback-indicator-container').length==0){
							setTimeout(function(){$('.loader-wrap').remove();}, 2000);
						}
					})
					observer.observe(target, {childList: true})
				} else{
					$('.loader-wrap').remove();
				}
			}
		}
	},
	signInOptions: [
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		//firebase.auth.EmailAuthProvider.PROVIDER_ID,
	],
};
function safeVal(o, name, def_value=undefined){try{return eval('o.'+name)}catch(e){return def_value}}

function enc64(s) {
	return btoa(String.fromCharCode.apply(null, new TextEncoder().encode(s)));
}

function dec64(s) {
	return new TextDecoder().decode(new Uint8Array(Array.prototype.map.call(atob(s), c => c.charCodeAt())));
}

// 第1引数から順に評価して有効な値を返す
function selectValid() {
	var vargs = Array.from(arguments);
	for(var i=0; i<vargs.length; i++){if(vargs[i]){return vargs[i];}}
}

var ref = document.referrer;
console.log(ref);

firebase.initializeApp(firebaseConfig);

//
// 認証状態検知
//
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log("User is signed in");

		var extToken = {};
		extToken.uid     = user.uid
		extToken.name    = selectValid(safeVal(user, 'displayName', null), safeVal(user, 'providerData[0].displayName', null));
		extToken.email   = selectValid(safeVal(user, 'email', null)      , safeVal(user, 'providerData[0].email', null));
		extToken.picture = selectValid(safeVal(user, 'photoURL', null)   , safeVal(user, 'providerData[0].photoURL', null));
		console.log(extToken);

		if( ! location.pathname.match('/login')) return;
		if(!signin_callback_successed){
			firebase.auth().signOut();
			return;
		}

		firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
			// Send token to your backend via HTTPS
			// ...
			console.log("idToken: "+idToken);

			data = {'idToken':idToken, 'extToken':enc64(JSON.stringify(extToken))};

			$.ajax({
				url : "/sns_checkin",
				type : 'POST',
			    dataType: 'json',
				data:JSON.stringify(data),
				contentType: 'application/json',
				crossDomain: true,
				tryCount : 0,
				retryLimit : 3,
			    timeout: 5000,
				error : function(xhr, textStatus, errorThrown ) {
					this.tryCount++;
					if (this.tryCount <= this.retryLimit) {
						$.ajax(this);
						return;
					}
					if (xhr.status == 500) {
					} else {
					}
				},
				success : function(json) {
					console.log(json);
					location.href = json.redirect_url;
				}
			});

		}).catch(function(error) {
			// Handle error
		});

		//user.getToken()
/*
		firebase.auth().signOut().then(() => {
			// Sign-out successful.
		}).catch((error) => {
			// An error happened.
		});
*/

	} else {
		console.log("User is signed out");

		if($('#firebaseui-auth-container').length){
			var ui = new firebaseui.auth.AuthUI(firebase.auth());
			ui.start('#firebaseui-auth-container', uiConfig);
		}
	}
});

$(document).ready(function () {

	// Initialize the FirebaseUI Widget using Firebase.
	//firebase.auth();

	//var ui = new firebaseui.auth.AuthUI(firebase.auth());
	//ui.start('#firebaseui-auth-container', uiConfig);

});


/*
ログアウト

firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
*/
