import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-battery',
	template: `
		<svg
			class="battery-icon"
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
			<svg:rect class="battery" width="16" height="10" x="2" y="7" rx="2" ry="2" />
			<svg:line class="battery" x1="22" x2="22" y1="11" y2="13" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.battery-icon {
			overflow: visible;
		}

		.battery-icon.animate .battery {
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
		'aria-label': 'battery',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryIcon {
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
