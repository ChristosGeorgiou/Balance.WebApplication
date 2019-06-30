import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Issue, IssueStatus, IssueStatusModel, Log, LogType, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-issue',
  templateUrl: 'issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  commentPreview: boolean
  projectId: string
  issueId: string
  comment: string = null

  issue$: Observable<Issue>
  project$: Observable<Project>
  logs$: Observable<Log[]>

  form: FormGroup

  postCommentLoading = false

  editDesc = false

  statuses = IssueStatus
  issueStatusModel = IssueStatusModel

  logType = LogType

  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  status(status: IssueStatus) {
    const s = this.issueStatusModel.find(x => x.key === status)
    return {
      style: {
        backgroundColor: s.color,
        color: "#FFF"
      },
      label: s.alias
    }
  }

  nextStatus(status: IssueStatus) {
    const i = this.issueStatusModel.findIndex(x => x.key === status)
    if (i === this.issueStatusModel.length - 1) return this.issueStatusModel.length - 1
    return this.issueStatusModel[i + 1]
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params['pid']
        this.issueId = params['tid']
        this.form = this.formBuilder.group({
          comment: ['', [Validators.required]]
        })
        this.setup()
      })
  }

  async saveDetails(data) {
    Object.keys(data).forEach(k => {
      data[k] = data[k].trim()
    });
    const issue = await this.projectsService.getOne<Issue>("issues", this.issueId);
    await issue.update({
      $set: data
    });

    await this.projectsService.addOne<Log>("logs", {
      issueId: this.issueId,
      type: LogType.activity,
      text: `update ${this.issueId}, set ` + Object.keys(data).map(k => `${k} = ${data[k]}`).join(" "),
      insertedAt: Date.now(),
      insertedFrom: "_system"
    })
  }

  async submitComment() {
    const formModel = this.form.value
    if (!formModel.comment) return
    this.postCommentLoading = true
    await this.projectsService.createComment(formModel.comment, this.issueId)
    this.form.reset()
    this.postCommentLoading = false
  }

  async changeStatus(status: string) {
    await this.projectsService.changeStatus(status, this.issueId)
  }

  private async setup() {
    this.issue$ = this.projectsService.getOne$<Issue>('issues', this.issueId)
    this.logs$ = this.projectsService
      .getAll$<Log>('projects', {
        issueId: { $eq: this.issueId }
      })
      .pipe(
        tap((events) => {
          events = events.sort((a, b) => {
            return a.insertedAt < b.insertedAt ? -1 : 1
          })
        }))

    this.issue$.subscribe((issue) => {
      this.project$ = this.projectsService.getOne$<Project>('projects', issue.projectId)
    })
  }
}