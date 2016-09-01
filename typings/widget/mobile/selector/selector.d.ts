
interface WidgetMobileSelectorOptions {
    lang?: string;
    title?: string;
    data: WidgetMobileSelectorItem[];
}

type WidgetMobileSelectorList = WidgetMobileSelectorItem[];

interface WidgetMobileSelectorItem {
    text: string;
    value?: string;
    data?: WidgetMobileSelectorList;
}

/* --- 当做 JS 引用时删除本行 ---
declare class WidgetMobileSelector {
    public static version;

    public dom: JQuery;
    public lang: string;
    public langList: any;
    public title: string;

    constructor(opts?: WidgetMobileSelectorOptions);

    show(): void;
    hide(): void;

    onSelect(list: WidgetMobileSelectorList): boolean | void;
}
//*/
