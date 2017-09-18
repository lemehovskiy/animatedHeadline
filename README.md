animatedBrackets
-------

### Demo

[https://lemehovskiy.github.io/animatedBrackets/demo](https://lemehovskiy.github.io/animatedBrackets/demo/)

### Settings

Option | Type | Default
--- | --- | ---
points | array | [
                    '0 20, 0 0, 100 0, 100 20',
                    '100 80, 100 100, 0 100, 0 80'
                  ]
color | string | '#ffffff'
stroke_width | int | 10
duration | int | 1
delay | int | 1

Example:

```html

<h3 class="title animated-brackets">
    Lorem ipsum dolor
</h3>


<script>
    $('.animated-brackets').animatedBrackets({
        points: [
            '0 20, 0 0, 100 0, 100 100, 0 100, 0 80'
        ],
        stroke_width: 8,
        color: '#cacaca'
    });
</script>
```

### Browser support

* Chrome
* Firefox
* Opera
* IE10/11


### Dependencies

* jQuery 1.7
