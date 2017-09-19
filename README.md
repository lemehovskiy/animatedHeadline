animatedHeadline
-------

### Demo

[https://lemehovskiy.github.io/animatedHeadline/demo](https://lemehovskiy.github.io/animatedHeadline/demo/)

### Package Managers

```sh
# NPM
npm install animated_headline
```

### Settings

Option | Type | Default
--- | --- | ---
duration | int | .5
autoplay_speed | int | 2
center_mode | bool | false

Example:

```html

<span class="animated-headline">
    <b class="active">
        rolor
    </b>
    <b>
        color
    </b>
    <b>
        nolor
    </b>
</span>

<script>
    $('.animated-headline').animatedHeadline({
        duration: 1,
        autoplay_speed: 3,
        center_mode: true
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
* Gsap