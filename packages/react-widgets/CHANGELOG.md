# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.5.0](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.11...react-widgets@4.5.0) (2020-03-16)


### Bug Fixes

* timeList should compare date values relative to currently selected day when seeding focus for time value ([#997](https://github.com/jquense/react-widgets/issues/997)) ([834af33](https://github.com/jquense/react-widgets/commit/834af33909b36629f2cf229944ee30dc1821a684))
* **DropdownList:** move aria tags to correct place ([#900](https://github.com/jquense/react-widgets/issues/900)) ([c8beae3](https://github.com/jquense/react-widgets/commit/c8beae3e966c9bfa9eede75e98fe29ab6e05842f))
* invalid CSS selector ([#939](https://github.com/jquense/react-widgets/issues/939)) ([16931df](https://github.com/jquense/react-widgets/commit/16931df5b843e56c31598ddc992becb97083fa9e))
* pass navigatePrevIcon & navigateNextIcon props to Calendar Header ([#986](https://github.com/jquense/react-widgets/issues/986)) ([040861a](https://github.com/jquense/react-widgets/commit/040861a02d82cba6555af292639e7bd208164881)), closes [#896](https://github.com/jquense/react-widgets/issues/896)


### Features

* add style as a prop to MultiselectTag ([#968](https://github.com/jquense/react-widgets/issues/968)) ([1dfe620](https://github.com/jquense/react-widgets/commit/1dfe6207e2af9aed2b4b2b9be3847b3d7b6f5b3a))





## [4.4.11](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.10...react-widgets@4.4.11) (2019-05-01)


### Bug Fixes

* DropdownListInput ([#917](https://github.com/jquense/react-widgets/issues/917)) ([b7da000](https://github.com/jquense/react-widgets/commit/b7da000))
* focusedItem logic to better handle boolean dropdownlists item values ([#932](https://github.com/jquense/react-widgets/issues/932)) ([fcf64b6](https://github.com/jquense/react-widgets/commit/fcf64b6))





## [4.4.10](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.9...react-widgets@4.4.10) (2019-02-22)


### Bug Fixes

* ff alignment issues  875 and 911 ([#912](https://github.com/jquense/react-widgets/issues/912)) ([6210f16](https://github.com/jquense/react-widgets/commit/6210f16)), closes [#911](https://github.com/jquense/react-widgets/issues/911) [#875](https://github.com/jquense/react-widgets/issues/875)
* remove old ie alpha to fix Stylus usage ([#908](https://github.com/jquense/react-widgets/issues/908)) ([fd7baca](https://github.com/jquense/react-widgets/commit/fd7baca))





<a name="4.4.9"></a>
## [4.4.9](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.8...react-widgets@4.4.9) (2019-01-14)


### Bug Fixes

* for issue 875 Multiselect height bug in Firefox ([#904](https://github.com/jquense/react-widgets/issues/904)) ([e91f7c5](https://github.com/jquense/react-widgets/commit/e91f7c5))
* hidden aria-owns for DateTimePicker ([#902](https://github.com/jquense/react-widgets/issues/902)) ([6ad1b9a](https://github.com/jquense/react-widgets/commit/6ad1b9a)), closes [#619](https://github.com/jquense/react-widgets/issues/619)




<a name="4.4.8"></a>
## [4.4.8](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.7...react-widgets@4.4.8) (2018-12-11)


### Bug Fixes

* arrow keys not working on Combobox select when data is filtered ([#891](https://github.com/jquense/react-widgets/issues/891)) ([2e14597](https://github.com/jquense/react-widgets/commit/2e14597))
* edge case where upon hitting enter before using arrows or clicking, the first item out of all options (not just filtered options) was selected by default ([#883](https://github.com/jquense/react-widgets/issues/883)) ([971b326](https://github.com/jquense/react-widgets/commit/971b326))
* force reset of DatePickerInput when date is invalid ([#864](https://github.com/jquense/react-widgets/issues/864)) ([1f5bd74](https://github.com/jquense/react-widgets/commit/1f5bd74))




<a name="4.4.7"></a>
## [4.4.7](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.6...react-widgets@4.4.7) (2018-11-20)


### Bug Fixes

* problem typing decimals in NumberPicker ([#811](https://github.com/jquense/react-widgets/issues/811)). ([#880](https://github.com/jquense/react-widgets/issues/880)) ([c8b26c1](https://github.com/jquense/react-widgets/commit/c8b26c1))




<a name="4.4.6"></a>
## [4.4.6](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.5...react-widgets@4.4.6) (2018-10-03)


### Bug Fixes

* dropdown focus again ([e9c2a66](https://github.com/jquense/react-widgets/commit/e9c2a66))




<a name="4.4.4"></a>
## [4.4.4](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.3...react-widgets@4.4.4) (2018-09-20)


### Bug Fixes

* dropdown initial focus with selected items ([f17bb54](https://github.com/jquense/react-widgets/commit/f17bb54))
* focus mgmt for dropdowns ([f150993](https://github.com/jquense/react-widgets/commit/f150993)), closes [#830](https://github.com/jquense/react-widgets/issues/830) [#831](https://github.com/jquense/react-widgets/issues/831)




<a name="4.4.3"></a>
## [4.4.3](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.2...react-widgets@4.4.3) (2018-07-13)


### Bug Fixes

* touch bug where dropdown was not animating out ([9054125](https://github.com/jquense/react-widgets/commit/9054125))




<a name="4.4.2"></a>
## [4.4.2](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.1...react-widgets@4.4.2) (2018-07-10)


### Bug Fixes

* uncontrolled dropdownlist error ([f40f515](https://github.com/jquense/react-widgets/commit/f40f515))




<a name="4.4.1"></a>
## [4.4.1](https://github.com/jquense/react-widgets/compare/react-widgets@4.4.0...react-widgets@4.4.1) (2018-07-10)


### Bug Fixes

* fix autofill styles for dropdown list ([beff76b](https://github.com/jquense/react-widgets/commit/beff76b))




<a name="4.3.2"></a>
## [4.3.2](https://github.com/jquense/react-widgets/compare/react-widgets@4.3.1...react-widgets@4.3.2) (2018-06-08)


### Bug Fixes

* DateTimePickerinput typing ([665ad7e](https://github.com/jquense/react-widgets/commit/665ad7e))
