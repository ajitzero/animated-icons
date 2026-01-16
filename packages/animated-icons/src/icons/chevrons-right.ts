import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-chevrons-right',
	template: `
		<svg
			class="chevrons-right-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.chevron-right]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path d="m6 17 5-5-5-5" />
			<svg:path d="m13 17 5-5-5-5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chevrons-right-icon {
			overflow: visible;
			transition: all 0.2s ease-in;
		}

		.chevron-right {
			transform: translateX(3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chevrons-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronsRightIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 200);
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
