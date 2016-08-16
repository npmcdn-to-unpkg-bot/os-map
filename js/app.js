var urlBase = "";
if (window != null && window.os_map_base !== undefined) {
	urlBase = window.os_map_base;
}

var versions = {
	leaflet: 'v0.7.7',
	leaflet_bing: '1.6.0',
	proj4: '2.3.14',
	leaflet_cluster: '232e93ccbe5b70241913f47a4d1a8ceec8c88c30',
	leaflet_mouseposition: 'b628c7be754c134c63117b3feb75e720a1d20673',
	leaflet_screenposition: 'cc990a672930886aaef55b1a66e651bdaaf27353',
	leaflet_subgroup: 'e675f5736513ec6f9a8ab391965808b192990e9e',
	leaflet_matrixlayers: 'ec4781a9ec7bf1b23535df30037805583f08bde2',
	jquery: '3.0.0',
	Squire: '0.2.1',
	sinon: '1.17.5'
};

var paths = {
	leaflet: 'http://cdn.leafletjs.com/leaflet/' + versions.leaflet + '/leaflet',
	leaflet_bing: 'http://cdnjs.cloudflare.com/ajax/libs/leaflet-plugins/' + versions.leaflet_bing + '/layer/tile/Bing',
	proj4: 'http://cdnjs.cloudflare.com/ajax/libs/proj4js/' + versions.proj4 + '/proj4',
	leaflet_cluster: 'https://cdn.rawgit.com/Leaflet/Leaflet.markercluster/' + versions.leaflet_cluster + '/dist/leaflet.markercluster-src',
	leaflet_mouseposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MousePosition/' + versions.leaflet_mouseposition + '/src/L.Control.MousePosition',
	leaflet_screenposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MapCenterCoord/' + versions.leaflet_screenposition + '/src/L.Control.MapCenterCoord',
	leaflet_subgroup: 'https://cdn.rawgit.com/ghybs/Leaflet.FeatureGroup.SubGroup/' + versions.leaflet_subgroup + '/leaflet.featuregroup.subgroup-src',
	leaflet_matrixlayers: 'https://cdn.rawgit.com/tstibbs/Leaflet.MatrixLayersControl/' + versions.leaflet_matrixlayers + '/src/matrixControl',
	jquery: 'https://code.jquery.com/jquery-' + versions.jquery
}

var devPaths = {
	Squire: 'https://npmcdn.com/squirejs@' + versions.Squire + '/src/Squire',
	sinon: 'https://npmcdn.com/sinon@' + versions.sinon + '/pkg/sinon'
}

if (window.location.search.indexOf("dev=true") !== -1) {
	paths.leaflet = paths.leaflet + '-src';
	paths.leaflet_matrixlayers = urlBase + '../Leaflet.MatrixLayersControl/src/matrixControl';
}


requirejs.config({
    baseUrl: urlBase + "js",
    paths: paths,
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
