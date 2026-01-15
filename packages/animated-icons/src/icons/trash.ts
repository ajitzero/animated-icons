import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-trash',
	template: `
		<svg
			class="trash-icon"
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
			<svg:g [class.is-animated]="isAnimating()">
				<svg:path d="M3 6h18" />
				<svg:path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
			</svg:g>
			<svg:path [class.animate-path]="isAnimating()" d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.is-animated {
			transform: translateY(-1px);
			transition: transform 0.2s ease-in;
		}

		.animate-path {
			transform: translateY(1px);
			transition: transform 0.2s ease-in;
		}

		.is-animated-line {
			transition: all 0.2s ease-in;
		}

		.is-animated-path {
			transition: all 0.2s ease-in;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'trash',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashIcon {
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
