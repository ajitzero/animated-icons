import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-dice-4',
	template: `
		<svg
			class="dice-4-icon"
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
			<svg:rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
			<svg:path d="M16 8h.01" />
			<svg:path d="M8 8h.01" />
			<svg:path d="M8 16h.01" />
			<svg:path d="M16 16h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.dice-4-icon {
			overflow: visible;
		}
		.dice-4-icon.animate {
			animation: diceRoll 1s ease-in-out;
		}

		@keyframes diceRoll {
			0% {
				transform: translateX(0) rotate(0deg);
			}
			25% {
				transform: translateX(-20%) rotate(45deg);
			}
			50% {
				transform: translateX(0) rotate(90deg);
			}
			75% {
				transform: translateX(-20%) rotate(135deg);
			}
			100% {
				transform: translateX(0) rotate(180deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'dice-4',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dice4Icon {
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
