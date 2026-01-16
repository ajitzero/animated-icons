import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-cloud-moon',
	template: `
		<svg
			class="cloud-moon-icon"
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
			<svg:path class="cloud-moon-path1" d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" />
			<svg:path
				class="cloud-moon-path2"
				d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cloud-moon-icon {
			overflow: visible;
		}

		.cloud-moon-icon path:nth-child(1) {
			transform: translate(0, 0);
			transition: transform 0.1s ease-in-out;
		}

		.cloud-moon-icon path:nth-child(2) {
			transform: rotate(0deg);
			transform-origin: center;
			transition: transform 0.1s ease-in-out;
		}

		.cloud-moon-icon.animate path:nth-child(1) {
			animation: cloudMoonPath1 1.4s ease-in-out forwards;
		}

		.cloud-moon-icon.animate path:nth-child(2) {
			animation: cloudMoonPath2 1.4s ease-in-out forwards;
		}

		@keyframes cloudMoonPath1 {
			0% {
				transform: translate(0, 0);
			}
			33.33% {
				transform: translate(-1px, -1px);
			}
			66.66% {
				transform: translate(1px, 1px);
			}
			100% {
				transform: translate(0, 0);
			}
		}

		@keyframes cloudMoonPath2 {
			0% {
				transform: rotate(0deg);
			}
			33.33% {
				transform: rotate(6deg);
			}
			66.66% {
				transform: rotate(-8deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'cloud-moon',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudMoonIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
