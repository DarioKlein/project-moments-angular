import { Component, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Comment } from 'src/app/Comment'
import { Moment } from 'src/app/Moment'
import { CommentService } from 'src/app/services/comment.service'
import { MessagesService } from 'src/app/services/messages.service'
import { MomentService } from 'src/app/services/moment.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment
  baseAPIUrl = environment.baseAPIUrl
  faTimes = faTimes
  faEdit = faEdit
  submitted = false

  commentForm!: FormGroup
  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.getMoment()

    this.commentForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    })
  }

  getMoment() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data))
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()
    this.messagesService.add('Momento removido com sucesso!')
    this.router.navigate(['/'])
  }

  get text() {
    return this.commentForm.get('text')!
  }

  get username() {
    return this.commentForm.get('username')!
  }

  async onSubmit() {
    this.submitted = true

    if (this.commentForm.invalid) {
      return
    }

    const data: Comment = this.commentForm.value
    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) => {
      this.moment!.comments!.push(comment.data)
    })

    this.messagesService.add('Comentário adicionado com sucesso!')
    this.commentForm.reset()
    this.submitted = false
  }
}
