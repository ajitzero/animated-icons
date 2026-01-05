import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-contrast',
	template: `
		<svg
			class="contrast-icon"
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
			<svg:path class="right" d="M12 18a6 6 0 0 0 0-12v12z" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.contrast-icon {
			overflow: visible;
		}

		.right {
			transition: transform 0.3s ease;
			transform-origin: center;
		}

		/* Hover state */
		.contrast-icon.animate .right {
			transform: rotate(-180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'contrast',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContrastIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		this.isHovered.set(true);
	}

	handleMouseLeave() {
		this.isHovered.set(false);
	}
}
