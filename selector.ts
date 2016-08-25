/**
 * WidgetMobileSelector
 * Website: http://www.maiyun.net
 */
class WidgetMobileSelector {

    public dom: JQuery;
    public static verison: string = "0.1";

    // --- 语言 ---
    private _lang: string = "en-us";
    get lang(): string {
        return this._lang;
    }
    set lang(val: string) {
        if (val !== this._lang) {
            if (this.langList[val]) {
                this._lang = val;
                this.dom.find(".widgetMobileSelectorLeft").text(this.langList[val]["cancel"]);
                this.dom.find(".widgetMobileSelectorRight").text(this.langList[val]["ok"]);
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
            this.dom.find(".widgetMobileSelectorText").text(val);
        }
    }

    // --- 析构 ---
    constructor(opts: WidgetMobileSelectorOptions) {
        let dom: JQuery = $(`<div class="widgetMobileSelector">
            <div class="widgetMobileSelectorBody">
                <div class="widgetMobileSelectorTitle">
                    <div class="widgetMobileSelectorLeft">Cancel</div>
                    <div class="widgetMobileSelectorText">Selector</div>
                    <div class="widgetMobileSelectorRight">OK</div>
                </div>
                <div class="widgetMobileSelectorContent">
                    <div class="widgetMobileSelectorList">
                        <div class="widgetMobileSelectorBlank"></div>
                    </div>
                    <div class="widgetMobileSelectorList" style="display: none;"></div>
                    <div class="widgetMobileSelectorList" style="display: none;"></div>
                    <div class="widgetMobileSelectorTop"></div>
                    <div class="widgetMobileSelectorBottom"></div>
                </div>
            </div>
        </div>`);
        dom.on("touchstart", (function(e): void {
            if ($(e.target).hasClass("widgetMobileSelector"))
                this.hide();
        }).bind(this));
        dom.find(".widgetMobileSelectorLeft").on("touchstart", (function(): void {
            this.hide();
        }).bind(this));
        dom.find(".widgetMobileSelectorRight").on("touchstart", (function(): void {
            let list: WidgetMobileSelectorList = [];
            dom.find(".widgetMobileSelectorSelected").each(function(i, item): void {
                let itemDom: JQuery = $(item);
                list.push({
                    text: itemDom.text(),
                    value: itemDom.attr("value")
                });
            });
            if (this.onSelect(list) !== false)
                this.hide();
        }).bind(this));
        $("body").append(dom);
        // --- 绑定数据 ---
        let listDom1 = dom.find(".widgetMobileSelectorList:eq(0)");
        let i: number = 0;
        for (let item of opts.data) {
            if (item.value === undefined) item.value = item.text;
            let itemDom = $(`<div class="widgetMobileSelectorItem" value="${item.value}">${item.text}</div>`).appendTo(listDom1);
            itemDom.data("data", item.data ? item.data : {});
            if (i === 0) {
                itemDom.addClass("widgetMobileSelectorSelected");
                if (item.data)
                    this.activeItem(itemDom);
            }
            ++i;
        }
        listDom1.append(`<div class="widgetMobileSelectorBlank"></div>`);
        // --- 绑定滚动事件 ---
        let listDom = dom.find(".widgetMobileSelectorList");
        listDom.on("touchstart", (function(e: JQueryEventObject): void {
            let thisListDom: JQuery = $(e.currentTarget);
            $("body").on("touchend.widgetMobileSelector", (function(): void {
                $("body").off("touchend.widgetMobileSelector");
                let onScrollEnd: () => void = (function(): void{
                    thisListDom.off("scroll");
                    let index: number =  Math.round(thisListDom.scrollTop() / 50);
                    thisListDom.animate({
                        "scrollTop": index * 50 + "px"
                    }, 50);
                    thisListDom.children(`.widgetMobileSelectorItem:eq(${index})`).addClass("widgetMobileSelectorSelected").siblings(".widgetMobileSelectorSelected").removeClass("widgetMobileSelectorSelected");
                    // --- 激活 ---
                    this.activeItem(thisListDom.children(".widgetMobileSelectorSelected"));
                }).bind(this);
                let scrolling: number = setTimeout(onScrollEnd, 50);
                thisListDom.on("scroll", (function(): void {
                    clearTimeout(scrolling);
                    scrolling = setTimeout(onScrollEnd, 50);
                }).bind(this));
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
        this.dom.addClass("widgetMobileSelectorShow");
    }

    // --- 隐藏 ---
    public hide(): void {
        this.dom.removeClass("widgetMobileSelectorShow");
    }

    // --- 事件 ---
    public onSelect: (list: WidgetMobileSelectorList) => boolean | void = function(): void {};

    // --- 内部方法 ---
    private activeItem(dom: JQuery): void {
        let data: WidgetMobileSelectorList = dom.data("data");
        let thisListDom = dom.parents(".widgetMobileSelectorList:eq(0)");
        if (data.length > 0) {
            let nextListDom: JQuery = thisListDom.next();
            if (thisListDom.hasClass("widgetMobileSelectorList")) {
                nextListDom = thisListDom.next();
                nextListDom.html(`<div class="widgetMobileSelectorBlank"></div>`).removeAttr("style");
                let i: number = 0;
                for (let item of data) {
                    if (item.value === undefined) item.value = item.text;
                    let itemDom = $(`<div class="widgetMobileSelectorItem" value="${item.value}">${item.text}</div>`).appendTo(nextListDom);
                    itemDom.data("data", item.data ? item.data : {});
                    if (i === 0) {
                        itemDom.addClass("widgetMobileSelectorSelected");
                        if (item.data)
                            this.activeItem(itemDom);
                    }
                    ++i;
                }
                nextListDom.append(`<div class="widgetMobileSelectorBlank"></div>`);
                nextListDom.scrollTop(0);
            } else {
                alert(`Error: max 3!`);
            }
        }
    }

}

$("head:eq(0)").prepend(`<style>
.widgetMobileSelector{position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .1); font-size: 14px; z-index: 1000; display: none; -webkit-user-select: none;}
.widgetMobileSelectorShow{display: block;}
.widgetMobileSelectorBody{height: 300px; background-color: #f9f9f9; position: absolute; width: 100%; left: 0; bottom: 0;}
.widgetMobileSelectorTitle{box-sizing: border-box; border-top: 1px solid #cacaca; display: -webkit-box;}
.widgetMobileSelectorTitle > div{height: 50px; line-height: 50px;}
.widgetMobileSelectorText{text-align: center; -webkit-box-flex: 2; font-size: 18px; width: 0;}
.widgetMobileSelectorLeft,.widgetMobileSelectorRight{text-align: center; -webkit-box-flex: 1; width: 0;}
.widgetMobileSelectorContent{box-sizing: border-box; border-top: 1px solid #e1e5e7; position: relative; background-color: #FFF; display: -webkit-box;}
.widgetMobileSelectorList{overflow: scroll; height: 250px; -webkit-box-flex: 1; width: 0;}
.widgetMobileSelectorItem{height: 50px; line-height: 50px; text-align: center;}
.widgetMobileSelectorBlank{height: 100px;}
.widgetMobileSelectorTop,.widgetMobileSelectorBottom{height: 100px; background-color: rgba(255,255,255,.7); position: absolute; left: 0; width: 100%; pointer-events: none; box-sizing: border-box;}
.widgetMobileSelectorTop{top: 0; border-bottom: 1px solid #e1e5e7;}
.widgetMobileSelectorBottom{bottom: 0; border-top: 1px solid #e1e5e7;}
</style>`);

