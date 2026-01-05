import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-clapperboard',
	template: `
		<svg
			class="clapperboard-icon"
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
			<svg:g class="clapperboard-outer">
				<svg:g class="clapperboard-inner">
					<svg:path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
					<svg:path d="m6.2 5.3 3.1 3.9" />
					<svg:path d="m12.4 3.4 3.1 4" />
				</svg:g>
				<svg:path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.clapperboard-icon {
			overflow: visible;
		}

		.clapperboard-outer {
			transform-origin: 4px 20px;
			transition: transform 0.8s ease-in-out;
		}

		.clapperboard-inner {
			transform-origin: 3px 11px;
			transition: transform 0.4s ease-in-out;
		}

		.clapperboard-icon.animate .clapperboard-outer {
			animation: clapperboardOuter 0.8s ease-in-out;
		}

		.clapperboard-icon.animate .clapperboard-inner {
			animation: clapperboardInner 0.4s ease-in-out;
		}

		@keyframes clapperboardOuter {
			0%,
			50% {
				transform: rotate(-10deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		@keyframes clapperboardInner {
			0% {
				transform: rotate(0deg);
			}
			30% {
				transform: rotate(-10deg);
			}
			60% {
				transform: rotate(16deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clapperboard',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClapperboardIcon {
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
