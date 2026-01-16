import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-lightbulb',
	template: `
		<svg
			class="lightbulb-icon"
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
				class="lightbulb-path1"
				d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
			/>
			<svg:path class="lightbulb-path2" d="M9 18h6" />
			<svg:path class="lightbulb-path3" d="M10 22h4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.lightbulb-icon {
			overflow: visible;
		}

		.lightbulb-path1 {
			transform-origin: bottom center;
			transform-box: fill-box;
			fill: transparent;
			transition: fill 0s;
		}

		.lightbulb-path2 {
			transform-origin: bottom center;
			transform-box: fill-box;
		}

		.lightbulb-icon.animate .lightbulb-path1 {
			animation:
				lightbulb-rotate1 0.8s ease-in-out forwards,
				lightbulb-fill-opacity 0.3s ease-in-out 0.4s forwards;
			fill: currentColor;
			fill-opacity: 0;
		}

		.lightbulb-icon:not(.animate) .lightbulb-path1 {
			fill: transparent;
		}

		.lightbulb-icon.animate .lightbulb-path2 {
			animation: lightbulb-rotate2 0.8s ease-in-out forwards;
		}

		@keyframes lightbulb-rotate1 {
			0% {
				transform: rotate(0deg);
			}
			40% {
				transform: rotate(-20deg);
			}
			60% {
				transform: rotate(15deg);
			}
			80% {
				transform: rotate(-7deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		@keyframes lightbulb-fill-opacity {
			0% {
				fill-opacity: 0;
			}
			40% {
				fill-opacity: 1;
			}
			60% {
				fill-opacity: 0;
			}
			80% {
				fill-opacity: 1;
			}
			100% {
				fill-opacity: 0;
			}
		}

		@keyframes lightbulb-rotate2 {
			0% {
				transform: rotate(0deg);
			}
			40% {
				transform: rotate(0deg);
			}
			60% {
				transform: rotate(10deg);
			}
			80% {
				transform: rotate(-5deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'lightbulb',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightbulbIcon {
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
