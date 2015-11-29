var apikey = "655099e79b56b4ca5a1429d184acd69f480738197c9ad755b5658a6f8db0571a";
var clientkey = "071d9fc038d795a9895b96545df65f43fe4b32781181d45649b1f6d39c717555";

var ncmb = null;

$(function() {
    ncmb = new NCMB(apikey, clientkey);
    var currentUser = ncmb.User.getCurrentUser();
    
    if (currentUser) {
        console.log("ログイン中のユーザー: " + currentUser.get("userName"));
    } else {
        alert("ログインしてください！");
        location.href = "./index.html";
    }

    codeAddress(currentUser.address, function(lat, lon){
	$("#userObjectId").val(currentUser.objectId);
	$("#geoLat").val(lat);
	$("#geoLon").val(lon);
    });
    
//    set("userObjectId", currentUser.objectId)
});

$(document).ready(function(){
    var currentUser = ncmb.User.getCurrentUser();
    var Coupon = ncmb.DataStore("coupon");
    var coupon = new Shop();
    
    // ログアウト処理
    $("#logout").click(function(e) {
        e.preventDefault();
        currentUser.logout()
	    .then(function(data) {
		// ログイン後処理
		alert("ログアウトしました！");
		location.href = "./index.html";
            })
	    .catch(function(err) {
		// エラー処理
		console.log(err);
		//alert(err);
            });
    });

    //$("#")

});
