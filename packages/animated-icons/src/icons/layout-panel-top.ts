import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-layout-panel-top',
	template: `
		<svg
			class="layout-panel-top-icon"
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
			<svg:rect class="top-panel" width="18" height="7" x="3" y="3" rx="1" />
			<svg:rect class="bottom-left-panel" width="7" height="7" x="3" y="14" rx="1" />
			<svg:rect class="bottom-right-panel" width="7" height="7" x="14" y="14" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layout-panel-top-icon {
			overflow: visible;
		}

		.layout-panel-top-icon.animate .top-panel {
			opacity: 0;
			animation: fadeInTop 0.3s ease-in forwards;
		}

		.layout-panel-top-icon.animate .bottom-left-panel {
			opacity: 0;
			animation: fadeInLeft 0.4s ease-out 0.1s forwards;
		}

		.layout-panel-top-icon.animate .bottom-right-panel {
			opacity: 0;
			animation: fadeInRight 0.4s ease-out 0.2s forwards;
		}

		@keyframes fadeInTop {
			0%,
			20% {
				opacity: 0;
				transform: translateY(-5px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
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
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'layout-panel-top',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPanelTopIcon {
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
