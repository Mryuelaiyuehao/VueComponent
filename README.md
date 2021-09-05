# 1.srcoolTab
### 支持左右滑动，当点击某个tab项，自动缓动居中

## Props
|       参数       | 描述                     |  类型  | 默认值 | 是否必传 |
| :--------------: | :----------------------- | :----: | :----: | :------: |
|     tabList      | /                        | Array  |   []   |    是    |
|    startIndex    | 起始tabItem的索引        | Number |   0    |    否    |
|     duration     | 动画持续时间，ms         | Number |  400   |    否    |
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
|  name   | 参数     | 是否必传 |
| :-----: | :------- | :------: |
| default | 弹框内容 |    否    |

# 3.Swipe
### 轮播图

## Props
|       参数        | 描述                                                                                                   |      类型       |     默认值     | 是否必传 |
| :---------------: | :----------------------------------------------------------------------------------------------------- | :-------------: | :------------: | :------: |
|       list        | /                                                                                                      |      Array      |       []       |    是    |
|    startIndex     | 起始索引值                                                                                             |     Number      |       0        |    否    |
|    cirticalVal    | 滑动临界比,用来决定是否滑动到下/前一张还是在当前                                                       | Number，0-1之间 |      1/5       |    否    |
|     autoplay      | 是否开启自动轮播                                                                                       |     Boolean     |     false      |    否    |
|    continuous     | 是否无限轮播                                                                                           |     Boolean     |      true      |    否    |
|   autoPlayTime    | 自动轮播时间，ms                                                                                       |     Number      |      3000      |    否    |
|  showIndicators   | 是否显示指示器                                                                                         |     Boolean     |     false      |    否    |
| indicatorPosition | 指示器位置，可选值为：'top-left' 'top-center' 'top-right' 'bottom-left' 'bottom-center' 'bottom-right' |     String      | 'bottom-right' |    否    |
|  wrapperPadding   | swipeItem包裹容器内边距，px                                                                            |     Number      |       0        |    否    |


## Slots
|  name   | 说明          |        参数        | 是否必传 |
| :-----: | :------------ | :----------------: | :------: |
| default | swipeItem内容 | sItem，轮播图的url |    是    |

## Methods
| 事件名称 |  触发条件  | 返回参数 |
| -------- | :--------: | :------: |
| @change  | 滑动下一张后触发 |  索引值  |


# 4.Picker
### 地区选择器。流畅好用地区，兼容PC和手机

## Props
|   参数    | 描述                 |   类型   | 默认值 | 是否必传 |
| :-------: | :------------------- | :------: | :----: | :------: |
|   value   | v-mode绑定的值地区值 |  Array   |   []   |    是    |
|   close   | 关闭地区选择器       | Function | ()=>{} |    是    |
|  visible  | 控制弹框显示与隐藏   | Boolean  | false  |    是    |
| showTitle | 是否展示标题         | Boolean  | false  |    否    |

## Methods
| 事件名称 |   触发条件   |    返回参数    |
| -------- | :----------: | :------------: |
| @confirm | 点击确认按钮 | 选择的地区数组 |