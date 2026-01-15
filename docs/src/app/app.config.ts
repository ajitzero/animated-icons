import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),

		provideFileRouter(withComponentInputBinding()),
		provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
	],
};
