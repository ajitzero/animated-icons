import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-sparkles',
	template: `
		<svg
			class="sparkles-icon"
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
			<svg:g class="sparkles-group">
				<svg:path
					class="sparkles-path"
					d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
				/>
			</svg:g>
			<svg:path class="sparkles-plus" d="M20 2v4 M22 4h-4" />
			<svg:circle class="sparkles-circle" cx="4" cy="20" r="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.sparkles-icon {
			overflow: visible;
		}

		.sparkles-icon .sparkles-group {
			transform-origin: center;
			transition: transform 0.6s ease-in-out;
		}

		.sparkles-icon.animate .sparkles-group {
			animation: scaleGroup 0.6s ease-in-out;
		}

		.sparkles-icon .sparkles-plus {
			opacity: 1;
			transform: scale(1);
			transform-origin: center;
			transform-box: fill-box;
			transition:
				opacity 0.2s ease-in-out,
				transform 0.2s ease-in-out;
		}

		.sparkles-icon.animate .sparkles-plus {
			animation: pulsePlus 0.75s ease-in-out;
		}

		.sparkles-icon .sparkles-circle {
			opacity: 1;
			transform: scale(1);
			transform-origin: center;
			transform-box: fill-box;
			transition:
				opacity 0.2s ease-in-out,
				transform 0.2s ease-in-out;
		}

		.sparkles-icon.animate .sparkles-circle {
			animation: pulseCircle 0.6s ease-in-out;
		}

		@keyframes scaleGroup {
			0% {
				transform: scale(1);
			}
			33.33% {
				transform: scale(0.9);
			}
			66.67% {
				transform: scale(1.1);
			}
			100% {
				transform: scale(1);
			}
		}

		@keyframes pulsePlus {
			0%,
			20% {
				opacity: 1;
				transform: scale(1);
			}
			46.67% {
				opacity: 0;
				transform: scale(0);
			}
			73.33% {
				opacity: 0;
				transform: scale(0);
			}
			100% {
				opacity: 1;
				transform: scale(1);
			}
		}

		@keyframes pulseCircle {
			0% {
				opacity: 1;
				transform: scale(1);
			}
			33.33% {
				opacity: 0;
				transform: scale(0);
			}
			66.67% {
				opacity: 0;
				transform: scale(0);
			}
			100% {
				opacity: 1;
				transform: scale(1);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'sparkles',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparklesIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 750);
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
