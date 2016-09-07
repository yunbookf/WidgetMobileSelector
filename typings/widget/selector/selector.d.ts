
interface WidgetSelectorOptions {
    lang?: string;
    title?: string;
    data: WidgetSelectorItem[];
}

type WidgetSelectorList = WidgetSelectorItem[];

interface WidgetSelectorItem {
    text: string;
    value?: string;
    data?: WidgetSelectorList;
}

/* --- 当做 JS 引用时删除本行 ---
declare class WidgetSelector {
    public static version;

    public dom: JQuery;
    public lang: string;
    public langList: any;
    public title: string;

    constructor(opts?: WidgetSelectorOptions);

    show(): void;
    hide(): void;

    onSelect(list: WidgetSelectorList): boolean | void;
}
//*/
