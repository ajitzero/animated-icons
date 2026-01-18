import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-radio-tower',
	template: `
		<svg
			class="radio-tower-icon"
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
			<svg:path class="radio-level radio-line-3" d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
			<svg:path class="radio-level radio-line-2" d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" />
			<svg:circle class="radio-level radio-line-1" cx="12" cy="9" r="2" />
			<svg:path class="radio-level radio-line-2" d="M16.2 4.8c2 2 2.26 5.11.8 7.47" />
			<svg:path class="radio-level radio-line-3" d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" />
			<svg:path class="tower-base" d="M9.5 18h5" />
			<svg:path class="tower-base" d="m8 22 4-11 4 11" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.radio-tower-icon {
			overflow: visible;
		}

		.radio-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.radio-tower-icon.animate .radio-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.radio-tower-icon.animate .radio-line-1 {
			opacity: 0;
			animation-delay: 0.15s;
		}

		.radio-tower-icon.animate .radio-line-2 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.radio-tower-icon.animate .radio-line-3 {
			opacity: 0;
			animation-delay: 0.35s;
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
		'aria-label': 'radio-tower',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioTowerIcon {
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
