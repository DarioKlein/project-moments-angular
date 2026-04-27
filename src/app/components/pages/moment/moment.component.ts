import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Moment } from 'src/app/Moment'
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
  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getMoment()
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
}
