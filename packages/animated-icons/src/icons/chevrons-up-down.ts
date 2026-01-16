import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-chevrons-up-down',
	template: `
		<svg
			class="chevrons-up-down-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path [class.chevron-down]="isAnimating()" d="m7 15 5 5 5-5" />
			<svg:path [class.chevron-up]="isAnimating()" d="m7 9 5-5 5 5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chevrons-up-down-icon {
			overflow: visible;
		}

		.chevrons-up-down-icon path {
			transition: all 0.2s ease-in;
		}

		.chevron-up {
			transform: translateY(-3px);
		}

		.chevron-down {
			transform: translateY(3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chevrons-up-down',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronsUpDownIcon {
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
