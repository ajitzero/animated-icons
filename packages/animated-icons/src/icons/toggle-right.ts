import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-toggle-right',
	template: `
		<svg
			class="toggle-right-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:circle class="toggle-circle" cx="15" cy="12" r="3" />
			<svg:rect width="20" height="14" x="2" y="5" rx="7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.toggle-right-icon {
			overflow: visible;
		}

		.toggle-circle {
			transform: translateX(0);
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}

		.toggle-right-icon.animate .toggle-circle {
			transform: translateX(-6px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'toggle-right',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleRightIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
