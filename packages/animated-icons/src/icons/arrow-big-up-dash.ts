import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-arrow-big-up-dash',
	template: `
		<svg
			class="arrow-big-up-dash-icon"
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
			<svg:path [class.animate-dash]="isAnimating()" d="M9 19h6" />
			<svg:path [class.animate-arrow]="isAnimating()" d="M9 15v-3H5l7-7 7 7h-4v3H9z" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		svg path {
			transition: transform 0.2s ease-out;
		}
		.animate-arrow {
			transform: translateY(-3px);
		}
		.animate-dash {
			transform: translateY(-1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-big-up-dash',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowBigUpDashIcon {
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
