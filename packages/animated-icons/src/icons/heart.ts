import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-heart',
	template: `
		<svg
			class="heart-icon"
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
			<svg:path
				class="heart-path"
				d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.heart-icon {
			overflow: visible;
		}

		.heart-path {
			transform-origin: center;
			transition: transform 0.3s ease;
		}

		.heart-icon.animate .heart-path {
			animation: heartBeat 1.2s ease-in-out;
		}

		@keyframes heartBeat {
			0% {
				transform: scale(1);
			}
			16.67% {
				transform: scale(1.1);
			}
			33.33% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.1);
			}
			66.67% {
				transform: scale(1);
			}
			83.33% {
				transform: scale(1.1);
			}
			100% {
				transform: scale(1);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'heart',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1200);
		}
	}
}
