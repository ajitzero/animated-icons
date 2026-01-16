import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-notebook-pen',
	template: `
		<svg
			class="notebook-pen-icon"
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
			<svg:path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
			<svg:path d="M2 6h4" />
			<svg:path d="M2 10h4" />
			<svg:path d="M2 14h4" />
			<svg:path d="M2 18h4" />
			<svg:path
				class="pen"
				d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.notebook-pen-icon {
			overflow: visible;
		}

		.pen {
			transform-origin: 21.378px 5.626px;
			transition: transform 0.25s ease-in-out;
		}

		.pen.animate {
			animation: penWiggle 0.5s ease-in-out 2;
		}

		@keyframes penWiggle {
			0%,
			100% {
				transform: rotate(0deg) translate(0px, 0px);
			}
			25% {
				transform: rotate(-0.5deg) translate(-1px, 1.5px);
			}
			75% {
				transform: rotate(0.5deg) translate(1.5px, -1px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'notebook-pen',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotebookPenIcon {
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
