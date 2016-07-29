var urlBase = "";
if (window != null && window.os_map_base !== undefined) {
	urlBase = window.os_map_base;
}

var leaflet_path = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-rc.2/leaflet';
var matrixLayers_path = 'https://cdn.rawgit.com/tstibbs/Leaflet.MatrixLayersControl/ec4781a9ec7bf1b23535df30037805583f08bde2/src/matrixControl';
if (window.location.search.indexOf("dev=true") !== -1) {
	leaflet_path = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-rc.2/leaflet-src';
	matrixLayers_path = urlBase + '../Leaflet.MatrixLayersControl/src/matrixControl';
}

requirejs.config({
    baseUrl: urlBase + "js",
    paths: {
		leaflet: leaflet_path,
		leaflet_bing: 'http://cdnjs.cloudflare.com/ajax/libs/leaflet-plugins/1.6.0/layer/tile/Bing',
		proj4: 'http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.14/proj4',
		leaflet_cluster: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.0.0-rc.1.0/leaflet.markercluster-src',
		leaflet_mouseposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MousePosition/b628c7be754c134c63117b3feb75e720a1d20673/src/L.Control.MousePosition',
		leaflet_screenposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MapCenterCoord/cc990a672930886aaef55b1a66e651bdaaf27353/src/L.Control.MapCenterCoord',
		leaflet_subgroup: 'https://cdn.rawgit.com/ghybs/Leaflet.FeatureGroup.SubGroup/v1.0.0/dist/leaflet.featuregroup.subgroup-src',
        leaflet_matrixlayers: matrixLayers_path,
		jquery: 'https://code.jquery.com/jquery-3.0.0'
    },
    shim: {
        leaflet: {
            exports: 'L'
        },
        leaflet_bing: {
            deps: ['leaflet'],
            exports: 'L.BingLayer'
        },
        leaflet_mouseposition: {
            deps: ['leaflet'],
            exports: 'L.control.mousePosition'
        },
        leaflet_screenposition: {
            deps: ['leaflet'],
            exports: 'L.control.mapCenterCoord'
        },
        leaflet_cluster: {
            deps: ['leaflet'],
            exports: 'L.markerClusterGroup'
        },
        leaflet_subgroup: {
            deps: ['leaflet'],
            exports: 'L.featureGroup.subGroup'
        },
        leaflet_matrixlayers: {
            deps: ['leaflet'],
            exports: 'L.control.matrixLayers'
        },
        proj4js: {
            exports: 'module.exports'
        }
    }
});
