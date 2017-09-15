sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"my/namespace/model/Constant",
	"my/namespace/model/formatter"
], function(Controller, Constant, formatter) {
	"use strict";

	var FRAGMENT_NAME = "my.namespace.view.fragment.SettingsDialog";

	var _firstOpen = true;
	var _dialog, _mainController;
	var _filterSelection = {};
	var _defaultFilterSelection = {
		ReportStatus: {
			"TRAINER": true,
			"HEAD": true,
			"APPROVED": true,
			"REJECTED": true
		}
	};
	
	/**
	 * Extracts the keys of an object and returns them in an array
	 * @param {Object} The object to extract the keys from
	 * @returns {Array} The keys of the object
	 */
	function _objectKeysToArray(selectionObject) {
		var arr = [];
		Object.keys(selectionObject).forEach(function(keyType) {
			Object.keys(selectionObject[keyType]).forEach(function(keyValue) {
				if (selectionObject[keyType] && selectionObject[keyType][keyValue] === true) {
					if (!arr[keyType]) {
						arr[keyType] = [];
					}
					arr[keyType].push(keyValue);
				}
			});
		});
		return arr;
	}

	/**
	 * Selects the filterItems which should be selected by default
	 * @param {Dialog} The ViewSettingsDialog
	 */
	function _selectDefaultFilterItems() {
		// Current TrainingYear should be selected by default
		// So a reset of the dialog should select this item
		_dialog.setSelectedFilterCompoundKeys(_defaultFilterSelection);
		_filterSelection = _objectKeysToArray(_defaultFilterSelection);
	}

	function _adjustDialogToRole(myPersonData) {
		if (myPersonData.IsTrainee && (!myPersonData.IsTrainer && !myPersonData.IsHead)) {
			// Person is only Trainee so remove unnecessary filteritems
			var filterItems = _dialog.getFilterItems();
			filterItems.forEach(function(item) {
				switch (item.getId()) {
					case "generation":
					case "trainee":
					case "approver":
						_dialog.removeFilterItem(item);
				}
			});
		}
	}

	function _createDialog(controller, view, contentDensityClass) {
		_dialog = sap.ui.xmlfragment(FRAGMENT_NAME, controller);

		//		_adjustDialogToRole(view.getModel("MyPerson").getData());

		view.addDependent(_dialog);
		// forward compact/cozy style into Dialog
		_dialog.addStyleClass(contentDensityClass);

	}

	return Controller.extend("my.namespace.controller.fragment.SettingsController", {

		formatter: formatter,

		constructor: function(mainController, view, contentDensityClass) {
			_mainController = mainController;
			_createDialog(this, view, contentDensityClass);
			_filterSelection = _objectKeysToArray(_defaultFilterSelection);
		},

		getDialog: function() {
			if (_firstOpen) {
				_firstOpen = false;
				_selectDefaultFilterItems();
			}
			return _dialog;
		},

		onConfirm: function(event) {
			var filterItems = event.getParameter("filterItems");

			_filterSelection = {};

			for (var i = 0; i < filterItems.length; ++i) {
				var filterType = filterItems[i].getParent().getKey();
				var value = filterItems[i].getKey();

				if (!_filterSelection[filterType]) {
					_filterSelection[filterType] = [];
				}
				_filterSelection[filterType].push(value);
			}

			_mainController.loadDataFromService();
		},

		getFilterSelection: function() {
			return _filterSelection;
		},

		onResetFilters: function() {
			_selectDefaultFilterItems();
		},
		
		getFilteredStartDate: function() {
			var value = null;
			if (_filterSelection["Time"]) {
				value = _filterSelection["Time"][0];
			}
			
			var JANUARY = 0;
			var SEPTEMBER = 8;

			var current = new Date();
			var date = new Date(current.getFullYear(), current.getMonth(), current.getDate()); // time -> 00:00:00

			switch (value) {
				case "week1":
					date.setDate(date.getDate() - 7);
					break;
				case "month3":
					date.setMonth(date.getMonth() - 3);
					break;
				case "month6":
					date.setMonth(date.getMonth() - 6);
					break;
				case "month12":
					date.setMonth(date.getMonth() - 12);
					break;
				case "trainingYear":
					date.setMonth(SEPTEMBER);
					date.setDate(1);

					if (date > current) {
						date.setFullYear(current.getFullYear() - 1);
					}

					break;
				default: // none
					date.setFullYear(0);
					date.setMonth(JANUARY);
					date.setDate(1);
			}
			return date;
		}
	});
});