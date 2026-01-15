import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-sparkle',
	template: `
		<svg
			class="sparkle-icon"
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
				class="sparkle-path"
				d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.sparkle-icon {
			overflow: visible;
			transform-origin: center;
		}

		.sparkle-icon.animate {
			animation: sparkleScale 0.6s ease-in-out forwards;
		}

		@keyframes sparkleScale {
			0% {
				transform: scale(1);
			}
			33% {
				transform: scale(0.9);
			}
			66% {
				transform: scale(1.2);
			}
			100% {
				transform: scale(1);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'sparkle',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparkleIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 600);
		}
	}
}
