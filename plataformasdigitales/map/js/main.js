        function filter_brt1(feature) {
            if (feature.properties.ID_MG === 1) return true
        }
        function filter_brt2(feature) {
            if (feature.properties.ID_MG === 2) return true
        }
        function filter_brt3(feature) {
            if (feature.properties.ID_MG === 3) return true
        }
        
        
        
        var api_stadia = 'd665daaa-c574-4129-a04a-d443865cb97c'
        var map = L.map('map', {
            zoomControl: true,
            maxZoom: 28,
            minZoom: 13
        }).fitBounds([
            [18.959155873777696, -98.34765556199129],
            [19.090022479410795, -98.07164760998482]
        ]);
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix(
            'Desarrollado por: <a href="https://www.linkedin.com/in/geofrancisco/" title="GeoSIG" "target="_blank">GeoSIG</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="#">GEOCARTOS</a> '
        );
        var autolinker = new Autolinker({
            truncate: {
                length: 30,
                location: 'smart'
            }
        });
        L.control.locate({
            locateOptions: {
                maxZoom: 19
            }
        }).addTo(map);
        var bounds_group = new L.featureGroup([]);

        function setBounds() {}

        map.createPane('pane_baseMap');
        map.getPane('pane_baseMap').style.zIndex = 0;

        // BASEMAPS
        var stadiaBaseMap = L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=d665daaa-c574-4129-a04a-d443865cb97c', {
                pane: 'pane_baseMap',
                opacity: 1.0,
                attribution: 'Basemap ©<a href="https://stadiamaps.com/">Stadia Maps</a> &middot; Data ©<a href=https://www.openstreetmap.org/copyright">OpenStreetMaps</a>',
                minZoom: 1,
                maxZoom: 28,
                minNativeZoom: 0,
                maxNativeZoom: 20
            });
        stadiaBaseMap;
        var baseMapsatelital = L.tileLayer(
             'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                 pane: 'pane_baseMap',
                 subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                 opacity: 1.0,
                 attribution: 'Basemap ©<a href="https://stadiamaps.com/">Stadia Maps</a> &middot; Data ©<a href=https://www.openstreetmap.org/copyright">OpenStreetMaps</a>',
                 minZoom: 1,
                 maxZoom: 28,
                 minNativeZoom: 0,
                 maxNativeZoom: 20
             });
         
         map.addLayer(stadiaBaseMap);
         // POPUPS
        function pop_bus_stops(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                    <h5 colspan="2">' + (feature.properties['NOMBRE'] !== null ? autolinker.link(feature.properties[
                'NOMBRE'].toLocaleString()) : '') + '</h5>\
                    </tr>\
                </table>';
            layer.bindPopup(popupContent, {
                maxHeight: 400
            });
        }

        function pop_routes_brt_0(feature, layer) {
            var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['osm_id'] !== null ?
                autolinker.link(feature.properties['osm_id'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['name'] !== null ?
                autolinker.link(feature.properties['name'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['type'] !== null ?
                autolinker.link(feature.properties['type'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
            layer.bindPopup(popupContent, {
                maxHeight: 400
            });
        }
        // ICONOS
        var iconL1 = L.icon({
            iconUrl: 'map/images/png/S-Y.png',
            iconSize: [30, 30],
            popupAnchor: [0,-5],
        })
        iconL2 = L.icon({
            iconUrl: 'map/images/png/S-B.png',
            iconSize: [30, 30]
        })
        iconL3 = L.icon({
            iconUrl: 'map/images/png/S-G.png',
            iconSize: [30, 30]
        })
        // ESTILOS
        function clasified_style_bus_stop(feature) {
            switch (String(feature.properties['ID_RUTA'])) {
                case "L1":
                    return iconL1
                    break;
                case "L2":
                    return iconL2
                    break;
                case "L3":
                    return iconL3
                    break;
                default:
                    return {
                        pane: 'pane_bus_stops_1',
                            radius: 3.0,
                            opacity: 1,
                            color: 'rgba(35,35,35,0.0)',
                            dashArray: '',
                            lineCap: 'butt',
                            lineJoin: 'miter',
                            weight: 1,
                            fill: true,
                            fillOpacity: 1,
                            fillColor: 'rgba(58,113,201,1.0)',
                            interactive: true,
                    }
                    break;
            }
        }

        function clasified_style_rutas(feature) {
            switch (String(feature.properties['name'])) {
                case 'Ruta L1 BRT':
                    return {
                            pane: 'pane_ruta',
                            opacity: 1,
                            color: 'rgba(238,48,99,1.0)',
                            dashArray: '',
                            lineCap: 'square',
                            lineJoin: 'bevel',
                            weight: 1.0,
                            fillOpacity: 0,
                            interactive: true,
                    }
                    break;
                case 'Ruta L2 BRT':
                    return {
                            pane: 'pane_ruta',
                            opacity: 1,
                            color: 'rgba(190,235,39,1.0)',
                            dashArray: '',
                            lineCap: 'square',
                            lineJoin: 'bevel',
                            weight: 1.0,
                            fillOpacity: 0,
                            interactive: true,
                    }
                    break;
                case 'Ruta L3 BRT':
                    return {
                            pane: 'pane_ruta',
                            opacity: 1,
                            color: 'rgba(106,238,203,1.0)',
                            dashArray: '',
                            lineCap: 'square',
                            lineJoin: 'bevel',
                            weight: 1.0,
                            fillOpacity: 0,
                            interactive: true,
                    }
                    break;
            }
        }
        // CREATE LAYERPANE
        map.createPane('pane_ruta');
        map.getPane('pane_ruta').style.zIndex = 400
        map.createPane('pane_estaciones');
        map.getPane('pane_estaciones').style.zIndex = 400;
        map.getPane('pane_estaciones').style['mix-blend-mode'] = 'normal';
        // LAYERS
        var station_l1_layer = new L.geoJson(stations_l1, {
            attribution: '',
            interactive: true,
            onEachFeature: pop_bus_stops,
            layerName: 'Estaciones L1 BRT',
            pane: 'pane_estaciones',
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.marker(latlng, {
                    icon: clasified_style_bus_stop(feature)
                });
            },
        });
        bounds_group.addLayer(station_l1_layer);
        map.addLayer(station_l1_layer);
        var station_l2_layer = new L.geoJson(stations_l2, {
            attribution: '',
            interactive: true,
            onEachFeature: pop_bus_stops,
            layerName: 'Estaciones L1 BRT',
            pane: 'pane_estaciones',
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.marker(latlng, {
                    icon: clasified_style_bus_stop(feature)
                });
            },
        });
        bounds_group.addLayer(station_l2_layer);
        map.addLayer(station_l2_layer);
        var station_l3_layer = new L.geoJson(stations_l3, {
            attribution: '',
            interactive: true,
            onEachFeature: pop_bus_stops,
            layerName: 'Estaciones L1 BRT',
            pane: 'pane_estaciones',
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.marker(latlng, {
                    icon: clasified_style_bus_stop(feature)
                });
            },
        });
        bounds_group.addLayer(station_l3_layer);
        map.addLayer(station_l3_layer);
       

        var ruta_1_layer = new L.geoJson(ruta_1_brt, {
            attribution: '',
            interactive: false,
            dataVar: 'ruta_1_brt',
            layerName: 'Ruta 1 BRT',
            
            style: clasified_style_rutas,
        })
        bounds_group.addLayer(ruta_1_layer);
        map.addLayer(ruta_1_layer);
        var ruta_2_layer = new L.geoJson(ruta_2_brt, {
            attribution: '',
            interactive: false,
            dataVar: 'ruta_2_brt',
            layerName: 'Ruta 2 BRT',
            
            style: clasified_style_rutas,
        })
        bounds_group.addLayer(ruta_2_layer);
        map.addLayer(ruta_2_layer);
        var ruta_3_layer = new L.geoJson(ruta_3_brt, {
            attribution: '',
            interactive: false,
            dataVar: 'ruta_3_brt',
            layerName: 'Ruta 3 BRT',
            
            style: clasified_style_rutas,
        })
        bounds_group.addLayer(ruta_3_layer);
        map.addLayer(ruta_3_layer);
        // LAYER GROUPS
        var group_base_map = L.layerGroup([stadiaBaseMap]);
        var group_rutes = L.layerGroup([ruta_1_layer, ruta_2_layer, ruta_3_layer])
        var rutas = {

            "<img src='legend/S-Y.png' style = 'height: 20px;width: auto;' /> <span class='my-layer-item'> Estaciones Ruta 1</span>": station_l1_layer,
            "<img src='legend/S-B.png' style = 'height: 20px;width: auto;'/> <span class='my-layer-item'>Estacion Ruta 2</span>": station_l2_layer,
            "<img src='legend/S-G.png' style = 'height: 20px;width: auto;' /> <span class='my-layer-item'>Estacion Ruta 3</span>": station_l3_layer,

            "<img src='legend/ruta_1.png' /> <span class='my-layer-item'>Ruta 1</span>": ruta_1_layer,
            "<img src='legend/ruta_2.png' /> <span class='my-layer-item'>Ruta 2</span>": ruta_2_layer,
            "<img src='legend/ruta_3.png' /> <span class='my-layer-item'>Ruta 3</span>": ruta_3_layer,
        }
        var baseMaps = {
            "<span class='fw-bold'>Google Satelite&copy</span>": baseMapsatelital,
            "<span class='fw-bold'>Stadia Maps&copy</span>": stadiaBaseMap,
        }



        L.control.layers(baseMaps, rutas).addTo(map)
         var credctrl = L.controlCredits({
             image: "map/images/png/geocartos.png",
             link: "https://www.linkedin.com/company/geocartos",
             text: " "
         }).addTo(map);



        setBounds();
