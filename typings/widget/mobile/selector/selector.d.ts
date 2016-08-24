
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

