import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-dna-off',
	template: `
		<svg
			class="dna-off-icon"
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
			<svg:path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" />
			<svg:path d="m17 6-2.891-2.891" />
			<svg:path d="M2 15c3.333-3 6.667-3 10-3" />
			<svg:path d="m2 2 20 20" />
			<svg:path d="m20 9 .891.891" />
			<svg:path d="M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" />
			<svg:path d="M3.109 14.109 4 15" />
			<svg:path d="m6.5 12.5 1 1" />
			<svg:path d="m7 18 2.891 2.891" />
			<svg:path d="M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.dna-off {
			overflow: visible;
		}

		.dna-off {
			overflow: visible;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}

		.dna-off.animate {
			animation: groupShake 0.6s ease-in-out;
		}

		@keyframes groupShake {
			0% {
				transform: translateX(0);
			}
			16.67% {
				transform: translateX(-7%);
			}
			33.33% {
				transform: translateX(7%);
			}
			50% {
				transform: translateX(-7%);
			}
			66.67% {
				transform: translateX(7%);
			}
			100% {
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'dna-off',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DnaOffIcon {
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
