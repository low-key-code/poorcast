import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit {
  @Input() legend = '';

  constructor() { }

  ngOnInit(): void {
  }

}