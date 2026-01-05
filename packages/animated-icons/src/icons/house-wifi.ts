import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-house-wifi',
	template: `
		<svg
			class="house-wifi-icon"
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
			<svg:path class="wifi-level wifi-line-1" d="M9.5 13.866a4 4 0 0 1 5 .01" />
			<svg:path class="wifi-level wifi-dot" d="M12 17h.01" />
			<svg:path
				d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
			/>
			<svg:path class="wifi-level wifi-line-2" d="M7 10.754a8 8 0 0 1 10 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.house-wifi-icon {
			overflow: visible;
		}

		.wifi-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.house-wifi-icon.animate .wifi-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.house-wifi-icon.animate .wifi-dot {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.house-wifi-icon.animate .wifi-line-1 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.house-wifi-icon.animate .wifi-line-2 {
			opacity: 0;
			animation-delay: 0.45s;
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
		'aria-label': 'house-wifi',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseWifiIcon {
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
