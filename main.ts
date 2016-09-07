$(document).ready(function(e) {
    let wms: WidgetSelector = new WidgetSelector({
        data: [{
            text: "English",
            data: [{
                text: "Lenu",
                data: [{
                    text: "1"
                }, {
                    text: "2"
                }]
            }, {
                text: "Menu",
                data: [{
                    text: "3"
                }, {
                    text: "4"
                }, {
                    text: "5"
                }]
            }, {
                text: "Nenu",
                data: [{
                    text: "6"
                }, {
                    text: "7"
                }, {
                    text: "8"
                }]
            }]
        }, {
            text: "中文",
            data: [{
                text: "饭单",
                data: [{
                    text: "一"
                }, {
                    text: "二"
                }]
            }, {
                text: "菜单",
                data: [{
                    text: "三"
                }, {
                    text: "四"
                }, {
                    text: "五"
                }]
            }, {
                text: "没单",
                data: [{
                    text: "六"
                }, {
                    text: "七"
                }, {
                    text: "八"
                }]
            }]
        }]
    });
    wms.onSelect = function(list: WidgetSelectorList): void {
        $("#touch > div").text("U select: " + list[0].text + " -> " + list[1].text + " -> " + list[2].text);
    };
    let wms2: WidgetSelector = new WidgetSelector({
        title: "中文选框",
        lang: "zh-cn",
        data: [{text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}, {text: "12345"}]
    });
    wms2.onSelect = function(list: WidgetSelectorList): void {
        $("#touch2 > div").text("U select: " + list[0].text);
    };
    ModuleTouch.tap("#touch", function(): boolean {
        wms.show();
        return false;
    });
    ModuleTouch.tap("#touch2", function(): boolean {
        wms2.show();
        return false;
    });
});

