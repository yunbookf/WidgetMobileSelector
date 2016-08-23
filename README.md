# WidgetMobileSelector
在手机网页上轻松创建一级或多级联动的选择器。
On the mobile Web to easily create one or multiple-level linkage of the selector.

## 浏览器兼容 / Compatibility
基本上所有手机浏览器都支持。
Almost all mobile browsers support.

## API

```typescript
interface WidgetNavigateInstance {
    dom: JQuery;
    icon: boolean;
    iconUrl: string;
    position: WidgetNavigatePosition;
    height: number;
    width: string;
    selected: number;
    menuOffsetTop: number;

    addItem(o: WidgetNavigateItem): void;
}
```

## 关于 / About
本组件由迈云网络开发开源，欢迎各位PR。  
Powered by Maiyun.net, welcome to pull request.  
http://www.maiyun.net  
  
Translation is provided by Microsoft.