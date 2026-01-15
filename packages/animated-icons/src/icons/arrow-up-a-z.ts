import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-arrow-up-a-z',
	template: `
		<svg
			class="arrow-up-a-z-icon"
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
			<svg:path d="m3 8 4-4 4 4" />
			<svg:path d="M7 4v16" />
			<svg:g class="swap-group-up">
				<svg:path d="M20 8h-5" />
				<svg:path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
			</svg:g>
			<svg:path class="swap-group-down" d="M15 14h5l-5 6h5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.swap-group-up,
		.swap-group-down {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.swap-group-up.animate {
			transform: translateY(10px);
		}

		.swap-group-down.animate {
			transform: translateY(-10px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-up-a-z',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowUpAZIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
