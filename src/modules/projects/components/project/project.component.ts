import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { RxPEventDoc, PEvent } from '../../models/pevent'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { Project } from '../../models/project'
import { ProjectsService } from '../../projects.service'

@Component({
  selector: 'projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  tabsMenu: any
  tasks: PEvent[]
  project: Project & any = {}
  projectId: string

  constructor (
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit () {

    this.tabsMenu = {
      tabs: [{
        id: 'tasks',
        label: 'Tasks',
        icon: 'tasks'
      }, {
        id: 'settings',
        icon: 'cog',
        right: true
      }]
    }

    this.route.params.subscribe(params => {
      this.projectId = params['pid']
      this.setup()
    })
  }

  private async setup () {
    this.project = await this.projectsService.getProject(this.projectId)
    this.tasks = await this.projectsService.getTasks({
      query: { project: { $eq: this.projectId } }
    })
  }

  createTask () {
    const modalRef = this.modal.open(CreateTaskComponent)
    modalRef.componentInstance.projectId = this.projectId
  }
}