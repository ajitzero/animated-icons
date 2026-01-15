import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-layout-dashboard',
	template: `
		<svg
			class="layout-dashboard-icon"
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
			<svg:rect class="top-left-panel" width="7" height="9" x="3" y="3" rx="1" />
			<svg:rect class="top-right-panel" width="7" height="5" x="14" y="3" rx="1" />
			<svg:rect class="bottom-right-panel" width="7" height="9" x="14" y="12" rx="1" />
			<svg:rect class="bottom-left-panel" width="7" height="5" x="3" y="16" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layout-dashboard-icon {
			overflow: visible;
		}

		.layout-dashboard-icon.animate .top-left-panel {
			opacity: 0;
			animation: fadeInLeft 0.35s ease-out forwards;
		}

		.layout-dashboard-icon.animate .bottom-right-panel {
			opacity: 0;
			animation: fadeInRight 0.35s ease-out 0.1s forwards;
		}

		.layout-dashboard-icon.animate .top-right-panel {
			opacity: 0;
			animation: fadeInTop 0.35s ease-out 0.2s forwards;
		}

		.layout-dashboard-icon.animate .bottom-left-panel {
			opacity: 0;
			animation: fadeInBottom 0.35s ease-out 0.3s forwards;
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
		'aria-label': 'layout-dashboard',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDashboardIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 650);
		}
	}
}
