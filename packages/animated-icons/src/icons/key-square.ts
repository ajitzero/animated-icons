import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-key-square',
	template: `
		<svg
			class="key-square-icon"
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
				d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z"
			/>
			<svg:path d="m14 7 3 3" />
			<svg:path
				d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.key-square-icon {
			overflow: visible;
		}

		.key-square-icon.animate {
			transform-origin: center;
			animation: keyAnimation 0.6s;
		}

		@keyframes keyAnimation {
			0% {
				transform: rotate(0deg) scale(1);
			}
			30% {
				transform: rotate(15deg) scale(1.05);
			}
			70% {
				transform: rotate(-15deg) scale(1);
			}
			100% {
				transform: rotate(0deg) scale(1);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'key-square',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySquareIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
