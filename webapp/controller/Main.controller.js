sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/controller/fragment/SettingsController",
	"my/namespace/model/formatter",
	"my/namespace/helper/util",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, SettingsController, formatter, util, DateFormat, Filter, FilterOperator) {
	"use strict";

	var DUMMY_REPORT_OBJECT = {
		ReportId: null,
		DepartmentId: null,
		HeadId: null,
		TrainerId: null,
		StatusId: "NEW",
		TraineeId: null,
		Type: null,
		WeekStart: null,
		HasNewHistoryEntry: false
	};

	var c = [];
	var diff = "";
	var _columnIndex = 0,
		_timeout = null;
	var _firstTrainingBegin = null;
	var _dateFormat = DateFormat.getDateInstance();

	var _settingsController = null;

	return BaseController.extend("my.namespace.controller.Main", {

		formatter: formatter,
		util: util,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			_settingsController = new SettingsController(this, this.getView(), this.getOwnerComponent().getContentDensityClass());

			this.getModel().metadataLoaded().then(this.afterMetadataLoaded.bind(this));
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		openFilterDialog: function() {
			_settingsController.getDialog().open();
		},

		afterMetadataLoaded: function() {
			this.loadDataFromService();
		},

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

		loadDataFromService: function() {
			var odata = this.getModel();
			var aFilters = [];

			aFilters.push(new Filter("IsTrainee", sap.ui.model.FilterOperator.EQ, true));

			var filterSelection = _settingsController.getFilterSelection();
			if (filterSelection.Generation) {
				filterSelection.Generation.forEach(function(item) {
					aFilters.push(new Filter("GenerationId", FilterOperator.EQ, item));
				});
			}
			if (filterSelection.Trainee) {
				filterSelection.Trainee.forEach(function(item) {
					aFilters.push(new Filter("PerId", FilterOperator.EQ, item));
				});
			}

			odata.read("/Persons", {
				urlParameters: {
					"$expand": "Reports, GenerationDetails"
				},
				filters: aFilters,
				success: function(data) {
					// transform data into necessary format
					// and put it into a json model
					_firstTrainingBegin = null;
					var rowModel = this.transformTraineeDataToRowModel(data.results);
					var columnModel = this.transformRowModelToColumnModel(rowModel.getData());

					this.setModel(rowModel, "data");
					this.setModel(columnModel, "table");
				}.bind(this)
			});
		},

		afterAllColumnsAdded: function() {},

		columnTemplate: function(oContext, index) {
			if (index === 0) {
				return new sap.m.Text({
					text: {
						path: "data>Trainee/Firstname",
						formatter: formatter.formatCellText
					}
				});
			}

			return new sap.ui.core.Icon({
				src: {
					path: "data>Reports/" + oContext.Year + "/" + oContext.Kw + "/StatusId",
					formatter: formatter.getIconSrc
				},
				color: {
					path: "data>Reports/" + oContext.Year + "/" + oContext.Kw + "/StatusId",
					formatter: formatter.getIconColor
				},
				tooltip: {
					path: "data>Reports/" + oContext.Year + "/" + oContext.Kw + "/StatusId"
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
						text: oContext.Kw,
						tooltip: (oContext.Date ? _dateFormat.format(oContext.Date, false) : "unknown")
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
		},

		_hasCalendarWeekRelevantReports: function(week, year, rowData) {
			var i = 0;
			var trainees = rowData.Trainees;
			var filterSelection = _settingsController.getFilterSelection();
			
			for (var traineeIndex = 0; traineeIndex < trainees.length; traineeIndex++) {
				var traineeItem = trainees[traineeIndex];
				var trainingBeginCalendarWeek = util.getWeekNumber(traineeItem.Trainee.GenerationDetails.TrainingBegin);

				if (trainingBeginCalendarWeek[0] < year || (trainingBeginCalendarWeek[0] === year && trainingBeginCalendarWeek[1] <= week)) {
					// Trainee had to create a report for this calendar week

					// Create a dummy report if this report doesn't exist
					if (!traineeItem.Reports[year]) {
						traineeItem.Reports[year] = {};
					}
					if (!traineeItem.Reports[year][week]) {
						traineeItem.Reports[year][week] = DUMMY_REPORT_OBJECT;
					}

					var report = traineeItem.Reports[year][week];
					if (filterSelection.ReportStatus) {
						for (i = 0; i < filterSelection.ReportStatus.length; i++) {
							if (filterSelection.ReportStatus[i] === report.StatusId) {
								return true;
							}
						}
					} else {
						return true;
					}
				} else {
					// Trainee didn't have to create a report for this calendar week
					
				}
			}

			return false;
		},

		transformTraineeDataToRowModel: function(data) {
			var json = {
				Trainees: []
			};

			// Loop through trainees from odata response
			for (var traineeIndex = 0; traineeIndex < data.length; traineeIndex++) {
				var traineeItem = {
					Reports: {}
				};
				var trainee = data[traineeIndex];

				if (_firstTrainingBegin === null || trainee.GenerationDetails.TrainingBegin < _firstTrainingBegin) {
					_firstTrainingBegin = trainee.GenerationDetails.TrainingBegin;
				}

				//				traineeItem.Trainee = "/" + odata.createKey("Persons", trainee);
				traineeItem.Trainee = trainee;

				// Loop through reports of trainee from odata response
				for (var reportIndex = 0; reportIndex < trainee.Reports.results.length; reportIndex++) {
					var report = trainee.Reports.results[reportIndex];

					var weeknumber = util.getWeekNumber(report.WeekStart);

					if (!traineeItem.Reports[weeknumber[0]]) {
						traineeItem.Reports[weeknumber[0]] = {};
					}
					//					traineeItem.Reports[weeknumber[0]][weeknumber[1]] = "/" + odata.createKey("Reports", report);
					traineeItem.Reports[weeknumber[0]][weeknumber[1]] = report;
				}

				json.Trainees.push(traineeItem);
			}

			return new JSONModel(json);
		},

		transformRowModelToColumnModel: function(rowData) {
			var json = {
				Columns: [],
				Years: []
			};
			var trainingBegin = _firstTrainingBegin;
			var calendarWeek = util.getWeekNumber(trainingBegin);
			var currentCalendarWeek = util.getWeekNumber(new Date());

			// Fill json
			// First column is for Trainee name
			json.Columns.push({
				Label: "Trainee"
			});
			// Following columns are for the calendar weeks from _firstTrainingBegin to current date
			while (calendarWeek[0] < currentCalendarWeek[0] || (calendarWeek[0] === currentCalendarWeek[0] && calendarWeek[1] <=
					currentCalendarWeek[1])) {

				// Check if relevant reports for this calendar week exist
				if (this._hasCalendarWeekRelevantReports(calendarWeek[1], calendarWeek[0], rowData)) {
					json.Columns.push({
						Year: calendarWeek[0],
						Kw: calendarWeek[1],
						Date: trainingBegin
					});

					var yearItem = json.Years.find(function(item) {
						return item.Year === calendarWeek[0];
					});
					if (yearItem) {
						yearItem.Count++;
					} else {
						json.Years.push({
							Year: calendarWeek[0],
							Count: 1
						});
					}
				}

				trainingBegin = util.addDays(trainingBegin, 7);
				calendarWeek = util.getWeekNumber(trainingBegin);
			}

			var model = new JSONModel(json);
			model.setSizeLimit(json.Columns.length + 2);

			return model;
		},

		transformRowModelToColumnModel2: function(rowData) {
			var json = {
				Columns: [],
				Years: []
			};

			var years = [];

			var trainees = rowData.Trainees;
			for (var traineeIndex = 0; traineeIndex < trainees.length; traineeIndex++) {
				var trainee = trainees[traineeIndex];

				// Loop through the year properties of a Trainee's reports
				Object.keys(trainee.Reports).forEach(function(keyYear, indexYear) {
					// key: the name of the object key
					// index: the ordinal position of the key within the object 
					if (!years[keyYear]) {
						years[keyYear] = [];
					}
					var year = trainee.Reports[keyYear];

					// Loop through the week properties of a Year which contains the Trainee's reports
					Object.keys(year).forEach(function(keyWeek, indexWeek) {
						if (years[keyYear].indexOf(keyWeek) < 0) {
							// This week is not stored in the years array yet
							years[keyYear].push(keyWeek);
						}
					});

				});
			}

			// Fill json
			// First column is for Trainee name
			json.Columns.push({
				Label: "Trainee"
			});
			// Following columns are calendar weeks for reports
			Object.keys(years).forEach(function(keyYear, indexYear) {
				var usedWeeksInYear = years[keyYear];
				// Make column objects for every used week in year
				usedWeeksInYear.forEach(function(week) {
					json.Columns.push({
						Year: keyYear,
						Kw: week
					});
				});

				// Make year objects with the count of used weeks
				json.Years.push({
					Year: keyYear,
					Count: usedWeeksInYear.length
				});
			});

			return new JSONModel(json);
		}
	});
});