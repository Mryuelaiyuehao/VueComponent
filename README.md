# srcoolTab
### 功能：支持左右滑动，点击某个tab项，自动缓动居中

## Props
|  参数     | 描述    |  类型  |  默认值 | 是否必传
| :--------:   | :---------  | :---------: | :---------: | :-----: |
| tabList    | 每个Tab项目的内容  |   Array    | [] | 是
| startIndex        | 起始index      |  Number    | 0 | 否
| rate        | 缓动动画速率，数值越大，动画越细腻     |   Number    | 10 |  否
| wrapWidth    | 单个scrollTab项目的宽度，%  |   Number    | 25 | 否
| wrapPaddingRight | 相邻Tab项目的间距，px |   Number    | 10 | 否

## Slots
| 默认值             | 参数               |  是否必传     | 
| :--------:        | :---------      | :---------: | 
|   default        | 1.item,单个tab项目的值<br> 2.index,tab的索引<br>3.activiteIndex,激活的tab项索引<br>      |   是      |

## Methods
| 事件名称  | 触发条件     |  返回参数     |
| -------- | :---------: | :---------: | 
| @click   | 点击tab项后触发 |   点击tab的索引值      |