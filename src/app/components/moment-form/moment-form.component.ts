import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Moment } from 'src/app/Moment'
@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string
  @Input() momentData: Moment | null = null
  @Output() onSubmit = new EventEmitter<Moment>()
  momentForm!: FormGroup
  submitted = false

  constructor() {}

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]),
      description: new FormControl(
        this.momentData ? this.momentData.description : '',
        [Validators.required, Validators.maxLength(255)],
      ),
      image: new FormControl(this.momentData ? this.momentData.image : ''),
    })
  }

  get title() {
    return this.momentForm.get('title')!
  }

  get description() {
    return this.momentForm.get('description')!
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.momentForm.patchValue({ image: file })
  }

  submit() {
    this.submitted = true

    if (this.momentForm.invalid) {
      return
    }

    console.log(this.momentForm.value)
    this.onSubmit.emit(this.momentForm.value)
  }
}
