import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-user-cog',
	template: `
		<svg
			class="user-cog-icon"
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
			<svg:g class="cog-group">
				<svg:circle cx="18" cy="15" r="3" />
				<svg:path d="m21.7 16.4-.9-.3" />
				<svg:path d="m15.2 13.9-.9-.3" />
				<svg:path d="m16.6 18.7.3-.9" />
				<svg:path d="m19.1 12.2.3-.9" />
				<svg:path d="m19.6 18.7-.4-1" />
				<svg:path d="m16.8 12.3-.4-1" />
				<svg:path d="m14.3 16.6 1-.4" />
				<svg:path d="m20.7 13.8 1-.4" />
			</svg:g>
			<svg:circle cx="9" cy="7" r="4" />
			<svg:path d="M10 15H6a4 4 0 0 0-4 4v2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cog-group {
			transform-origin: 18px 15px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.cog-group.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'user-cog',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCogIcon {
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
