define(["leaflet", "jquery"],
    function(leaflet, $) {
		var defaults = {
			cluster: true,
			dimensional_layering: false,
			initial_zoom: 13,
			start_position: [53.374694, -1.711474],//lat, long
			force_config_override: false,//if true, start position and zoom will be taken from config, not from local storage
			map_element_id: 'map'
		};

		var Config = leaflet.Class.extend({
			initialize: function (options) {
				var resolvedConfig = $.extend({}, defaults, options);
				
				if (options == null || options.force_config_override !== true) {//check *options*, don't want to retrieve this persisted value
					//unless we've set the attribute to force override local config with the coded config, we should grab the local storage version and overwrite any matching keys
					var saved = this._getSavedConfig();
					resolvedConfig = $.extend({}, resolvedConfig, saved);
				}
				
				//set all values locally so that the exporter object works like a hash
				for (var property in resolvedConfig) {
					if (resolvedConfig.hasOwnProperty(property)) {
						this[property] = resolvedConfig[property];
					}
				}
			},
			
			_getSavedConfig: function() {
				if (localStorage !== undefined) {
					var saved = localStorage.getItem('os_map:config');
					if (saved != null) {
						return JSON.parse(saved);
					} else {
						return null;
					}
				} else {
					return null;
				}
			},
			
			persist: function(options) {
				if (localStorage !== undefined) {
					var saved = this._getSavedConfig();
					if (saved != null) {
						options = $.extend({}, saved, options);
					}
					localStorage.setItem('os_map:config', JSON.stringify(options));
				}
			}
		});

		return Config;
    }
);
