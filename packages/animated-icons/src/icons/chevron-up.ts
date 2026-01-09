import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chevron-up',
	template: `
		<svg
			class="chevron-up-icon"
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
			<svg:path [class.chevron-up]="isHovered()" d="m18 15-6-6-6 6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: all 0.2s ease-in;
		}

		.chevron-up {
			transform: translateY(-3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chevron-up',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronUpIcon {
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
