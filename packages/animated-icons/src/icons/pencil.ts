import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-pencil',
	template: `
		<svg
			class="pencil-icon"
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
				class=""
				d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
			/>
			<svg:path class="" d="m15 5 4 4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.pencil-icon {
			overflow: visible;
			transform: rotate(0deg);
			transform-origin: center;
		}

		.pencil-icon.animate {
			animation: jiggleAnimation 0.4s ease-in-out 2;
		}

		@keyframes jiggleAnimation {
			25% {
				transform: rotate(-15deg);
			}
			75% {
				transform: rotate(15deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'pencil',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PencilIcon {
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
