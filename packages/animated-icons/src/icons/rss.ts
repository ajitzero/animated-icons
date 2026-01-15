import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-rss',
	template: `
		<svg
			class="rss-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path class="rss-level rss-line-2" d="M4 11a9 9 0 0 1 9 9" />
			<svg:path class="rss-level rss-line-3" d="M4 4a16 16 0 0 1 16 16" />
			<svg:circle class="rss-level rss-line-1" cx="5" cy="19" r="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rss-icon {
			overflow: visible;
		}

		.rss-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.rss-icon.animate .rss-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.rss-icon.animate .rss-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.rss-icon.animate .rss-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.rss-icon.animate .rss-line-3 {
			opacity: 0;
			animation-delay: 0.45s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'rss',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RssIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 700);
		}
	}
}
