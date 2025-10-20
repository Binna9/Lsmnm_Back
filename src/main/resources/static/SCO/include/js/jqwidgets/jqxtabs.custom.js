/*
jQWidgets v3.8.1 (2015-Jul)
Copyright (c) 2011-2015 jQWidgets.
License: http://jqwidgets.com/license/
Made : Poscoict Developer 
name : Ghostsai
*/

/* Grid Custom Prototype */
(function ($) {
    $.extend($.jqx._jqxTabs.prototype, {
    	addAtByObj: function (index, title, objContent) {
            if (index >= 0 || index <= this.length()) {
                this._removeHoverStates();
                var titleContainer = $('<li>' + title + '</li>');
                var navigatorInnerContainer = $('<div></div>');
                navigatorInnerContainer.append(objContent);
                titleContainer.addClass(this.toThemeProperty('jqx-tabs-title'));
                titleContainer.addClass(this.toThemeProperty('jqx-item'));
                navigatorInnerContainer.addClass(this.toThemeProperty('jqx-tabs-content-element'));

                if (this.position == 'bottom') {
                    titleContainer.addClass(this.toThemeProperty('jqx-tabs-title-bottom'));
                }
                var fullRefresh = false;

                if (this._titleList.length == 0) {
                    this._unorderedList.append(titleContainer);
                }
                else {
                    if (index < this.length() && index >= 0) {
                        this._titleList[index].before(titleContainer);
                    } else {
                        this._titleList[this.length() - 1].after(titleContainer);
                    }
                }

                navigatorInnerContainer.appendTo(this._contentWrapper);
                this._addItemTo(this._titleList, index, titleContainer);
                this._addItemTo(this._contentList, index, navigatorInnerContainer);
                if (this._selectedItem > index) {
                    this._selectedItem++;
                }
                this._switchTabs(index, this._selectedItem);
                this._selectedItem = index;
                if (this.showCloseButtons && this._titleList.length > 0) {
                    this._addCloseButton(index);
                }

                this._uiRefresh(fullRefresh);
                this._raiseEvent(2, { item: index });
                this._moveSelectionTrack(this._selectedItem, 0);
            }
        }
    });
})(jqxBaseFramework);
