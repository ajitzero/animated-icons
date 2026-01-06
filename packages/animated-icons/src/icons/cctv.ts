import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-cctv',
	template: `
		<svg
			class="cctv-icon"
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
			<svg:g class="cctv-body">
				<svg:path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
				<svg:path
					d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"
				/>
				<svg:path class="cctv-dot" d="M7 9h.01" />
			</svg:g>
			<svg:path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
			<svg:path d="M2 21v-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cctv-icon {
			overflow: visible;
		}

		.cctv-body {
			transform-origin: 9px 15px;
			transition: transform 2s ease-in-out;
		}

		.cctv-icon.animate .cctv-body {
			animation: cctvRotate 2s ease-in-out;
		}

		@keyframes cctvRotate {
			0%,
			100% {
				transform: rotate(0deg);
			}
			33% {
				transform: rotate(-15deg);
			}
			66% {
				transform: rotate(10deg);
			}
		}

		.cctv-dot {
			opacity: 1;
			transition: opacity 1s linear;
		}

		.cctv-icon.animate .cctv-dot {
			animation: dotBlink 1s linear infinite;
		}

		@keyframes dotBlink {
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
		'aria-label': 'cctv',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CctvIcon {
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
			}, 2000);
		}
	}
}
