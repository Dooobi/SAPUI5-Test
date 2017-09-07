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