import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-battery-medium',
	template: `
		<svg
			class="battery-medium-icon"
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
			<svg:rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
			<svg:line x1="22" x2="22" y1="11" y2="13" />
			<svg:line class="battery-bar battery-bar-1" x1="6" x2="6" y1="11" y2="13" />
			<svg:line class="battery-bar battery-bar-2" x1="10" x2="10" y1="11" y2="13" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.battery-icon {
			overflow: visible;
		}

		.battery-bar {
			opacity: 1;
			transition: opacity 0.3s ease;
		}

		.battery-icon.animate .battery-bar {
			animation: fadeInSequence 0.3s ease forwards;
		}

		.battery-icon.animate .battery-bar-1 {
			opacity: 0;
			animation-delay: 0.4s;
		}

		.battery-icon.animate .battery-bar-2 {
			opacity: 0;
			animation-delay: 0.8s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'battery-medium',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryMediumIcon {
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
