# 1.srcoolTab
### 支持左右滑动，当点击某个tab项，自动缓动居中

## Props
|       参数       | 描述                     |  类型  | 默认值 | 是否必传 |
| :--------------: | :----------------------- | :----: | :----: | :------: |
|     tabList      | /                     | Array  |   []   |    是    |
|    startIndex    | 起始tabItem的索引        | Number |   0    |    否    |
|     duration     | 动画持续时间，ms         | Number |   400   |    否    |
|    wrapWidth     | 单个tabItem项目的宽度，% | Number |   25   |    否    |
| wrapPaddingRight | 相邻tabItem的间距，px    | Number |   10   |    否    |

## Slots
| 默认值  | 参数                                                                                    | 是否必传 |
| :-----: | :-------------------------------------------------------------------------------------- | :------: |
| default | 1.item,单个tabItem项目值<br> 2.index,tab的索引<br>3.activiteIndex,点击的的tab项索引<br> |    是    |

## Methods
| 事件名称 |        触发条件         |      返回参数       |
| -------- | :---------------------: | :-----------------: |
| @click   | 点击某个tabItem项后触发 | 点击tabItem的索引值 |

# 2.Popup
### 弹框

## Props
|     参数      | 描述                                                      |   类型    |  默认值  | 是否必传 |
| :-----------: | :-------------------------------------------------------- | :-------: | :------: | :------: |
|     value     | v-mode绑定，控制弹框的显示与隐藏                          |  Boolean  |  false   |    是    |
| popupPosition | 弹框方向，可取值： "top","bottom","left","right","center" |  String   | "bottom" |    否    |
|  popupHeight  | 弹框高度,px                                               |  Number   |   260    |    否    |
|     close     | 关闭弹框函数                                              | Functioin |  ()=>{}  |    是    |

## Slots
| 默认值  | 参数     | 是否必传 |
| :-----: | :------- | :------: |
| default | 弹框内容 |    否    |