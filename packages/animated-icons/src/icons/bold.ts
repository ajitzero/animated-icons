import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-bold',
	template: `
		<svg
			class="bold-icon"
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
			<svg:path class="bold-path" d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bold-icon {
			overflow: visible;
		}

		.bold-path {
			stroke-width: 2;
			transition: stroke-width 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.bold-icon.animate .bold-path {
			stroke-width: 3.5;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bold',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoldIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
