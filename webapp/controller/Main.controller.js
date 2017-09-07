sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/model/formatter"
], function(BaseController, JSONModel, formatter) {
	"use strict";

	var c = [];
	var diff = "";
	var _columnIndex = 0,
		_timeout = null;

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
			/*
			var tableModel = this.getModel("table");
			var dataModel = this.getModel("data");
			var table = this.getView().byId("table");

			table.bindColumns("table>/Columns", function(index, context) {
				console.log("column_id: " + index);
				var sColumnId = context.getObject().Kw;
				return new sap.ui.table.Column({
					label: sColumnId,
					template: sColumnId,
					sortProperty: sColumnId,
					filterProperty: sColumnId
				});
			});
			table.bindRows("data>/Items");
			*/
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

		afterAllColumnsAdded: function() {},

		columnTemplate: function(oContext, index) {
			if (index === 0) {
				return new sap.m.Text({
					text: {
						path: "data>Name",
						formatter: formatter.formatCellText
					}
				});
			}

			return new sap.m.Text({
				text: {
					path: "data>Reports/" + oContext.Year + "/" + oContext.Kw,
					formatter: formatter.formatCellText
				}
			});
		},

		firstColumnFactory: function(id, context) {
			var column = new sap.ui.table.Column({
				label: "Trainee",
				hAlign: "Center",
				template: this.columnTemplate(context.getObject(), _columnIndex)
			});

			this.keepTrackOfColumnIndex();

			return column;
		},

		columnFactory: function(id, context) {
			if (_columnIndex === 0) {
				return this.firstColumnFactory(id, context);
			}

			var columnsData = this.getModel("table").getProperty("/Columns");
			var yearsData = this.getModel("table").getProperty("/Years");
			var oContext = context.getObject();
			var headerSpan = 1;

			console.log(_columnIndex);

			if (this.isFirstColumnOfYear(columnsData, context)) {
				var countCalendarWeeks = this.getColumnCountForYear(yearsData, context);
				headerSpan = [countCalendarWeeks, 1];
			}

			var column = new sap.ui.table.Column({
				hAlign: "Center",
				headerSpan: headerSpan,
				multiLabels: [
					new sap.m.Label({
						text: oContext.Year
					}),
					new sap.m.Label({
						text: oContext.Kw
					})
				],
				template: this.columnTemplate(oContext, _columnIndex)
			});

			this.keepTrackOfColumnIndex();

			return column;
		},

		isFirstColumnOfYear: function(columnsData, context) {
			var indexOfYear = -1;
			var oContext = context.getObject();
			for (var i = 0; i < columnsData.length; i++) {
				if (columnsData[i].Year === oContext.Year) {
					if (indexOfYear === -1) {
						indexOfYear = 0;
					}
					if (columnsData[i].Kw === oContext.Kw) {
						break;
					}
					indexOfYear++;
				}
			}
			return indexOfYear === 0;
		},

		getColumnCountForYear: function(yearsData, context) {
			var oContext = context.getObject();
			var countCalendarWeeks = 1;
			yearsData.forEach(function(item) {
				if (item.Year === oContext.Year) {
					countCalendarWeeks = item.Count;
				}
			});
			return countCalendarWeeks;
		},

		keepTrackOfColumnIndex: function() {
			// Keep track of _columnIndex
			_columnIndex++;
			if (_timeout) {
				clearTimeout(_timeout);
				_timeout = null;
			}
			_timeout = setTimeout(function() {
				_columnIndex = 0;
				this.afterAllColumnsAdded();
			}.bind(this), 0);
		},

		lcsLength: function(x, y) { // x: first character array, y: second character array
			var i = 0,
				j = 0;

			// Initialize two-dimensional array
			for (i = 0; i < x.length + 2; i++) {
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
						c[i][j] = c[i - 1][j - 1] + 1;
					} else {
						c[i][j] = Math.max(c[i][j - 1], c[i - 1][j]);
					}
				}
			}
			return c[x.length][y.length];
		},

		printDiff: function(x, y, i, j) {
			if (i > 0 && j > 0 && x[i] === y[j]) {
				this.printDiff(c, x, y, i - 1, j - 1);
				diff += "  " + x[i];
			} else if (j > 0 && (i === 0 || c[i][j - 1] >= c[i - 1][j])) {
				this.printDiff(c, x, y, i, j - 1);
				diff += "+ " + y[j];
			} else if (i > 0 && (j === 0 || c[i][j - 1] < c[i - 1][j])) {
				this.printDiff(c, x, y, i - 1, j);
				diff += "- " + x[i];
			} else {
				diff += "";
			}
		}
	});
});