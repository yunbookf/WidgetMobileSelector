
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

interface WidgetMobileSelectorInstance {
    dom: JQuery;
    lang: string;
    langList: any;
    title: string;

    show(): void;
    hide(): void;

    onSelect(list: WidgetMobileSelectorList): boolean | void;
}

interface WidgetPaginatorConstructor {
    new(opts?: WidgetMobileSelectorOptions): WidgetMobileSelectorInstance;

    version: string;
}

// declare let WidgetMobileSelector:WidgetMobileSelectorConstructor;

