import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-toggle-left',
	template: `
		<svg
			class="toggle-left-icon"
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
			<svg:circle class="toggle-circle" cx="9" cy="12" r="3" />
			<svg:rect width="20" height="14" x="2" y="5" rx="7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.toggle-left-icon {
			overflow: visible;
		}

		.toggle-circle {
			transform: translateX(0);
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}

		.toggle-left-icon.animate .toggle-circle {
			transform: translateX(6px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'toggle-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLeftIcon {
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
