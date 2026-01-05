import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-battery-warning',
	template: `
		<svg
			class="battery-warning-icon"
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
			<svg:path class="battery-warning" d="M10 17h.01" />
			<svg:path class="battery-warning" d="M10 7v6" />
			<svg:path d="M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
			<svg:path d="M22 11v2" />
			<svg:path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.battery-icon {
			overflow: visible;
		}

		.battery-icon.animate .battery-warning {
			opacity: 0;
			animation: blink 0.5s 3;
		}

		@keyframes blink {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'battery-warning',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryWarningIcon {
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
