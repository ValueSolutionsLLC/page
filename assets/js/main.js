/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',   '1280px' ],
			medium:   [ '901px',   '1024px'  ],
			small:    [ '737px',   '900px'  ],
			xsmall:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Off-Canvas Navigation.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Navigation Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});
				
		// Fix mobile navigation to show only the selected language items
		function updateMobileNav() {
			let currentLanguage = localStorage.getItem('language') || 'en';
			
			// Wait for the panel to be created
			setTimeout(function() {
				// Clone the language selector to the mobile nav
				let mobileNav = $('#navPanel nav');
				
				// Clear existing language selector in mobile nav if any
				$('#navPanel .language-selector-mobile').remove();
				
				// Clone the language selector and add to mobile nav
				let languageSelector = $('#nav .language-selector').clone();
				languageSelector.addClass('language-selector-mobile');
				
				// Add the selector to the top of the mobile nav
				mobileNav.prepend(languageSelector);
				
				// Set up the event listener for the cloned selector
				$('#navPanel .language-select').on('change', function() {
					let lang = $(this).val();
					// Use the window-level function that's defined in language.js
					if (typeof window.setLanguage === 'function') {
						window.setLanguage(lang);
						// Update mobile nav after changing language
						updateMobileNav();
					} else {
						// Fallback to just storing the preference
						localStorage.setItem('language', lang);
						location.reload();
					}
				});
				
				// Force links to stack vertically by modifying their container
				$('#navPanel nav > ul > li').css({
					'display': 'block',
					'width': '100%',
					'margin': '0'
				});
				
				// Hide all links first
				$('#navPanel nav a').hide();
				 
				
				// Process all links to filter by language
				$('#navPanel nav a.lang-' + currentLanguage).each(function() {
					let $this = $(this);
					
					// Apply common styling to all visible links
					$this.css({
						'display': 'block',
						'width': '100%',
						'padding': '0.75em 1.25em',
						'margin': '0',
						'text-align': 'left'
					}).show(); 
				});
				
				// Set selected language in the dropdown
				$('#navPanel .language-select').val(currentLanguage); 
			}, 100);
		}
		
		// Update mobile nav when page loads and when language changes
		$(document).ready(function() {
			updateMobileNav();
			
			// Re-run when the panel is opened
			$('#titleBar a.toggle').on('click', function() {
				setTimeout(updateMobileNav, 100);
			});
		});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);