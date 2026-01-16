import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-bookmark-plus',
	template: `
		<svg
			class="bookmark-plus-icon"
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
			<svg:path class="vertical" d="M12 7v6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bookmark-plus-icon {
			overflow: visible;
		}

		.bookmark-path {
			transform-origin: center;
			transition: transform 0.3s ease-out;
		}

		.horizontal,
		.vertical {
			stroke-dasharray: 8;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.bookmark-plus-icon.animate .bookmark-path {
			animation: bookmarkBounce 0.6s ease-out;
		}

		.bookmark-plus-icon.animate .horizontal {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		.bookmark-plus-icon.animate .vertical {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.25s forwards;
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
				stroke-dashoffset: 8;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 8;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bookmark-plus',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkPlusIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 500);
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
