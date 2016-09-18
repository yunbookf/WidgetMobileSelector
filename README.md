# WidgetSelector
在手机网页上轻松创建一级或多级联动的选择器。  
On the mobile Web to easily create one or multiple-level linkage of the selector.  
  
滚动速度超快，堪比原生控件！  
Scrolling speed is super fast, and compete with native controls!  
  
本组件虽然使用 TypeScript 开发，但是也可以用于 JavaScript。  
The components use TypeScript to develop, but can also be used in JavaScript.  

本项目依赖 ModuleTouch，需要在引用 selector.min.js 的同时引用 touch.min.js 0.4+。   
This project has a dependency on ModuleTouch, you need to reference navigate.min.js reference touch.min.js.  
  
[ModuleTouch on Github](https://github.com/yunbookf/ModuleTouch)
  
## 简单 / So easy!
使用下面的代码即可创建一个选择器，并且使用 show() 方法可以随时让它显示：  
Use the following code to create a selector, and use the show() method can make it appear at any time:  
  
```typescript
let ws: WidgetSelector = new WidgetSelector({
    data: [{
        text: "one"
    }, {
        text: "two"
    }]
});

$("body").on("click", function(): void {
    ws.show();
});
```
  
## 截图 / Screenshot
![截图 / screenshot](https://github.com/yunbookf/WidgetSelector/raw/master/screenshot.png)
  
## 多级联动 / Multi-level linkage  
只需要在 data 里再指定 data 即可，最多 3 层，举个例子：  
Only need to specify data in the data, and then you can, up to 3 layers, for example:  
  
```typescript
let ws: WidgetSelector = new WidgetSelector({
    data: [{
        text: "one",
        data: [{
            text: "1",
            data: [{
                text: "a"
            }, {
                text: "b"
            }]
        }, {
            text: "2",
            data: [{
                text: "c"
            }, {
                text: "d"
            }]
        }]
    }, {
        text: "two"
    }]
});
```
  
## 获取被选择的每个项目 / Each item gets selected  
在本组件中，你可以获取到所有被选择的项目的显示文字，以及他的 value，代码如下：  
In this component, you can get to the display text of all selected items, as well as his value, as follows:  
  
```typescript
let ws: WidgetSelector = new WidgetSelector({
    data: [{
        text: "one",
        value: "1",
        data: [{
            text: "two",
            value: "2"
        }, {
            text: "three",
            value: "3"
        }]
    }, {
        text: "AAA",
        value: "4",
        data: [{
            text: "BBB",
            value: "5"
        }, {
            text: "CCC",
            value: "6"
        }]
    }]
});
ws.show();

ws.onSelect = function(list: WidgetSelectorList): void {
    alert("U select: " + list[0].text + "(" + list[0].value + "), " + list[1].text + "(" + list[1].value + ")");
};
```
  
## API
  
```typescript
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
```
  
## 兼容 / Compatibility
基本上所有手机浏览器都支持，依赖 jQuery，ModuleTouch。  
Almost all mobile browsers support, and need jQuery, ModuleTouch.  
  
## 关于 / About
本组件由迈云网络开发开源，欢迎各位PR。  
Powered by Maiyun.net, welcome to pull request.  
http://www.maiyun.net  
  
Translation is provided by Microsoft.

## 修改记录 / Changelog
### 0.3 - 2016-09-18
[UPDATE] 更新组件到 ModuleTouch 0.4+.  
[FIX] 已经可以同时支持电脑浏览器和手机浏览器了.  
[UI] 取消和确定按钮点击变色优化