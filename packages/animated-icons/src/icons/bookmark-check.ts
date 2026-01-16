import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-bookmark-check',
	template: `
		<svg
			class="bookmark-check-icon"
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
			<svg:path class="bookmark-path" d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
			<svg:path class="check-path" d="m9 10 2 2 4-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bookmark-check-icon {
			overflow: visible;
		}
		.bookmark-path {
			transform-origin: center;
			transition: transform 0.3s ease-out;
		}
		.bookmark-check-icon.animate .bookmark-path {
			animation: bookmarkBounce 0.6s ease-out;
		}
		.check-path {
			stroke-dasharray: 9;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.125s ease-out,
				opacity 0.125s ease-out;
		}
		.bookmark-check-icon.animate .check-path {
			animation: checkAnimation 0.5s ease-out backwards;
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
		@keyframes checkAnimation {
			0% {
				stroke-dashoffset: 9;
				opacity: 0;
			}
			33% {
				stroke-dashoffset: 9;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bookmark-check',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkCheckIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 600);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
