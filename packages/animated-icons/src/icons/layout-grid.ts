import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-layout-grid',
	template: `
		<svg
			class="layout-grid-icon"
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
			<svg:rect class="top-left-panel" width="7" height="7" x="3" y="3" rx="1" />
			<svg:rect class="top-right-panel" width="7" height="7" x="14" y="3" rx="1" />
			<svg:rect class="bottom-right-panel" width="7" height="7" x="14" y="14" rx="1" />
			<svg:rect class="bottom-left-panel" width="7" height="7" x="3" y="14" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layout-grid-icon {
			overflow: visible;
		}

		.layout-grid-icon.animate .top-right-panel {
			opacity: 0;
			animation: fadeInTop 0.35s ease-out forwards;
		}
		.layout-grid-icon.animate .bottom-right-panel {
			opacity: 0;
			animation: fadeInRight 0.35s ease-out 0.1s forwards;
		}
		.layout-grid-icon.animate .bottom-left-panel {
			opacity: 0;
			animation: fadeInBottom 0.35s ease-out 0.2s forwards;
		}
		.layout-grid-icon.animate .top-left-panel {
			opacity: 0;
			animation: fadeInLeft 0.35s ease-out 0.3s forwards;
		}

		@keyframes fadeInLeft {
			0%,
			50% {
				opacity: 0;
				transform: translateX(-10px);
			}
			80% {
				opacity: 0.8;
				transform: translateX(2px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes fadeInRight {
			0%,
			50% {
				opacity: 0;
				transform: translateX(10px);
			}
			80% {
				opacity: 0.8;
				transform: translateX(-2px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes fadeInTop {
			0%,
			50% {
				opacity: 0;
				transform: translateY(-10px);
			}
			80% {
				opacity: 0.8;
				transform: translateY(2px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes fadeInBottom {
			0%,
			50% {
				opacity: 0;
				transform: translateY(10px);
			}
			80% {
				opacity: 0.8;
				transform: translateY(-2px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'layout-grid',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutGridIcon {
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
