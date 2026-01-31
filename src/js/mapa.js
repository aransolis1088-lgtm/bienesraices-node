(function() {
    const lat = document.querySelector('#latitud').value || 20.528130813173235;
    const lng = document.querySelector('#longitud').value || -100.79456503868711;
    const mapa = L.map('mapa').setView([lat, lng ], 13);
    let marker;

    //Utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //el pin
    marker = L.marker([lat, lng], {draggable: true, autoPan: true}).addTo(mapa);

    //detectar movimiento del pin
    marker.on('moveend', function(e) {
        marker = e.target;
        const posicion = marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

        //Obtener la informacion de las calles con geocodeService
        geocodeService.reverse().latlng(posicion, 13).run(function(error, result) {
            marker.bindPopup(result.address.LongLabel);

            //llenar los campos
            document.querySelector('.calle').textContent = result?.address?.Address || '';
            document.querySelector('#calle').value = result?.address?.Address || '';
            document.querySelector('#longitud').value = posicion.lng || '';
            document.querySelector('#latitud').value = posicion.lat || '';
        });
    });


})()