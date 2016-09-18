/**
 * WidgetSelector
 * Website: http://hanguoshuai.com
 */
class WidgetSelector {

    public dom: JQuery;
    public static verison: string = "0.3";

    // --- 语言 ---
    private _lang: string = "en-us";
    get lang(): string {
        return this._lang;
    }
    set lang(val: string) {
        if (val !== this._lang) {
            if (this.langList[val]) {
                this._lang = val;
                this.dom.find(".widgetSelectorLeft").text(this.langList[val]["cancel"]);
                this.dom.find(".widgetSelectorRight").text(this.langList[val]["ok"]);
            } else {
                alert(`Error: langList[${val}] not found!`);
            }
        }
    }
    // --- 语言列表 ---
    public langList: any = {
        "en-us": {
            "cancel": "Cancel",
            "ok": "OK"
        },
        "zh-cn": {
            "cancel": "取消",
            "ok": "确定"
        },
        "zh-tw": {
            "cancel": "取消",
            "ok": "確認"
        }
    };

    // --- 标题 ---
    private _title: string = "Selector";
    get title(): string {
        return this._title;
    }
    set title(val: string) {
        if (val !== this._title) {
            this._title = val;
            this.dom.find(".widgetSelectorText").text(val);
        }
    }

    // --- 析构 ---
    constructor(opts: WidgetSelectorOptions) {
        let dom: JQuery = $(`<div class="widgetSelector">
            <div class="widgetSelectorBody">
                <div class="widgetSelectorTitle">
                    <div class="widgetSelectorLeft">Cancel</div>
                    <div class="widgetSelectorText">Selector</div>
                    <div class="widgetSelectorRight">OK</div>
                </div>
                <div class="widgetSelectorContent">
                    <div class="widgetSelectorList">
                        <div class="widgetSelectorBlank"></div>
                    </div>
                    <div class="widgetSelectorList" style="display: none;"></div>
                    <div class="widgetSelectorList" style="display: none;"></div>
                    <div class="widgetSelectorTop"></div>
                    <div class="widgetSelectorBottom"></div>
                </div>
            </div>
        </div>`);
        ModuleTouch.tap(dom, (function(e: JQueryEventObject): boolean {
            if ($(e.target).hasClass("widgetSelector"))
                this.hide();
            return false;
        }).bind(this));
        ModuleTouch.tap(dom.find(".widgetSelectorLeft"), (function(): boolean {
            this.hide();
            return false;
        }).bind(this));
        ModuleTouch.tap(dom.find(".widgetSelectorRight"), (function(): boolean {
            let list: WidgetSelectorList = [];
            dom.find(".widgetSelectorSelected").each(function(i, item): void {
                let itemDom: JQuery = $(item);
                list.push({
                    text: itemDom.text(),
                    value: itemDom.attr("value")
                });
            });
            if (this.onSelect(list) !== false)
                this.hide();
            return false;
        }).bind(this));
        $("body").append(dom);
        // --- 绑定数据 ---
        let listDom1 = dom.find(".widgetSelectorList:eq(0)");
        let i: number = 0;
        for (let item of opts.data) {
            if (item.value === undefined) item.value = item.text;
            let itemDom = $(`<div class="widgetSelectorItem" value="${item.value}">${item.text}</div>`).appendTo(listDom1);
            itemDom.data("data", item.data ? item.data : {});
            if (i === 0) {
                itemDom.addClass("widgetSelectorSelected");
                if (item.data)
                    this.activeItem(itemDom);
            }
            ++i;
        }
        listDom1.append(`<div class="widgetSelectorBlank"></div>`);
        // --- 绑定滚动事件 ---
        let listDoms = dom.find(".widgetSelectorList");
        listDoms.each((function(i, item): void {
            let listDom: JQuery = $(item);
            ModuleTouch.scrollEnd(listDom, (function(): void {
                let index: number = Math.round(listDom.scrollTop() / 50);
                if (listDom.scrollTop() !== index * 50) {
                    listDom.animate({
                        "scrollTop": index * 50 + "px"
                    }, 50);
                    listDom.children(`.widgetSelectorItem:eq(${index})`).addClass("widgetSelectorSelected").siblings(".widgetSelectorSelected").removeClass("widgetSelectorSelected");
                    // --- 激活 ---
                    this.activeItem(listDom.children(".widgetSelectorSelected"));
                }
            }).bind(this));
        }).bind(this));
        this.dom = dom;
        // --- 初始值 ---
        if (opts.lang) {
            this.lang = opts.lang;
        }
        if (opts.title) {
            this.title = opts.title;
        }
    }

    // --- 显示 ---
    public show(): void {
        this.dom.addClass("widgetSelectorShow");
        $("body").addClass("show-ws");
    }

    // --- 隐藏 ---
    public hide(): void {
        this.dom.removeClass("widgetSelectorShow");
        $("body").removeClass("show-ws");
    }

    // --- 事件 ---
    public onSelect: (list: WidgetSelectorList) => boolean | void = function(): void {};

    // --- 内部方法 ---
    private activeItem(dom: JQuery): void {
        let data: WidgetSelectorList = dom.data("data");
        let thisListDom = dom.parents(".widgetSelectorList:eq(0)");
        if (data.length > 0) {
            let nextListDom: JQuery = thisListDom.next();
            if (thisListDom.hasClass("widgetSelectorList")) {
                nextListDom = thisListDom.next();
                nextListDom.html(`<div class="widgetSelectorBlank"></div>`).removeAttr("style");
                let i: number = 0;
                for (let item of data) {
                    if (item.value === undefined) item.value = item.text;
                    let itemDom = $(`<div class="widgetSelectorItem" value="${item.value}">${item.text}</div>`).appendTo(nextListDom);
                    itemDom.data("data", item.data ? item.data : {});
                    if (i === 0) {
                        itemDom.addClass("widgetSelectorSelected");
                        if (item.data)
                            this.activeItem(itemDom);
                    }
                    ++i;
                }
                nextListDom.append(`<div class="widgetSelectorBlank"></div>`);
                nextListDom.scrollTop(0);
            } else {
                alert(`Error: max 3!`);
            }
        }
    }

}

$("head:eq(0)").prepend(`<style>
body.show-ws{overflow: hidden;}
.widgetSelector{position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .1); font-size: 14px; z-index: 1000; display: none; -webkit-user-select: none;}
.widgetSelectorShow{display: block;}
.widgetSelectorBody{height: 300px; background-color: #f9f9f9; position: absolute; width: 100%; left: 0; bottom: 0;}
.widgetSelectorTitle{box-sizing: border-box; border-top: 1px solid #cacaca; display: -webkit-box;}
.widgetSelectorTitle > div{height: 50px; line-height: 50px;}
.widgetSelectorText{text-align: center; -webkit-box-flex: 2; font-size: 18px; width: 0;}
.widgetSelectorLeft,.widgetSelectorRight{text-align: center; -webkit-box-flex: 1; width: 0;}
.widgetSelectorLeft.active-mt,.widgetSelectorRight.active-mt{background-color: rgba(0,0,0,.05);}
.widgetSelectorContent{box-sizing: border-box; border-top: 1px solid #e1e5e7; position: relative; background-color: #FFF; display: -webkit-box;}
.widgetSelectorList{overflow: scroll; height: 250px; -webkit-box-flex: 1; width: 0;}
.widgetSelectorItem{height: 50px; line-height: 50px; text-align: center;}
.widgetSelectorBlank{height: 100px;}
.widgetSelectorTop,.widgetSelectorBottom{height: 100px; background-color: rgba(255,255,255,.7); position: absolute; left: 0; width: 100%; pointer-events: none; box-sizing: border-box;}
.widgetSelectorTop{top: 0; border-bottom: 1px solid #e1e5e7;}
.widgetSelectorBottom{bottom: 0; border-top: 1px solid #e1e5e7;}
</style>`);

