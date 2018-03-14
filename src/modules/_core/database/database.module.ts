import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { DatabaseService } from './services/database.service'
import { Entity } from './models/entity'

@NgModule({
  imports: [
    HttpClientModule,
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class DatabaseModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: [] }
      ]
    }
  }

  public static forChild(entities: Entity[]): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    }
  }

}
