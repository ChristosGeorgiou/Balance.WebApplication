import { ShellComponent } from './@shell/shell.component'
import { AboutComponent } from './about/about.component'
// import { DeveloperComponent } from './developer/developer.component'
import { FaqComponent } from './faq/faq.component'
import { GeneralComponent } from './general/general.component'
import { IntegrationsComponent } from './integrations/integrations.component'
import { LiveComponent } from './live/live.component'
import { WorkspacesComponent } from './workspaces/workspaces.component'

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
  data: {
    title: 'Settings'
  },
  children: [{
    path: 'general',
    data: { title: 'General' },
    component: GeneralComponent
  }, {
    path: 'integrations',
    data: { title: 'Integrations' },
    component: IntegrationsComponent
  }, {
    path: 'workspaces',
    data: { title: 'Workspaces' },
    component: WorkspacesComponent
  }, {
    //   path: 'developer',
    //   data: { title: 'Debug' },
    //   component: DeveloperComponent
    // }, {
    path: 'faq',
    data: { title: 'FAQ' },
    component: FaqComponent
  }, {
    path: 'live',
    data: { title: 'Live Chat' },
    component: LiveComponent
  }, {
    path: 'about',
    data: { title: 'About' },
    component: AboutComponent
  }, {
    path: '',
    redirectTo: '/settings/general',
    pathMatch: 'full' as 'prefix' | 'full'
  }]
}]
