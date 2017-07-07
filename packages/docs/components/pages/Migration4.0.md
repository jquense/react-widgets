


### Props

#### `duration` speed for animations

Programatic `duration` has been removed, in favor of 100% CSS specified animations.
To change the duration of all popup enter and exiting speeds adjust it via CSS

__For Popups__:

```css
.rw-popup-animation-box {
  transition-duration: 400ms;
}
```

Or if you want to control it per component use a className and selector.

```css
.my-slower-dropdown .rw-popup-animation-box {
  transition-duration: 400ms;
}
```

__For Calendar transitions__:

```css
.rw-calendar-transition {
  transition-duration: 400ms;
}
```
Or

```css
.my-calendar .rw-calendar-transition {
  transition-duration: 400ms;
}
```
