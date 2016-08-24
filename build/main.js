$(document).ready(function (e) {
    var wms = new WidgetMobileSelector({
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
    wms.onSelect = function (list) {
        $("#touch > div").text("U select: " + list[0].text + " -> " + list[1].text + " -> " + list[2].text);
    };
    $("#touch").on("touchstart", function () {
        wms.show();
    });
});
//# sourceMappingURL=main.js.map