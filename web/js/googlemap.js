var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(35.697456, 139.702148);
  var opts = {
    zoom: 10,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
}

function codeAddress() {
  var address = document.getElementById("address").value;
  if (geocoder) {
    geocoder.geocode({
        'address': address,
        'region': 'jp'
      },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);

          var bounds = new google.maps.LatLngBounds();
          for (var r in results) {
            if (results[r].geometry) {
              var latlng = results[r].geometry.location;
              bounds.extend(latlng);
              new google.maps.Marker({
                position: latlng,
                map: map
              });

              document.getElementById('id_ido').innerHTML = latlng.lat();
              document.getElementById('id_keido').innerHTML = latlng.lng();

              // shopの情報の登録
              var apikey = "655099e79b56b4ca5a1429d184acd69f480738197c9ad755b5658a6f8db0571a";
              var clientkey = "071d9fc038d795a9895b96545df65f43fe4b32781181d45649b1f6d39c717555";
              var ncmb = new NCMB(apikey, clientkey);

              var latitude = latlng.lat();
              var longitude = latlng.lng();
              var geoPoint = new ncmb.GeoPoint(latitude, longitude);

              var Shop = ncmb.DataStore("shop");
              var s = new Shop();

              s.set("shopName", "東京大学本郷キャンパス");
              s.set("address", address);
              s.set("geoPoint", geoPoint);
              s.save()
                .then(function() {
                  console.log("登録成功");
                })
                .catch(function(err) {
                  // エラー処理
                  console.log("登録失敗");
                });
            }
          }
          //map.fitBounds(bounds);
        } else {
          alert("Geocode 取得に失敗しました reason: " + status);
        }
      });
  }
}
