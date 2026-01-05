import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-user-round-cog',
	template: `
		<svg
			class="user-round-cog-icon"
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
			<svg:path d="M2 21a8 8 0 0 1 10.434-7.62" />
			<svg:circle cx="10" cy="8" r="5" />
			<svg:g class="cog-group">
				<svg:circle cx="18" cy="18" r="3" />
				<svg:path d="m19.5 14.3-.4.9" />
				<svg:path d="m16.9 20.8-.4.9" />
				<svg:path d="m21.7 19.5-.9-.4" />
				<svg:path d="m15.2 16.9-.9-.4" />
				<svg:path d="m21.7 16.5-.9.4" />
				<svg:path d="m15.2 19.1-.9.4" />
				<svg:path d="m19.5 21.7-.4-.9" />
				<svg:path d="m16.9 15.2-.4-.9" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cog-group {
			transform-origin: 18px 18px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.cog-group.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'user-round-cog',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoundCogIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		this.isHovered.set(true);
	}

	handleMouseLeave() {
		this.isHovered.set(false);
	}
}
