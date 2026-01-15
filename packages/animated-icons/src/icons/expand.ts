import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-expand',
	template: `
		<svg
			class="expand-icon"
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
			<svg:path class="corner top-right" d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
			<svg:path class="corner bottom-left" d="M3 16.2V21m0 0h4.8M3 21l6-6" />
			<svg:path class="corner top-left" d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
			<svg:path class="corner bottom-right" d="M3 7.8V3m0 0h4.8M3 3l6 6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.corner {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.top-right.animate {
			transform: translate(2px, 2px);
		}

		.bottom-left.animate {
			transform: translate(-2px, 2px);
		}

		.top-left.animate {
			transform: translate(2px, -2px);
		}

		.bottom-right.animate {
			transform: translate(-2px, -2px);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'expand',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
