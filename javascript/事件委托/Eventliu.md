# 事件和事件流

> 默认情况下，
> 当一个元素身上的`某类`时间触发的时候，
> 该元素的祖先元素都会收到通知，
> 如果祖先元素身上也注册了`同类`事件，
> 那些事件函数也会被一一调用，
> 调用顺序从下往上，
> 这种行为被称为事件冒泡，
> 冒泡只和文档的结构有关和元素的位置无关。

> 事件冒泡是任何时刻都在进行的。
> 元素身上注册没注册某类时间，事件都会冒泡 


## 根据事件流的这个特点 带来一种编程技巧 叫做事件委托(也叫事件委派)