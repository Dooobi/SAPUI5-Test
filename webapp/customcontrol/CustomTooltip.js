sap.ui.define([
	"sap/ui/core/TooltipBase"
],	function (TooltipBase) {
    "use strict";
    
    return TooltipBase.extend("my.namespace.customcontrol.CustomTooltip", { 
            metadata: {
                events: {
                    "onmouseover" : {}  
                }
            },
            oView: null,

            setView : function(view){
                this.oView = view;
            },

//          the hover event handler, it is called when the Button is hovered - no event registration required
            onmouseover : function() {
                this._createQuickView();
            },

            _createQuickView: function(){
                var view = this.oView;

//              create QuickViewGroupElement
                var oQuickViewGroupElement = new sap.m.QuickViewGroupElement();
                oQuickViewGroupElement.setLabel("item");
                oQuickViewGroupElement.setValue("value");

//              create QuickViewGroup
                var oQuickViewGroup = new sap.m.QuickViewGroup();
                oQuickViewGroup.addElement(oQuickViewGroupElement);

//              create QuickViewPage
                var oQuickViewPage = new sap.m.QuickViewPage();
                oQuickViewPage.addGroup(oQuickViewGroup);

//              create QuickView
                var oQuickView = new sap.m.QuickView();
                oQuickView.addPage(oQuickViewPage); 

//              connect QuickView with Button
                oQuickView.openBy(this.getParent());                           
            }
        });  
});