import { InjectionToken, Provider } from '@angular/core';

export const ANIMATED_ICONS_CONFIG = new InjectionToken<AnimatedIconsOptions>('ANIMATED_ICONS_CONFIG', {
	factory: () => ({ color: 'currentColor', size: 24, strokeWidth: 2 }),
});

export type AnimatedIconsOptions = Partial<{
	color: string;
	size: number;
	strokeWidth: number;
}>;

export function provideAnimatedIcons(options: AnimatedIconsOptions): Provider[] {
	return [{ provide: ANIMATED_ICONS_CONFIG, useValue: options }];
}
