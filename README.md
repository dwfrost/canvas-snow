# Javascript Snowflakes (HTML5 Canvas)

fork 自[github](https://github.com/nextapps-de/snowflake)
改造点如下：

-   将雪花点改成图片

-   配置雪花飘落参数，如下

    | 字段    | 说明             | 默认值               |
    | ------- | ---------------- | -------------------- |
    | width   | canvas 宽        | window.innerWidth    |
    | height  | canvas 高        | window.innerHeight   |
    | scale   | 雪花图片缩放倍数 | 0.2                  |
    | speed   | 雪花图片飘落速度 | 1                    |
    | opacity | 雪花图片透明度   | 0.3 + randomize(0.7) |
    | snowImg | 雪花图片         | -                    |

-   开始下雪、暂停下雪、继续下雪、重新下雪、停止下雪

### 原Demo

[https://nextapps.de/snowflake/](https://nextapps.de/snowflake/)

### 改后Demo

[下雪咯](http://139.9.223.238/snow/)

