import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-layout-panel-left',
	template: `
		<svg
			class="layout-panel-left-icon"
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
			<svg:rect class="left-panel" width="7" height="18" x="3" y="3" rx="1" />
			<svg:rect class="top-right-panel" width="7" height="7" x="14" y="3" rx="1" />
			<svg:rect class="bottom-right-panel" width="7" height="7" x="14" y="14" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layout-panel-left-icon {
			overflow: visible;
		}

		.layout-panel-left-icon.animate .left-panel {
			opacity: 0;
			animation: fadeInLeft 0.3s ease-in forwards;
		}

		.layout-panel-left-icon.animate .top-right-panel {
			opacity: 0;
			animation: fadeInBox 0.4s ease-out 0.1s forwards;
		}

		.layout-panel-left-icon.animate .bottom-right-panel {
			opacity: 0;
			animation: fadeInBox 0.4s ease-out 0.2s forwards;
		}

		@keyframes fadeInLeft {
			0%,
			20% {
				opacity: 0;
				transform: translateX(-5px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes fadeInBox {
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
		'aria-label': 'layout-panel-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPanelLeftIcon {
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
