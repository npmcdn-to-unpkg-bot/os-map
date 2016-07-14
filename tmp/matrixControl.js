L.Control.MatrixLayers = L.Control.Layers.extend({
	_update: function () {
		//much borrowed from https://github.com/Leaflet/Leaflet/blob/59a8c00a1850103f4fba8561961282eb21b29e7d/src/control/Control.Layers.js#L132
		if (!this._container) {
			return;
		}

		this._baseLayersList.innerHTML = '';
		this._overlaysList.innerHTML = '';

		var baseLayersPresent = false,
		    overlaysPresent = false,
		    i, obj;

		//get hold of all the dimension values
		var allDimensions = [];
		for (i in this._layers) {
			obj = this._layers[i];
			var layerName = obj.name;
			
			if (this._matrixLayers !== undefined && layerName in this._matrixLayers) {
				var dimensionElements = layerName.split('/');
				for (var i = 0; i < dimensionElements.length; i++) {
					var dimensionElement = dimensionElements[i];
					if (allDimensions[i] == undefined) {
						allDimensions[i] = {};
					}
					allDimensions[i][dimensionElement] = true;
				}
			} else {
				this._addItem(obj);
				overlaysPresent = overlaysPresent || obj.overlay;
				baseLayersPresent = baseLayersPresent || !obj.overlay;
			}
		}

		//now create the UI for all dimensions
		for (var i = 0; i < allDimensions.length; i++) {
			var dimensionName = this.options.dimensionNames[i];
			var dimension = allDimensions[i];
			var parentElement = document.createElement('div');
			parentElement.style = 'display: block';
			parentElement.innerHTML = '<p>' + dimensionName + '</p>';
			parentElement.dimensionName = dimensionName;
			this._overlaysList.appendChild(parentElement);
			Object.keys(dimension).forEach(function (dimensionElement) { 
				this._addMatrixItem(parentElement, dimensionName, dimensionElement);
			}, this);
		}

	},



	addMatrixOverlay: function (layer, name) {
		if (this._matrixLayers == undefined) {
			this._matrixLayers = {};
		}
		this._matrixLayers[name] = layer;
		this.addOverlay(layer, name);
	},
	
	
	_onMatrixInputClick: function (e) {
		this._handlingClick = true;

		var labelElement = e.currentTarget.parentElement;
		this._addLoadingIndicator(labelElement, function() {
			
			//reset - onInputClick might have got there before us
			this._handlingClick = true;

			//get the inputs in each div and see which are ticked, to get a list of the selected dimension elements
			var divs = this._form.getElementsByTagName('div');
			var checkedDimensions = {};
			for (var i = 0; i < divs.length; i++) {
				var div = divs[i];
				var dimension = div.dimensionName;
				var inputs = div.getElementsByTagName('input');
				if (checkedDimensions[dimension] == undefined) {
					checkedDimensions[dimension] = new Array();
				}
				for (var j = 0; j < inputs.length; j++) {
					var input = inputs[j];
					if (input.checked) {
						checkedDimensions[dimension].push(input.dimensionId);
					}
				}
			}
			//map the group dimension names to an ordering
			var orderedDimensionElements = new Array();
			for (var i = 0; i < this.options.dimensionNames.length; i++) {
				var dimensionName = this.options.dimensionNames[i];
				var dimensionElements = checkedDimensions[dimensionName];
				orderedDimensionElements.push(dimensionElements);
			}
			//iterate to construct a list of selected layers
			var selectedLayerNames = {};
			this._depthFirstIteration(orderedDimensionElements, 0, "", function(path){
				selectedLayerNames[path] = true;
			});
			//now add or remove the layers from the map
			Object.keys(this._matrixLayers).forEach(function (layerName) {
				var layer = this._matrixLayers[layerName];
				if (layerName in selectedLayerNames && !this._map.hasLayer(layer)) {
					this._map.addLayer(layer);

				} else if (!(layerName in selectedLayerNames) && this._map.hasLayer(layer)) {
					this._map.removeLayer(layer);
				}
			}, this);

			this._removeLoadingIndicator(labelElement);

			this._handlingClick = false;

			this._refocusOnMap();
		}.bind(this));
	},
	
	_depthFirstIteration: function (dimensions, dimensionIndex, parentPath, found) {
		var currentDimension = dimensions[dimensionIndex];
		if (currentDimension != undefined) {
			for (var i = 0; i < currentDimension.length; i++) {
				var dimensionValue = currentDimension[i];
				var newPath = dimensionValue;
				if (parentPath.length > 0) {
					newPath = parentPath + '/' + newPath;
				}
				var newIndex = dimensionIndex + 1;
				this._depthFirstIteration(dimensions, newIndex, newPath, found);
			}
		} else {
			found(parentPath);
		}
	},

	_addMatrixItem: function (parentElement, dimensionName, dimensionElement) {
		var label = document.createElement('label'),
		    input,
		    checked = true;//TODO //this._map.hasLayer(obj.layer);

		input = document.createElement('input');
		input.type = 'checkbox';
		input.className = 'leaflet-control-layers-selector';
		input.defaultChecked = checked;
		input.dimensionId = dimensionElement;//L.stamp(obj.layer);//TODO//dimensionName + "::" + 

		L.DomEvent.on(input, 'click', this._onMatrixInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + dimensionElement;

		label.appendChild(input);
		label.appendChild(name);

		parentElement.appendChild(label);

		return label;
	},

	//we have to override this to stop it finding our inputs and then struggling to find layers for them
	_onInputClick: function () {
		var i, input, obj,
		    inputs = this._form.getElementsByTagName('input'),
		    inputsLen = inputs.length;

		this._handlingClick = true;

		for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			if (input.dimensionId === undefined) {//check this isn't a matrix layer
				obj = this._layers[input.layerId];

				if (input.checked && !this._map.hasLayer(obj.layer)) {
					this._map.addLayer(obj.layer);

				} else if (!input.checked && this._map.hasLayer(obj.layer)) {
					this._map.removeLayer(obj.layer);
				}
			}
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_addLoadingIndicator: function (labelElement, callback) {
		var img = document.createElement('img');
		img.src = '../img/loading.gif';
		img.class = 'loading-image';
		img.onload = callback;
		labelElement.appendChild(img);
	},

	_removeLoadingIndicator: function (labelElement) {
		var img = labelElement.getElementsByTagName('img')[0];
		labelElement.removeChild(img);
	}

});

L.control.matrixLayers = function (baseLayers, overlays, options) {
	return new L.Control.MatrixLayers(baseLayers, overlays, options);
};