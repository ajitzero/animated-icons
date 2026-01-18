import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-sword',
	template: `
		<svg
			class="sword-icon"
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
			<svg:polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
			<svg:line x1="13" y1="19" x2="19" y2="13" />
			<svg:line x1="16" y1="16" x2="20" y2="20" />
			<svg:line x1="19" y1="21" x2="21" y2="19" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.sword-icon {
			transform-origin: bottom right;
			transition: transform 0.3s ease;
		}

		.sword-icon.animate {
			animation: swing 1s ease;
		}

		@keyframes swing {
			0%,
			70% {
				transform: rotate(0deg);
			}
			30% {
				transform: rotate(25deg);
			}
			50% {
				transform: rotate(-5deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'sword',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwordIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
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
