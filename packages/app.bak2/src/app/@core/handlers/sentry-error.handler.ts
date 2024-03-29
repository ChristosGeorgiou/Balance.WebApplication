import { ErrorHandler, Injectable } from '@angular/core'
import * as Sentry from '@sentry/browser'
import environment from '../../../environments/environment'

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError (error) {
    if (environment.production && Sentry.getCurrentHub().getClient().getOptions().enabled) {
      const eventId = Sentry.captureException(error.originalError || error)
      if (environment.sentry.showReportDialog) {
        Sentry.showReportDialog({ eventId })
      }
      return
    }
    throw error
  }
}
