sap.ui.define([
	"sap/ui/core/IconPool",
	"my/namespace/model/Constant"
], function(IconPool, Constant) {
	"use strict";

	var NEGATIVE_COLOR = "#ff5e5e";
	var CRITICAL_COLOR = "#ffab1d";
	var POSITIVE_COLOR = "#99cc99";
	var NEUTRAL_COLOR = "#000000";

	function _getIconProperties(statusId) {
		var properties = {
			src: null,
			color: null
		};

		switch (statusId) {
			case Constant.REPORT_STATUS_NEW:
				properties.src = IconPool.getIconURI("document");
				properties.color = NEUTRAL_COLOR;
				break;
			case Constant.REPORT_STATUS_TRAINER:
				properties.src = IconPool.getIconURI("pending");
				properties.color = CRITICAL_COLOR;
				break;
			case Constant.REPORT_STATUS_HEAD:
				properties.src = IconPool.getIconURI("pending");
				properties.color = "#FFD700";
				break;
			case Constant.REPORT_STATUS_APPROVED:
				properties.src = IconPool.getIconURI("sys-enter-2");
				properties.color = POSITIVE_COLOR;
				break;
			case Constant.REPORT_STATUS_REJECTED:
				properties.src = IconPool.getIconURI("sys-cancel-2");
				properties.color = NEGATIVE_COLOR;
				break;
			default:
				properties.src = "";
				properties.color = NEUTRAL_COLOR;
		}

		return properties;
	}

	return {

		formatTest: function(title) {
			if (this.getView) {
				console.log("'this' is a controller instance");
			}
			if (this.setIcon) {
				//				this.setIcon("sap://action-settings");
				console.log("'this' is a StandardListItem instance");
			}

			return title;
		},

		getIconSrc: function(statusId) {
			return _getIconProperties(statusId).src;
		},
		
		getIconColor: function(statusId) {
			return _getIconProperties(statusId).color;
		},

		getIconTooltip: function() {
			
		},

		formatHeaderSpan: function(year, years) {
			var i = 0;

			for (i = 0; i < years.length; i++) {
				if (years[i].Year === year) {
					return years[i].Count;
				}
			}
		},

		formatCellText: function(text) {
			return text;
		}

	};

});