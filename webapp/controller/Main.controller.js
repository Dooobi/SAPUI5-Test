sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/model/formatter"
], function(BaseController, JSONModel, formatter) {
	"use strict";

	var c = [];
	var diff = "";

	return BaseController.extend("my.namespace.controller.Main", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onAddPress: function() {
			var x = ['H', 'E', 'R', 'E'];
			var y = ['F', 'E', 'A', 'R'];
			
			var lcsLength = this.lcsLength(x, y);
			this.printDiff(x, y, 2, 2);
			console.log(lcsLength);
			console.log(diff);
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */
		
		lcsLength: function (x, y) { // x: first character array, y: second character array
		    var i = 0, j = 0;
		    
		    // Initialize two-dimensional array
		    for (i = 0; i < x.length+2; i++) {
		    	c[i] = [];
		    }
		    
		    // Set first column to 0
		    for (i = 0; i <= x.length; i++) {
		    	c[i][0] = 0;
		    }
		    // Set first row to 0
		    for (j = 0; j <= y.length; j++) {
		    	c[0][j] = 0;
		    }
		    
		    for (i = 1; i <= x.length; i++) {
		        for (j = 1; j <= y.length; j++) {
		            if (x[i] === y[j]) {
		                c[i][j] = c[i-1][j-1] + 1;
		            } else {
		                c[i][j] = Math.max(c[i][j-1], c[i-1][j]);
		            }
		        }
		    }
		    return c[x.length][y.length];
		},
		
		printDiff: function(x, y, i, j) {
		    if (i > 0 && j > 0 && x[i] === y[j]) {
		        this.printDiff(c, x, y, i-1, j-1);
		        diff += "  " + x[i];
		    } else if (j > 0 && (i === 0 || c[i][j-1] >= c[i-1][j])) {
		        this.printDiff(c, x, y, i, j-1);
		        diff += "+ " + y[j];
		    } else if (i > 0 && (j === 0 || c[i][j-1] < c[i-1][j])) {
		        this.printDiff(c, x, y, i-1, j);
		        diff += "- " + x[i];
		    } else {
		        diff += "";
			}
		}
	});
});