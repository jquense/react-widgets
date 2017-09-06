---
name: Theming
---

# Theming

The included styles mimic the defaults of Twitter Bootstrap 3.0. **This is less an actual theme and more a
neutral starting point for creating your own theme.** Less and Sass versions of the styles are included in
the react-widgets package, and can be tweaked or replaced to suit your needs.

Follow the conventions for overriding default variable values for either Less or Sass, depending on what you use. All
are stored in a `variables` file, see `./lib/{less,scss}/variables.{less,scss}` for reference. There are a ton
of knobs to tweak!

### Font and Input sizes

Component sizing is done via `em` units, and the base font-size is `1em` enabling components to scale with the surrounding
font-size. If you want to use a fixed size adjust the `font-size` variable. Using the default values, inputs look best
at `14px`, but you can also tweak the input height for different root font-sizes.

{{ <TabbedCodeBlock>
  <Tab title="Sass" lang="text/x-scss">
    {`
    $font-size: 16px;
    $input-height: 2.5em; // at 16px, this an even 40px

    @import '~react-widgets/lib/scss/react-widgets';
    `}
  </Tab>
  <Tab title="Less" lang="text/x-less">
    {`
    @import '~react-widgets/lib/less/react-widgets';

    @font-size: 16px;
    @input-height: 2.5em; // at 16px, this an even 40px
    `}
  </Tab>
</TabbedCodeBlock> }}

