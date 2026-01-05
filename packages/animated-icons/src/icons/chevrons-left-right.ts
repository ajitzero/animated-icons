import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chevrons-left-right',
	template: `
		<svg
			class="chevrons-left-right-icon"
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
			<svg:path [class.chevron-left]="isHovered()" d="m9 7-5 5 5 5" />
			<svg:path [class.chevron-right]="isHovered()" d="m15 7 5 5-5 5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chevrons-left-right-icon {
			overflow: visible;
		}

		.chevrons-left-right-icon path {
			transition: all 0.2s ease-in;
		}

		.chevron-left {
			transform: translateX(-3px);
		}

		.chevron-right {
			transform: translateX(3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chevrons-left-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronsLeftRightIcon {
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
