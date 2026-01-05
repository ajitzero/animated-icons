import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-route',
	template: `
		<svg
			class="route-icon"
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
			<svg:circle class="circle-1" cx="6" cy="19" r="3" />
			<svg:circle class="circle-2" cx="18" cy="5" r="3" />
			<svg:path class="line" d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.line {
			stroke-dasharray: 50;
			stroke-dashoffset: 0;
		}

		.route-icon.animate .circle-1 {
			animation: circle1Animation 0.4s ease-out forwards;
		}

		.route-icon.animate .circle-2 {
			animation: circle2Animation 0.4s ease-out forwards;
		}

		.route-icon.animate .line {
			animation: lineAnimation 0.8s forwards;
		}

		@keyframes circle1Animation {
			0%,
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		@keyframes circle2Animation {
			0%,
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		@keyframes lineAnimation {
			0%,
			50% {
				stroke-dashoffset: 50;
			}
			15% {
				stroke-dashoffset: 50;
			}
			100% {
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'route',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteIcon {
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
