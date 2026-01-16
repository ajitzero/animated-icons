import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-key-round',
	template: `
		<svg
			class="key-round-icon"
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
			<svg:path
				d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
			/>
			<svg:circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.key-round-icon {
			transform-origin: center;
			transition: transform 0.3s ease;
		}

		.key-round-icon.animate {
			animation: keyBounce 0.9s ease;
		}

		@keyframes keyBounce {
			0% {
				transform: translateY(0) rotate(0deg);
			}
			20% {
				transform: translateY(-3px) rotate(3deg);
			}
			40% {
				transform: translateY(0) rotate(-3deg);
			}
			60% {
				transform: translateY(-2px) rotate(0deg);
			}
			100% {
				transform: translateY(0) rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'key-round',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyRoundIcon {
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
