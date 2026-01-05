import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-drum',
	template: `
		<svg
			class="drum-icon"
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
			<svg:path class="drumstick-1" d="m2 2 8 8" />
			<svg:path class="drumstick-2" d="m22 2-8 8" />
			<svg:ellipse cx="12" cy="9" rx="10" ry="5" />
			<svg:path d="M7 13.4v7.9" />
			<svg:path d="M12 14v8" />
			<svg:path d="M17 13.4v7.9" />
			<svg:path d="M2 9v8a10 5 0 0 0 20 0V9" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.drum-icon {
			overflow: visible;
		}

		.drum-icon path {
			transition: transform 0.3s ease;
		}

		.drum-icon.animate .drumstick-1 {
			animation: drumstick1Animation 0.2s ease-in-out infinite alternate;
		}

		.drum-icon.animate .drumstick-2 {
			animation: drumstick2Animation 0.2s ease-in-out infinite alternate;
		}

		@keyframes drumstick1Animation {
			0%,
			100% {
				transform: rotate(0deg);
			}
			50% {
				transform: rotate(-10deg);
			}
		}

		@keyframes drumstick2Animation {
			0%,
			100% {
				transform: rotate(0deg);
			}
			50% {
				transform: rotate(10deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'drum',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrumIcon {
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
