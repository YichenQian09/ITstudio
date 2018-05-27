//（换页插件）（导航）（导航插件）（首页）（部门介绍页）（作品展示页）（爱特大事记）（成员介绍页）（留言板页）（加载）（留言板滚动条插件）（加载插件）（作品页插件）js检索
//（换页插件）
/*!
 * fullPage 2.9.4
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
          return factory($, global, global.document, global.Math);
        });
    } else if (typeof exports === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document, global.Math);
    } else {
        factory(jQuery, global, global.document, global.Math);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document, Math, undefined) {
    'use strict';

    // keeping central set of classnames and selectors
    var WRAPPER =               'fullpage-wrapper';
    var WRAPPER_SEL =           '.' + WRAPPER;

    // slimscroll
    var SCROLLABLE =            'fp-scrollable';
    var SCROLLABLE_SEL =        '.' + SCROLLABLE;

    // util
    var RESPONSIVE =            'fp-responsive';
    var NO_TRANSITION =         'fp-notransition';
    var DESTROYED =             'fp-destroyed';
    var ENABLED =               'fp-enabled';
    var VIEWING_PREFIX =        'fp-viewing';
    var ACTIVE =                'active';
    var ACTIVE_SEL =            '.' + ACTIVE;
    var COMPLETELY =            'fp-completely';
    var COMPLETELY_SEL =        '.' + COMPLETELY;

    // section
    var SECTION_DEFAULT_SEL =   '.section';
    var SECTION =               'fp-section';
    var SECTION_SEL =           '.' + SECTION;
    var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;
    var SECTION_FIRST_SEL =     SECTION_SEL + ':first';
    var SECTION_LAST_SEL =      SECTION_SEL + ':last';
    var TABLE_CELL =            'fp-tableCell';
    var TABLE_CELL_SEL =        '.' + TABLE_CELL;
    var AUTO_HEIGHT =           'fp-auto-height';
    var AUTO_HEIGHT_SEL =       '.fp-auto-height';
    var NORMAL_SCROLL =         'fp-normal-scroll';
    var NORMAL_SCROLL_SEL =     '.fp-normal-scroll';

    // section nav
    var SECTION_NAV =           'fp-nav';
    var SECTION_NAV_SEL =       '#' + SECTION_NAV;
    var SECTION_NAV_TOOLTIP =   'fp-tooltip';
    var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;
    var SHOW_ACTIVE_TOOLTIP =   'fp-show-active';

    // slide
    var SLIDE_DEFAULT_SEL =     '.slide';
    var SLIDE =                 'fp-slide';
    var SLIDE_SEL =             '.' + SLIDE;
    var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;
    var SLIDES_WRAPPER =        'fp-slides';
    var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;
    var SLIDES_CONTAINER =      'fp-slidesContainer';
    var SLIDES_CONTAINER_SEL =  '.' + SLIDES_CONTAINER;
    var TABLE =                 'fp-table';

    // slide nav
    var SLIDES_NAV =            'fp-slidesNav';
    var SLIDES_NAV_SEL =        '.' + SLIDES_NAV;
    var SLIDES_NAV_LINK_SEL =   SLIDES_NAV_SEL + ' a';
    var SLIDES_ARROW =          'fp-controlArrow';
    var SLIDES_ARROW_SEL =      '.' + SLIDES_ARROW;
    var SLIDES_PREV =           'fp-prev';
    var SLIDES_PREV_SEL =       '.' + SLIDES_PREV;
    var SLIDES_ARROW_PREV =     SLIDES_ARROW + ' ' + SLIDES_PREV;
    var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
    var SLIDES_NEXT =           'fp-next';
    var SLIDES_NEXT_SEL =       '.' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT =     SLIDES_ARROW + ' ' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

    var $window = $(window);
    var $document = $(document);

    // Default options for iScroll.js used when using scrollOverflow
    var iscrollOptions = {
        scrollbars: true,
        mouseWheel: true,
        hideScrollbars: false,
        fadeScrollbars: false,
        disableMouse: true,
        interactiveScrollbars: true
    };

    $.fn.fullpage = function(options) {
        //only once my friend!
        if(footerShow == false&&$('html').hasClass(ENABLED)){ displayWarnings(); return; }

        // common jQuery objects
        var $htmlBody = $('html, body');
        var $body = $('body');

        var FP = $.fn.fullpage;

        // Creating some defaults, extending them with any options that were provided
        options = $.extend({
            //navigation
            menu: false,
            anchors:[],
            lockAnchors: false,
            navigation: false,
            navigationPosition: 'right',
            navigationTooltips: [],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',
            scrollBar: false,
            hybrid: false,

            //scrolling
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 1000,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            continuousHorizontal: false,
            scrollHorizontally: false,
            interlockedSlides: false,
            dragAndMove: false,
            offsetSections: false,
            resetSliders: false,
            fadingEffect: false,
            normalScrollElements: null,
            scrollOverflow: false,
            scrollOverflowReset: false,
            scrollOverflowHandler: iscrollHandler,
            scrollOverflowOptions: null,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,

            //Accessibility
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //design
            controlArrows: true,
            controlArrowColor: '#fff',
            verticalCentered: true,
            sectionsColor : [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0, //backwards compabitility with responsiveWiddth
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: false,
            parallaxOptions: {
                type: 'reveal',
                percentage: 62,
                property: 'translate'
            },

            //Custom selectors
            sectionSelector: SECTION_DEFAULT_SEL,
            slideSelector: SLIDE_DEFAULT_SEL,

            //events
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null,
            afterResponsive: null,

            lazyLoading: true
        }, options);

        //flag to avoid very fast sliding for landscape sliders
        var slideMoving = false;

        var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
        var container = $(this);
        var windowsHeight = $window.height();
        var isResizing = false;
        var isWindowFocused = true;
        var lastScrolledDestiny;
        var lastScrolledSlide;
        var canScroll = true;
        var scrollings = [];
        var controlPressed;
        var startingSection;
        var isScrollAllowed = {};
        isScrollAllowed.m = {  'up':true, 'down':true, 'left':true, 'right':true };
        isScrollAllowed.k = $.extend(true,{}, isScrollAllowed.m);
        var MSPointer = getMSPointer();
        var events = {
            touchmove: 'ontouchmove' in window ? 'touchmove' :  MSPointer.move,
            touchstart: 'ontouchstart' in window ? 'touchstart' :  MSPointer.down
        };

        //timeouts
        var resizeId;
        var afterSectionLoadsId;
        var afterSlideLoadsId;
        var scrollId;
        var scrollId2;
        var keydownId;
        var originals = $.extend(true, {}, options); //deep copy

        displayWarnings();

        //fixing bug in iScroll with links: https://github.com/cubiq/iscroll/issues/783
        iscrollOptions.click = isTouch; // see #2035

        //extending iScroll options with the user custom ones
        iscrollOptions = $.extend(iscrollOptions, options.scrollOverflowOptions);

        //easeInOutCubic animation included in the plugin
        $.extend($.easing,{ easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;}});

        /**
        * Sets the autoScroll option.
        * It changes the scroll bar visibility and the history of the site as a result.
        */
        function setAutoScrolling(value, type){
            //removing the transformation
            if(footerShow == false&&!value){
                silentScroll(0);
            }

            setVariableState('autoScrolling', value, type);

            var element = $(SECTION_ACTIVE_SEL);

            if(footerShow == false&&options.autoScrolling && !options.scrollBar){
                $htmlBody.css({
                    'overflow' : 'hidden',
                    'height' : '100%'
                });

                setRecordHistory(originals.recordHistory, 'internal');

                //for IE touch devices
                container.css({
                    '-ms-touch-action': 'none',
                    'touch-action': 'none'
                });

                if(footerShow == false&&element.length){
                    //moving the container up
                    silentScroll(element.position().top);
                }

            }else{
                $htmlBody.css({
                    'overflow' : 'visible',
                    'height' : 'initial'
                });

                setRecordHistory(false, 'internal');

                //for IE touch devices
                container.css({
                    '-ms-touch-action': '',
                    'touch-action': ''
                });

                //scrolling the page to the section with no animation
                if (element.length) {
                    $htmlBody.scrollTop(element.position().top);
                }
            }
        }

        /**
        * Defines wheter to record the history for each hash change in the URL.
        */
        function setRecordHistory(value, type){
            setVariableState('recordHistory', value, type);
        }

        /**
        * Defines the scrolling speed
        */
        function setScrollingSpeed(value, type){
            setVariableState('scrollingSpeed', value, type);
        }

        /**
        * Sets fitToSection
        */
        function setFitToSection(value, type){
            setVariableState('fitToSection', value, type);
        }

        /**
        * Sets lockAnchors
        */
        function setLockAnchors(value){
            options.lockAnchors = value;
        }

        /**
        * Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
        */
        function setMouseWheelScrolling(value){
            if(footerShow == false&&value){
                addMouseWheelHandler();
                addMiddleWheelHandler();
            }else{
                removeMouseWheelHandler();
                removeMiddleWheelHandler();
            }
        }

        /**
        * Adds or remove the possibility of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
        * Optionally a second parameter can be used to specify the direction for which the action will be applied.
        *
        * @param directions string containing the direction or directions separated by comma.
        */
        function setAllowScrolling(value, directions){
            if(footerShow == false&&typeof directions !== 'undefined'){
                directions = directions.replace(/ /g,'').split(',');

                $.each(directions, function (index, direction){
                    setIsScrollAllowed(value, direction, 'm');
                });
            }
            else if(footerShow == false&&value){
                setMouseWheelScrolling(true);
                addTouchHandler();
            }else{
                setMouseWheelScrolling(false);
                removeTouchHandler();
            }
        }

        /**
        * Adds or remove the possibility of scrolling through sections by using the keyboard arrow keys
        */
        function setKeyboardScrolling(value, directions){
            if(footerShow == false&&typeof directions !== 'undefined'){
                directions = directions.replace(/ /g,'').split(',');

                $.each(directions, function (index, direction){
                    setIsScrollAllowed(value, direction, 'k');
                });
            }else{
                options.keyboardScrolling = value;
            }
        }

        /**
        * Moves the page up one section.
        */
        function moveSectionUp(){
            var prev = $(SECTION_ACTIVE_SEL).prev(SECTION_SEL);

            //looping to the bottom if there's no more sections above
            if (!prev.length && (options.loopTop || options.continuousVertical)) {
                prev = $(SECTION_SEL).last();
            }

            if (prev.length) {
                scrollPage(prev, null, true);
            }
        }

        /**
        * Moves the page down one section.
        */
        function moveSectionDown(){
            var next = $(SECTION_ACTIVE_SEL).next(SECTION_SEL);

            //looping to the top if there's no more sections below
            if(footerShow == false&&!next.length &&
                (options.loopBottom || options.continuousVertical)){
                next = $(SECTION_SEL).first();
            }

            if(footerShow == false&&next.length){
                scrollPage(next, null, false);
            }
        }

        /**
        * Moves the page to the given section and slide with no animation.
        * Anchors or index positions can be used as params.
        */
        function silentMoveTo(sectionAnchor, slideAnchor){
            setScrollingSpeed (0, 'internal');
            moveTo(sectionAnchor, slideAnchor);
            setScrollingSpeed (originals.scrollingSpeed, 'internal');
        }

        /**
        * Moves the page to the given section and slide.
        * Anchors or index positions can be used as params.
        */
        function moveTo(sectionAnchor, slideAnchor){
            var destiny = getSectionByAnchor(sectionAnchor);

            if (typeof slideAnchor !== 'undefined'){
                scrollPageAndSlide(sectionAnchor, slideAnchor);
            }else if(footerShow == false&&destiny.length > 0){
                scrollPage(destiny);
            }
        }

        /**
        * Slides right the slider of the active section.
        * Optional `section` param.
        */
        function moveSlideRight(section){
            moveSlide('right', section);
        }

        /**
        * Slides left the slider of the active section.
        * Optional `section` param.
        */
        function moveSlideLeft(section){
            moveSlide('left', section);
        }

        /**
         * When resizing is finished, we adjust the slides sizes and positions
         */
        function reBuild(resizing){
            if(footerShow == false&&container.hasClass(DESTROYED)){ return; }  //nothing to do if the plugin was destroyed

            isResizing = true;

            windowsHeight = $window.height();  //updating global var

            $(SECTION_SEL).each(function(){
                var slidesWrap = $(this).find(SLIDES_WRAPPER_SEL);
                var slides = $(this).find(SLIDE_SEL);

                //adjusting the height of the table-cell for IE and Firefox
                if(footerShow == false&&options.verticalCentered){
                    $(this).find(TABLE_CELL_SEL).css('height', getTableHeight($(this)) + 'px');
                }

                $(this).css('height', windowsHeight + 'px');

                //resizing the scrolling divs
                if(footerShow == false&&options.scrollOverflow){
                    if(footerShow == false&&slides.length){
                        slides.each(function(){
                            createScrollBar($(this));
                        });
                    }else{
                        createScrollBar($(this));
                    }
                }

                //adjusting the position fo the FULL WIDTH slides...
                if (slides.length > 1) {
                    landscapeScroll(slidesWrap, slidesWrap.find(SLIDE_ACTIVE_SEL));
                }
            });

            var activeSection = $(SECTION_ACTIVE_SEL);
            var sectionIndex = activeSection.index(SECTION_SEL);

            //isn't it the first section?
            if(footerShow == false&&sectionIndex){
                //adjusting the position for the current section
                silentMoveTo(sectionIndex + 1);
            }

            isResizing = false;
            $.isFunction( options.afterResize ) && resizing && options.afterResize.call(container);
            $.isFunction( options.afterReBuild ) && !resizing && options.afterReBuild.call(container);
        }

        /**
        * Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
        * are smaller than the set limit values.
        */
        function setResponsive(active){
            var isResponsive = $body.hasClass(RESPONSIVE);

            if(footerShow == false&&active){
                if(footerShow == false&&!isResponsive){
                    setAutoScrolling(false, 'internal');
                    setFitToSection(false, 'internal');
                    $(SECTION_NAV_SEL).hide();
                    $body.addClass(RESPONSIVE);
                    $.isFunction( options.afterResponsive ) && options.afterResponsive.call( container, active);
                }
            }
            else if(footerShow == false&&isResponsive){
                setAutoScrolling(originals.autoScrolling, 'internal');
                setFitToSection(originals.autoScrolling, 'internal');
                $(SECTION_NAV_SEL).show();
                $body.removeClass(RESPONSIVE);
                $.isFunction( options.afterResponsive ) && options.afterResponsive.call( container, active);
            }
        }

        if(footerShow == false&&$(this).length){
            //public functions
            FP.setAutoScrolling = setAutoScrolling;
            FP.setRecordHistory = setRecordHistory;
            FP.setScrollingSpeed = setScrollingSpeed;
            FP.setFitToSection = setFitToSection;
            FP.setLockAnchors = setLockAnchors;
            FP.setMouseWheelScrolling = setMouseWheelScrolling;
            FP.setAllowScrolling = setAllowScrolling;
            FP.setKeyboardScrolling = setKeyboardScrolling;
            FP.moveSectionUp = moveSectionUp;
            FP.moveSectionDown = moveSectionDown;
            FP.silentMoveTo = silentMoveTo;
            FP.moveTo = moveTo;
            FP.moveSlideRight = moveSlideRight;
            FP.moveSlideLeft = moveSlideLeft;
            FP.fitToSection = fitToSection;
            FP.reBuild = reBuild;
            FP.setResponsive = setResponsive;
            FP.destroy = destroy;

            init();

            bindEvents();
        }

        function init(){
            //if css3 is not supported, it will use jQuery animations
            if(footerShow == false&&options.css3){
                options.css3 = support3d();
            }

            options.scrollBar = options.scrollBar || options.hybrid;

            setOptionsFromDOM();
            prepareDom();
            setAllowScrolling(true);
            setAutoScrolling(options.autoScrolling, 'internal');
            responsive();

            //setting the class for the body element
            setBodyClass();

            if(footerShow == false&&document.readyState === 'complete'){
                scrollToAnchor();
            }
            $window.on('load', scrollToAnchor);
        }

        function bindEvents(){
            $window
                //when scrolling...
                .on('scroll', scrollHandler)

                //detecting any change on the URL to scroll to the given anchor link
                //(a way to detect back history button as we play with the hashes on the URL)
                .on('hashchange', hashChangeHandler)

                //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
                .blur(blurHandler)

                //when resizing the site, we adjust the heights of the sections, slimScroll...
                .resize(resizeHandler);

            $document
                //Sliding with arrow keys, both, vertical and horizontal
                .keydown(keydownHandler)

                //to prevent scrolling while zooming
                .keyup(keyUpHandler)

                //Scrolls to the section when clicking the navigation bullet
                .on('click touchstart', SECTION_NAV_SEL + ' a', sectionBulletHandler)

                //Scrolls the slider to the given slide destination for the given section
                .on('click touchstart', SLIDES_NAV_LINK_SEL, slideBulletHandler)

                .on('click', SECTION_NAV_TOOLTIP_SEL, tooltipTextHandler);

            //Scrolling horizontally when clicking on the slider controls.
            $(SECTION_SEL).on('click touchstart', SLIDES_ARROW_SEL, slideArrowHandler);

            /**
            * Applying normalScroll elements.
            * Ignoring the scrolls over the specified selectors.
            */
            if(footerShow == false&&options.normalScrollElements){
                $document.on('mouseenter', options.normalScrollElements, function () {
                    setMouseWheelScrolling(false);
                });

                $document.on('mouseleave', options.normalScrollElements, function(){
                    setMouseWheelScrolling(true);
                });
            }
        }

        /**
        * Setting options from DOM elements if they are not provided.
        */
        function setOptionsFromDOM(){
            var sections = container.find(options.sectionSelector);

            //no anchors option? Checking for them in the DOM attributes
            if(footerShow == false&&!options.anchors.length){
                options.anchors = sections.filter('[data-anchor]').map(function(){
                    return $(this).data('anchor').toString();
                }).get();
            }

            //no tooltips option? Checking for them in the DOM attributes
            if(footerShow == false&&!options.navigationTooltips.length){
                options.navigationTooltips = sections.filter('[data-tooltip]').map(function(){
                    return $(this).data('tooltip').toString();
                }).get();
            }
        }

        /**
        * Works over the DOM structure to set it up for the current fullpage options.
        */
        function prepareDom(){
            container.css({
                'height': '100%',
                'position': 'relative'
            });

            //adding a class to recognize the container internally in the code
            container.addClass(WRAPPER);
            $('html').addClass(ENABLED);

            //due to https://github.com/alvarotrigo/fullPage.js/issues/1502
            windowsHeight = $window.height();

            container.removeClass(DESTROYED); //in case it was destroyed before initializing it again

            addInternalSelectors();

             //styling the sections / slides / menu
            $(SECTION_SEL).each(function(index){
                var section = $(this);
                var slides = section.find(SLIDE_SEL);
                var numSlides = slides.length;

                styleSection(section, index);
                styleMenu(section, index);

                // if there's any slide
                if (numSlides > 0) {
                    styleSlides(section, slides, numSlides);
                }else{
                    if(footerShow == false&&options.verticalCentered){
                        addTableClass(section);
                    }
                }
            });

            //fixed elements need to be moved out of the plugin container due to problems with CSS3.
            if(footerShow == false&&options.fixedElements && options.css3){
                $(options.fixedElements).appendTo($body);
            }

            //vertical centered of the navigation + active bullet
            if(footerShow == false&&options.navigation){
                addVerticalNavigation();
            }

            enableYoutubeAPI();

            if(footerShow == false&&options.scrollOverflow){
                if(footerShow == false&&document.readyState === 'complete'){
                    createScrollBarHandler();
                }
                //after DOM and images are loaded
                $window.on('load', createScrollBarHandler);
            }else{
                afterRenderActions();
            }
        }

        /**
        * Styles the horizontal slides for a section.
        */
        function styleSlides(section, slides, numSlides){
            var sliderWidth = numSlides * 100;
            var slideWidth = 100 / numSlides;

            slides.wrapAll('<div class="' + SLIDES_CONTAINER + '" />');
            slides.parent().wrap('<div class="' + SLIDES_WRAPPER + '" />');

            section.find(SLIDES_CONTAINER_SEL).css('width', sliderWidth + '%');

            if(footerShow == false&&numSlides > 1){
                if(footerShow == false&&options.controlArrows){
                    createSlideArrows(section);
                }

                if(footerShow == false&&options.slidesNavigation){
                    addSlidesNavigation(section, numSlides);
                }
            }

            slides.each(function(index) {
                $(this).css('width', slideWidth + '%');

                if(footerShow == false&&options.verticalCentered){
                    addTableClass($(this));
                }
            });

            var startingSlide = section.find(SLIDE_ACTIVE_SEL);

            //if the slide won't be an starting point, the default will be the first one
            //the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
            if(footerShow == false&& startingSlide.length &&  ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) !== 0 || ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) === 0 && startingSlide.index() !== 0))){
                silentLandscapeScroll(startingSlide, 'internal');
            }else{
                slides.eq(0).addClass(ACTIVE);
            }
        }

        /**
        * Styling vertical sections
        */
        function styleSection(section, index){
            //if no active section is defined, the 1st one will be the default one
            if(footerShow == false&&!index && $(SECTION_ACTIVE_SEL).length === 0) {
                section.addClass(ACTIVE);
            }
            startingSection = $(SECTION_ACTIVE_SEL);

            section.css('height', windowsHeight + 'px');

            if(footerShow == false&&options.paddingTop){
                section.css('padding-top', options.paddingTop);
            }

            if(footerShow == false&&options.paddingBottom){
                section.css('padding-bottom', options.paddingBottom);
            }

            if (typeof options.sectionsColor[index] !==  'undefined') {
                section.css('background-color', options.sectionsColor[index]);
            }

            if (typeof options.anchors[index] !== 'undefined') {
                section.attr('data-anchor', options.anchors[index]);
            }
        }

        /**
        * Sets the data-anchor attributes to the menu elements and activates the current one.
        */
        function styleMenu(section, index){
            if (typeof options.anchors[index] !== 'undefined') {
                //activating the menu / nav element on load
                if(footerShow == false&&section.hasClass(ACTIVE)){
                    activateMenuAndNav(options.anchors[index], index);
                }
            }

            //moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
            if(footerShow == false&&options.menu && options.css3 && $(options.menu).closest(WRAPPER_SEL).length){
                $(options.menu).appendTo($body);
            }
        }

        /**
        * Adds internal classes to be able to provide customizable selectors
        * keeping the link with the style sheet.
        */
        function addInternalSelectors(){
            container.find(options.sectionSelector).addClass(SECTION);
            container.find(options.slideSelector).addClass(SLIDE);
        }

        /**
        * Creates the control arrows for the given section
        */
        function createSlideArrows(section){
            section.find(SLIDES_WRAPPER_SEL).after('<div class="' + SLIDES_ARROW_PREV + '"></div><div class="' + SLIDES_ARROW_NEXT + '"></div>');

            if(footerShow == false&&options.controlArrowColor!='#fff'){
                section.find(SLIDES_ARROW_NEXT_SEL).css('border-color', 'transparent transparent transparent '+options.controlArrowColor);
                section.find(SLIDES_ARROW_PREV_SEL).css('border-color', 'transparent '+ options.controlArrowColor + ' transparent transparent');
            }

            if(footerShow == false&&!options.loopHorizontal){
                section.find(SLIDES_ARROW_PREV_SEL).hide();
            }
        }

        /**
        * Creates a vertical navigation bar.
        */
        function addVerticalNavigation(){
            $body.append('<div id="' + SECTION_NAV + '"><ul></ul></div>');
            var nav = $(SECTION_NAV_SEL);

            nav.addClass(function() {
                return options.showActiveTooltip ? SHOW_ACTIVE_TOOLTIP + ' ' + options.navigationPosition : options.navigationPosition;
            });

            for (var i = 0; i < $(SECTION_SEL).length; i++) {
                var link = '';
                if (options.anchors.length) {
                    link = options.anchors[i];
                }

                var li = '<li><a href="#' + link + '"><span></span></a>';

                // Only add tooltip if needed (defined by user)
                var tooltip = options.navigationTooltips[i];

                if (typeof tooltip !== 'undefined' && tooltip !== '') {
                    li += '<div class="' + SECTION_NAV_TOOLTIP + ' ' + options.navigationPosition + '">' + tooltip + '</div>';
                }

                li += '</li>';

                nav.find('ul').append(li);
            }

            //centering it vertically
            $(SECTION_NAV_SEL).css('margin-top', '-' + ($(SECTION_NAV_SEL).height()/2) + 'px');

            //activating the current active section
            $(SECTION_NAV_SEL).find('li').eq($(SECTION_ACTIVE_SEL).index(SECTION_SEL)).find('a').addClass(ACTIVE);
        }

        /**
        * Creates the slim scroll scrollbar for the sections and slides inside them.
        */
        function createScrollBarHandler(){
            $(SECTION_SEL).each(function(){
                var slides = $(this).find(SLIDE_SEL);

                if(footerShow == false&&slides.length){
                    slides.each(function(){
                        createScrollBar($(this));
                    });
                }else{
                    createScrollBar($(this));
                }

            });
            afterRenderActions();
        }

        /*
        * Enables the Youtube videos API so we can control their flow if necessary.
        */
        function enableYoutubeAPI(){
            container.find('iframe[src*="youtube.com/embed/"]').each(function(){
                addURLParam($(this), 'enablejsapi=1');
            });
        }

        /**
        * Adds a new parameter and its value to the `src` of a given element
        */
        function addURLParam(element, newParam){
            var originalSrc = element.attr('src');
            element.attr('src', originalSrc + getUrlParamSign(originalSrc) + newParam);
        }

        /*
        * Returns the prefix sign to use for a new parameter in an existen URL.
        *
        * @return {String}  ? | &
        */
        function getUrlParamSign(url){
            return ( !/\?/.test( url ) ) ? '?' : '&';
        }

        /**
        * Actions and callbacks to fire afterRender
        */
        function afterRenderActions(){
            var section = $(SECTION_ACTIVE_SEL);

            section.addClass(COMPLETELY);

            if(footerShow == false&&options.scrollOverflowHandler.afterRender){
                options.scrollOverflowHandler.afterRender(section);
            }
            lazyLoad(section);
            playMedia(section);
            options.scrollOverflowHandler.afterLoad();
            
            if(footerShow == false&&isDestinyTheStartingSection()){
                $.isFunction( options.afterLoad ) && options.afterLoad.call(section, section.data('anchor'), (section.index(SECTION_SEL) + 1));
            }

            $.isFunction( options.afterRender ) && options.afterRender.call(container);
        }

        /**
        * Determines if the URL anchor destiny is the starting section (the one using 'active' class before initialization)
        */
        function isDestinyTheStartingSection(){
            var anchors =  window.location.hash.replace('#', '').split('/');
            var destinationSection = getSectionByAnchor(decodeURIComponent(anchors[0]));
    
            return !destinationSection.length || destinationSection.length && destinationSection.index() === startingSection.index();
        }


        var isScrolling = false;
        var lastScroll = 0;

        //when scrolling...
        function scrollHandler(){
            var currentSection;

            if(footerShow == false&&!options.autoScrolling || options.scrollBar){
                var currentScroll = $window.scrollTop();
                var scrollDirection = getScrollDirection(currentScroll);
                var visibleSectionIndex = 0;
                var screen_mid = currentScroll + ($window.height() / 2.0);
                var isAtBottom = $body.height() - $window.height() === currentScroll;
                var sections =  document.querySelectorAll(SECTION_SEL);

                //when using `auto-height` for a small last section it won't be centered in the viewport
                if(footerShow == false&&isAtBottom){
                    visibleSectionIndex = sections.length - 1;
                }
                //is at top? when using `auto-height` for a small first section it won't be centered in the viewport
                else if(footerShow == false&&!currentScroll){
                    visibleSectionIndex = 0;
                }

                //taking the section which is showing more content in the viewport
                else{
                    for (var i = 0; i < sections.length; ++i) {
                        var section = sections[i];

                        // Pick the the last section which passes the middle line of the screen.
                        if (section.offsetTop <= screen_mid)
                        {
                            visibleSectionIndex = i;
                        }
                    }
                }

                if(footerShow == false&&isCompletelyInViewPort(scrollDirection)){
                    if(footerShow == false&&!$(SECTION_ACTIVE_SEL).hasClass(COMPLETELY)){
                        $(SECTION_ACTIVE_SEL).addClass(COMPLETELY).siblings().removeClass(COMPLETELY);
                    }
                }

                //geting the last one, the current one on the screen
                currentSection = $(sections).eq(visibleSectionIndex);

                //setting the visible section as active when manually scrolling
                //executing only once the first time we reach the section
                if(footerShow == false&&!currentSection.hasClass(ACTIVE)){
                    isScrolling = true;
                    var leavingSection = $(SECTION_ACTIVE_SEL);
                    var leavingSectionIndex = leavingSection.index(SECTION_SEL) + 1;
                    var yMovement = getYmovement(currentSection);
                    var anchorLink  = currentSection.data('anchor');
                    var sectionIndex = currentSection.index(SECTION_SEL) + 1;
                    var activeSlide = currentSection.find(SLIDE_ACTIVE_SEL);
                    var slideIndex;
                    var slideAnchorLink;

                    if(footerShow == false&&activeSlide.length){
                        slideAnchorLink = activeSlide.data('anchor');
                        slideIndex = activeSlide.index();
                    }

                    if(footerShow == false&&canScroll){
                        currentSection.addClass(ACTIVE).siblings().removeClass(ACTIVE);

                        $.isFunction( options.onLeave ) && options.onLeave.call( leavingSection, leavingSectionIndex, sectionIndex, yMovement);
                        $.isFunction( options.afterLoad ) && options.afterLoad.call( currentSection, anchorLink, sectionIndex);

                        stopMedia(leavingSection);
                        lazyLoad(currentSection);
                        playMedia(currentSection);

                        activateMenuAndNav(anchorLink, sectionIndex - 1);

                        if(footerShow == false&&options.anchors.length){
                            //needed to enter in hashChange event when using the menu with anchor links
                            lastScrolledDestiny = anchorLink;
                        }
                        setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
                    }

                    //small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
                    clearTimeout(scrollId);
                    scrollId = setTimeout(function(){
                        isScrolling = false;
                    }, 100);
                }

                if(footerShow == false&&options.fitToSection){
                    //for the auto adjust of the viewport to fit a whole section
                    clearTimeout(scrollId2);

                    scrollId2 = setTimeout(function(){
                        //checking it again in case it changed during the delay
                        if(footerShow == false&&options.fitToSection){
                            fitToSection();
                        }
                    }, options.fitToSectionDelay);
                }
            }
        }

        /**
        * Fits the site to the nearest active section
        */
        function fitToSection(){
            //checking fitToSection again in case it was set to false before the timeout delay
            if(footerShow == false&&canScroll){
                //allows to scroll to an active section and
                //if the section is already active, we prevent firing callbacks
                isResizing = true;

                scrollPage($(SECTION_ACTIVE_SEL));
                isResizing = false;
            }
        }

        /**
        * Determines whether the active section has seen in its whole or not.
        */
        function isCompletelyInViewPort(movement){
            var top = $(SECTION_ACTIVE_SEL).position().top;
            var bottom = top + $window.height();

            if(footerShow == false&&movement == 'up'){
                return bottom >= ($window.scrollTop() + $window.height());
            }
            return top <= $window.scrollTop();
        }

        /**
        * Gets the directon of the the scrolling fired by the scroll event.
        */
        function getScrollDirection(currentScroll){
            var direction = currentScroll > lastScroll ? 'down' : 'up';

            lastScroll = currentScroll;

            //needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination
            previousDestTop = currentScroll;

            return direction;
        }

        /**
        * Determines the way of scrolling up or down:
        * by 'automatically' scrolling a section or by using the default and normal scrolling.
        */
        function scrolling(type, scrollable){
            if (!isScrollAllowed.m[type]){
                return;
            }
            var check = (type === 'down') ? 'bottom' : 'top';
            var scrollSection = (type === 'down') ? moveSectionDown : moveSectionUp;

            if(footerShow == false&&scrollable.length > 0 ){
                //is the scrollbar at the start/end of the scroll?
                if(footerShow == false&&options.scrollOverflowHandler.isScrolled(check, scrollable)){
                    scrollSection();
                }else{
                    return true;
                }
            }else{
                // moved up/down
                scrollSection();
            }
        }

        /*
        * Preventing bouncing in iOS #2285
        */
        function preventBouncing(event){
            var e = event.originalEvent;
            if(footerShow == false&&!checkParentForNormalScrollElement(event.target) && options.autoScrolling && isReallyTouch(e)){
                //preventing the easing on iOS devices
                event.preventDefault();
            }
        }

        var touchStartY = 0;
        var touchStartX = 0;
        var touchEndY = 0;
        var touchEndX = 0;

        /* Detecting touch events

        * As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
        * This way, the touchstart and the touch moves shows an small difference between them which is the
        * used one to determine the direction.
        */
        function touchMoveHandler(event){
            var e = event.originalEvent;
            var activeSection = $(e.target).closest(SECTION_SEL);

            // additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
            if (!checkParentForNormalScrollElement(event.target) && isReallyTouch(e) ) {

                if(footerShow == false&&options.autoScrolling){
                    //preventing the easing on iOS devices
                    event.preventDefault();
                }

                var scrollable = options.scrollOverflowHandler.scrollable(activeSection);
                var touchEvents = getEventsPage(e);

                touchEndY = touchEvents.y;
                touchEndX = touchEvents.x;

                //if movement in the X axys is greater than in the Y and the currect section has slides...
                if (activeSection.find(SLIDES_WRAPPER_SEL).length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

                    //is the movement greater than the minimum resistance to scroll?
                    if (!slideMoving && Math.abs(touchStartX - touchEndX) > ($window.outerWidth() / 100 * options.touchSensitivity)) {
                        if (touchStartX > touchEndX) {
                            if(footerShow == false&&isScrollAllowed.m.right){
                                moveSlideRight(activeSection); //next
                            }
                        } else {
                            if(footerShow == false&&isScrollAllowed.m.left){
                                moveSlideLeft(activeSection); //prev
                            }
                        }
                    }
                }

                //vertical scrolling (only when autoScrolling is enabled)
                else if(footerShow == false&&options.autoScrolling && canScroll){

                    //is the movement greater than the minimum resistance to scroll?
                    if (Math.abs(touchStartY - touchEndY) > ($window.height() / 100 * options.touchSensitivity)) {
                        if (touchStartY > touchEndY) {
                            scrolling('down', scrollable);
                        } else if (touchEndY > touchStartY) {
                            scrolling('up', scrollable);
                        }
                    }
                }
            }
        }

        /**
         * recursive function to loop up the parent nodes to check if one of them exists in options.normalScrollElements
         * Currently works well for iOS - Android might need some testing
         * @param  {Element} el  target element / jquery selector (in subsequent nodes)
         * @param  {int}     hop current hop compared to options.normalScrollElementTouchThreshold
         * @return {boolean} true if there is a match to options.normalScrollElements
         */
        function checkParentForNormalScrollElement (el, hop) {
            hop = hop || 0;
            var parent = $(el).parent();

            if (hop < options.normalScrollElementTouchThreshold &&
                parent.is(options.normalScrollElements) ) {
                return true;
            } else if (hop == options.normalScrollElementTouchThreshold) {
                return false;
            } else {
                return checkParentForNormalScrollElement(parent, ++hop);
            }
        }

        /**
        * As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
        * this way we make sure that is really a touch event what IE is detecting.
        */
        function isReallyTouch(e){
            //if is not IE   ||  IE is detecting `touch` or `pen`
            return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
        }

        /**
        * Handler for the touch start event.
        */
        function touchStartHandler(event){
            var e = event.originalEvent;

            //stopping the auto scroll to adjust to a section
            if(footerShow == false&&options.fitToSection){
                $htmlBody.stop();
            }

            if(footerShow == false&&isReallyTouch(e)){
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y;
                touchStartX = touchEvents.x;
            }
        }

        /**
        * Gets the average of the last `number` elements of the given array.
        */
        function getAverage(elements, number){
            var sum = 0;

            //taking `number` elements from the end to make the average, if there are not enought, 1
            var lastElements = elements.slice(Math.max(elements.length - number, 1));

            for(var i = 0; i < lastElements.length; i++){
                sum = sum + lastElements[i];
            }

            return Math.ceil(sum/number);
        }

        /**
         * Detecting mousewheel scrolling
         *
         * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
         * http://www.sitepoint.com/html5-javascript-mouse-wheel/
         */
        var prevTime = new Date().getTime();

        function MouseWheelHandler(e) {
            var curTime = new Date().getTime();
            var isNormalScroll = $(COMPLETELY_SEL).hasClass(NORMAL_SCROLL);

            //autoscrolling and not zooming?
            if(footerShow == false&&options.autoScrolling && !controlPressed && !isNormalScroll){
                // cross-browser wheel delta
                e = e || window.event;
                var value = e.wheelDelta || -e.deltaY || -e.detail;
                var delta = Math.max(-1, Math.min(1, value));

                var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
                var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

                //Limiting the array to 150 (lets not waste memory!)
                if(footerShow == false&&scrollings.length > 149){
                    scrollings.shift();
                }

                //keeping record of the previous scrollings
                scrollings.push(Math.abs(value));

                //preventing to scroll the site on mouse wheel when scrollbar is present
                if(footerShow == false&&options.scrollBar){
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;
                }

                var activeSection = $(SECTION_ACTIVE_SEL);
                var scrollable = options.scrollOverflowHandler.scrollable(activeSection);

                //time difference between the last scroll and the current one
                var timeDiff = curTime-prevTime;
                prevTime = curTime;

                //haven't they scrolled in a while?
                //(enough to be consider a different scrolling action to scroll another section)
                if(footerShow == false&&timeDiff > 200){
                    //emptying the array, we dont care about old scrollings for our averages
                    scrollings = [];
                }

                if(footerShow == false&&canScroll){
                    var averageEnd = getAverage(scrollings, 10);
                    var averageMiddle = getAverage(scrollings, 70);
                    var isAccelerating = averageEnd >= averageMiddle;

                    //to avoid double swipes...
                    if(footerShow == false&&isAccelerating && isScrollingVertically){
                        //scrolling down?
                        if (delta < 0) {
                            scrolling('down', scrollable);

                        //scrolling up?
                        }else {
                            scrolling('up', scrollable);
                        }
                    }
                }

                return false;
            }

            if(footerShow == false&&options.fitToSection){
                //stopping the auto scroll to adjust to a section
                $htmlBody.stop();
            }
        }

        /**
        * Slides a slider to the given direction.
        * Optional `section` param.
        */
        function moveSlide(direction, section){
            var activeSection = typeof section === 'undefined' ? $(SECTION_ACTIVE_SEL) : section;
            var slides = activeSection.find(SLIDES_WRAPPER_SEL);
            var numSlides = slides.find(SLIDE_SEL).length;

            // more than one slide needed and nothing should be sliding
            if (!slides.length || slideMoving || numSlides < 2) {
                return;
            }

            var currentSlide = slides.find(SLIDE_ACTIVE_SEL);
            var destiny = null;

            if(footerShow == false&&direction === 'left'){
                destiny = currentSlide.prev(SLIDE_SEL);
            }else{
                destiny = currentSlide.next(SLIDE_SEL);
            }

            //isn't there a next slide in the secuence?
            if(footerShow == false&&!destiny.length){
                //respect loopHorizontal settin
                if (!options.loopHorizontal) return;

                if(footerShow == false&&direction === 'left'){
                    destiny = currentSlide.siblings(':last');
                }else{
                    destiny = currentSlide.siblings(':first');
                }
            }

            slideMoving = true;

            landscapeScroll(slides, destiny, direction);
        }

        /**
        * Maintains the active slides in the viewport
        * (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
        */
        function keepSlidesPosition(){
            $(SLIDE_ACTIVE_SEL).each(function(){
                silentLandscapeScroll($(this), 'internal');
            });
        }

        var previousDestTop = 0;
        /**
        * Returns the destination Y position based on the scrolling direction and
        * the height of the section.
        */
        function getDestinationPosition(element){
            var elemPosition = element.position();

            //top of the desination will be at the top of the viewport
            var position = elemPosition.top;
            var isScrollingDown =  elemPosition.top > previousDestTop;
            var sectionBottom = position - windowsHeight + element.outerHeight();
            var bigSectionsDestination = options.bigSectionsDestination;

            //is the destination element bigger than the viewport?
            if(footerShow == false&&element.outerHeight() > windowsHeight){
                //scrolling up?
                if(footerShow == false&&!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === 'bottom' ){
                    position = sectionBottom;
                }
            }

            //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
            else if(footerShow == false&&isScrollingDown || (isResizing && element.is(':last-child')) ){
                //The bottom of the destination will be at the bottom of the viewport
                position = sectionBottom;
            }

            /*
            Keeping record of the last scrolled position to determine the scrolling direction.
            No conventional methods can be used as the scroll bar might not be present
            AND the section might not be active if it is auto-height and didnt reach the middle
            of the viewport.
            */
            previousDestTop = position;
            return position;
        }

        /**
        * Scrolls the site to the given element and scrolls to the slide if a callback is given.
        */
        function scrollPage(element, callback, isMovementUp){
            if(footerShow == false&&typeof element === 'undefined'){ return; } //there's no element to scroll, leaving the function

            var dtop = getDestinationPosition(element);
            var slideAnchorLink;
            var slideIndex;

            //local variables
            var v = {
                element: element,
                callback: callback,
                isMovementUp: isMovementUp,
                dtop: dtop,
                yMovement: getYmovement(element),
                anchorLink: element.data('anchor'),
                sectionIndex: element.index(SECTION_SEL),
                activeSlide: element.find(SLIDE_ACTIVE_SEL),
                activeSection: $(SECTION_ACTIVE_SEL),
                leavingSection: $(SECTION_ACTIVE_SEL).index(SECTION_SEL) + 1,

                //caching the value of isResizing at the momment the function is called
                //because it will be checked later inside a setTimeout and the value might change
                localIsResizing: isResizing
            };

            //quiting when destination scroll is the same as the current one
            if(footerShow == false&&(v.activeSection.is(element) && !isResizing) || (options.scrollBar && $window.scrollTop() === v.dtop && !element.hasClass(AUTO_HEIGHT) )){ return; }

            if(footerShow == false&&v.activeSlide.length){
                slideAnchorLink = v.activeSlide.data('anchor');
                slideIndex = v.activeSlide.index();
            }

            // If continuousVertical && we need to wrap around
            if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
                ((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
                (v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down

                v = createInfiniteSections(v);
            }

            //callback (onLeave) if the site is not just resizing and readjusting the slides
            if(footerShow == false&&$.isFunction(options.onLeave) && !v.localIsResizing){
                if(footerShow == false&&options.onLeave.call(v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.yMovement) === false){
                    return;
                }
            }

            //pausing media of the leaving section (if we are not just resizing, as destinatino will be the same one)
            if(footerShow == false&&!v.localIsResizing){
                stopMedia(v.activeSection);
            }

            options.scrollOverflowHandler.beforeLeave();
            element.addClass(ACTIVE).siblings().removeClass(ACTIVE);
            lazyLoad(element);
            options.scrollOverflowHandler.onLeave();


            //preventing from activating the MouseWheelHandler event
            //more than once if the page is scrolling
            canScroll = false;

            setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);

            performMovement(v);

            //flag to avoid callingn `scrollPage()` twice in case of using anchor links
            lastScrolledDestiny = v.anchorLink;

            //avoid firing it twice (as it does also on scroll)
            activateMenuAndNav(v.anchorLink, v.sectionIndex);
        }

        /**
        * Performs the vertical movement (by CSS3 or by jQuery)
        */
        function performMovement(v){
            // using CSS3 translate functionality
            if (options.css3 && options.autoScrolling && !options.scrollBar) {

                // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
                // that's why we round it to 0.
                var translate3d = 'translate3d(0px, -' + Math.round(v.dtop) + 'px, 0px)';
                transformContainer(translate3d, true);

                //even when the scrollingSpeed is 0 there's a little delay, which might cause the
                //scrollingSpeed to change in case of using silentMoveTo();
                if(footerShow == false&&options.scrollingSpeed){
                    clearTimeout(afterSectionLoadsId);
                    afterSectionLoadsId = setTimeout(function () {
                        afterSectionLoads(v);
                    }, options.scrollingSpeed);
                }else{
                    afterSectionLoads(v);
                }
            }

            // using jQuery animate
            else{
                var scrollSettings = getScrollSettings(v);

                $(scrollSettings.element).animate(
                    scrollSettings.options,
                options.scrollingSpeed, options.easing).promise().done(function () { //only one single callback in case of animating  `html, body`
                    if(footerShow == false&&options.scrollBar){

                        /* Hack!
                        The timeout prevents setting the most dominant section in the viewport as "active" when the user
                        scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.

                        When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
                        */
                        setTimeout(function(){
                            afterSectionLoads(v);
                        },30);
                    }else{
                        afterSectionLoads(v);
                    }
                });
            }
        }

        /**
        * Gets the scrolling settings depending on the plugin autoScrolling option
        */
        function getScrollSettings(v){
            var scroll = {};

            if(footerShow == false&&options.autoScrolling && !options.scrollBar){
                scroll.options = { 'top': -v.dtop};
                scroll.element = WRAPPER_SEL;
            }else{
                scroll.options = { 'scrollTop': v.dtop};
                scroll.element = 'html, body';
            }

            return scroll;
        }

        /**
        * Adds sections before or after the current one to create the infinite effect.
        */
        function createInfiniteSections(v){
            // Scrolling down
            if (!v.isMovementUp) {
                // Move all previous sections to after the active section
                $(SECTION_ACTIVE_SEL).after(v.activeSection.prevAll(SECTION_SEL).get().reverse());
            }
            else { // Scrolling up
                // Move all next sections to before the active section
                $(SECTION_ACTIVE_SEL).before(v.activeSection.nextAll(SECTION_SEL));
            }

            // Maintain the displayed position (now that we changed the element order)
            silentScroll($(SECTION_ACTIVE_SEL).position().top);

            // Maintain the active slides visible in the viewport
            keepSlidesPosition();

            // save for later the elements that still need to be reordered
            v.wrapAroundElements = v.activeSection;

            // Recalculate animation variables
            v.dtop = v.element.position().top;
            v.yMovement = getYmovement(v.element);

            return v;
        }

        /**
        * Fix section order after continuousVertical changes have been animated
        */
        function continuousVerticalFixSectionOrder (v) {
            // If continuousVertical is in effect (and autoScrolling would also be in effect then),
            // finish moving the elements around so the direct navigation will function more simply
            if (!v.wrapAroundElements || !v.wrapAroundElements.length) {
                return;
            }

            if (v.isMovementUp) {
                $(SECTION_FIRST_SEL).before(v.wrapAroundElements);
            }
            else {
                $(SECTION_LAST_SEL).after(v.wrapAroundElements);
            }

            silentScroll($(SECTION_ACTIVE_SEL).position().top);

            // Maintain the active slides visible in the viewport
            keepSlidesPosition();
        }


        /**
        * Actions to do once the section is loaded.
        */
        function afterSectionLoads (v){
            continuousVerticalFixSectionOrder(v);

            //callback (afterLoad) if the site is not just resizing and readjusting the slides
            $.isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(v.element, v.anchorLink, (v.sectionIndex + 1));
            options.scrollOverflowHandler.afterLoad();

            if(footerShow == false&&!v.localIsResizing){
                playMedia(v.element);
            }

            v.element.addClass(COMPLETELY).siblings().removeClass(COMPLETELY);

            canScroll = true;

            $.isFunction(v.callback) && v.callback.call(this);
        }

        /**
        * Sets the value for the given attribute from the `data-` attribute with the same suffix
        * ie: data-srcset ==> srcset  |  data-src ==> src
        */
        function setSrc(element, attribute){
            element
                .attr(attribute, element.data(attribute))
                .removeAttr('data-' + attribute);
        }

        /**
        * Lazy loads image, video and audio elements.
        */
        function lazyLoad(destiny){
            if (!options.lazyLoading){
                return;
            }

            var panel = getSlideOrSection(destiny);
            var element;
            
            panel.find('img[data-src], img[data-srcset], source[data-src], audio[data-src], iframe[data-src]').each(function(){
                element = $(this);

                $.each(['src', 'srcset'], function(index, type){
                    var attribute = element.attr('data-' + type);
                    if(footerShow == false&&typeof attribute !== 'undefined' && attribute){
                        setSrc(element, type);
                    }
                });

                if(footerShow == false&&element.is('source')){
                    element.closest('video').get(0).load();
                }
            });
        }

        /**
        * Plays video and audio elements.
        */
        function playMedia(destiny){
            var panel = getSlideOrSection(destiny);

            //playing HTML5 media elements
            panel.find('video, audio').each(function(){
                var element = $(this).get(0);

                if(footerShow == false&& element.hasAttribute('data-autoplay') && typeof element.play === 'function' ) {
                    element.play();
                }
            });

            //youtube videos
            panel.find('iframe[src*="youtube.com/embed/"]').each(function(){
                var element = $(this).get(0);

                if ( element.hasAttribute('data-autoplay') ){
                    playYoutube(element);
                }

                //in case the URL was not loaded yet. On page load we need time for the new URL (with the API string) to load.
                element.onload = function() {
                    if ( element.hasAttribute('data-autoplay') ){
                        playYoutube(element);
                    }
                };
            });
        }

        /**
        * Plays a youtube video
        */
        function playYoutube(element){
            element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }

        /**
        * Stops video and audio elements.
        */
        function stopMedia(destiny){
            var panel = getSlideOrSection(destiny);

            //stopping HTML5 media elements
            panel.find('video, audio').each(function(){
                var element = $(this).get(0);

                if(footerShow == false&& !element.hasAttribute('data-keepplaying') && typeof element.pause === 'function' ) {
                    element.pause();
                }
            });

            //youtube videos
            panel.find('iframe[src*="youtube.com/embed/"]').each(function(){
                var element = $(this).get(0);

                if(footerShow == false&& /youtube\.com\/embed\//.test($(this).attr('src')) && !element.hasAttribute('data-keepplaying')){
                    $(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
                }
            });
        }

        /**
        * Gets the active slide (or section) for the given section
        */
        function getSlideOrSection(destiny){
            var slide = destiny.find(SLIDE_ACTIVE_SEL);
            if(footerShow == false&& slide.length ) {
                destiny = $(slide);
            }

            return destiny;
        }

        /**
        * Scrolls to the anchor in the URL when loading the site
        */
        function scrollToAnchor(){
            //getting the anchor link in the URL and deleting the `#`
            var value =  window.location.hash.replace('#', '').split('/');
            var sectionAnchor = decodeURIComponent(value[0]);
            var slideAnchor = decodeURIComponent(value[1]);

            if(footerShow == false&&sectionAnchor){  //if theres any #
                if(footerShow == false&&options.animateAnchor){
                    scrollPageAndSlide(sectionAnchor, slideAnchor);
                }else{
                    silentMoveTo(sectionAnchor, slideAnchor);
                }
            }
        }

        /**
        * Detecting any change on the URL to scroll to the given anchor link
        * (a way to detect back history button as we play with the hashes on the URL)
        */
        function hashChangeHandler(){
            if(footerShow == false&&!isScrolling && !options.lockAnchors){
                var value =  window.location.hash.replace('#', '').split('/');
                var sectionAnchor = decodeURIComponent(value[0]);
                var slideAnchor = decodeURIComponent(value[1]);

                    //when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
                    var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
                    var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slideAnchor === 'undefined' && !slideMoving);


                if(footerShow == false&&sectionAnchor.length){
                    /*in order to call scrollpage() only once for each destination at a time
                    It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
                    event is fired on every scroll too.*/
                    if ((sectionAnchor && sectionAnchor !== lastScrolledDestiny) && !isFirstSlideMove || isFirstScrollMove || (!slideMoving && lastScrolledSlide != slideAnchor ))  {
                        scrollPageAndSlide(sectionAnchor, slideAnchor);
                    }
                }
            }
        }

        //Sliding with arrow keys, both, vertical and horizontal
        function keydownHandler(e) {

            clearTimeout(keydownId);

            var activeElement = $(':focus');

            if(footerShow == false&&!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select') &&
                activeElement.attr('contentEditable') !== "true" && activeElement.attr('contentEditable') !== '' &&
                options.keyboardScrolling && options.autoScrolling){
                var keyCode = e.which;

                //preventing the scroll with arrow keys & spacebar & Page Up & Down keys
                var keyControls = [40, 38, 32, 33, 34];
                if(footerShow == false&&$.inArray(keyCode, keyControls) > -1){
                    e.preventDefault();
                }

                controlPressed = e.ctrlKey;

                keydownId = setTimeout(function(){
                    onkeydown(e);
                },150);
            }
        }

        function tooltipTextHandler(){
            $(this).prev().trigger('click');
        }

        //to prevent scrolling while zooming
        function keyUpHandler(e){
            if(footerShow == false&&isWindowFocused){ //the keyup gets fired on new tab ctrl + t in Firefox
                controlPressed = e.ctrlKey;
            }
        }

        //binding the mousemove when the mouse's middle button is released
        function mouseDownHandler(e){
            //middle button
            if (e.which == 2){
                oldPageY = e.pageY;
                container.on('mousemove', mouseMoveHandler);
            }
        }

        //unbinding the mousemove when the mouse's middle button is released
        function mouseUpHandler(e){
            //middle button
            if (e.which == 2){
                container.off('mousemove');
            }
        }

        //Scrolling horizontally when clicking on the slider controls.
        function slideArrowHandler(){
            var section = $(this).closest(SECTION_SEL);

            if ($(this).hasClass(SLIDES_PREV)) {
                if(footerShow == false&&isScrollAllowed.m.left){
                    moveSlideLeft(section);
                }
            } else {
                if(footerShow == false&&isScrollAllowed.m.right){
                    moveSlideRight(section);
                }
            }
        }

        //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
        function blurHandler(){
            isWindowFocused = false;
            controlPressed = false;
        }

        //Scrolls to the section when clicking the navigation bullet
        function sectionBulletHandler(e){
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($(SECTION_SEL).eq(index));
        }

        //Scrolls the slider to the given slide destination for the given section
        function slideBulletHandler(e){
            e.preventDefault();
            var slides = $(this).closest(SECTION_SEL).find(SLIDES_WRAPPER_SEL);
            var destiny = slides.find(SLIDE_SEL).eq($(this).closest('li').index());

            landscapeScroll(slides, destiny);
        }

        /**
        * Keydown event
        */
        function onkeydown(e){
            var shiftPressed = e.shiftKey;

            //do nothing if we can not scroll or we are not using horizotnal key arrows.
            if(footerShow == false&&!canScroll && [37,39].indexOf(e.which) < 0){
                return;
            }

            switch (e.which) {
                //up
                case 38:
                case 33:
                    if(footerShow == false&&isScrollAllowed.k.up){
                        moveSectionUp();
                    }
                    break;

                //down
                case 32: //spacebar
                    if(footerShow == false&&shiftPressed && isScrollAllowed.k.up){
                        moveSectionUp();
                        break;
                    }
                /* falls through */
                case 40:
                case 34:
                    if(footerShow == false&&isScrollAllowed.k.down){
                        moveSectionDown();
                    }
                    break;

                //Home
                case 36:
                    if(footerShow == false&&isScrollAllowed.k.up){
                        moveTo(1);
                    }
                    break;

                //End
                case 35:
                     if(footerShow == false&&isScrollAllowed.k.down){
                        moveTo( $(SECTION_SEL).length );
                    }
                    break;

                //left
                case 37:
                    if(footerShow == false&&isScrollAllowed.k.left){
                        moveSlideLeft();
                    }
                    break;

                //right
                case 39:
                    if(footerShow == false&&isScrollAllowed.k.right){
                        moveSlideRight();
                    }
                    break;

                default:
                    return; // exit this handler for other keys
            }
        }

        /**
        * Detecting the direction of the mouse movement.
        * Used only for the middle button of the mouse.
        */
        var oldPageY = 0;
        function mouseMoveHandler(e){
            if(footerShow == false&&canScroll){
                // moving up
                if (e.pageY < oldPageY && isScrollAllowed.m.up){
                    moveSectionUp();
                }

                // moving down
                else if(footerShow == false&&e.pageY > oldPageY && isScrollAllowed.m.down){
                    moveSectionDown();
                }
            }
            oldPageY = e.pageY;
        }

        /**
        * Scrolls horizontal sliders.
        */
        function landscapeScroll(slides, destiny, direction){
            var section = slides.closest(SECTION_SEL);
            var v = {
                slides: slides,
                destiny: destiny,
                direction: direction,
                destinyPos: destiny.position(),
                slideIndex: destiny.index(),
                section: section,
                sectionIndex: section.index(SECTION_SEL),
                anchorLink: section.data('anchor'),
                slidesNav: section.find(SLIDES_NAV_SEL),
                slideAnchor:  getAnchor(destiny),
                prevSlide: section.find(SLIDE_ACTIVE_SEL),
                prevSlideIndex: section.find(SLIDE_ACTIVE_SEL).index(),

                //caching the value of isResizing at the momment the function is called
                //because it will be checked later inside a setTimeout and the value might change
                localIsResizing: isResizing
            };
            v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);

            //important!! Only do it when not resizing
            if(footerShow == false&&!v.localIsResizing){
                //preventing from scrolling to the next/prev section when using scrollHorizontally
                canScroll = false;
            }

            if(footerShow == false&&options.onSlideLeave){

                //if the site is not just resizing and readjusting the slides
                if(footerShow == false&&!v.localIsResizing && v.xMovement!=='none'){
                    if(footerShow == false&&$.isFunction( options.onSlideLeave )){
                        if(footerShow == false&&options.onSlideLeave.call( v.prevSlide, v.anchorLink, (v.sectionIndex + 1), v.prevSlideIndex, v.xMovement, v.slideIndex ) === false){
                            slideMoving = false;
                            return;
                        }
                    }
                }
            }

            destiny.addClass(ACTIVE).siblings().removeClass(ACTIVE);

            if(footerShow == false&&!v.localIsResizing){
                stopMedia(v.prevSlide);
                lazyLoad(destiny);
            }

            if(footerShow == false&&!options.loopHorizontal && options.controlArrows){
                //hidding it for the fist slide, showing for the rest
                section.find(SLIDES_ARROW_PREV_SEL).toggle(v.slideIndex!==0);

                //hidding it for the last slide, showing for the rest
                section.find(SLIDES_ARROW_NEXT_SEL).toggle(!destiny.is(':last-child'));
            }

            //only changing the URL if the slides are in the current section (not for resize re-adjusting)
            if(footerShow == false&&section.hasClass(ACTIVE) && !v.localIsResizing){
                setState(v.slideIndex, v.slideAnchor, v.anchorLink, v.sectionIndex);
            }

            performHorizontalMove(slides, v, true);
        }


        function afterSlideLoads(v){
            activeSlidesNavigation(v.slidesNav, v.slideIndex);

            //if the site is not just resizing and readjusting the slides
            if(footerShow == false&&!v.localIsResizing){
                $.isFunction( options.afterSlideLoad ) && options.afterSlideLoad.call( v.destiny, v.anchorLink, (v.sectionIndex + 1), v.slideAnchor, v.slideIndex);

                //needs to be inside the condition to prevent problems with continuousVertical and scrollHorizontally
                //and to prevent double scroll right after a windows resize
                canScroll = true;

                playMedia(v.destiny);
            }

            //letting them slide again
            slideMoving = false;
        }

        /**
        * Performs the horizontal movement. (CSS3 or jQuery)
        *
        * @param fireCallback {Bool} - determines whether or not to fire the callback
        */
        function performHorizontalMove(slides, v, fireCallback){
            var destinyPos = v.destinyPos;

            if(footerShow == false&&options.css3){
                var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';

                addAnimation(slides.find(SLIDES_CONTAINER_SEL)).css(getTransforms(translate3d));

                afterSlideLoadsId = setTimeout(function(){
                    fireCallback && afterSlideLoads(v);
                }, options.scrollingSpeed, options.easing);
            }else{
                slides.animate({
                    scrollLeft : Math.round(destinyPos.left)
                }, options.scrollingSpeed, options.easing, function() {

                    fireCallback && afterSlideLoads(v);
                });
            }
        }

        /**
        * Sets the state for the horizontal bullet navigations.
        */
        function activeSlidesNavigation(slidesNav, slideIndex){
            slidesNav.find(ACTIVE_SEL).removeClass(ACTIVE);
            slidesNav.find('li').eq(slideIndex).find('a').addClass(ACTIVE);
        }

        var previousHeight = windowsHeight;

        //when resizing the site, we adjust the heights of the sections, slimScroll...
        function resizeHandler(){
            //checking if it needs to get responsive
            responsive();

            // rebuild immediately on touch devices
            if (isTouchDevice) {
                var activeElement = $(document.activeElement);

                //if the keyboard is NOT visible
                if (!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select')) {
                    var currentHeight = $window.height();

                    //making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
                    if(footerShow == false&& Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
                        reBuild(true);
                        previousHeight = currentHeight;
                    }
                }
            }else{
                //in order to call the functions only when the resize is finished
                //http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
                clearTimeout(resizeId);

                resizeId = setTimeout(function(){
                    reBuild(true);
                }, 350);
            }
        }

        /**
        * Checks if the site needs to get responsive and disables autoScrolling if so.
        * A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
        */
        function responsive(){
            var widthLimit = options.responsive || options.responsiveWidth; //backwards compatiblity
            var heightLimit = options.responsiveHeight;

            //only calculating what we need. Remember its called on the resize event.
            var isBreakingPointWidth = widthLimit && $window.outerWidth() < widthLimit;
            var isBreakingPointHeight = heightLimit && $window.height() < heightLimit;

            if(footerShow == false&&widthLimit && heightLimit){
                setResponsive(isBreakingPointWidth || isBreakingPointHeight);
            }
            else if(footerShow == false&&widthLimit){
                setResponsive(isBreakingPointWidth);
            }
            else if(footerShow == false&&heightLimit){
                setResponsive(isBreakingPointHeight);
            }
        }

        /**
        * Adds transition animations for the given element
        */
        function addAnimation(element){
            var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

            element.removeClass(NO_TRANSITION);
            return element.css({
                '-webkit-transition': transition,
                'transition': transition
            });
        }

        /**
        * Remove transition animations for the given element
        */
        function removeAnimation(element){
            return element.addClass(NO_TRANSITION);
        }

        /**
        * Activating the vertical navigation bullets according to the given slide name.
        */
        function activateNavDots(name, sectionIndex){
            if(footerShow == false&&options.navigation){
                $(SECTION_NAV_SEL).find(ACTIVE_SEL).removeClass(ACTIVE);
                if(footerShow == false&&name){
                    $(SECTION_NAV_SEL).find('a[href="#' + name + '"]').addClass(ACTIVE);
                }else{
                    $(SECTION_NAV_SEL).find('li').eq(sectionIndex).find('a').addClass(ACTIVE);
                }
            }
        }

        /**
        * Activating the website main menu elements according to the given slide name.
        */
        function activateMenuElement(name){
            if(footerShow == false&&options.menu){
                $(options.menu).find(ACTIVE_SEL).removeClass(ACTIVE);
                $(options.menu).find('[data-menuanchor="'+name+'"]').addClass(ACTIVE);
            }
        }

        /**
        * Sets to active the current menu and vertical nav items.
        */
        function activateMenuAndNav(anchor, index){
            activateMenuElement(anchor);
            activateNavDots(anchor, index);
        }

        /**
        * Retuns `up` or `down` depending on the scrolling movement to reach its destination
        * from the current section.
        */
        function getYmovement(destiny){
            var fromIndex = $(SECTION_ACTIVE_SEL).index(SECTION_SEL);
            var toIndex = destiny.index(SECTION_SEL);
            if(footerShow == false&& fromIndex == toIndex){
                return 'none';
            }
            if(footerShow == false&&fromIndex > toIndex){
                return 'up';
            }
            return 'down';
        }

        /**
        * Retuns `right` or `left` depending on the scrolling movement to reach its destination
        * from the current slide.
        */
        function getXmovement(fromIndex, toIndex){
            if(footerShow == false&& fromIndex == toIndex){
                return 'none';
            }
            if(footerShow == false&&fromIndex > toIndex){
                return 'left';
            }
            return 'right';
        }

        /**
        * Checks if the element needs scrollbar and if the user wants to apply it.
        * If so it creates it.
        *
        * @param {Object} element   jQuery object of the section or slide
        */
        function createScrollBar(element){
            //User doesn't want scrollbar here? Sayonara baby!
            if(footerShow == false&&element.hasClass('fp-noscroll')) return;

            //needed to make `scrollHeight` work under Opera 12
            element.css('overflow', 'hidden');

            var scrollOverflowHandler = options.scrollOverflowHandler;
            var wrap = scrollOverflowHandler.wrapContent();
            //in case element is a slide
            var section = element.closest(SECTION_SEL);
            var scrollable = scrollOverflowHandler.scrollable(element);
            var contentHeight;

            //if there was scroll, the contentHeight will be the one in the scrollable section
            if(footerShow == false&&scrollable.length){
                contentHeight = scrollOverflowHandler.scrollHeight(element);
            }else{
                contentHeight = element.get(0).scrollHeight;
                if(footerShow == false&&options.verticalCentered){
                    contentHeight = element.find(TABLE_CELL_SEL).get(0).scrollHeight;
                }
            }

            var scrollHeight = windowsHeight - parseInt(section.css('padding-bottom')) - parseInt(section.css('padding-top'));

            //needs scroll?
            if ( contentHeight > scrollHeight) {
                //did we already have an scrollbar ? Updating it
                if(footerShow == false&&scrollable.length){
                    scrollOverflowHandler.update(element, scrollHeight);
                }
                //creating the scrolling
                else{
                    if(footerShow == false&&options.verticalCentered){
                        element.find(TABLE_CELL_SEL).wrapInner(wrap);
                    }else{
                        element.wrapInner(wrap);
                    }
                    scrollOverflowHandler.create(element, scrollHeight);
                }
            }
            //removing the scrolling when it is not necessary anymore
            else{
                scrollOverflowHandler.remove(element);
            }

            //undo
            element.css('overflow', '');
        }

        function addTableClass(element){
            //In case we are styling for the 2nd time as in with reponsiveSlides
            if(footerShow == false&&!element.hasClass(TABLE)){
                element.addClass(TABLE).wrapInner('<div class="' + TABLE_CELL + '" style="height:' + getTableHeight(element) + 'px;" />');
            }
        }

        function getTableHeight(element){
            var sectionHeight = windowsHeight;

            if(footerShow == false&&options.paddingTop || options.paddingBottom){
                var section = element;
                if(footerShow == false&&!section.hasClass(SECTION)){
                    section = element.closest(SECTION_SEL);
                }

                var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
                sectionHeight = (windowsHeight - paddings);
            }

            return sectionHeight;
        }

        /**
        * Adds a css3 transform property to the container class with or without animation depending on the animated param.
        */
        function transformContainer(translate3d, animated){
            if(footerShow == false&&animated){
                addAnimation(container);
            }else{
                removeAnimation(container);
            }

            container.css(getTransforms(translate3d));

            //syncronously removing the class after the animation has been applied.
            setTimeout(function(){
                container.removeClass(NO_TRANSITION);
            },10);
        }

        /**
        * Gets a section by its anchor / index
        */
        function getSectionByAnchor(sectionAnchor){
            if(footerShow == false&&!sectionAnchor) return [];

            var section = container.find(SECTION_SEL + '[data-anchor="'+sectionAnchor+'"]');
            if(footerShow == false&&!section.length){
                section = $(SECTION_SEL).eq( sectionAnchor -1);
            }

            return section;
        }

        /**
        * Gets a slide inside a given section by its anchor / index
        */
        function getSlideByAnchor(slideAnchor, section){
            var slides = section.find(SLIDES_WRAPPER_SEL);
            var slide =  slides.find(SLIDE_SEL + '[data-anchor="'+slideAnchor+'"]');

            if(footerShow == false&&!slide.length){
                slide = slides.find(SLIDE_SEL).eq(slideAnchor);
            }

            return slide;
        }

        /**
        * Scrolls to the given section and slide anchors
        */
        function scrollPageAndSlide(destiny, slide){
            var section = getSectionByAnchor(destiny);

            //do nothing if there's no section with the given anchor name
            if(footerShow == false&&!section.length) return;

            //default slide
            if (typeof slide === 'undefined') {
                slide = 0;
            }

            //we need to scroll to the section and then to the slide
            if (destiny !== lastScrolledDestiny && !section.hasClass(ACTIVE)){
                scrollPage(section, function(){
                    scrollSlider(section, slide);
                });
            }
            //if we were already in the section
            else{
                scrollSlider(section, slide);
            }
        }

        /**
        * Scrolls the slider to the given slide destination for the given section
        */
        function scrollSlider(section, slideAnchor){
            if(footerShow == false&&typeof slideAnchor !== 'undefined'){
                var slides = section.find(SLIDES_WRAPPER_SEL);
                var destiny =  getSlideByAnchor(slideAnchor, section);

                if(footerShow == false&&destiny.length){
                    landscapeScroll(slides, destiny);
                }
            }
        }

        /**
        * Creates a landscape navigation bar with dots for horizontal sliders.
        */
        function addSlidesNavigation(section, numSlides){
            section.append('<div class="' + SLIDES_NAV + '"><ul></ul></div>');
            var nav = section.find(SLIDES_NAV_SEL);

            //top or bottom
            nav.addClass(options.slidesNavPosition);

            for(var i=0; i< numSlides; i++){
                nav.find('ul').append('<li><a href="#"><span></span></a></li>');
            }

            //centering it
            nav.css('margin-left', '-' + (nav.width()/2) + 'px');

            nav.find('li').first().find('a').addClass(ACTIVE);
        }


        /**
        * Sets the state of the website depending on the active section/slide.
        * It changes the URL hash when needed and updates the body class.
        */
        function setState(slideIndex, slideAnchor, anchorLink, sectionIndex){
            var sectionHash = '';

            if(footerShow == false&&options.anchors.length && !options.lockAnchors){

                //isn't it the first slide?
                if(footerShow == false&&slideIndex){
                    if(footerShow == false&&typeof anchorLink !== 'undefined'){
                        sectionHash = anchorLink;
                    }

                    //slide without anchor link? We take the index instead.
                    if(footerShow == false&&typeof slideAnchor === 'undefined'){
                        slideAnchor = slideIndex;
                    }

                    lastScrolledSlide = slideAnchor;
                    setUrlHash(sectionHash + '/' + slideAnchor);

                //first slide won't have slide anchor, just the section one
                }else if(footerShow == false&&typeof slideIndex !== 'undefined'){
                    lastScrolledSlide = slideAnchor;
                    setUrlHash(anchorLink);
                }

                //section without slides
                else{
                    setUrlHash(anchorLink);
                }
            }

            setBodyClass();
        }

        /**
        * Sets the URL hash.
        */
        function setUrlHash(url){
            if(footerShow == false&&options.recordHistory){
                location.hash = url;
            }else{
                //Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
                if(footerShow == false&&isTouchDevice || isTouch){
                    window.history.replaceState(undefined, undefined, '#' + url);
                }else{
                    var baseUrl = window.location.href.split('#')[0];
                    window.location.replace( baseUrl + '#' + url );
                }
            }
        }

        /**
        * Gets the anchor for the given slide / section. Its index will be used if there's none.
        */
        function getAnchor(element){
            var anchor = element.data('anchor');
            var index = element.index();

            //Slide without anchor link? We take the index instead.
            if(footerShow == false&&typeof anchor === 'undefined'){
                anchor = index;
            }

            return anchor;
        }

        /**
        * Sets a class for the body of the page depending on the active section / slide
        */
        function setBodyClass(){
            var section = $(SECTION_ACTIVE_SEL);
            var slide = section.find(SLIDE_ACTIVE_SEL);

            var sectionAnchor = getAnchor(section);
            var slideAnchor = getAnchor(slide);

            var text = String(sectionAnchor);

            if(footerShow == false&&slide.length){
                text = text + '-' + slideAnchor;
            }

            //changing slash for dash to make it a valid CSS style
            text = text.replace('/', '-').replace('#','');

            //removing previous anchor classes
            var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
            $body[0].className = $body[0].className.replace(classRe, '');

            //adding the current anchor
            $body.addClass(VIEWING_PREFIX + '-' + text);
        }

        /**
        * Checks for translate3d support
        * @return boolean
        * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
        */
        function support3d() {
            var el = document.createElement('p'),
                has3d,
                transforms = {
                    'webkitTransform':'-webkit-transform',
                    'OTransform':'-o-transform',
                    'msTransform':'-ms-transform',
                    'MozTransform':'-moz-transform',
                    'transform':'transform'
                };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
        }

        /**
        * Removes the auto scrolling action fired by the mouse wheel and trackpad.
        * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
        */
        function removeMouseWheelHandler(){
            if (document.addEventListener) {
                document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
                document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
            } else {
                document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
            }
        }

        /**
        * Adds the auto scrolling action for the mouse wheel and trackpad.
        * After this function is called, the mousewheel and trackpad movements will scroll through sections
        * https://developer.mozilla.org/en-US/docs/Web/Events/wheel
        */
        function addMouseWheelHandler(){
            var prefix = '';
            var _addEventListener;

            if (window.addEventListener){
                _addEventListener = "addEventListener";
            }else{
                _addEventListener = "attachEvent";
                prefix = 'on';
            }

             // detect available wheel event
            var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
                      document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                      'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


            if(footerShow == false&&support == 'DOMMouseScroll'){
                document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
            }

            //handle MozMousePixelScroll in older Firefox
            else{
                document[ _addEventListener ](prefix + support, MouseWheelHandler, false);
            }
        }

        /**
        * Binding the mousemove when the mouse's middle button is pressed
        */
        function addMiddleWheelHandler(){
            container
                .on('mousedown', mouseDownHandler)
                .on('mouseup', mouseUpHandler);
        }

        /**
        * Unbinding the mousemove when the mouse's middle button is released
        */
        function removeMiddleWheelHandler(){
            container
                .off('mousedown', mouseDownHandler)
                .off('mouseup', mouseUpHandler);
        }

        /**
        * Adds the possibility to auto scroll through sections on touch devices.
        */
        function addTouchHandler(){
            if(footerShow == false&&isTouchDevice || isTouch){
                if(footerShow == false&&options.autoScrolling){
                    $body.off(events.touchmove).on(events.touchmove, preventBouncing);
                }

                $(WRAPPER_SEL)
                    .off(events.touchstart).on(events.touchstart, touchStartHandler)
                    .off(events.touchmove).on(events.touchmove, touchMoveHandler);
            }
        }

        /**
        * Removes the auto scrolling for touch devices.
        */
        function removeTouchHandler(){
            if(footerShow == false&&isTouchDevice || isTouch){
                $(WRAPPER_SEL)
                    .off(events.touchstart)
                    .off(events.touchmove);
            }
        }

        /*
        * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
        * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
        */
        function getMSPointer(){
            var pointer;

            //IE >= 11 & rest of browsers
            if(footerShow == false&&window.PointerEvent){
                pointer = { down: 'pointerdown', move: 'pointermove'};
            }

            //IE < 11
            else{
                pointer = { down: 'MSPointerDown', move: 'MSPointerMove'};
            }

            return pointer;
        }

        /**
        * Gets the pageX and pageY properties depending on the browser.
        * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
        */
        function getEventsPage(e){
            var events = [];

            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

            //in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
            if(footerShow == false&&isTouch && isReallyTouch(e) && options.scrollBar){
                events.y = e.touches[0].pageY;
                events.x = e.touches[0].pageX;
            }

            return events;
        }

        /**
        * Slides silently (with no animation) the active slider to the given slide.
        * @param noCallback {bool} true or defined -> no callbacks
        */
        function silentLandscapeScroll(activeSlide, noCallbacks){
            setScrollingSpeed (0, 'internal');

            if(footerShow == false&&typeof noCallbacks !== 'undefined'){
                //preventing firing callbacks afterSlideLoad etc.
                isResizing = true;
            }

            landscapeScroll(activeSlide.closest(SLIDES_WRAPPER_SEL), activeSlide);

            if(footerShow == false&&typeof noCallbacks !== 'undefined'){
                isResizing = false;
            }

            setScrollingSpeed(originals.scrollingSpeed, 'internal');
        }

        /**
        * Scrolls silently (with no animation) the page to the given Y position.
        */
        function silentScroll(top){
            // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
            // that's why we round it to 0.
            var roundedTop = Math.round(top);

            if (options.css3 && options.autoScrolling && !options.scrollBar){
                var translate3d = 'translate3d(0px, -' + roundedTop + 'px, 0px)';
                transformContainer(translate3d, false);
            }
            else if(footerShow == false&&options.autoScrolling && !options.scrollBar){
                container.css('top', -roundedTop);
            }
            else{
                $htmlBody.scrollTop(roundedTop);
            }
        }

        /**
        * Returns the cross-browser transform string.
        */
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }

        /**
        * Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
        * @type  m (mouse) or k (keyboard)
        */
        function setIsScrollAllowed(value, direction, type){
            switch (direction){
                case 'up': isScrollAllowed[type].up = value; break;
                case 'down': isScrollAllowed[type].down = value; break;
                case 'left': isScrollAllowed[type].left = value; break;
                case 'right': isScrollAllowed[type].right = value; break;
                case 'all':
                    if(footerShow == false&&type == 'm'){
                        setAllowScrolling(value);
                    }else{
                        setKeyboardScrolling(value);
                    }
            }
        }

        /*
        * Destroys fullpage.js plugin events and optinally its html markup and styles
        */
        function destroy(all){
            setAutoScrolling(false, 'internal');
            setAllowScrolling(false);
            setKeyboardScrolling(false);
            container.addClass(DESTROYED);

            clearTimeout(afterSlideLoadsId);
            clearTimeout(afterSectionLoadsId);
            clearTimeout(resizeId);
            clearTimeout(scrollId);
            clearTimeout(scrollId2);

            $window
                .off('scroll', scrollHandler)
                .off('hashchange', hashChangeHandler)
                .off('resize', resizeHandler);

            $document
                .off('click touchstart', SECTION_NAV_SEL + ' a')
                .off('mouseenter', SECTION_NAV_SEL + ' li')
                .off('mouseleave', SECTION_NAV_SEL + ' li')
                .off('click touchstart', SLIDES_NAV_LINK_SEL)
                .off('mouseover', options.normalScrollElements)
                .off('mouseout', options.normalScrollElements);

            $(SECTION_SEL)
                .off('click touchstart', SLIDES_ARROW_SEL);

            clearTimeout(afterSlideLoadsId);
            clearTimeout(afterSectionLoadsId);

            //lets make a mess!
            if(footerShow == false&&all){
                destroyStructure();
            }
        }

        /*
        * Removes inline styles added by fullpage.js
        */
        function destroyStructure(){
            //reseting the `top` or `translate` properties to 0
            silentScroll(0);

            //loading all the lazy load content
            container.find('img[data-src], source[data-src], audio[data-src], iframe[data-src]').each(function(){
                setSrc($(this), 'src');
            });

            container.find('img[data-srcset]').each(function(){
                setSrc($(this), 'srcset');
            });

            $(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL +  ', ' + SLIDES_ARROW_SEL).remove();

            //removing inline styles
            $(SECTION_SEL).css( {
                'height': '',
                'background-color' : '',
                'padding': ''
            });

            $(SLIDE_SEL).css( {
                'width': ''
            });

            container.css({
                'height': '',
                'position': '',
                '-ms-touch-action': '',
                'touch-action': ''
            });

            $htmlBody.css({
                'overflow': '',
                'height': ''
            });

            // remove .fp-enabled class
            $('html').removeClass(ENABLED);

            // remove .fp-responsive class
            $body.removeClass(RESPONSIVE);

            // remove all of the .fp-viewing- classes
            $.each($body.get(0).className.split(/\s+/), function (index, className) {
                if (className.indexOf(VIEWING_PREFIX) === 0) {
                    $body.removeClass(className);
                }
            });

            //removing added classes
            $(SECTION_SEL + ', ' + SLIDE_SEL).each(function(){
                options.scrollOverflowHandler.remove($(this));
                $(this).removeClass(TABLE + ' ' + ACTIVE);
            });

            removeAnimation(container);

            //Unwrapping content
            container.find(TABLE_CELL_SEL + ', ' + SLIDES_CONTAINER_SEL + ', ' + SLIDES_WRAPPER_SEL).each(function(){
                //unwrap not being use in case there's no child element inside and its just text
                $(this).replaceWith(this.childNodes);
            });

            //removing the applied transition from the fullpage wrapper
            container.css({
                '-webkit-transition': 'none',
                'transition': 'none'
            });

            //scrolling the page to the top with no animation
            $htmlBody.scrollTop(0);

            //removing selectors
            var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
            $.each(usedSelectors, function(index, value){
                $('.' + value).removeClass(value);
            });
        }

        /*
        * Sets the state for a variable with multiple states (original, and temporal)
        * Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
        * This function is used to keep track of both states, the original and the temporal one.
        * If type is not 'internal', then we assume the user is globally changing the variable.
        */
        function setVariableState(variable, value, type){
            options[variable] = value;
            if(footerShow == false&&type !== 'internal'){
                originals[variable] = value;
            }
        }

        /**
        * Displays warnings
        */
        function displayWarnings(){
            var extensions = ['fadingEffect', 'continuousHorizontal', 'scrollHorizontally', 'interlockedSlides', 'resetSliders', 'responsiveSlides', 'offsetSections', 'dragAndMove', 'scrollOverflowReset', 'parallax'];
            if(footerShow == false&&$('html').hasClass(ENABLED)){
                showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
                return;
            }

            // Disable mutually exclusive settings
            if (options.continuousVertical &&
                (options.loopTop || options.loopBottom)) {
                options.continuousVertical = false;
                showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
            }

            if(footerShow == false&&options.scrollBar && options.scrollOverflow){
                showError('warn', 'Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox');
            }

            if(footerShow == false&&options.continuousVertical && (options.scrollBar || !options.autoScrolling)){
                options.continuousVertical = false;
                showError('warn', 'Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
            }

            //using extensions? Wrong file!
            $.each(extensions, function(index, extension){
                //is the option set to true?
                if(footerShow == false&&options[extension]){
                    showError('warn', 'fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: '+ extension);
                }
            });

            //anchors can not have the same value as any element ID or NAME
            $.each(options.anchors, function(index, name){

                //case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
                var nameAttr = $document.find('[name]').filter(function() {
                    return $(this).attr('name') && $(this).attr('name').toLowerCase() == name.toLowerCase();
                });

                var idAttr = $document.find('[id]').filter(function() {
                    return $(this).attr('id') && $(this).attr('id').toLowerCase() == name.toLowerCase();
                });

                if(footerShow == false&&idAttr.length || nameAttr.length ){
                    showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
                    idAttr.length && showError('error', '"' + name + '" is is being used by another element `id` property');
                    nameAttr.length && showError('error', '"' + name + '" is is being used by another element `name` property');
                }
            });
        }

        /**
        * Shows a message in the console of the given type.
        */
        function showError(type, text){
            console && console[type] && console[type]('fullPage: ' + text);
        }

    }; //end of $.fn.fullpage

    if(footerShow == false&&typeof IScroll !== 'undefined'){
        /*
        * Turns iScroll `mousewheel` option off dynamically
        * https://github.com/cubiq/iscroll/issues/1036
        */
        IScroll.prototype.wheelOn = function () {
            this.wrapper.addEventListener('wheel', this);
            this.wrapper.addEventListener('mousewheel', this);
            this.wrapper.addEventListener('DOMMouseScroll', this);
        };

        /*
        * Turns iScroll `mousewheel` option on dynamically
        * https://github.com/cubiq/iscroll/issues/1036
        */
        IScroll.prototype.wheelOff = function () {
            this.wrapper.removeEventListener('wheel', this);
            this.wrapper.removeEventListener('mousewheel', this);
            this.wrapper.removeEventListener('DOMMouseScroll', this);
        };
    }

    /**
     * An object to handle overflow scrolling.
     * This uses jquery.slimScroll to accomplish overflow scrolling.
     * It is possible to pass in an alternate scrollOverflowHandler
     * to the fullpage.js option that implements the same functions
     * as this handler.
     *
     * @type {Object}
     */
    var iscrollHandler = {
        refreshId: null,
        iScrollInstances: [],

        // Enables or disables the mouse wheel for the active section or all slides in it
        toggleWheel: function(value){
            var scrollable = $(SECTION_ACTIVE_SEL).find(SCROLLABLE_SEL);
            scrollable.each(function(){
                var iScrollInstance = $(this).data('iscrollInstance');
                if(footerShow == false&&typeof iScrollInstance !== 'undefined' && iScrollInstance){
                    if(footerShow == false&&value){
                        iScrollInstance.wheelOn();
                    }
                    else{
                        iScrollInstance.wheelOff();
                    }
                }
            });
        },

        /**
        * Turns off iScroll for the destination section.
        * When scrolling very fast on some trackpads (and Apple laptops) the inertial scrolling would
        * scroll the destination section/slide before the sections animations ends.
        */
        onLeave: function(){
            iscrollHandler.toggleWheel(false);
        },

        // Turns off iScroll for the leaving section
        beforeLeave: function(){
            iscrollHandler.onLeave()
        },

        // Turns on iScroll on section load
        afterLoad: function(){
            iscrollHandler.toggleWheel(true);
        },

        /**
         * Called when overflow scrolling is needed for a section.
         *
         * @param  {Object} element      jQuery object containing current section
         * @param  {Number} scrollHeight Current window height in pixels
         */
        create: function(element, scrollHeight) {
            var scrollable = element.find(SCROLLABLE_SEL);

            scrollable.height(scrollHeight);
            scrollable.each(function() {
                var $this = $(this);
                var iScrollInstance = $this.data('iscrollInstance');
                if (iScrollInstance) {
                    $.each(iscrollHandler.iScrollInstances, function(){
                        $(this).destroy();
                    });
                }

                iScrollInstance = new IScroll($this.get(0), iscrollOptions);
                iscrollHandler.iScrollInstances.push(iScrollInstance);

                //off by default until the section gets active
                iScrollInstance.wheelOff();

                $this.data('iscrollInstance', iScrollInstance);
            });
        },

        /**
         * Return a boolean depending on whether the scrollable element is a
         * the end or at the start of the scrolling depending on the given type.
         *
         * @param  {String}  type       Either 'top' or 'bottom'
         * @param  {Object}  scrollable jQuery object for the scrollable element
         * @return {Boolean}
         */
        isScrolled: function(type, scrollable) {
            var scroller = scrollable.data('iscrollInstance');

            //no scroller?
            if (!scroller) {
                return true;
            }

            if (type === 'top') {
                return scroller.y >= 0 && !scrollable.scrollTop();
            } else if (type === 'bottom') {
                return (0 - scroller.y) + scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
            }
        },

        /**
         * Returns the scrollable element for the given section.
         * If there are landscape slides, will only return a scrollable element
         * if it is in the active slide.
         *
         * @param  {Object}  activeSection jQuery object containing current section
         * @return {Boolean}
         */
        scrollable: function(activeSection){
            // if there are landscape slides, we check if the scrolling bar is in the current one or not
            if (activeSection.find(SLIDES_WRAPPER_SEL).length) {
                return activeSection.find(SLIDE_ACTIVE_SEL).find(SCROLLABLE_SEL);
            }
            return activeSection.find(SCROLLABLE_SEL);
        },

        /**
         * Returns the scroll height of the wrapped content.
         * If this is larger than the window height minus section padding,
         * overflow scrolling is needed.
         *
         * @param  {Object} element jQuery object containing current section
         * @return {Number}
         */
        scrollHeight: function(element) {
            return element.find(SCROLLABLE_SEL).children().first().get(0).scrollHeight;
        },

        /**
         * Called when overflow scrolling is no longer needed for a section.
         *
         * @param  {Object} element      jQuery object containing current section
         */
        remove: function(element) {
            var scrollable = element.find(SCROLLABLE_SEL);
            if (scrollable.length) {
                var iScrollInstance = scrollable.data('iscrollInstance');
                iScrollInstance.destroy();

                scrollable.data('iscrollInstance', null);
            }
            element.find(SCROLLABLE_SEL).children().first().children().first().unwrap().unwrap();
        },

        /**
         * Called when overflow scrolling has already been setup but the
         * window height has potentially changed.
         *
         * @param  {Object} element      jQuery object containing current section
         * @param  {Number} scrollHeight Current window height in pixels
         */
        update: function(element, scrollHeight) {
            //using a timeout in order to execute the refresh function only once when `update` is called multiple times in a
            //short period of time.
            //it also comes on handy because iScroll requires the use of timeout when using `refresh`.
            clearTimeout(iscrollHandler.refreshId);
            iscrollHandler.refreshId = setTimeout(function(){
                $.each(iscrollHandler.iScrollInstances, function(){
                    $(this).get(0).refresh();
                });
            }, 150);

            //updating the wrappers height
            element.find(SCROLLABLE_SEL).css('height', scrollHeight + 'px').parent().css('height', scrollHeight + 'px');
        },

        /**
         * Called to get any additional elements needed to wrap the section
         * content in order to facilitate overflow scrolling.
         *
         * @return {String|Object} Can be a string containing HTML,
         *                         a DOM element, or jQuery object.
         */
        wrapContent: function() {
            return '<div class="' + SCROLLABLE + '"><div class="fp-scroller"></div></div>';
        }
    };
});

//（导航插件）
(function(k){for(var d,f,l=document.getElementsByTagName("head")[0].style,h=["transformProperty","WebkitTransform","OTransform","msTransform","MozTransform"],g=0;g<h.length;g++)void 0!==l[h[g]]&&(d=h[g]);d&&(f=d.replace(/[tT]ransform/,"TransformOrigin"),"T"==f[0]&&(f[0]="t"));eval('IE = "v"=="\v"');jQuery.fn.extend({rotate:function(a){if(0!==this.length&&"undefined"!=typeof a){"number"==typeof a&&(a={angle:a});for(var b=[],c=0,d=this.length;c<d;c++){var e=this.get(c);if(e.Wilq32&&e.Wilq32.PhotoEffect)e.Wilq32.PhotoEffect._handleRotation(a);
else{var f=k.extend(!0,{},a),e=(new Wilq32.PhotoEffect(e,f))._rootObj;b.push(k(e))}}return b}},getRotateAngle:function(){for(var a=[],b=0,c=this.length;b<c;b++){var d=this.get(b);d.Wilq32&&d.Wilq32.PhotoEffect&&(a[b]=d.Wilq32.PhotoEffect._angle)}return a},stopRotate:function(){for(var a=0,b=this.length;a<b;a++){var c=this.get(a);c.Wilq32&&c.Wilq32.PhotoEffect&&clearTimeout(c.Wilq32.PhotoEffect._timer)}}});Wilq32=window.Wilq32||{};Wilq32.PhotoEffect=function(){return d?function(a,b){a.Wilq32={PhotoEffect:this};
this._img=this._rootObj=this._eventObj=a;this._handleRotation(b)}:function(a,b){this._img=a;this._onLoadDelegate=[b];this._rootObj=document.createElement("span");this._rootObj.style.display="inline-block";this._rootObj.Wilq32={PhotoEffect:this};a.parentNode.insertBefore(this._rootObj,a);if(a.complete)this._Loader();else{var c=this;jQuery(this._img).bind("load",function(){c._Loader()})}}}();Wilq32.PhotoEffect.prototype={_setupParameters:function(a){this._parameters=this._parameters||{};"number"!==
typeof this._angle&&(this._angle=0);"number"===typeof a.angle&&(this._angle=a.angle);this._parameters.animateTo="number"===typeof a.animateTo?a.animateTo:this._angle;this._parameters.step=a.step||this._parameters.step||null;this._parameters.easing=a.easing||this._parameters.easing||this._defaultEasing;this._parameters.duration=a.duration||this._parameters.duration||1E3;this._parameters.callback=a.callback||this._parameters.callback||this._emptyFunction;this._parameters.center=a.center||this._parameters.center||
["50%","50%"];this._rotationCenterX="string"==typeof this._parameters.center[0]?parseInt(this._parameters.center[0],10)/100*this._imgWidth*this._aspectW:this._parameters.center[0];this._rotationCenterY="string"==typeof this._parameters.center[1]?parseInt(this._parameters.center[1],10)/100*this._imgHeight*this._aspectH:this._parameters.center[1];a.bind&&a.bind!=this._parameters.bind&&this._BindEvents(a.bind)},_emptyFunction:function(){},_defaultEasing:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-
1)+c},_handleRotation:function(a,b){d||this._img.complete||b?(this._setupParameters(a),this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart()):this._onLoadDelegate.push(a)},_BindEvents:function(a){if(a&&this._eventObj){if(this._parameters.bind){var b=this._parameters.bind,c;for(c in b)b.hasOwnProperty(c)&&jQuery(this._eventObj).unbind(c,b[c])}this._parameters.bind=a;for(c in a)a.hasOwnProperty(c)&&jQuery(this._eventObj).bind(c,a[c])}},_Loader:function(){return IE?function(){var a=
this._img.width,b=this._img.height;this._imgWidth=a;this._imgHeight=b;this._img.parentNode.removeChild(this._img);this._vimage=this.createVMLNode("image");this._vimage.src=this._img.src;this._vimage.style.height=b+"px";this._vimage.style.width=a+"px";this._vimage.style.position="absolute";this._vimage.style.top="0px";this._vimage.style.left="0px";this._aspectW=this._aspectH=1;this._container=this.createVMLNode("group");this._container.style.width=a;this._container.style.height=b;this._container.style.position=
"absolute";this._container.style.top="0px";this._container.style.left="0px";this._container.setAttribute("coordsize",a-1+","+(b-1));this._container.appendChild(this._vimage);this._rootObj.appendChild(this._container);this._rootObj.style.position="relative";this._rootObj.style.width=a+"px";this._rootObj.style.height=b+"px";this._rootObj.setAttribute("id",this._img.getAttribute("id"));this._rootObj.className=this._img.className;for(this._eventObj=this._rootObj;a=this._onLoadDelegate.shift();)this._handleRotation(a,
!0)}:function(){this._rootObj.setAttribute("id",this._img.getAttribute("id"));this._rootObj.className=this._img.className;this._imgWidth=this._img.naturalWidth;this._imgHeight=this._img.naturalHeight;var a=Math.sqrt(this._imgHeight*this._imgHeight+this._imgWidth*this._imgWidth);this._width=3*a;this._height=3*a;this._aspectW=this._img.offsetWidth/this._img.naturalWidth;this._aspectH=this._img.offsetHeight/this._img.naturalHeight;this._img.parentNode.removeChild(this._img);this._canvas=document.createElement("canvas");
this._canvas.setAttribute("width",this._width);this._canvas.style.position="relative";this._canvas.style.left=-this._img.height*this._aspectW+"px";this._canvas.style.top=-this._img.width*this._aspectH+"px";this._canvas.Wilq32=this._rootObj.Wilq32;this._rootObj.appendChild(this._canvas);this._rootObj.style.width=this._img.width*this._aspectW+"px";this._rootObj.style.height=this._img.height*this._aspectH+"px";this._eventObj=this._canvas;for(this._cnv=this._canvas.getContext("2d");a=this._onLoadDelegate.shift();)this._handleRotation(a,
!0)}}(),_animateStart:function(){this._timer&&clearTimeout(this._timer);this._animateStartTime=+new Date;this._animateStartAngle=this._angle;this._animate()},_animate:function(){var a=+new Date,b=a-this._animateStartTime>this._parameters.duration;if(b&&!this._parameters.animatedGif)clearTimeout(this._timer);else{if(this._canvas||this._vimage||this._img)a=this._parameters.easing(0,a-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration),
this._rotate(~~(10*a)/10);this._parameters.step&&this._parameters.step(this._angle);var c=this;this._timer=setTimeout(function(){c._animate.call(c)},10)}this._parameters.callback&&b&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:function(){var a=Math.PI/180;return IE?function(a){this._angle=a;this._container.style.rotation=a%360+"deg";this._vimage.style.top=-(this._rotationCenterY-this._imgHeight/2)+"px";this._vimage.style.left=
-(this._rotationCenterX-this._imgWidth/2)+"px";this._container.style.top=this._rotationCenterY-this._imgHeight/2+"px";this._container.style.left=this._rotationCenterX-this._imgWidth/2+"px"}:d?function(a){this._angle=a;this._img.style[d]="rotate("+a%360+"deg)";this._img.style[f]=this._parameters.center.join(" ")}:function(b){this._angle=b;b=b%360*a;this._canvas.width=this._width;this._canvas.height=this._height;this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH);this._cnv.translate(this._rotationCenterX,
this._rotationCenterY);this._cnv.rotate(b);this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY);this._cnv.scale(this._aspectW,this._aspectH);this._cnv.drawImage(this._img,0,0)}}()};IE&&(Wilq32.PhotoEffect.prototype.createVMLNode=function(){document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{return!document.namespaces.rvml&&document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),function(a){return document.createElement("<rvml:"+a+' class="rvml">')}}catch(a){return function(a){return document.createElement("<"+
a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}}())})(jQuery);
//（导航）
		var userAgent = navigator.userAgent.toLowerCase(); 
		// Figure out what browser is being used
		jQuery.browser = { 
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
		safari: /webkit/.test( userAgent ), 
		opera: /opera/.test( userAgent ), 
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
		}; //通过正则去判断当前使用的哪种内核的浏览器
		$(function(){
			if($.browser.version != "7.0")//如果不是IE7就将导航栏收起时的left值设置成列表的宽度
			{
							if($(window).width()>=1150){
									$(".navigation").css({"width":80+"%", "left":0})
								$(".navigation-box").css({"left":parseInt($(".navigation").css("width"))})
										

							}
							else{
								$(".navigation-box").css({"left":900})
								$(".navigation").css({"width":650,"left":240})	

							}

                    		

				$(window).resize(function(){
				
                    		if($(window).width()>=1150){
                    			$(".navigation").css({"width":80+"%", "left":0})

								$(".navigation-box").css({"left":parseInt($(".navigation").css("width"))})	
								
							}
							else{
								$(".navigation-box").css({"left":900})
									$(".navigation").css({"width":650,"left":240})		

							}
               								

					
				});
			}
			else {
				$(".navigation-box").css({"right":200});//如果是IE7就将导航栏收起时的right值设置成200
			}
				
			
			var flag=true;//判断导航栏是展开还是关闭
			if(flag=true){
				$(".navigation-box").hover(function(){//关闭效果下hower第二第四条线移动，鼠标移开回正
					$(".second-line").stop(true,true).animate({
						"margin-left":12,
						"margin-right":0
					},200);
					$(".forth-line").stop(true,true).animate({
						"margin-left":12,
						"margin-right":0
					},200)
				},function(){
					$(".second-line").stop(true,true).animate({
						"margin-left":0,
						"margin-right":12
					},200);
					$(".forth-line").stop(true,true).animate({
						"margin-left":0,
						"margin-right":12
					},200)
				});
			}
			$(".navigation-box").on("click",function(){//点击事件绑定
				if ($(".second-line").is(':animated')||$(".slide-left").is(':animated')||$('.first-line').is(':animated')) {
                    return;//如果任意一个动画执行中，则按钮不可点
                }
				if(flag==true)//导航栏关闭到展开
				{//第二第四条线移开，此函数的回调函数是第一第三两条线重合，此函数的回调函数是旋转，变成叉号
					$(".second-line").stop(true).animate({"right":-50},300,function(){
						$(".first-line").stop(true).animate({"top":10.5},1,function(){
							$('.first-line').stop(true).rotate({
								                angle: 0,
								                animateTo: 45,
								                easing: $(".easing").easeInOutExpo,
								                duration:400,
								                callback:function(){}
								            });
						})
						

					});
					
					$(".forth-line").stop(true).animate({"right":-50},300,function(){
						$(".third-line").stop(true).animate({"top":-7.5},1,function(){
								$('.third-line').stop(true).rotate({
								                angle: 0,
								                animateTo: -45,
								                easing: $(".easing").easeInOutExpo,
								                duration:400,
								                callback:function(){}

								            });
						})

					});
					
					$(".slide-left").stop(true).animate({"right":0},1000);
					flag=false;
				}
				else if(flag==false)//导航栏展开到关闭
				{//导航栏关闭到展开的逆过程
					$(".slide-left").stop(true).animate({"right":-150+"%"},1000);
					$('.first-line').stop(true).rotate({
								                angle: 45,
								                animateTo: 0,
								                easing: $(".easing").easeInOutExpo,
								                 callback: rotation1,
								                 duration:400
								                });
					$('.third-line').stop(true).rotate({
								                angle: -45,
								                animateTo: 0,
								                easing: $(".easing").easeInOutExpo,
								                 callback: rotation2,
								                 duration:400
								                });
					flag=true;
				}
			
			})
			$('.roll-li').hover(function(){
			$(this).animate({'top':-25},400);},function(){$(this).stop(true).animate({'top': 0}, 400); })//展开的导航栏的hover效果
		})
		function rotation1(){//叉号旋转过后的回调函数
	                	$(".first-line").stop(true).animate({"top":0},1,function(){$(".second-line").stop(true).animate({"right":0},300	)})};
    	function rotation2(){
    	$(".third-line").stop(true).animate({"top":0},1,function(){$(".forth-line").stop(true).animate({"right":0},300	)})};
//（首页）
$(function(){

	//一些由js控制的随着可视窗口大小变化的宽高
		
		/*$(".about-IT-in").css({
			"height":$(window).width()*0.107
		});
		$(".about-IT img").css({
			"height":$(window).width()*0.107
		});*/
		$(".next-page").css({
			"bottom":$(".next-page-background").height()
		});
		// if($(window).width()/$(window).height()>=(1900/886))
		// {
		// 	$(".section1").css({
		// 		"backgroundSize":"100% auto"
		// 	});
		// }
		// else{
		// 	$(".section1").css({
		// 		"backgroundSize":"auto 100%"
		// 	});
		// }
	$(window).resize(function(){
		if($(window).width()>980){
			$(".section1").css({
			"height":$(window).height(),
			"width":"100%"
			});
			// if($(window).width()/$(window).height()>=(1900/886))
			// {
			// 	$(".section1").css({
			// 		"backgroundSize":"100% auto"
			// 	});
			// }
			// else{
			// 	$(".section1").css({
			// 		"backgroundSize":"auto 100%"
			// 	});
			// }
		}
		else{
			$(".section1").css({
				"width":980,
				"height":$(window).height()
			});
		}
		/*$(".about-IT-in").css({
			"height":$(window).width()*0.107

		});*/
		$(".about-IT-in>img").css({
			"width":$(".about-IT-in").width()
		});
		/*$(".about-IT img").css({
			"height":$(window).width()*0.107
		});*/
		$(".next-page").css({
			"bottom":$(".next-page-background").height(),
		});
	})

	//关于爱特的各个内容的翻转效果
	var turn = function(target,time,opts){
		target.find('.about-IT-in').hover(function itshow(){
			var realaboutit=$(".about-IT-in").width();
			if(!$(this).children('img').is(":animated")){

				$(this).children('img').stop().animate(opts[0],time,function(){

					var aboutithidden=$('.about-IT').children("img").not($(this));
					$(this).hide().next().show();

				//$(this).next().animate(opts[1],time);
					$(this).next().animate({width:realaboutit},time);
				});
			}
		},function ithidden(){
			var realaboutit=$(".about-IT-in").width();
			$(this).children('div').animate(opts[0],time,function(){

				$(this).hide().prev().show();

				//$(this).prev().animate(opts[1],time);
				$(this).prev().animate({width:realaboutit},time);

			});

		});

	}

	var verticalOpts = [{'width':0},{'width':"100%"}];
	/*$(window).resize(function(){
		console.log(realaboutit);
		verticalOpts = [{'width':0},{'width':realaboutit}];
	})*/
	turn($('.all-about-IT'),100,verticalOpts);
	//到下一页的效果
	var arrowChange=setInterval(arrowShow,2000);
	function arrowShow(){
		$(".next-page-arrow").animate({opacity:0},1000,function(){
			$(this).animate({opacity:1},1000);
		});
	}
	$("#next-page-background1").click(function(){
		window.location.hash="#page2";
	})
	$("#next-page-arrow1").click(function(){
		window.location.hash="#page2";
	})
	$("#next-page-background2").click(function(){
		window.location.hash="#page4";
	})
	$("#next-page-arrow-bottom2").click(function(){
		window.location.hash="#page4";
	})
	$("#next-page-background5").click(function(){
		window.location.hash="#page6";
	})
	$("#next-page-arrow5").click(function(){
		window.location.hash="#page6";
	})
	$("#next-page-background6").click(function(){
		window.location.hash="#page6";
	})
	$("#next-page-arrow6").click(function(){
		window.location.hash="#page6";
	})

})

//（部门介绍页）
	$(document).ready(function(){
		var userAgent = navigator.userAgent.toLowerCase(); 
		// Figure out what browser is being used
		jQuery.browser = { 
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
		safari: /webkit/.test( userAgent ), 
		opera: /opera/.test( userAgent ), 
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
		}; //通过正则去判断当前使用的哪种内核的浏览器
		var H,W;
		var grayCircleW=$(".gray-circle").css("width").split("px")[0];
		var imageCircleW=grayCircleW-40;
		if($.browser.version != "7.0")//判断是不是IE7 ，IE7下不支持“$(window).width()”
			{	 H=$(window).height();//获得窗口宽度
				 W=$(window).width();//获得窗口高度
				$(window).resize(function(){//浏览器缩放重新获得窗口宽高
				 	H=$(window).height();
				 	W=$(window).width();
				});
				
						$(".section2").css({"height":H});

				$(".gray-circle").css({"top":(H-grayCircleW)/2})//设置外围灰色圆圈的位置
				$(".image-circle").css({"top":(H-imageCircleW)/2})//设置中间显示图片圆圈的位置
				$(".button-left-top").css({"top":(H-grayCircleW)/2})//设置按钮位置
				$(".button-right-top").css({"top":(H-grayCircleW)/2})
				$(".button-left-bottom").css({"top":(H)/2})
				$(".button-right-bottom").css({"top":(H)/2})
				$(window).resize(function(){//浏览器缩放重新设置位
					
						$(".section2").css({"height":H});

					$(".gray-circle").css({"top":(H-grayCircleW)/2})
					$(".image-circle").css({"top":(H-imageCircleW)/2})
					$(".button-left-top").css({"top":(H-grayCircleW)/2})
					$(".button-right-top").css({"top":(H-grayCircleW)/2})
					$(".button-left-bottom").css({"top":(H)/2})
					$(".button-right-bottom").css({"top":(H)/2})
					$(".mid-line").css({"height":H})//设置中轴高度	
				});
			}
		else {
			H=700;
			W=1366;
			$(".section2").css({"width":W});
			$(".section2").css({"height":H});//设置主容器高
			$(".gray-circle").css({"top":(H-grayCircleW)/2})//设置外围灰色圆圈的位置
			$(".image-circle").css({"top":(H-imageCircleW)/2})//设置中间显示图片圆圈的位置
			$(".button-left-top").css({"top":(H-grayCircleW)/2})//设置按钮位置
			$(".button-right-top").css({"top":(H-grayCircleW)/2})
			$(".button-left-bottom").css({"top":(H)/2})
			$(".button-right-bottom").css({"top":(H)/2})
		}
        var introductionFlag=false;
		var initIntroduction=0,initEvent=0;;
			
		$("#fullpage").fullpage({
			anchors:['page1','page2','page3','page4','page5','page6'],
			onLeave:function(index,nextIndex,direction)
			{
				if(nextIndex==1)
				{
					$(".navigation li").css({"color":"white"})

				}
				else if(nextIndex==2)
				{
					
					if(initIntroduction==0)
					{
						

						//中轴延展到圆形上方，并通过回调函数进行默认部门的展示，并通过默认部门展示的回调函数，让中轴延展到底部，通过周周延伸到底部的回调函数使按钮可以被点击并实现轮播
							$(".introduction-mid-line1").animate({"height":(H-grayCircleW)/2},1400,function(){
							$(".HTML").addClass("onShow");
							show();
							leftEnter.animate({"top":0},600)
							$(".orange-cube").animate({"top":0},600,function(){
								$(".introduction-mid-line2").animate({"height":100+"%"},300,function(){
                                    introductionFlag=true;
															
								})
								// $(".image-circle").hover(stop, play);
								// play();
							})
						})
						initIntroduction=1;
						

					}
					$(".navigation li").css({"color":"black"})
					
				}
				else if(nextIndex==3)
				{
					$(".navigation li").css({"color":"black"})

				}
				else if(nextIndex==4)
				{
					$(".navigation li").css({"color":"black"})
					var clockBoxTop= parseInt($(".navigation-box").css("top"))+parseInt($(".navigation-box").css("height"))
					if(initEvent==0)
					{
						

						$(".mid-line1").animate({"height": clockBoxTop},500,function(){
							$("#0 .colck-image-box").animate({"height":80},500,function(){
								$("#1 .colck-image-box").animate({"height":80},500,function(){
									$("#2 .colck-image-box").animate({"height":80},500,function(){
										$("#3 .colck-image-box").animate({"height":80},500,function(){
										    $(".mid-line2").animate({ "height": clockBoxTop }, 500, function () {

												

												
											})
										})
									})
								})
							})	
						})
						initEvent=1;
						

					}
					
				}
				else if(nextIndex==5)
				{
					if(memberFlag==true){
						$(".navigation li").css({"color":"black"})
					}
					else{
					$(".navigation li").css({"color":"white"})
					}

				}
				else if(nextIndex==6)
				{
					$(".navigation li").css({"color":"black"})

				}		
			}
		});



					var rightEnter=$(".right-enter"),leftEnter=$(".left-enter"),topEnter=$(".top-enter"),bottomEnter=$(".bottom-enter"),orangeCube=$(".orange-cube");
					var index=1;
					var num=4;
					$(function(){
						
						$(".button-right-bottom").on("click",function(){//右下方按钮的点击事件

										if(leftEnter.is(':animated')||rightEnter.is(':animated')||topEnter.is(':animated')||bottomEnter.is(':animated')||introductionFlag==false)
										{

											return;//如果点击的是当前展示的位置，就返回
										}
										if(index==1)//第一张到第二张
										{
											index=2;
											onceturn(leftEnter,topEnter,orangeCube);
										}
										else if(index==2)
										{
											return;
										}
										else if (index==3)//第三张到第二张
										 {
											index=2;
											onceturn(rightEnter,topEnter,orangeCube);
										}
										else if(index==4)//第四张到第三张到第二张
										{
											index=2;
											twiceturn(bottomEnter,rightEnter,topEnter,orangeCube);	
										}
										$(".onShow").removeClass("onShow").addClass("disShow");	
										$(".VS").addClass("onShow");
										show();	

									})
									$(".button-left-bottom").on("click",function(){//左下方按钮的点击事件
										if(leftEnter.is(':animated')||rightEnter.is(':animated')||topEnter.is(':animated')||bottomEnter.is(':animated')||introductionFlag==false)
										{
											return;
										}
										if(index==1)//第一张到第二张到第三张
										{
											index=3;
											 twiceturn(leftEnter,topEnter,rightEnter,orangeCube);				
										}
										else if(index==2)//第二张到第三张
										{
											index=3;
											onceturn(topEnter,rightEnter,orangeCube);		
										}
										else if (index==3) {
											return;										
										}
										else if(index==4)//第四张到第三张
										{
											index=3;
											onceturn(bottomEnter,rightEnter,orangeCube)
										}
										$(".onShow").removeClass("onShow").addClass("disShow");	
										$(".UI").addClass("onShow");
										show();	
									
									})
									$(".button-left-top").on("click",function(){//左上方按钮的点击事件
										if(leftEnter.is(':animated')||rightEnter.is(':animated')||topEnter.is(':animated')||bottomEnter.is(':animated')||introductionFlag==false)
										{
											return;
										}
										if(index==1)//第一张到第二张到第三张到第四张
										{
											index=4;
											thirdturn(leftEnter,topEnter,rightEnter,bottomEnter,orangeCube);		
										}
										else if(index==2)//第二张到第三张到第四张
										{
											index=4;
											twiceturn(topEnter,rightEnter,bottomEnter,orangeCube);					
										}
										else if (index==3) //第三张到第四张
										{
											index=4;
											onceturn(rightEnter,bottomEnter,orangeCube)
										}
										else if(index==4)
										{
											return;

										}
										$(".onShow").removeClass("onShow").addClass("disShow");	
										$(".APP").addClass("onShow");
										show();	

									})
									$(".button-right-top").on("click",function(){//右上方按钮的点击事件
										if(leftEnter.is(':animated')||rightEnter.is(':animated')||topEnter.is(':animated')||bottomEnter.is(':animated')||introductionFlag==false)
										{
											return;
										}
										if(index==1){
											return ;	
										}
										else if(index==2)//第二张到第一张
										{
											index=1;
											onceturn(topEnter,leftEnter,orangeCube);	
										}
										else if (index==3) //第三张到第二张到第一张
										{
										
											index=1;
											 twiceturn(rightEnter,topEnter,leftEnter,orangeCube);
											
										}
										else if(index==4)//第四张到第s张
										{
											index=1;
											onceturn(bottomEnter,leftEnter,orangeCube);
										}
										$(".onShow").removeClass("onShow").addClass("disShow");	
										$(".HTML").addClass("onShow");
										show();	

									})							
					})	
			  		function show(){//用来设置简要离开的左右两侧的部门介绍动作，和新出现的部门介绍动作
							$(".disShow").children(".characterize").animate({"left":200+"%"},1)
							$(".disShow").children(".department-img").animate({"left":-0+"%"},1,function(){
							$(".disShow").removeClass("disShow");
							$(".onShow").children(".number").animate({"left":25+"%"},600);
							$(".onShow").children(".department").animate({"left":25+"%"},600);
							$(".onShow").children(".department-img").animate({"left":25+"%"},600);
							$(".onShow").children(".characterize").animate({"left":52+"%"},600);
							})
			  		}	
			  		// function play() {//轮播效果，通过判断当前展示的部门并设置时间间隔去触发click事件
			    //             timer = window.setInterval(function() {
			    //             	if(index==1)
			    //             	{
			    //             		$(".button-right-bottom").trigger('click');

			    //             	}
			    //             	else if(index==2){
							// 		$(".button-left-bottom").trigger('click');

			    //             	}
			    //             	else if(index==3){
							// 		$(".button-left-top").trigger('click');

			    //             	}
			    //             	else if(index==4){
							// 		$(".button-right-top").trigger('click');
			    //             	}

			    //             },2600);
			    //         }
			    //     function stop() {//解除事件绑定
			    //            clearInterval(timer);
			    //        }
					function onceturn(from,to,orangeCube){
						//正在展示的部门和用户点击的部门之间的间隔为一，默认顺时针旋转。
						//实现思路是通过四个橙色的正方形分别去遮挡两个四分之一扇形之间的间隔，通过判断用户点击，去改变橙色方块的位置并显示不同部门对应的图片,并通过回调函数去还原已经浏览过的图片位置
			  			if(from==rightEnter)
			  			{
			  				if(to==bottomEnter)//第三张到第四张
			  				{
			  					from.animate({"top":-480,"z-Index":4},600,function(){//移出图片的动作并通过回调函数还原位置
								})
								to.animate({"top":0,"z-Index":7},600)//新加入图片的动作
								$(".orange-cube-pretend-3rd").animate({"left":0},600)
			  				}
			  				else if(to==topEnter)//第三张到第二张
			  				{
			  					from.animate({"left":480,"z-Index":4},600,function(){//移出图片的动作并通过回调函数还原位置
								})
								to.animate({"left":0,"z-Index":7},600)//新加入图片的动作
								$(".orange-cube-pretend-2nd").animate({"left":240},600,function(){
									$(".orange-cube-pretend-2nd").css({"left":0,"top":480})
								})
			  				}

			  			}
			  			else if(from==bottomEnter)
			  			{
			  				if(to==leftEnter)//第四张到第一张
			  				{
			  					from.animate({"top":480,"z-Index":4},600,function(){
                               
                                })
								to.css({"top":-480,"left":0})
                                to.animate({"top":0,"z-Index":7},600)
								$(".orange-cube-pretend-1st").css({"left":480})
								$(".orange-cube-pretend-2nd").css({"top":480})
								$(".orange-cube-pretend-3rd").css({"left":-240})
								$(".orange-cube").css({"height":0}).animate({"height":240},600,function(){
									$(".top-enter").css({"left":0,"top":-480})
									$(".right-enter").css({"left":480,"top":0})
									$(".bottom-enter").css({"left":0,"top":480})
								})
								
			  				}
			  				else if(to==rightEnter)//第四张到第三张
			  				{
			  					from.animate({"top":480,"z-Index":4},600,function(){
								})
								to.animate({"top":0,"z-Index":7},600)

								$(".orange-cube-pretend-3rd").animate({"top":240},600,function(){
								$(".orange-cube-pretend-3rd").css({"left":-240,"top":0})
								})

			  				}
			  				
							
			  			}
			  			else if(from==topEnter)
			  			{
			  				if(to==rightEnter){//第二张到第三张
			  				
			  				from.animate({"left":-480,"z-Index":4},600,function(){
							})
							to.animate({"left":0,"z-Index":7},600)
							$(".orange-cube-pretend-2nd").animate({"top":240},600)
							}
							else if(to==leftEnter){//第二张到第一张
			  				
			  				from.animate({"top":-480,"z-Index":4},600,function(){
							})
							to.animate({"top":0,"z-Index":7},600)
							$(".orange-cube-pretend-1st").animate({"top":0},600,function(){
								$(".orange-cube-pretend-1st").css({"left":480,"top":240})
							})
							}
			  			}
			  			else if(from=leftEnter)//第一张到第二张
			  			{

			  					from.css({"left":0})
			  					from.animate({"top":480,"z-Index":4},600)
								to.animate({"top":0,"z-Index":7},600)
								$(".orange-cube-pretend-1st").animate({"left":240},600)
			  			}			
			  		}
			  		function twiceturn(from,to,end,orangeCube){
			  			//正在展示的部门和用户点击的部门之间的间隔为二，默认顺时针旋转。
			  			//实现思路以两次移动的方法实现，第一次时间极短，并通过第一次移动的回调函数去调用下一次的正常速度的移动（调用一次移动函数）
			  			if(from==rightEnter)//第三张到第二张到第一张
			  			{
			  				from.animate({"left":480,"z-Index":4},1,function(){//移出图片的动作并通过回调函数还原位置
								})
								to.animate({"left":0,"z-Index":7},1)//新加入图片的动作
								$(".orange-cube-pretend-2nd").animate({"left":240},1,function(){
									$(".orange-cube-pretend-2nd").css({"left":0,"top":480})
									onceturn(topEnter,leftEnter,orangeCube);
								})
			  			}
			  			else if(from==bottomEnter)//第四张到第三张到第二张
			  			{
			  				from.animate({"top":480,"z-Index":4},1,function(){
							})
							to.animate({"top":0,"z-Index":7},1)

							$(".orange-cube-pretend-3rd").animate({"top":240},1,function(){
							$(".orange-cube-pretend-3rd").css({"left":-240,"top":0})
							onceturn(rightEnter,topEnter,orangeCube);
							})

			  					
			  			}
			  			else if(from==topEnter)//第二张到第三张到第四张
			  			{
			  				from.animate({"left":-480,"z-Index":4},1,function(){
									})
									to.animate({"left":0,"z-Index":7},1)
									$(".orange-cube-pretend-2nd").animate({"top":240},1,function(){
										onceturn(to,end,orangeCube)
									})
			  			}
			  			else if(from=leftEnter)//第一张到第二张到第三张
			  			{
							from.animate({"top":480,"z-Index":4},1,function(){
								})
								to.animate({"top":0,"z-Index":7},1)
								$(".orange-cube-pretend-1st").animate({"left":240},1,function(){
									onceturn(to,end,orangeCube);
							})
			  			}
			  		}
			  		function thirdturn(from,second,third,end,orangeCube){
			  			//正在展示的部门和用户点击的部门之间的间隔为三，默认顺时针旋转。
			  			//实现思路以三次移动的方法实现，第一，二次时间极短，并通过第一次移动的回调函数去调用下一次的距离为二的移动（调用二次移动函数）
			  			if(from=leftEnter)//第一张到第二张到第三张到第四张
			  			{
							leftEnter.animate({"top":480,"z-Index":4},1,function(){
							})
							topEnter.animate({"top":0,"z-Index":7},1)
							$(".orange-cube-pretend-1st").animate({"left":240},1,function(){
								twiceturn(topEnter,rightEnter,bottomEnter,orangeCube);
							})
			  			}
			  		}
				
				

				
				})
   //（作品展示页）


$(function(){  
     	var array=[];
	    $.ajax({ 
	        type: "GET",    
	        url: "../Ajax/WorksHandler.ashx",
	        dataType: "JSON",
	        async : false,
    
	        success: function(data) {
                    
	            for (j = 0; j < data.length; j++) {
	                array.push({ "img":"../BackStage/Backstage/"+ data[j].WorksImage, "url": data[j].WorksUrl, "passage": data[j].WorksName })
	            }
                    
	        }


	    });
	    var posterTvGrId = new posterTvGrid('posterTvGrid', { className: "posterTvGrid" }, array);
	    var H = $(window).height();
	    var firstpageW = 500;
	    var firstpageH = firstpageW * 0.8;
	    var secondpageW = firstpageW * 0.8;
	    var secondpageH = secondpageW * 0.8;
	    if (H > 800) {
	        $(".Url").css({ "top": 400 })
	    }
	    else if (H <= 800 && H > 700) {
	        $(".Url").css({ "top": 365 })
	    }
	    else if (H <= 700 && H > 600) {
	        $(".Url").css({ "top": 320 })
	    }
	    else if (H <= 600 && H > 550) {
	        $(".Url").css({ "top": 265 })
	    }
	    else {
	        $(".Url").css({ "top": 230 })

	    }
	    $(window).resize(function () {
	        H = $(window).height();
	        if (H > 800) {
	            $(".Url").css({ "top": 400 })
	        }
	        else if (H <= 800 && H > 700) {
	            $(".Url").css({ "top": 365 })
	        }
	        else if (H <= 700 && H > 600) {
	            $(".Url").css({ "top": 320 })
	        }
	        else if (H <= 600 && H > 550) {
	            $(".Url").css({ "top": 265 })
	        }
	        else {
	            $(".Url").css({ "top": 230 })

	        }

	    })
        var H,W;
       
    function arrowShow(){//箭头的无限循环闪动效果
        $(".next-page-arrow-bottom").animate({opacity:0},1000,function(){
            $(this).animate({opacity:1},1000);
              arrowShow()
        });
         $(".next-page-arrow-left").animate({opacity:0},1000,function(){
            $(this).animate({opacity:1},1000);
        });
          $(".next-page-arrow-right").animate({opacity:0},1000,function(){
            $(this).animate({opacity:1},1000);
        });
    }
     arrowShow()
});
//（爱特大事记）
 var sumEvent14 = 0,sumEvent15 = 0, sumEvent16 = 0, sumEvent17 = 0;//用来分别记录每年的大事件件数，来加到不同的位置
    $(document).ready(function(){ 

                $.ajax({ 
                    type: "GET",    
                    url: "../Ajax/EventHandler.ashx",
                    dataType: "JSON",
    
                    success: function (data) {

                        for (j = 0; j < data.length; j++) {
                            var year = data[j].EventTime;
                            if (year.slice(0, 4) == "2014") {
                                sumEvent14++;
                                var row = $("<div>").addClass("accomplishment-row").appendTo($(".accomplishment-14"));
                                var rowLeft = $("<div>").addClass("accomplishment-left").appendTo(row);
                                var rowYear = $("<h2>").text(data[j].EventTime).appendTo(rowLeft);
                                var rowDot = $("<img>").attr("src", "images/dot.png").appendTo(rowLeft);
                                var rowRight = $("<div>").addClass("accomplishment-right").appendTo(row);
                                var rowP = $("<p>").appendTo(rowRight);
                                var rowSpan = $("<span>").text(data[j].EventContent).appendTo(rowP);
                                if (data[j].EventImage != "" && data[j].EventImage != null) {
                                    var rowImg = $("<img>").attr("src", "../BackStage/Backstage/" + data[j].EventImage).appendTo(rowRight);
                                    rowImg.css({ "display": "none" })
                                }


                            }
                            else if (year.slice(0, 4) == "2015") {
                                sumEvent15++;
                                var row = $("<div>").addClass("accomplishment-row").appendTo($(".accomplishment-15"));
                                var rowLeft = $("<div>").addClass("accomplishment-left").appendTo(row);
                                var rowYear = $("<h2>").text(data[j].EventTime).appendTo(rowLeft);
                                var rowDot = $("<img>").attr("src", "images/dot.png").appendTo(rowLeft);
                                var rowRight = $("<div>").addClass("accomplishment-right").appendTo(row);
                                var rowP = $("<p>").appendTo(rowRight);
                                var rowSpan = $("<span>").text(data[j].EventContent).appendTo(rowP);
                                if (data[j].EventImage != ""&&data[j].EventImage!=null) {
                                    var rowImg = $("<img>").attr("src", "../BackStage/Backstage/" + data[j].EventImage).appendTo(rowRight);
                                    rowImg.css({ "display": "none" })
                                }
                            }
                            else if (year.slice(0, 4) == "2016") {
                                sumEvent16++;
                                var row = $("<div>").addClass("accomplishment-row").appendTo($(".accomplishment-16"));
                                var rowLeft = $("<div>").addClass("accomplishment-left").appendTo(row);
                                var rowYear = $("<h2>").text(data[j].EventTime).appendTo(rowLeft);
                                var rowDot = $("<img>").attr("src", "images/dot.png").appendTo(rowLeft);
                                var rowRight = $("<div>").addClass("accomplishment-right").appendTo(row);
                                var rowP = $("<p>").appendTo(rowRight);
                                var rowSpan = $("<span>").text(data[j].EventContent).appendTo(rowP);
                                if (data[j].EventImage != "" && data[j].EventImage != null) {
                                    var rowImg = $("<img>").attr("src", "../BackStage/Backstage/" + data[j].EventImage).appendTo(rowRight);
                                    rowImg.css({ "display": "none" })
                                }
                            }
                            else if (year.slice(0, 4) == "2017") {
                                sumEvent17++;
                                var row = $("<div>").addClass("accomplishment-row").appendTo($(".accomplishment-17"));
                                var rowLeft = $("<div>").addClass("accomplishment-left").appendTo(row);
                                var rowYear = $("<h2>").text(data[j].EventTime).appendTo(rowLeft);
                                var rowDot = $("<img>").attr("src", "images/dot.png").appendTo(rowLeft);
                                var rowRight = $("<div>").addClass("accomplishment-right").appendTo(row);
                                var rowP = $("<p>").appendTo(rowRight);
                                var rowSpan = $("<span>").text(data[j].EventContent).appendTo(rowP);
                                if (data[j].EventImage != "" && data[j].EventImage != null) {
                                    var rowImg = $("<img>").attr("src", "../BackStage/Backstage/" + data[j].EventImage).appendTo(rowRight);
                                    rowImg.css({ "display": "none" })
                                }
                            }

                        }
                    }
            
                });


        
        $(function(){
        var H,W;
        var flag=false;
        var index_;
        var i=4;//记录一共有几个年份
        var init_=-1;//记录当前是展示的哪个年份·
        var clockBoxTop= parseInt($(".navigation-box").css("top"))+parseInt($(".navigation-box").css("height"))//保存时钟容器的top值，用来计算时间容器的高度
        var clockHeight=parseInt($(".clock").css("height"))//保存时钟的高度，用来计算时钟的top值

        if($.browser.version != "7.0")//判断是不是IE7 ，IE7下不支持“$(window).width()”
            {    H=$(window).height();//获得窗口宽度
                 W=$(window).width();//获得窗口高度
                $(window).resize(function(){//浏览器缩放重新获得窗口宽高
                    H=$(window).height();
                    W=$(window).width();
                });
                // if(W<=1150)//窗口宽度小于1100，就定宽（（默认打开浏览器时的宽高）
                // {
                //  $(".section4").css({"width":1150});
                // }
                
                    // $(".section4").css({"width":100+"%"});
                


                    timer = setTimeout(function () {
                $(".clock-box").css({"height": (H-clockBoxTop*2)})
                $(".clock").each(function(index){
                    $(this).css({"top":index*((H-clockBoxTop*2-i*clockHeight)/(i-1)+clockHeight)})
                })
                $(".clock").eq(i-1).css({"margin-bottom":0})
                 },5);
                $(window).resize(function(){
                //浏览器缩放重新设置位置
                    // if(W<=1150)//窗口宽度小于1100，就定宽（窗口宽高改变后的设置）
                    // {
                    //  $(".section4").css({"width":1150});
                    // }
                    
                        // $(".section4").css({"width":100+"%"});
                        if(flag==false)
                        {
                            $(".clock-box").css({"height": (H-clockBoxTop*2)})
                            $(".clock").each(function(index){
                            $(this).css({"top":index*((H-clockBoxTop*2-i*clockHeight)/(i-1)+clockHeight)})
                            })
                        }
                        else if(flag==true){    
                                       var clockArray=$(".clock ")
                                            var accomplishment=index_+14;
                                            var topClock=clockArray.slice(0,index_+1);
                                            var bottomClock=clockArray.slice(index_+1);
                                            var sum1=parseInt(index_);
                                            var sum2=parseInt(index_);
                                            topClock.each(function(){
                                                var this_=$(this);
                                                $(this).css({
                                                    "width":50,
                                                    "height":50,
                                                    "margin-left":15,
                                                    "top":50*(sum1-index_)})
                                                sum1+=1;
                                            })
                                            bottomClock.each(function(){
                                                var _this_=$(this);
                                                $(this).css({
                                                    "top":(H-clockBoxTop*2-i*50+(sum2+1)*50)})
                                                    sum2+=1;    
                                            })

                                                 if(accomplishment==14)
                                                { 
                                                    init_=0;
                                                                
                                                    change(index_,14)
                                                }
                                                else if(accomplishment==15)
                                                {   init_=1;
                                                    change(index_,15)
                                                }
                                                else if(accomplishment==16)
                                                { 
                                                    init_=2;
                                                    change(index_,16)
                                                    
                                                }
                                                else if(accomplishment==17)
                                                    
                                                {
                                                    init_=3;
                                                    change(index_,17)
                                                }

                        }

                        

                });

            }
        else {
            
            timer = setTimeout(function () {
                $(".clock-box").css({"height": (H-clockBoxTop*2)})
                $(".clock").each(function(index){
                    $(this).css({"top":index*((H-clockBoxTop*2-i*clockHeight)/(i-1)+clockHeight)})
                })
                $(".clock").eq(i-1).css({"margin-bottom":0})
                 },5);
        }
            
                            var clockArray=$(".clock ")
                                        $(".clock ").on("click",function(){
                                            flag=true;

                                            if($(this).is(':animated')||$(".clock a").is(':animated')||$(".accomplishment-left").is(':animated'))//如果正有动画执行则钟表不可点
                                            {
                                                return;
                                            }
                                            else{
                                                

                                                $(".clock a").animate({"left":-50},1,function(){
                                                    $(this).animate({"top":25},300)
                                                })
                                            index_=parseInt($(this).attr("id"));//保存当前点开的钟表
                                            if(init_==index_)
                                            {
                                                return;//如果当前点击的和正在展示的一样就返回
                                            }
                                            init(init_,index_);//否则重新设置位置，进行展示
                                            var accomplishment=index_+14;
                                            var topClock=clockArray.slice(0,index_+1);//移到顶部的时钟
                                            var bottomClock=clockArray.slice(index_+1);//移到底部的时钟
                                            var sum1=parseInt(index_);
                                            var sum2=parseInt(index_);
                                            topClock.each(function(){//设置位置
                                                var this_=$(this);
                                                $(this).animate({
                                                    "width":50,
                                                    "height":50,
                                                    "margin-left":15,
                                                    "top":50*(sum1-index_)},300)
                                                sum1+=1;
                                            })
                                            bottomClock.each(function(){
                                                var _this_=$(this);
                                                $(this).animate({
                                                    "width":50,
                                                    "height":50,
                                                    "margin-left":15,
                                                    "top":(H-clockBoxTop*2-i*50+(sum2+1)*50)},300)
                                                    sum2+=1;    
                                            })
                                            timer = setTimeout(function () {//时钟移动后事件的进入
                                                 if(accomplishment==14)
                                                { 
                                                    init_=0;
                                                                
                                                    show(index_,14)
                                                }
                                                else if(accomplishment==15)
                                                {   init_=1;
                                                    show(index_,15)
                                                }
                                                else if(accomplishment==16)
                                                { 
                                                    init_=2;
                                                    show(index_,16)
                                                    
                                                }
                                                else if(accomplishment==17)
                                                    
                                                {
                                                    init_=3;
                                                    show(index_,17)
                                                }
                                                    
                                             },300);
                                               
                                            }
                                        })
                                        setTimeout(function(){$(".accomplishment-right").each(function(){
                                            if($(this).find("img").length>0 )
                                            {
                                                var this_=$(this);
                                                $(this).find("span").css({"cursor":"pointer"})
                                                $(this).find("span").hover(function(){$(this).css({"color":"#e94e1b"});
                                                     this_.prev().find("h2").css({"color":"#e94e1b"})
                                                    },function(){$(this).css({"color":"black"});
                                                    this_.prev().find("h2").css({"color":"black"})
                                                })
                                                
                                            }
                                        })
                                        $(".accomplishment-right p").find("span").on("click",function(){
                                            var this_=$(this)
                                            if($(this).parent("p").parent(".accomplishment-right").find("img").length>0 )
                                            {

                                                $(".left-title").after($("<div class='open'><p class='bottomText'></p></div>"),"<div class='mask'></div>")
                                                 $(this).parent("p").parent(".accomplishment-right").find("img").appendTo(".open").css({
                                                    "display":"block",
                                                    "width":100+"%",
                                                    "height":460
                                                 });
                                                    $(".mask").css(
                                                    {
                                                        'height':$(".section").css("height"),
                                                        'width':$(".section").css("width")
                                                    })
                                                    
                                                    
                                                    $(".bottomText").text($(this).text())
                                                        
                                                
                                                    $(window).resize(function(){

                                                        $(".mask").css(
                                                        {
                                                        'height':$(".section").css("height"),
                                                        'width':$(".section").css("width"),
                                                        'display':"block"
                                                        })

                                                    });
                                                    $(".mask").on('click',function(){
                                                        $(".open").find("img").appendTo( this_.parent("p").parent(".accomplishment-right")).css({"display":"none"});
                                                        $(".open").remove();
                                                        $(".mask").css({"display":"none"});
                                                    })
                                            }
                                            
                                            })},200)
        function show(init,id){//事件进入
            var j=0;//用来保存事件的个数进行计算
            var show_;//保留需要展示的是哪个容器
            if(id==14)
            {
                j = sumEvent14;
                show_=$(".accomplishment-14")
            }
            else if(id==15)
            {
                j = sumEvent15;
                show_=$(".accomplishment-15")
            }
            else if(id==16)
            {
                j = sumEvent16;
                show_=$(".accomplishment-16")
            }
            else if(id==17)
            {
                j = sumEvent17;
                show_=$(".accomplishment-17")
            }
            $(".activity-mid-line").animate({"top":clockBoxTop+(init+1)*50},1,function(){//中间线的展示
                $(this).animate({"height":H-clockBoxTop*2-i*50},300,function(){ 
                    show_.css({"display":"block"}).animate({
                                               "top":75+(init+1)*50
                                                },1,function(){
                                                    var time=300;
                                                    for( var k=0;k<j;k++)
                                                    {   
                                                        show_.find(".accomplishment-row").eq(k).find('.accomplishment-left')
                                                                           .animate({ left   : '50%'}, time)
                                                                            .end()
                                                                           .find('.accomplishment-right')
                                                                          .animate({ left   : '50%'}, time) 
                                                                          time+=200;

                                                    }       
                                                })
                    show_.find(".accomplishment-row").each(function (index) {
                        $(this).css({ "top": (H - (clockBoxTop * 2 + (i) * 50)) / (j + 1) * (index + 1) })
                    })
                            })
                        })
        }
        function init(init_,index_){//点其他年份进行的当前年份的还原函数
            var id;
            if(init_==0)
            {
                Mclear(0)
            }
            else if(init_==1)
            {
                Mclear(1)
            }
            else if(init_==2)
            {
                Mclear(2)
            }
            else if(init_==3)
            {
                Mclear(3)
            }
            $(".activity-mid-line").css({"height":0})//中间线的还原
        }
        function Mclear(init_)
        {
            if(init_==0)
            {
                id=$(".accomplishment-14")//保留需要还原是哪个容器
            }
            else if(init_==1)
            {
                id=$(".accomplishment-15")
            }
            else if(init_==2)
            {
                id=$(".accomplishment-16")
            }
            else if(init_==3)
            {
                id=$(".accomplishment-17")
            }
            id.css({"display":"none"})//进行还原
            id.find('.accomplishment-left').css({ left   : '-100%'}).end().find('.accomplishment-right').animate({ left   : '100%'})//进行还原  

        }
        function change(init,id)
        {
            var j=0;//记录一共几行
            var show_;//记录容器
            if(id==14)//判断执行函数的是哪个容器
            {
                j = sumEvent14;
                show_=$(".accomplishment-14")//保留当前是哪个容器
            }
            else if(id==15)
            {
                j = sumEvent15;
                show_=$(".accomplishment-15")
            }
            else if(id==16)
            {
                j = sumEvent16;
                show_=$(".accomplishment-16")
            }
            else if(id==17)
            {
                j = sumEvent17;
                show_=$(".accomplishment-17")
            }

            $(".activity-mid-line").css({"top":clockBoxTop+(init+1)*50,
                                        "height":H-clockBoxTop*2-i*50})
            
                    show_.find(".accomplishment-row").each(function(index){//计算并设置当前时期每行的位置
                        $(this).css({ "top": (H - (clockBoxTop * 2 + (i) * 50)) / (j + 1) * (index + 1) })
                      
                    })

                    

        }
        })

    })   
//（成员介绍页）
var contianerWidth;
$(function(){
    $(".container-member").css({
        "height":$(window).height()
    });
    $(".real-container").css({
        "height":$(window).height()
    });
    if($(window).width()>=1600&&$(window).height()<750){
        $(".container-member").css({
            "height":750
        });
        $(".real-container").css({
            "height":750
        });
    }
    else if($(window).width()<1600&&$(window).height()<610){
        $(".container-member").css({
            "height":610
        });
        $(".real-container").css({
            "height":610
        });
    }
    //对1600分辨率上下当窗口高度小于一定高度时定高
    $(".next-page").css({
        "bottom":0,
        "left":($(".real-container").width()-$(".next-page").width())/2
    });
    /*2个container,初始化高度，下一页按钮初始化位置*/
    $(".choose-year").css({
        "left":($(".all-the-year>div").width()-6.66)/2
    });
    /*使时间轴上表示选中的红色三角居中*/
    var hwRatio=$(".container-member").height()/($(".container-member").width());
    var oriboxWidth=$(".the-year").width();
    var oriboxHeight=$(".the-year").height();
    var oriboxTop=parseFloat($(".year-2011").css("top"));
    var oriboxLeft=parseFloat($(".year-2011").css("left"));
    var oriboxMargin=parseFloat($(".year-2013").css("top"))-parseFloat($(".year-2011").css("top"))
    var chaboxHeight=oriboxWidth*hwRatio;
    var hasClick=0;
    /*记录进入页是否已选择一年，如果是，将其他按钮变成不可点*/
    var usedYear;
    var nowYear;
    var theYear;//用于changePage函数
    var thisyearContainer;
    //包括上面的圆点的每一年成员的container
    var memberContainer;
    var countPage;
    //不包括上面圆点
    var usedPage=0;
    //翻页之前的page
    var nowPage=0;
    //现在的page
    var allData; //所有年份成员的json数据
    var everyyearData = new Array();
    for(var i=0;i<6;i++)    
    everyyearData[i]=new Array();
    //每一年成员的json数据
    var firstGetin=1;
   /* if(hwRatio>886/1900)
        $(".container-member").css({"backgroundSize":"auto 100%"});*/
    $(".year-x").css({
        "height":chaboxHeight,
        "left":($(".container-member").width()-oriboxWidth)/2,
        "top":($(".container-member").height()-chaboxHeight)/2
    });
    $(window).resize(function(){
        $(".container-member").css({
            "height":$(window).height()
        });
        $(".real-container").css({
            "height":$(window).height()
        });
        $(".year-x").css({
            "height":$(window).height()
        });
        if($(window).width()>=1600&&$(window).height()<750){
            $(".container-member").css({
                "height":750
            });
            $(".real-container").css({
                "height":750
            });
            $(".year-x").css({
                "height":750
            });
        }
        else if($(window).width()<1600&&$(window).height()<610){
            $(".container-member").css({
                "height":610
            });
            $(".real-container").css({
                "height":610
            });
            $(".year-x").css({
                "height":610
            });
        }
        hwRatio=$(".container-member").height()/($(".container-member").width());
        if($(window).width()<1600)
        {
            oriboxTop=235;
            oriboxMargin=65;
            oriboxWidth=320;
            oriboxHeight=40;
        }
        else
        {
            oriboxTop=330;
            oriboxMargin=90;
            oriboxWidth=450;
            oriboxHeight=55;
        }
        if($(".change-member").width()!=0)
            for(var i=0;i<6;i++)
            {
                theYear=i;
                countPage=Math.ceil(everyyearData[i].length/4);
                measureUl();
            }
        chaboxHeight=oriboxWidth*hwRatio;
        if($(window).width()<=980)
            oriboxLeft=0.15*980;
        else if($(window).width()<=1050)
            oriboxLeft=0.15*$(window).width();
        else if($(window).width()<=1205)
            oriboxLeft=0.18*$(window).width();
        else
            oriboxLeft=0.223*$(window).width();
        chaboxHeight=oriboxWidth*hwRatio;
        //在窗口大小改变时获取the-year的长宽比例等
        for(var i=0;i<6;i++)
        {
            $(".the-year:eq("+i+")").css({
                "width":oriboxWidth,
                "height":oriboxHeight,
                "top":oriboxTop+Math.floor(i/2)*oriboxMargin,
            });
            if(i%2==0)
                $(".the-year:eq("+i+")").css({
                    "left":oriboxLeft
                });
            else
                $(".the-year:eq("+i+")").css({
                    "left":$(".container-member").width()-oriboxWidth-oriboxLeft,
                    "right":oriboxLeft
                });
        }
        //在窗口大小改变时改变the-year的长宽位置等
        $(".next-page").css({
            "bottom":0,
            "left":($(".real-container").width()-$(".next-page").width())/2
        });
        //使各元素在正确的位置上
        $(".about-member-allyear").css({
            "marginLeft":-$(".about-member-everyyear").width()*nowYear
        });
        $(".member-timeline").css({
            "marginLeft":0.5*$(".real-container").width()-nowYear*0.2*$(".member-timeline-line").width()
        });
        //使时间轴,成员展示在正确的位置
        if($(".year-x").width()<$(".container-member").width())
        $(".year-x").css({
            "width":oriboxWidth,
            "height":chaboxHeight,
            "left":($(".container-member").width()-oriboxWidth)/2,
            "top":($(".container-member").height()-chaboxHeight)/2
        });
        
    })
    /*改变浏览器宽度时重新初始化*/
    var arrowChange=setInterval(arrowShow,2000);
    function arrowShow(){
        $(".next-page-arrow").animate({opacity:0},1000,function(){
            $(this).animate({opacity:1},1000);
        });
    }
    /*翻页按钮闪烁效果*/
    $(".the-year").click(function(){

        if(hasClick) return;
        hasClick=1;
        nowYear=$(".the-year").index(this);
        var otherYear=$(".the-year").not($(".the-year:eq("+nowYear+")"));
        $(this).css({
            "zIndex":2
        });
        $(this).animate({
            height:chaboxHeight,
            top:parseFloat($(this).css("top"))-(chaboxHeight-oriboxHeight)/2
        },100,toCenter);
        $(this).find("p").animate({
            marginTop:(chaboxHeight-oriboxHeight)/2
        },100);
        otherYear.animate({
            opacity:0.5
        },100);
        //将选中的方框变成宽不变，与页面宽度比例相同的框
        function toCenter(){
            $(this).animate({
                left:($(".container-member").width()-oriboxWidth)/2,
                top:($(".container-member").height()-chaboxHeight)/2
            },200,fillScreen);
            $(this).find("p").fadeOut(200);
        }
        //将框移到中间
        function fillScreen(){
            $(this).css({"display":"none"});
            $(".year-x").css({
                "display":"block",
                "left":($(".container-member").width()-oriboxWidth)/2,
                "top":($(".container-member").height()-chaboxHeight)/2
            });
            $(".year-x").animate({
                width:"100%",
                height:$(".container-member").height(),
                top:0,
                left:0
            },300,initial);
            //$(".real-container").fadeIn(700,initial);
        }
        function initial(){
            /*初始化页面*/
            $(".real-container").fadeIn(400);
            usedPage=0;
            nowPage=0;
            $(".navigation li").css({"color":"black"});
            memberFlag=true;
            $(".choose-year").css({
                "display":"none"
            });
            $(".choose-year:eq("+nowYear+")").css({
                "display":"block"
            });
            $(".all-the-year p").css({
                "fontSize":"14px",
                "color":"#999"
            })
            $(".all-the-year p:eq("+nowYear+")").css({
                "fontSize":"16px",
                "color":"#e94e1b"
            });
            $(".member-timeline").css({
                "marginLeft":0.5*$(".container-member").width()-nowYear*0.2*$(".member-timeline-line").width()
            });
            //初始化时间轴
            $(".about-member-allyear").css({
                "marginLeft":-$(".about-member-everyyear").width()*nowYear
            });
            //初始化到点击那一年的成员
            $(".the-year:eq("+nowYear+")").css({
                "display":"block",
                "width":oriboxWidth,
                "height":oriboxHeight,
                "top":oriboxTop+Math.floor(nowYear/2)*oriboxMargin,
            })
            $(".the-year:eq("+nowYear+")").find("p").css({
                "display":"block",
                "marginTop":0
            });
            if(nowYear%2==0)
                $(".the-year:eq("+nowYear+")").css({
                    "left":oriboxLeft
                });
            else
                $(".the-year:eq("+nowYear+")").css({
                    "left":$(".container-member").width()-oriboxWidth-oriboxLeft,
                    "right":oriboxLeft
                });
            $(".the-year").css({
                "zIndex":0,
                "opacity":1
            });
            //将the-year回到原来的大小和位置
            hasClick=0;
            $(".member-title-2 h2").css({"color":"black"});
            if(firstGetin){
                firstGet(); //初始获取成员
                firstGetin=0;
            }
            else{
                thisyearContainer=$(".about-member-everyyear:eq("+nowYear+")");
                memberContainer=thisyearContainer.find(".member-container");
            }
        }
        //换成.year-x，并使real-container淡入
    })
    $(".member-title-2 h2").click(function(){
         memberFlag=false;
        $(".navigation li").css({"color":"white"});
        $(this).css({"color":"#e94e1b"});
        $(".year-x").fadeOut(300,comeback);
        $(".real-container").css({"display":"none"});
        function comeback(){
            $(".year-x").css({
                "width":oriboxWidth,
                "height":chaboxHeight,
                "left":($(".container-member").width()-oriboxWidth)/2,
                "top":($(".container-member").height()-chaboxHeight)/2
            });
            //将year-x变回原来的大小，页面居中位置
            usedPage=0;
            nowPage=0;
            theYear=nowYear;
            changePage();
            thisyearContainer.find("li").css({
                "background":"rgb(204,204,204)"
            });
            thisyearContainer.find("li:eq(0)").css({
                "background":"#e94e1b"
            });
            //返回前页时将当前年份返回第一页

        }
    })
    $(".all-the-year>div").click(function(){
        usedYear=nowYear;
        nowYear=$(".all-the-year>div").index(this);
        if(usedYear==nowYear)
            return;
        moveTimeline();//根据选择的年份移动时间轴
        moveMember();//左右移动切换不同年份的成员
    })
    function moveTimeline(){
        $(".choose-year").css({
            "display":"none"
        });
        $(".choose-year:eq("+nowYear+")").css({
            "display":"block"
        });
        $(".all-the-year p").css({
            "fontSize":"14px",
            "color":"#999"
        })
        $(".all-the-year p:eq("+nowYear+")").css({
            "fontSize":"16px",
            "color":"#e94e1b"
        });
        $(".member-timeline").stop().animate({
            "marginLeft":0.5*$(".real-container").width()-nowYear*0.2*$(".member-timeline-line").width()
        },700);
    }
    function moveMember(){
        $(".about-member-allyear").stop(false,true).animate({
            marginLeft:-$(".about-member-everyyear").width()*nowYear
        },700,usedReturn);
    }
    function usedReturn(){
        usedPage=0;
        nowPage=0;
        thisyearContainer=$(".about-member-everyyear:eq("+usedYear+")");
        memberContainer=thisyearContainer.find(".member-container");
        //更换选择另一年的container
        theYear=usedYear;
        changePage();
        thisyearContainer.find("li").css({
            "background":"rgb(204,204,204)"
        });
        thisyearContainer.find("li:eq(0)").css({
            "background":"#e94e1b"
        });
        thisyearContainer=$(".about-member-everyyear:eq("+nowYear+")");
        memberContainer=thisyearContainer.find(".member-container");
    }
    //移动时间轴后过去的一年回到成员第一页
    function firstGet()
    {
        $.ajax({
            type: "GET",
            url: "../Ajax/MemberHandler.ashx",
            data: { MemberYear: 0 },
                //发送给后台，请求第几页信息，每页信息多大
                //dataType:"json",
            async: true,
            success: function (dat){
                allData=JSON.parse(dat);
                var j=0;
                var k=0;
                for(var i=0;i<allData.length;i++)
                {
                    if(allData[i].MemberYear==2011+j)
                    {
                        everyyearData[j][k]=allData[i];
                        k++;
                    }
                    else{
                        j++;
                        k=0;
                        everyyearData[j][k]=allData[i];
                        k++;
                    }
                }
                //j为年份，0代表2011，k为该年第几人
                appendFirstpage();
                theYear=nowYear;
                thisyearContainer=$(".about-member-everyyear:eq("+nowYear+")");
                memberContainer=thisyearContainer.find(".member-container");
                //选择该年的container,便于同一年份时切页
            }           
        })
    }
    function appendFirstpage(){
        for( theYear=0;theYear<6;theYear++)
        {
            thisyearContainer=$(".about-member-everyyear:eq("+theYear+")");
            memberContainer=thisyearContainer.find(".member-container");
            countPage=Math.ceil(everyyearData[theYear].length/4);
            //计算每年有几页
            measureUl();
            if(countPage!=1)
            {
                var changeLeft=$("<img>").attr("src","images/left.png").addClass("change-member-button").addClass("change-member-left").appendTo(thisyearContainer.find(".change-member"));
                for(var i=0;i<countPage;i++){
                    var changePageli=$("<li>").appendTo(thisyearContainer.find(".change-member"));
                 }
                var changeRight=$("<img>").attr("src","images/right.png").addClass("change-member-button").addClass("change-member-right").appendTo(thisyearContainer.find(".change-member"));
            }
            else{
                var changePageli=$("<li>").appendTo(thisyearContainer.find(".change-member"));
            }
            //根据每年的人数确定圆钮的个数，位置
            thisyearContainer.find("li").css({
                "background":"rgb(204,204,204)"
            });
            thisyearContainer.find("li:eq(0)").css({
                "background":"#e94e1b"
            });
            //确定圆钮的颜色
            changePage();//当前为每年第0页，调用翻页函数
        }
    }
    function measureUl(){
        if(countPage!=1)
        {
            if($(".container-member").width()>=1600)
                $(".change-member:eq("+theYear+")").css({
                    "width":29*countPage+84
                });
            else
                $(".change-member:eq("+theYear+")").css({
                    "width":26*countPage+68
                });
        }
        else{
            if($(".container-member").width()>=1600)
                $(".change-member:eq("+theYear+")").css({
                    "width":29*countPage
                });
            else
                $(".change-member:eq("+theYear+")").css({
                    "width":26*countPage
                });
        }
    }
    function changePage()
    {
        memberContainer.empty();
        //清除原有的成员
        var thispageMember;
        var thisyearData=everyyearData[theYear];//这一年所有成员信息
        var memberNumber=everyyearData[theYear].length;//这一年成员数
        if(memberNumber-nowPage*4<4)
            thispageMember=memberNumber-nowPage*4;
        else
            thispageMember=4;
        for(var i=nowPage*4;i<nowPage*4+thispageMember;i++)
        {
            var everyMember=$("<div>").addClass("every-member").appendTo(memberContainer);
                    var everyMemberin=$("<div>").addClass("every-member-in").appendTo(everyMember);
                    var wholeinfor=$("<div>").addClass("clearfix").appendTo(everyMemberin);
                    var memberimage = $("<img>").attr("src", "../BackStage/Backstage/" + thisyearData[i].MemberImage).appendTo(wholeinfor);
                        var memberInfor=$("<div>").addClass("member-infor").appendTo(wholeinfor);
                            var memberBasic=$("<div>").addClass("member-basic").appendTo(memberInfor);
                                var memberName=$("<h1>").text(thisyearData[i].MemberName).appendTo(memberBasic);
                                var memberDepart=$("<h2>").text(thisyearData[i].MemberDepartment).appendTo(memberBasic);
                            var memberIntro=$("<p>").text(thisyearData[i].MemberInstruction).addClass("member-introduction").appendTo(memberInfor);
        }
        if(thispageMember==2)
            thisyearContainer.find(".every-member:eq(0)").css({
                "marginLeft":"25%"
            });
        else{
            thisyearContainer.find(".every-member:eq(0)").css({
                "marginLeft":0
            });
        }
    }
    $(".member-title-2 h2").mouseenter(function(){
        $(this).css({"color":"#e94e1b"});
    })
    $(".member-title-2 h2").mouseleave(function(){
        $(this).css({"color":"black"});
    })
    //鼠标移到成员介绍页上面时变色
    $(".change-member").delegate("li","click",function(){
        var thispageMember;
        usedPage=nowPage;
        nowPage=thisyearContainer.find(".change-member li").index(this);
        if(usedPage==nowPage)
            return;
        thisyearContainer.find("li").css({
            "background":"rgb(204,204,204)"
        });
        thisyearContainer.find("li:eq("+nowPage+")").css({
            "background":"#e94e1b"
        });
        //使得该页的圆钮变色
        theYear=nowYear;
        changePage();//翻页
    })
   $(".change-member").delegate(".change-member-right","click",function(){
        var thispageMember;
        usedPage=nowPage;
        if(nowPage==Math.ceil(everyyearData[nowYear].length/4)-1)
            nowPage=0;
        else
            nowPage++;
        thisyearContainer.find("li").css({
            "background":"rgb(204,204,204)"
        });
        thisyearContainer.find("li:eq("+nowPage+")").css({
            "background":"#e94e1b"
        });
        //使得该页的圆钮变色
        theYear=nowYear;
        changePage();//翻页
    })
    $(".change-member").delegate(".change-member-left","click",function(){
        var thispageMember;
        usedPage=nowPage;
        if(nowPage==0)
            nowPage=Math.ceil(everyyearData[nowYear].length/4)-1;
        else
            nowPage--;
        thisyearContainer.find("li").css({
            "background":"rgb(204,204,204)"
        });
        thisyearContainer.find("li:eq("+nowPage+")").css({
            "background":"#e94e1b"
        });
        //使得该页的圆钮变色
        theYear=nowYear;
        changePage();//翻页
    })
    $(".change-member").delegate("li","mouseenter",function(){
        $(this).css({"background":"#e94e1b"});
    })
    $(".change-member").delegate("li","mouseleave",function(){
        var thisIndex=thisyearContainer.find("li").index(this);
        if(thisIndex!=nowPage)
            $(this).css({"background":"rgb(204,204,204)"});
    })
    //鼠标遇到圆钮上变色，移开时如不是当前页变灰
    var wholeTime=400;
    //鼠标移到成员上时，显示信息,移开后显示图片
    $(".member-container").delegate(".every-member-in","mouseenter",function(){
        if(!$(this).children("div").is(":animated"))
        {
            $(this).children("div").stop(false,false).animate({
                marginLeft:"-60%"
            },300);
            $(this).find(".member-infor").stop(false,false).animate({
                marginLeft:"-10%"
            },300);
        }
    })
    $(".member-container").delegate(".every-member-in","mouseleave",function(){
        var needTime=parseFloat($(this).children("div").css("marginLeft"))/($(".every-member-in").width()*0.6)*wholeTime;
            $(this).children("div").stop(false,false).animate({
                marginLeft:0
            },300);
            $(this).find(".member-infor").stop(false,false).animate({
                marginLeft:0
            },300);
    })
})
//给翻页按钮定位
$(document).ready(function(){
    $(".next-page").css({
        "bottom":0,
        "left":($(".container-member").width()-$(".next-page").width())/2
    });
    contianerWidth=$(".container-member").width();
    $(window).resize(function(){
        contianerWidth=$(".container-member").width();
        $(".next-page").css({
            "bottom":0,
            "left":($(".container-member").width()-$(".next-page").width())/2
        });
    })
})
//（留言板页）

var footerShow = false;
function f_refreshtype() {
    var Image1 = document.getElementById("img");
    if (Image1 != null) {
        Image1.src = Image1.src + "?";
    }
}
function isIE() {
 if (!!window.ActiveXObject || "ActiveXObject" in window)
  return true;
  else
  return false;
 }
 //判断是否为IE浏览器
$(function () {
    var i = 0;
    var overLoad = false; //是否重载留言
    var thechoosen = 0;
    var afterLength = 0;
    appendcomment();
    $(".container-comments").css({
        "height": $(window).height(),
        "width": "100%"
    });
    $(".bottom-tip").css({
        "width": $(".comments-contain").width()
    });
    $(".comments-contain").mCustomScrollbar({
        theme: "dark-thick",
        callbacks: {
            whileScrolling: function () {      　// 只要滚动条滚动，这个函数就会执行
                if ($("#mCSB_1_container").height() - $(".comments-contain").height() + parseInt($("#mCSB_1_container").css("top")) < 40) {    // 这表示当滚动条滚动到这个div的90%(当然这个值是可变的)的时候调用下面的代码，
                    appendcomment();
                }
            }
        }
    });
    //在滚动条距离底部40以内时请求数据
    $(window).resize(function () {
        if ($(window).width() > 980) {
            $(".container-comments").css({
                "height": $(window).height(),
                "width": "100%"
            });
        }
        else {
            $(".container-comments").css({

                "height": $(window).height()
            });
        }
    })
    //随着屏幕大小变化 控制container变化
    var canComment=1;
    function canClick(){
        canComment=1;
        $(".submit-comment").css({"background":"#e94e1b"});
    }
    //回调成功再执行 避免因为在弹出alert前多点击弹出多次alert情况
    $(".submit-comment").click(function () {
        if ($(".comment-forus-content").val() == "(请不要超过140个字)") {
            alert("留言不能为空！");
            f_refreshtype();
        }
        else if ($(".enter-code").val() == "请输入图片中的字符") {
            alert("请输入验证码");
            f_refreshtype();
        }
        else {
            var msg = $(".comment-forus-content").val();
            var curLength = msg.length;
            if (curLength > 140)
            {
                cutMessage();
                f_refreshtype();//需要更换验证码
                //afterLength=curLength;
                return;
            }
            //afterLength=curLength;
            msg = htmlEncodeJQ(msg);
            //将留言内容中的特殊符号替代
            if(!canComment) return;
            canComment=0;
            $(this).css({"background":"#666"});
            console.log(thechoosen);
            $.ajax({
                type: "GET",
                url: "../Ajax/PushMessageHandler.ashx",
                data: { captcha: $(".enter-code").val(), picture: thechoosen, comment: msg },
                //依次为验证码，第几个头像，留言
                async: true,
                success: function (data) {
                    console.log(data);
                    if (data == "0") {
                        alert("操作失败！");
                        f_refreshtype();//需要更换验证码
                        $(".enter-code").val("请输入图片中的字符");
                    }
                    else if (data == "1") {
                        alert("操作过于频繁！");
                        f_refreshtype();//需要更换验证码
                        $(".enter-code").val("请输入图片中的字符");
                    }
                    else if (data == "2") {
                        alert("留言不合法！");
                        f_refreshtype();//需要更换验证码
                        $(".enter-code").val("请输入图片中的字符");
                    }
                    else if (data == "3") {
                        alert("验证码错误！");
                        f_refreshtype();//需要更换验证码
                        $(".enter-code").val("请输入图片中的字符");
                    }
                    else {
                        alert("留言成功！");
                        f_refreshtype();//需要更换验证码
                        $(".enter-code").val("请输入图片中的字符");
                        $(".comment-forus-content").val("(请不要超过140个字)");
                        $(".photo-tick").css({
                            "left": firstP
                        });
                        $(".pop-comment").slideUp(300);
                        if(!isIE())
                            $(".container-comments").removeClass("container-comments-blur");
                        $(".navigation").css({ "visibility": "visible" });
                        $(".navigation-box").css({ "visibility": "visible" });
                        //关闭弹窗
                        overLoad = true;
                        appendcomment();
                    }
                    canClick();
                }
            });
        }
    })
    $(".cancel-comment").click(function () {
        f_refreshtype();//需要更换验证码
        $(".pop-comment").slideUp(300);
        if(!isIE())
            $(".container-comments").removeClass("container-comments-blur");
        $(".navigation").css({ "visibility": "visible" });
        $(".navigation-box").css({ "visibility": "visible" });
        //关闭弹窗
        $(".enter-code").val("请输入图片中的字符");
    })
    function htmlEncodeJQ(str) {
        return $('<span/>').text(str).html();
    }
    function htmlDecodeJQ(str) {
        return $('<span/>').html(str).text();
    }
    //编码和解码，防止例如<script>的js注入

    function appendcomment() {
        if (!overLoad)
            i++;
        else {
            i = 1;
            overLoad = false;
            $(".comments-contain-in").find(".every-comment").remove();
        }
        $.ajax({
            type: "POST",
            url: "../Ajax/MessageHandler.ashx",
            data: { pageNumber: i, pageSize: 4 },
            async: true,
            success: function (dat) {
                if (dat == "[]") {
                    $(".bottom-tip").css({
                        "display": "block"
                    });
                }
                else {
                    $(".bottom-tip").css({
                        "display": "none"
                    });
                    jsonObj = JSON.parse(dat);
                    for (var j = 0; j < jsonObj.length; j++) {
                        var everyComments = $("<div>").addClass("every-comment").addClass("clearfix").appendTo($(".comments-contain-in"));
                        var commentsPhoto = $("<div>").addClass("comments-photo").appendTo(everyComments);
                        var commentsPhotoin = $("<div>").appendTo(commentsPhoto);
                        var commentsImg = $("<img>").attr("src", jsonObj[j].MessagePhoto).appendTo(commentsPhotoin);
                        var commentsTime = $("<p>").text(jsonObj[j].MessageTime.replace("T", " ")).appendTo(commentsPhoto);
                        var commentsComment = $("<div>").addClass("comments-comment").appendTo(everyComments);
                        var Content = htmlDecodeJQ(jsonObj[j].MessageContent);
                        var visitorcomments = $("<p>").text(Content).addClass("visitor-comment").appendTo(commentsComment);
                        var adminReply = $("<div>").addClass("admin-reply").addClass("clearfix").appendTo(commentsComment);
                        if (jsonObj[j].MessageComment != null) {
                            var replyH = $("<h3>").text("管理员回复").appendTo(adminReply);
                            var reliyP = $("<p>").text(jsonObj[j].MessageComment).appendTo(adminReply);
                        }

                    }
                }
            }
        })
    }
    $(".pop-comment").css({
        "width": $(window).width(),
        "height": $(window).height()
    });
    $(".close-comment-pop").css({
        "right": ($(".container-comments").width() - $(".pop-comment-in").width()) / 2 + $(".close-comment-pop").width()
    });

    $(".pop-comment-in").css({
        "top": ($(".container-comments").height() - $(".pop-comment-in").height()) / 2,
        "left": ($(".container-comments").width() - $(".pop-comment-in").width()) / 2
    });
    $(window).resize(function () {
        $(".bottom-tip").css({
            "width": $(".comments-contain").width()
        });
        $(".pop-comment").css({
            "width": $(window).width(),
            "height": $(window).height()
        });
        $(".pop-comment-in").css({
            "top": ($(".container-comments").height() - $(".pop-comment-in").height()) / 2,
            "left": ($(".container-comments").width() - $(".pop-comment-in").width()) / 2
        });
        $(".close-comment-pop").css({
            "right": ($(".container-comments").width() - $(".pop-comment-in").width()) / 2 + $(".close-comment-pop").width()
        })
    })
    $(".comment-now").click(function () {
        $(".pop-comment").slideDown(300);
        if(!isIE())
            $(".container-comments").addClass("container-comments-blur");
        else
            $(".pop-comment-back").css({"background":"rgba(255,255,255,0.85)"});
        $(".navigation").css({ "visibility": "hidden" });
        $(".navigation-box").css({ "visibility": "hidden" });
        //$(".navigation").css({"display":"none"});
        //$(".navigation-box").css({"display":"none"});
    })
    $(".close-comment-pop").click(function () {
        $(".pop-comment").slideUp(300);
        if(!isIE())
            $(".container-comments").removeClass("container-comments-blur");
        $(".navigation").css({ "visibility": "visible" });
        $(".navigation-box").css({ "visibility": "visible" });
        //$(".navigation").css({"display":"block"});
        //$(".navigation-box").css({"display":"block"});
    })
    //弹窗效果


   
    $(".comment-forus-content").keydown(function () {
       var curLength = $(".comment-forus-content").val().length;
        if (curLength > 140 && curLength > afterLength){
            cutMessage();
        }
        afterLength = $(this).val().length;
    })
    function cutMessage()
    {
        var num = $(".comment-forus-content").val().substring(0, 140);
        //num是最终截出来的不多于140字的字符串
        $(".comment-forus-content").val(num);
        alert("字数太多了！");      
    }
    //控制截断不超过140字
    $(".comment-forus-content").focus(function () {
        if (this.value == "(请不要超过140个字)")
            $(this).val("");
    })
    $(".comment-forus-content").blur(function () {
        if ($(this).val() == "")
            $(this).val("(请不要超过140个字)");
    })
    $(".enter-code").focus(function () {
        if (this.value == "请输入图片中的字符")
            $(this).val("");
    })
    $(".enter-code").blur(function () {
        if ($(this).val() == "")
            $(this).val("请输入图片中的字符");
    })

    var firstP=13;
    $(".photo-photos").click(function () {
        thechoosen = $(".photo-photos").index(this);
        $("#photoIndex").val(thechoosen);
        //被选中的头像是第几个（0开始标记）
        $(".photo-tick").css({
            "left": firstP + thechoosen * $(".photo-photos").width()
        });
    })
    //选择头像

    var scollTopSum = 0, scollBottomSum = 0;
    $('.container-comments').bind('mousewheel', function (event, delta) {
        if (delta < 0 && (!$(".footer").is(":animated"))) {
            if (!footerShow) {
                $(".footer").stop(false, true).animate({
                    "bottom": 0
                }, 200, function () {
                    footerShow = true;
                });
            }

        }
        else if (delta > 0 && (!$(".footer").is(":animated"))) {
            if (footerShow) {
                $(".footer").stop(false, true).animate({
                    "bottom": -$(".footer").height()
                }, 200, function () {
                    footerShow = false;
                });
            }

        }

    });
    // function scollTop() {//鼠标滚轮事件    
    //     if (scollTopSum == 3) {
    //         window.location.href = "MemberShow.aspx";
    //     }
    //     var timer = setTimeout(function () {
    //         scollTopSum = 0;
    //     }, 500)

    // }
       //点击切换验证码
	    function f_refreshtype() {
	        var Image1 = document.getElementById("img");
	        if (Image1 != null) {
	            Image1.src = Image1.src + "?";
	        }
	    }

})
//（加载）
$(function(){
	$(".loading-page").css({
		"height":$(window).height()
	});
	$(window).resize(function(){
		$(".loading-page").css({
			"height":$(window).height()
		});
	})
	for(var i=0;i<5;i++)
	{
		$(".loading-ellipsis img:eq("+i+")").css({
			"left":(0.03+0.2*i)*$(".loading-ellipsis").width()
		});
	}
	var j=0;
	var couting=setInterval(showEllipsis,300);
	function showEllipsis(){
		if(j!=5)
		{
			$(".loading-ellipsis img:eq("+j+")").css({
				"display":"block"
			});
		}
		else{
			for(var i=0;i<5;i++)
			{
				$(".loading-ellipsis img:eq("+i+")").css({
					"display":"none"
				});
			}
			j=-1;
		}
		j++;
	}
	var startTime;
	var lastTime;
	var timeGap;
	var loader = new resLoader({
		resources : [
			'images/background.png',
			'images/Ground.png'/*,
			'images/backboard.png',
			'images/member.png',*/

		],
		onStart : function(total){
			startTime=new Date();
		},
		onProgress : function(current, total){
		},
		onComplete : function(total){
			clearInterval(couting);
			lastTime=new Date();
			for(var i=0;i<5;i++)
			{
				$(".loading-ellipsis img:eq("+i+")").css({
					"display":"block"
				});
			}
			setTimeout(showIndex,200);
			function showIndex(){
				$("#fullpage").css({"visibility":"visible"});
				$(".navigation-section3").css({"visibility":"visible"});
				$(".loading-page").css({"display":"none"});		
				if(lastTime-startTime>300)
					window.location.hash="#page1";
			}
		}
	});

	loader.start();
})
//（留言板滚动条插件）
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
//（加载插件）
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(root 即 window)
        root.resLoader = factory(root);
    }
}(this, function () {
    var isFunc = function(f){
        return typeof f === 'function';
    }
    //构造器函数
    function resLoader(config){
        this.option = {
            resourceType : 'image', //资源类型，默认为图片
            baseUrl : './', //基准url
            resources : [], //资源路径数组
            onStart : null, //加载开始回调函数，传入参数total
            onProgress : null, //正在加载回调函数，传入参数currentIndex, total
            onComplete : null //加载完毕回调函数，传入参数total
        }
        if(config){
            for(i in config){
                this.option[i] = config[i];
            }
        }
        else{
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    };

    resLoader.prototype.start = function(){
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for(var i=0,l=this.option.resources.length; i<l; i++){
            var r = this.option.resources[i], url = '';
            if(r.indexOf('http://')===0 || r.indexOf('https://')===0){
                url = r;
            }
            else{
                url = baseUrl + r;
            }

            var image = new Image();
            image.onload = function(){_this.loaded();};
            image.onerror = function(){_this.loaded();};
            image.src = url;
        }
        if(isFunc(this.option.onStart)){
            this.option.onStart(this.total);
        }
    }

    resLoader.prototype.loaded = function(){
        if(isFunc(this.option.onProgress)){
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if(this.currentIndex===this.total){
            if(isFunc(this.option.onComplete)){
                this.option.onComplete(this.total);
            }
        }
    }

    //暴露公共方法
    return resLoader;
}));
//（作品页插件）
(function(jq){

	  var H = $(window).height();
	    var firstpageW = 500;
	    var firstpageH = firstpageW * 0.8;
	    var secondpageW = firstpageW * 0.8;
	    var secondpageH = secondpageW * 0.8;
	   if (H > 800) {
	            firstpageW = 500;
	            firstpageH = firstpageW * 0.8;
	            secondpageW = firstpageW * 0.8;
	            secondpageH = secondpageW * 0.8;
	            $(".show-box").css({"top":120})
	            $("#posterTvGrid").css({"top":50})
	             $(".next-btn-circle").css({"right":-540})
	              $(".prev-btn-circle").css({"left":-540})
	              $(".next-page-arrow-left").css({"left":-532})
	              $(".next-page-arrow-right").css({"right":-532})
	            
	        }
	         else if (H <= 800 && H > 700) {
	            firstpageW = 460;
	            firstpageH = firstpageW * 0.8;
	            secondpageW = firstpageW * 0.8;
	            secondpageH = secondpageW * 0.8;
	              $(".show-box").css({"top":100})
	              $("#posterTvGrid").css({"top":40})
	             $(".next-btn-circle").css({"right":-530})
	              $(".prev-btn-circle").css({"left":-530})
	              $(".next-page-arrow-left").css({"left":-522})
	              $(".next-page-arrow-right").css({"right":-522})


	        }
	    else if (H <= 700 && H > 600) {
	        firstpageW = 400;
	        firstpageH = firstpageW * 0.8;
	        secondpageW = firstpageW * 0.8;
	        secondpageH = secondpageW * 0.8;
	        $(".show-box").css({"top":80})
              $("#posterTvGrid").css({"top":10})
             $(".next-btn-circle").css({"right":-470})
              $(".prev-btn-circle").css({"left":-470})
              $(".next-page-arrow-left").css({"left":-462})
              $(".next-page-arrow-right").css({"right":-462})


	    }
	    else if (H <= 600 && H > 550) {
	        firstpageW = 320;
	        firstpageH = firstpageW * 0.8;
	        secondpageW = firstpageW * 0.8;
	        secondpageH = secondpageW * 0.8;
	         $(".show-box").css({"top":70})
              $("#posterTvGrid").css({"top":20})
             $(".next-btn-circle").css({"right":-480})
              $(".prev-btn-circle").css({"left":-480})
              $(".next-page-arrow-left").css({"left":-472})
              $(".next-page-arrow-right").css({"right":-472})

	    }
	    else  {
	        firstpageW = 280;
	        firstpageH = firstpageW * 0.8;
	        secondpageW = firstpageW * 0.8;
	        secondpageH = secondpageW * 0.8;
	        $(".show-box").css({"top":60})
              $("#posterTvGrid").css({"top":5})
             $(".next-btn-circle").css({"right":-400})
              $(".prev-btn-circle").css({"left":-400})
              $(".next-page-arrow-left").css({"left":-392})
              $(".next-page-arrow-right").css({"right":-392})


	    }
	    $(window).resize(function () {
	        H = $(window).height();
	        if (H > 800) {
	            firstpageW = 500;
	            firstpageH = firstpageW * 0.8;
	            secondpageW = firstpageW * 0.8;
	            secondpageH = secondpageW * 0.8;
	            $(".show-box").css({"top":120})
	            $("#posterTvGrid").css({"top":50})
	             $(".next-btn-circle").css({"right":-540})
	              $(".prev-btn-circle").css({"left":-540})
	              $(".next-page-arrow-left").css({"left":-532})
	              $(".next-page-arrow-right").css({"right":-532})
	            
	        }
	         else if (H <= 800 && H > 700) {
	            firstpageW = 460;
	            firstpageH = firstpageW * 0.8;
	            secondpageW = firstpageW * 0.8;
	            secondpageH = secondpageW * 0.8;
	              $(".show-box").css({"top":100})
	              $("#posterTvGrid").css({"top":40})
	             $(".next-btn-circle").css({"right":-530})
	              $(".prev-btn-circle").css({"left":-530})
	              $(".next-page-arrow-left").css({"left":-522})
	              $(".next-page-arrow-right").css({"right":-522})


	        }
	    else if (H <= 700 && H > 600) {
	        firstpageW = 400;
	        firstpageH = firstpageW * 0.8;
	        secondpageW = firstpageW * 0.8;
	        secondpageH = secondpageW * 0.8;
	        $(".show-box").css({"top":80})
              $("#posterTvGrid").css({"top":10})
             $(".next-btn-circle").css({"right":-470})
              $(".prev-btn-circle").css({"left":-470})
              $(".next-page-arrow-left").css({"left":-462})
              $(".next-page-arrow-right").css({"right":-462})


	    }
	    else if (H <= 600 && H > 550) {
	        firstpageW = 320;
	        firstpageH = firstpageW * 0.8;
	        secondpageW = firstpageW * 0.8;
	        secondpageH = secondpageW * 0.8;
	         $(".show-box").css({"top":70})
              $("#posterTvGrid").css({"top":20})
             $(".next-btn-circle").css({"right":-480})
              $(".prev-btn-circle").css({"left":-480})
              $(".next-page-arrow-left").css({"left":-472})
              $(".next-page-arrow-right").css({"right":-472})

	    }
	    else  {
	        firstpageW = 280;
	        firstpageH = firstpageW * 0.8;
	        secondpageW = firstpageW * 0.8;
	        secondpageH = secondpageW * 0.8;
	        $(".show-box").css({"top":60})
              $("#posterTvGrid").css({"top":5})
             $(".next-btn-circle").css({"right":-400})
              $(".prev-btn-circle").css({"left":-400})
              $(".next-page-arrow-left").css({"left":-392})
              $(".next-page-arrow-right").css({"right":-392})


	    }
	    })

	var posterTvGrid = function(o, options, data){
		this.parent = jq("#"+ o);
		this.body   = jq("body");
		if (this.parent.length <= 0) { 
			return false;
		}
		
		this.options = jq.extend({}, posterTvGrid.options, options);
		if(typeof(data) !== 'object') return false;

		this.data = data || {};
		this.reset();
		//处理页面resize
		var _this = this;
		jq(window).resize(function(){
				_this.reset();
		});
	};
	posterTvGrid.prototype = {
		reset: function(options){

			if(typeof(options) == 'object'){
				jq.extend(this.options, options);

			}

			this.options.width = firstpageW+secondpageW;
			this.options.height = firstpageH+30;	
			this.total = this.data.length;
			this.pageNow = this.options.initPage;
			this.preLeft = 0;
			this.nextLeft = this.options.width-secondpageW;

			this.preNLeft = -secondpageW;
			this.nextNLeft = this.options.width;
			this.pageNowLeft = (this.options.width-firstpageW)/2
			this.drawContent();
		},
		drawContent: function(){
			this.parent.empty();
			this.parent.css({width:this.options.width+"px", height:this.options.height+"px", position: "relative"});
			this.content = document.createElement("DIV");
			this.content.className = this.options.className;
			this.content.cssText = "width:"+this.options.width+"px;height:"+this.options.height+"px;cursor:move;position:absolute;";
				this.bannerControls = '<div class="bannerControls"> <div class="leftNav" style="display: block;"></div> <div class="rightNav" style="display: block;"> </div> </div>';
				this.content.innerHTML += this.bannerControls;

			this.contentHolder = document.createElement("DIV");
			this.contentHolder.style.width = this.options.width + 'px';
			this.contentHolder.style.height = this.options.height + 'px';
			
			for(var item=0, i = 1, l= this.data.length ; item < l ; ++item, ++i){
				var contentHolderUnit = document.createElement("DIV");
				contentHolderUnit.className = "contentHolderUnit"; 
				contentHolderUnit.setAttribute("ref", i);
				contentHolderUnit.setAttribute("id", 'contentHolderUnit' + (i));
				var unitItem 
				if(this.data[item].url=="")
				{
					unitItem= '<a href="#" class="elementLink">'

				} 
				else{
					unitItem= '<a href="'+this.data[item].url+'" target="_blank" class="elementLink">';
				}
				unitItem += '<p class="Url">';
				unitItem += this.data[item].passage;
				unitItem += '</p>';
				unitItem += '</a>';
				unitItem += '<img src="'+this.data[item].img+'" alt="'+this.data[item].title+'"/>';
				unitItem += '<span class="elementOverlay"></span>';
				unitItem += '<span class="leftShadow"></span>';
				unitItem += '<span class="rightShadow"></span>';
				contentHolderUnit.innerHTML = unitItem;
				this.contentHolder.appendChild(contentHolderUnit);
			}
			this.content.appendChild(this.contentHolder);
			this.parent.append(this.content);
			this.parent.css({overflow:'hidden'});
			this.initContent();
			this.bind();
			this.start();
		},
		initContent: function(){
			contentHolderUnit = this.parent.find(".contentHolderUnit");
			contentHolderUnit.css({width:'0px',height:'0px', opacity: 0, left:this.options.width/2+'px', zIndex:0, marginTop: '135px'});
			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+")").css({width:firstpageW,height:firstpageH, opacity: 1, left: this.pageNowLeft+'px', zIndex: 3, marginTop: 0});
			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .elementOverlay").css({opacity:0});
			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .leftShadow").css({opacity:1});
			this.parent.find(".contentHolderUnit:nth-child("+this.pageNow+") .rightShadow").css({opacity:1});
			
			var pre = this.pageNow > 1 ? this.pageNow -1: this.total;
			var next = this.pageNow == this.total ? 1 : this.pageNow + 1;
			this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({opacity: 1, left: this.preLeft+'px',height:secondpageH,width:secondpageW, zIndex: 0, marginTop:(firstpageH-secondpageH)/2});
			this.parent.find(".contentHolderUnit:nth-child("+pre+") .elementOverlay").css({opacity:0.4});
			this.parent.find(".contentHolderUnit:nth-child("+pre+") .leftShadow").css({opacity:0});
			this.parent.find(".contentHolderUnit:nth-child("+pre+") .rightShadow").css({opacity:0});

			this.parent.find(".contentHolderUnit:nth-child("+next+")").css({opacity: 1, left: this.nextLeft+'px',height:secondpageH,width:secondpageW, zIndex: 0, marginTop:(firstpageH-secondpageH)/2});
			this.parent.find(".contentHolderUnit:nth-child("+next+") .elementOverlay").css({opacity:0.4});
			this.parent.find(".contentHolderUnit:nth-child("+next+") .leftShadow").css({opacity:0});
			this.parent.find(".contentHolderUnit:nth-child("+next+") .rightShadow").css({opacity:0});
		},
		bind: function(){
			this.leftNav = this.parent.find(".leftNav");
			this.rightNav = this.parent.find(".rightNav");
			this.bottonNav = this.parent.find(".bottomNavButtonOFF");
			this.lists = this.parent.find(".contentHolderUnit");
			var _this = this;
			this.parent.mouseover(function(){
				_this.stop();
				_this.leftNav.show();
				_this.rightNav.show();
			});
			this.parent.mouseout(function(){
				_this.start();
				//_this.leftNav.hide();
				//_this.rightNav.hide();
			});
			_this.leftNav.click(function(){
				_this.turn("right");					 
			});
			$(".next-page-arrow-left").click(function(){
                _this.stop();
				_this.turn("left");						 
			});
            $(".next-page-arrow-left").mouseover(function(){
                _this.stop();
               
            });
            $(".next-page-arrow-left").mouseout(function(){
                _this.start();
                //_this.leftNav.hide();
                //_this.rightNav.hide();
            });
			_this.rightNav.click(function(){
				_this.turn("left");					 
			});
            $(".next-page-arrow-right").mouseover(function(){
                _this.stop();
               
            });
			$(".next-page-arrow-right").click(function(){
				_this.turn("right");					 
			});
            $(".next-page-arrow-right").mouseout(function(){
                _this.start();
                //_this.leftNav.hide();
                //_this.rightNav.hide();
            });
			
			
			
		},
		initBottomNav: function(){
				this.parent.find(".bottomNavButtonOFF").removeClass("bottomNavButtonON");
				this.parent.find(".bottomNavButtonOFF:nth-child("+this.pageNow+")").addClass("bottomNavButtonON");
		},
		start: function(){
			var _this = this;
			if(_this.timerId) _this.stop();
			_this.timerId = setInterval(function(){
				if(_this.options.direct == "left"){
					_this.turn("left");	
				}else{
					_this.turn("right");	
				}
			}, _this.options.delay);
		},
		stop: function(){
			clearInterval(this.timerId);
		},
		turn: function(dir){
			var _this = this;
			
			if(dir == "right"){
				var page = _this.pageNow -1;
				if(page <= 0) page = _this.total;
			}else{
				var page = _this.pageNow + 1;
				if(page > _this.total) page = 1;
			}
			_this.turnpage(page, dir);
		},
		turnpage: function(page, dir){

			var _this = this;
			if(_this.locked) return false;
			_this.locked = true;
			if(_this.pageNow == page) return false;
			
			var run = function(page, dir, t){
				var pre = page > 1 ? page -1: _this.total;
				var next = page == _this.total ? 1 : page + 1;
				var preP = pre - 1 >= 1 ? pre-1 : _this.total;
				var nextN = next + 1 > _this.total ? 1 : next+1;
				if(pre != _this.pageNow && next != _this.pageNow){
					var nowpre = _this.pageNow > 1 ? _this.pageNow -1: _this.total;
					var nownext = _this.pageNow == _this.total ? 1 : _this.pageNow + 1;
					_this.parent.find(".contentHolderUnit:nth-child("+nowpre+")").animate({width:'0px',height:'0px', opacity: 0, left:_this.options.width/2+'px', zIndex:0, marginTop: '135px'}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").animate({width:'0px',height:'0px', opacity: 0, left:_this.options.width/2+'px', zIndex:0, marginTop: '135px'}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+nownext+")").animate({width:'0px',height:'0px', opacity: 0, left:_this.options.width/2+'px', zIndex:0, marginTop: '135px'}, t);
				}
				if(dir == 'left'){					
					_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").css({zIndex: 0});

				
					
					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .elementOverlay").animate({opacity:0.4},1,function(){
						_this.parent.find(".contentHolderUnit:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', height:secondpageH,width:secondpageW, zIndex: 2, marginTop:(firstpageH-secondpageH)/2}, t);
					});
					
					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .leftShadow").css({opacity:0});
					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .rightShadow").css({opacity:0});
			
					_this.parent.find(".contentHolderUnit:nth-child("+page+")").css({zIndex: 3});
					
					
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .elementOverlay").animate({opacity:0},1,function(){
						_this.parent.find(".contentHolderUnit:nth-child("+page+")").animate({opacity: 1, left: _this.pageNowLeft+'px', height: firstpageH, width: firstpageW, zIndex: 3, marginTop: '0'}, t);
					});

					_this.parent.find(".contentHolderUnit:nth-child("+page+") .leftShadow").css({opacity:1});
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .rightShadow").css({opacity:1});
					
					_this.parent.find(".contentHolderUnit:nth-child("+next+")").css({opacity: 0, left: _this.nextNLeft+'px', height: '100px', width: secondpageW, zIndex: 2, marginTop: '85px'});
					_this.parent.find(".contentHolderUnit:nth-child("+next+") .elementOverlay").animate({opacity:0.4},1,function(){
						
					_this.parent.find(".contentHolderUnit:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', height:secondpageH,width:secondpageW, zIndex: 2, marginTop:(firstpageH-secondpageH)/2}, t);
					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").animate({width:secondpageW,height:'100px', opacity: 0, left:_this.preNLeft+'px', zIndex:0, marginTop: '85px'},t, "", function(){_this.locked=false;});
					});
					_this.parent.find(".contentHolderUnit:nth-child("+next+") .leftShadow").css({opacity:0});
					_this.parent.find(".contentHolderUnit:nth-child("+next+") .rightShadow").css({opacity:0});
					_this.parent.find(".contentHolderUnit:nth-child("+preP+")").css({zIndex:0});
					
					
					
				}else{
					_this.parent.find(".contentHolderUnit:nth-child("+_this.pageNow+")").css({zIndex: 0});
					
					_this.parent.find(".contentHolderUnit:nth-child("+next+")").css({zIndex:2});
					
					_this.parent.find(".contentHolderUnit:nth-child("+next+") .elementOverlay").animate({opacity:0.4},1,function(){
						_this.parent.find(".contentHolderUnit:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', height:secondpageH,width:secondpageW, zIndex: 2, marginTop:(firstpageH-secondpageH)/2}, t);
					});
					_this.parent.find(".contentHolderUnit:nth-child("+next+") .leftShadow").css({opacity:0});
					_this.parent.find(".contentHolderUnit:nth-child("+next+") .rightShadow").css({opacity:0});
					
					_this.parent.find(".contentHolderUnit:nth-child("+page+")").css({zIndex: 3});
					
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .elementOverlay").animate({opacity:0},1,function(){
						_this.parent.find(".contentHolderUnit:nth-child("+page+")").animate({opacity: 1, left: _this.pageNowLeft+'px', height: firstpageH, width: firstpageW, zIndex: 3, marginTop: '0px'}, t);

					});
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .leftShadow").css({opacity:1});
					_this.parent.find(".contentHolderUnit:nth-child("+page+") .rightShadow").css({opacity:1});
					
					_this.parent.find(".contentHolderUnit:nth-child("+pre+")").css({opacity: 0, left: _this.preNLeft+'px', height: '100px', width:secondpageW, zIndex: 2, marginTop: '85px'});
					
					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .elementOverlay").animate({opacity:0.4},1,function(){
						_this.parent.find(".contentHolderUnit:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', height:secondpageH,width:secondpageW, zIndex: 2, marginTop:(firstpageH-secondpageH)/2}, t);
						_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").animate({width:secondpageW,height:'100px', opacity: 0, left:_this.nextNLeft+'px', zIndex:0, marginTop: '85px'}, t, "",function(){_this.locked=false;});
					});
					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .leftShadow").css({opacity:0});
					_this.parent.find(".contentHolderUnit:nth-child("+pre+") .rightShadow").css({opacity:0});
					
					_this.parent.find(".contentHolderUnit:nth-child("+nextN+")").css({zIndex:0});
					
				}
			
				_this.pageNow = page;
				_this.initBottomNav();
			};
			
			run(page, dir,_this.options.speed);					
			
		}
		
	};

	posterTvGrid.options = {
		offsetPages : 3,//默认可视最大条数
		direct : "left",//滚动的方向
		initPage : 1,//默认当前显示第几条
		className : "posterTvGrid",//最外层样式
		autoWidth : true,//默认不用设置宽
		width : firstpageW+secondpageW,//最外层宽，需要使用的时候在传,默认由程序自动判断
		height : 600,//最外层高  
		delay : 3000,//滚动间隔（毫秒）
		speed : 500 //滚动速度毫秒
	};
	
	window.posterTvGrid = posterTvGrid;
})(jQuery);