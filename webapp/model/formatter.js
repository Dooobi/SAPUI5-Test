sap.ui.define([
], function() {
	"use strict";

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
		}

	};

});