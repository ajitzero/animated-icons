import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-bookmark-minus',
	template: `
		<svg
			class="bookmark-minus-icon"
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
			<svg:path class="bookmark-path" d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
			<svg:path class="horizontal" d="M9 10h6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bookmark-minus-icon {
			overflow: visible;
		}

		.bookmark-path {
			transform-origin: center;
			transition: transform 0.3s ease-out;
		}

		.horizontal {
			stroke-dasharray: 6;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.bookmark-minus-icon.animate .bookmark-path {
			animation: bookmarkBounce 0.6s ease-out;
		}

		.bookmark-minus-icon.animate .horizontal {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		@keyframes bookmarkBounce {
			0% {
				transform: scale(1, 1);
			}
			25% {
				transform: scale(0.9, 1.3);
			}
			50% {
				transform: scale(1.1, 0.9);
			}
			75% {
				transform: scale(0.95, 1.05);
			}
			100% {
				transform: scale(1, 1);
			}
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 6;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 6;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bookmark-minus',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkMinusIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 600);
		}
	}
}
