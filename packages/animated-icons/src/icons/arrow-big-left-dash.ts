import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-arrow-big-left-dash',
	template: `
		<svg
			class="arrow-big-left-dash-icon"
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
			<svg:path [class.animate-dash]="isHovered()" d="M19 15V9" />
			<svg:path [class.animate-arrow]="isHovered()" d="M15 15h-3v4l-7-7 7-7v4h3v6z" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		svg path {
			transition: transform 0.2s ease-out;
		}
		.animate-arrow {
			transform: translateX(-3px);
		}
		.animate-dash {
			transform: translateX(-1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-big-left-dash',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowBigLeftDashIcon {
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
