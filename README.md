# Javascript Snowflakes (HTML5 Canvas)

fork 自[github](https://github.com/nextapps-de/snowflake)
改造点如下：

- 将雪花点改成图片

- 配置雪花飘落参数，如下

  | 字段    | 说明             | 默认值               |
  | ------- | ---------------- | -------------------- |
  | width   | canvas宽         | window.innerWidth    |
  | height  | canvas高         | window.innerHeight   |
  | scale   | 雪花图片缩放倍数 | 0.2                  |
  | speed   | 雪花图片飘落速度 | 1                    |
  | opacity | 雪花图片透明度   | 0.3 + randomize(0.7) |
  | snowImg | 雪花图片         | -                    |
  |         |                  |                      |

-   开始飘落、停止飘落

### Usage

Insert this snippet into `<HEAD>` or `<BODY>` tag of your html page:

```html
<script src="https://cdn.jsdelivr.net/gh/nextapps-de/snowflake@master/snowflake.min.js"></script>
```

### Demo

[https://nextapps.de/snowflake/](https://nextapps.de/snowflake/)

### License:

Apache License 2.0
