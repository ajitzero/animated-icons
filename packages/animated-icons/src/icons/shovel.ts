import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-shovel',
	template: `
		<svg
			class="shovel-icon"
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
			<svg:path d="M2 22v-5l5-5 5 5-5 5z" />
			<svg:path d="M9.5 14.5 16 8" />
			<svg:path d="m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0 3.53 3.53 0 0 1 0-5L17 2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.shovel-icon {
			transition: transform 0.3s ease;
		}

		.shovel-icon.animate {
			animation: dig 0.5s ease-out 2;
		}

		@keyframes dig {
			0% {
				transform: translate(0, 0);
			}
			60% {
				transform: translate(2px, -2px);
			}
			80% {
				transform: translate(-5px, 5px);
			}
			100% {
				transform: translate(0, 0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'shovel',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShovelIcon {
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
