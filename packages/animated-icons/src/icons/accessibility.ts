import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-accessibility',
	template: `
		<svg
			class="accessibility-icon"
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
			<svg:circle class="accessibility-circle" cx="16" cy="4" r="1" />
			<svg:g class="accessibility-group1">
				<path d="M18,19l1-7-6,1" />
				<path d="M8,5l5.5,3-2.4,3.5" />
				<path class="accessibility-path3" d="M8 5 L5 8" />
			</svg:g>
			<svg:g class="accessibility-group2">
				<path d="M4.2,14.5c-.8,2.6.7,5.4,3.3,6.2,1.2.4,2.4.3,3.6-.2" />
				<path d="M13.8,17.5c.8-2.6-.7-5.4-3.3-6.2-1.2-.4-2.4-.3-3.6.2" />
			</svg:g>
			<svg:path d="M13,13.1c-.5-.7-1.1-1.2-1.9-1.6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.accessibility-icon {
			overflow: visible;
		}

		.accessibility-circle {
			transition: transform 0.3s ease;
		}

		.accessibility-group1 {
			transform-origin: center;
			transition: transform 0.3s ease;
		}

		.accessibility-group2 {
			transform-origin: 9px 16px;
			transition: transform 0.3s ease;
		}

		.accessibility-path3 {
			transform-origin: 8px 5px;
			transition: transform 0.3s ease;
		}

		.accessibility-icon.animate .accessibility-group1 {
			animation: group1Rotate 0.8s ease-in-out;
		}

		.accessibility-icon.animate .accessibility-group2 {
			animation: group2Rotate 1s ease-in-out 0.4s;
		}

		.accessibility-icon.animate .accessibility-path3 {
			animation: path3Rotate 0.4s ease-in-out 0.2s;
		}

		@keyframes group1Rotate {
			0% {
				transform: rotate(0deg);
			}
			25% {
				transform: rotate(5deg);
			}
			50% {
				transform: rotate(-5deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		@keyframes group2Rotate {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		@keyframes path3Rotate {
			0% {
				transform: rotate(0deg);
			}
			50% {
				transform: rotate(-60deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'(mouseenter)': 'handleMouseEnter()',
		'aria-label': 'accessibility',
		role: 'img',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityIcon {
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
