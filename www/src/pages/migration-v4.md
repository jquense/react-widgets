
### Localizers (I18n)

In the past `react-widgets` included a set of localizers for use with popular
I18n libraries like Globalize and moment.js. One issue with this approach is that
we couldn't iterate on those parts of hte package without needing to bump the version
of all of `react-widgets`. If a localizer needed a breaking change it'd have to wait
until the whole package bumped a major version.

To address that in v4 we've split the localizers out into their own packages.
They are still maintained and developed along with react-widgets, but are individually
installable via npm. The maintained core ones are:

- `react-widgets-moment`
- `react-widgets-globalize`
- `react-widgets-simple-number`

### CSS Classes

The large majority of breaking changes are css related. Many classes have been
removed or renamed to provide more modular and themeable default styles. Please
check out the `variables.less` (or scss) file for new or different less/sass variables

And poke around the widget DOM structures in the dev tools to get a sense of what has
changed. If you have custom styles it should be fairly apparent (and easily fixable) what is
wrong.

### Default styles

Along with reworking the css we've also taken the time to update and refresh
the default styles of each widget. They should be a bit more polished and clean
out of the box for quick prototyping, as well as easier to theme.

### Props

#### Calendar: `initialView` and `finalView`

These have been replaced with the `views` prop which provides a lot more freedom
in defining what views the Calendar starts or ends on and in what order.

#### `duration` speed for animations

Programmatic `duration` has been removed, in favor of 100% CSS specified animations.
To change the duration of all popup enter and exiting speeds, adjust it via CSS.

__For Popups__:

```css
.rw-popup-transition {
  transition-duration: 400ms;
}
```

Or if you want to control it per component use a className and selector.

```css
.my-slower-dropdown .rw-popup-transition {
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
