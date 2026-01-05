import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chevrons-up',
	template: `
		<svg
			class="chevrons-up-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path d="m17 11-5-5-5 5" />
			<svg:path d="m17 18-5-5-5 5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chevrons-up-icon {
			overflow: visible;
			transition: all 0.2s ease-in;
		}

		.chevron-up {
			transform: translateY(-3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chevrons-up',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronsUpIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
