$(document).ready(function (e) {
    var wn = new WidgetNavigate("#topNav", {
        width: "800px"
    });
    wn.addItem({
        text: "演示页面",
        url: "./demo.html"
    });
    wn.addItem({
        text: "下弹菜单",
        menu: [{
                text: "第一项",
                onClick: function () {
                    alert("您点击了第一项");
                }
            }, {
                text: "转到百度",
                url: "http://www.baidu.com"
            }]
    });
    wn.addItem({
        text: "迈云工作站",
        url: "http://os.maiyun.net"
    });
    wn.addItem({
        text: "迈云网络",
        url: "http://www.maiyun.net"
    });
    wn.addItem({
        text: "点我响应事件",
        onClick: function () {
            alert("一个事件");
        }
    });
    wn.selected = 0;
    var wn2 = new WidgetNavigate("#screenNav", {
        position: "static",
        width: "600px"
    });
    wn2.addItem({
        text: "第一个",
        onClick: function () {
            alert("好的");
        }
    });
    wn2.addItem({
        text: "弹出菜单",
        menu: [{
                text: "第一条"
            }, {
                text: "第二条"
            }, {
                text: "第三条"
            }]
    });
    wn2.addItem({
        text: "第三个",
        onClick: function () {
            alert("第三");
        }
    });
});
//# sourceMappingURL=main.js.map