import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-layout-template',
	template: `
		<svg
			class="layout-template-icon"
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
			<svg:rect class="top-panel" width="18" height="7" x="3" y="3" rx="1" />
			<svg:rect class="bottom-left-panel" width="9" height="7" x="3" y="14" rx="1" />
			<svg:rect class="bottom-right-panel" width="5" height="7" x="16" y="14" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layout-template-icon {
			overflow: visible;
		}

		.layout-template-icon.animate .top-panel {
			opacity: 0;
			animation: fadeInTop 0.3s ease-in forwards;
		}

		.layout-template-icon.animate .bottom-left-panel {
			opacity: 0;
			animation: fadeInLeft 0.4s ease-out 0.1s forwards;
		}

		.layout-template-icon.animate .bottom-right-panel {
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
				transform: translateX(3px);
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
		'aria-label': 'layout-template',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutTemplateIcon {
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
