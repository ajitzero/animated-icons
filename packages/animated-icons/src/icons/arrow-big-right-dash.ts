import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-arrow-big-right-dash',
	template: `
		<svg
			class="arrow-big-right-dash-icon"
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
			<svg:path [class.animate-dash]="isAnimating()" d="M5 9v6" />
			<svg:path [class.animate-arrow]="isAnimating()" d="M9 9h3V5l7 7-7 7v-4H9V9z" />
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
			transform: translateX(3px);
		}
		.animate-dash {
			transform: translateX(1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-big-right-dash',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowBigRightDashIcon {
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
