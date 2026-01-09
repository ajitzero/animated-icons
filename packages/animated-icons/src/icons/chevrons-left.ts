import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chevrons-left',
	template: `
		<svg
			class="chevrons-left-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.chevron-left]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path d="m11 17-5-5 5-5" />
			<svg:path d="m18 17-5-5 5-5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chevrons-left-icon {
			overflow: visible;
			transition: all 0.2s ease-in;
		}

		.chevron-left {
			transform: translateX(-3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chevrons-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronsLeftIcon {
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
			}, 200);
		}
	}
}
