import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-orbit',
	template: `
		<svg
			class="orbit-icon"
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
			<svg:circle cx="12" cy="12" r="3" />
			<svg:circle cx="19" cy="5" r="2" />
			<svg:circle cx="5" cy="19" r="2" />
			<svg:path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
			<svg:path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.orbit-icon {
			transform-origin: center center;
			transition: transform 1s ease-in-out;
		}

		.orbit-icon.animate {
			animation: rotate-path 3s ease-in-out;
		}

		@keyframes rotate-path {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(-1080deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'orbit',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitIcon {
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
