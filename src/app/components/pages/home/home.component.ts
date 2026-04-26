import { Component, OnInit } from '@angular/core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Moment } from 'src/app/Moment'
import { Response } from 'src/app/Response'
import { MomentService } from 'src/app/services/moment.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []
  moments: Moment[] = []
  baseAPIUrl = environment.baseAPIUrl
  faSearch = faSearch
  searchTerm: string = ''

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.getMoments()
  }

  getMoments() {
    this.momentService.getAllMoments().subscribe((items) => {
      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })

      this.allMoments = data
      this.moments = data
    })
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value)
    })
  }
}
