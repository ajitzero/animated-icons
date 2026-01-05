import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-circle-arrow-right',
	template: `
		<svg
			class="circle-arrow-right-icon"
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
			<svg:circle cx="12" cy="12" r="10" />
			<svg:path d="M8 12H12" />
			<svg:path [class.head]="isHovered()" d="M12 12H16" />
			<svg:path [class.head]="isHovered()" d="m12 16 4-4-4-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: all 0.2s ease-out;
		}
		.head {
			transform: translateX(-1.5px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-arrow-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleArrowRightIcon {
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
