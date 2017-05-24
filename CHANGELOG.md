v3.4.8 - Wed, 24 May 2017 18:37:32 GMT
--------------------------------------





v3.4.7 - Tue, 23 May 2017 16:57:52 GMT
--------------------------------------





v3.4.6 - Wed, 15 Feb 2017 15:30:58 GMT
--------------------------------------





v3.4.5 - Tue, 22 Nov 2016 17:13:41 GMT
--------------------------------------





v3.4.4 - Fri, 12 Aug 2016 20:21:05 GMT
--------------------------------------





v3.4.3 - Fri, 22 Jul 2016 02:20:17 GMT
--------------------------------------

- [90c304f](../../commit/90c304f) [fixed] regression with disabled lsit items



v3.4.2 - Wed, 20 Jul 2016 20:21:49 GMT
--------------------------------------

- [b5b8ff7](../../commit/b5b8ff7) [fixed] script tag distribution
- [8a4c455](../../commit/8a4c455) [fixed] false positive on selecting item



v3.4.1 - Tue, 12 Jul 2016 12:22:31 GMT
--------------------------------------

- [8409875](../../commit/8409875) [fixed] buttons submitting forms



v3.4.0 - Mon, 11 Jul 2016 22:59:53 GMT
--------------------------------------

- [4168df5](../../commit/4168df5) [added] autoFocus support to dropdown, calendar, and selectlist



v3.3.4 - Fri, 08 Jul 2016 16:14:15 GMT
--------------------------------------





v3.3.3 - Wed, 29 Jun 2016 13:20:17 GMT
--------------------------------------





v3.3.2 - Fri, 03 Jun 2016 17:06:47 GMT
--------------------------------------





v3.3.1 - Sat, 23 Apr 2016 18:36:32 GMT
--------------------------------------





v3.3.0 - Sat, 23 Apr 2016 18:31:54 GMT
--------------------------------------

- [1e0a825](../../commit/1e0a825) [added] SCSS versions of styles!



v3.2.4 - Mon, 11 Apr 2016 17:40:41 GMT
--------------------------------------

- [cad7940](../../commit/cad7940) [fixed] incorrectly limited padded zeros



v3.2.3 - Mon, 11 Apr 2016 15:48:52 GMT
--------------------------------------

- [b49b5ef](../../commit/b49b5ef) [fixed] #322



v3.2.1 - Tue, 29 Mar 2016 19:34:19 GMT
--------------------------------------

- [3bd3da4](../../commit/3bd3da4) [fixed] SelectList was too forceful refocusing
- [db5fc11](../../commit/db5fc11) [fixed] SelectList focus logic



v3.2.0 - Sat, 27 Feb 2016 16:48:04 GMT
--------------------------------------

- [8805757](../../commit/8805757) [fixed] guard against async setState
- [f01fbfd](../../commit/f01fbfd) [fixed] focused popups have a higher zIndex than others
- [93325fa](../../commit/93325fa) [fixed] add onNavigate to Calendar propTypes
- [31151a8](../../commit/31151a8) [changed] Move focus handling to Mixin for consistency
- [fd6bada](../../commit/fd6bada) [fixed] SSR rendering issue with popup
- [665549d](../../commit/665549d) [fixed] Move envify to dependencies
- [3b0499a](../../commit/3b0499a) [fixed] Better Globalize version sniffing...siiigh



v3.1.7 - Thu, 21 Jan 2016 17:01:50 GMT
--------------------------------------





v3.1.6 - Fri, 15 Jan 2016 20:46:18 GMT
--------------------------------------

- [406c795](../../commit/406c795) [changed] popup animates onMount



v3.1.5 - Thu, 14 Jan 2016 15:45:04 GMT
--------------------------------------

- [9e1ada0](../../commit/9e1ada0) [fixed] add autoComplete off to combobox and dropdown filter
- [39284b8](../../commit/39284b8) [fixed] preventDefault for Enter keys
- [5b17d73](../../commit/5b17d73) [fixed] Multiselect not handling disabled items correctly
- [c8bcb1e](../../commit/c8bcb1e) [fixed] correctly localize number when editing
- [735c267](../../commit/735c267) [fixed] Can start typing negative numbers



v3.1.4 - Tue, 12 Jan 2016 22:14:45 GMT
--------------------------------------

- [438e30a](../../commit/438e30a) [fixed] extra timeout check, prevent setState after unmount
- [4b6abc7](../../commit/4b6abc7) [fixed] localizer dist files



v3.1.3 - Tue, 08 Dec 2015 19:20:18 GMT
--------------------------------------

- [c9bed37](../../commit/c9bed37) [fixed] moment localizer parse error
- [edba4c1](../../commit/edba4c1) [fixed] changing dropUp during a transition will cancel and restart the correct animation



v3.1.2 - Tue, 08 Dec 2015 19:12:58 GMT
--------------------------------------

- [3f7a001](../../commit/3f7a001) [fixed] changing dropUp during a transition will cancel and restart the correct animation
- [53bff60](../../commit/53bff60) [fixed] multiselect calls preventDefault
- [6e83098](../../commit/6e83098) [fixed] A couple IE8 issues



v3.1.1 - Fri, 04 Dec 2015 18:48:40 GMT
--------------------------------------

- [39f2dc0](../../commit/39f2dc0) [fixed] dropdown correctly checks value equality
- [88bc7b0](../../commit/88bc7b0) [fixed]  list searches correctly happen on keyPress and not keyDown



v3.1.0 - Mon, 02 Nov 2015 17:56:43 GMT
--------------------------------------

- [bd399d9](../../commit/bd399d9) [added] grouping SelectList items
- [1058e3f](../../commit/1058e3f) [added] disable individual dropdown/combobox options
- [5d1b530](../../commit/5d1b530) [fixed] missing key on Multiselect



v3.0.1 - Fri, 30 Oct 2015 04:27:39 GMT
--------------------------------------

- [3d25273](../../commit/3d25273) [fixed] missing dev dep



v3.0.0 - Sat, 24 Oct 2015 01:55:25 GMT
--------------------------------------

- [8172eaa](../../commit/8172eaa) [added] selectlist selectAll() method



v3.0.0-beta.1 - Mon, 12 Oct 2015 13:09:20 GMT
---------------------------------------------

- [65e94f9](../../commit/65e94f9) [fixed] moment localizer
- [bf468be](../../commit/bf468be) [fixed] recalc timeList when locale info changes
- [f002680](../../commit/f002680) [fixed] add onNavigate to docs
- [8ba4202](../../commit/8ba4202) [fixed] wrong list message displayed when all items selected on the multiselect
- [3be1b7d](../../commit/3be1b7d) [changed] reorder onKeyDown and respect preventDefault



v3.0.0-beta.0 - Thu, 08 Oct 2015 20:51:46 GMT
---------------------------------------------

- [5457935](../../commit/5457935) [added] localizers of different types
- [f865da1](../../commit/f865da1) [removed] IOS click hack, since react 0.14 handles this correctly
- [3be1c86](../../commit/3be1c86) [added] pass describedBy to datepicker
- [804db61](../../commit/804db61) [fixed] Calendar only refocuses itself when previously focused
- [3fc44c3](../../commit/3fc44c3) [fixed] properly compare TimeList labels
- [31c5479](../../commit/31c5479) [changed] globalize localizer now a function that takes a globalize instance
- [44818fd](../../commit/44818fd) [added] autoFocus support



v3.0.0-alpha.5 - Wed, 30 Sep 2015 14:33:16 GMT
----------------------------------------------

- [ac46a2a](../../commit/ac46a2a) [fixed] Calendar only refocuses itself when previously focused
- [1fc7c38](../../commit/1fc7c38) [fixed] properly compare TimeList labels
- [e74a2ed](../../commit/e74a2ed) [changed] globalize localizer now a function that takes a globalize instance
- [180bc31](../../commit/180bc31) [added] autoFocus support



v3.0.0-alpha.4 - Wed, 16 Sep 2015 09:42:02 GMT
----------------------------------------------

- [1fc7c38](../../commit/1fc7c38) [fixed] properly compare TimeList labels



v3.0.0-alpha.3 - Tue, 15 Sep 2015 10:27:55 GMT
----------------------------------------------

- [e74a2ed](../../commit/e74a2ed) [changed] globalize localizer now a function that takes a globalize instance
- [180bc31](../../commit/180bc31) [added] autoFocus support



