import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chevrons-down-up',
	template: `
		<svg
			class="chevrons-down-up-icon"
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
			<svg:path [class.chevron-up]="isHovered()" d="m7 20 5-5 5 5" />
			<svg:path [class.chevron-down]="isHovered()" d="m7 4 5 5 5-5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chevrons-down-up-icon {
			overflow: visible;
		}

		.chevrons-down-up-icon path {
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
		'aria-label': 'chevrons-down-up',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronsDownUpIcon {
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
