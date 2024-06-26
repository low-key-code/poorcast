import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'], 
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectInputComponent,
    multi: true
  }]
})
export class SelectInputComponent implements ControlValueAccessor{
  @Input() options: string[];
  @Input() showFeedback: boolean;
  @Input() feedBackMsg: string;
  @Input() label: string;
  @Input() placeholder?: string;
  @Input() formControlName: string;
  @Input() defaultValue?: string | number | Date | undefined;
  inputValue;

  touched = false;

  onTouched = () => {}
  onChange = (input: string) => {}

  writeValue(value: string) {
    this.inputValue = value;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }   

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  onInput($event: any) {
    this.markAsTouched();
    this.inputValue = $event.target.value;
    this.onChange(this.inputValue)
  }

  markAsTouched() {
    if(!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
