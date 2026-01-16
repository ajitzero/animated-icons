import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-dice-2',
	template: `
		<svg
			class="dice-2-icon"
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
			<svg:rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
			<svg:path d="M15 9h.01" />
			<svg:path d="M9 15h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.dice-2-icon {
			overflow: visible;
		}
		.dice-2-icon.animate {
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
		'aria-label': 'dice-2',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dice2Icon {
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
