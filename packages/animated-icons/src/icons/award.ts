import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-award',
	template: `
		<svg
			class="award-icon"
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
				d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
			/>
			<svg:circle cx="12" cy="8" r="6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.award-icon {
			transform-origin: center;
			transition: all 0.5s ease-in-out;
		}

		.award-icon.animate {
			animation: enlarge 1s ease;
		}

		@keyframes enlarge {
			30% {
				transform: rotate(20deg) scale(1.2);
			}
			60% {
				transform: rotate(-20deg) scale(1.2);
			}
			100% {
				transform: rotate(0deg) scale(1);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'award',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwardIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
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
