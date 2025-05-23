import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Address } from "../../../types/address.model";

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Output() address = new EventEmitter<Address>();

  constructor(private fb: FormBuilder) { }

  addressForm = this.fb.group({
    street: ['', Validators.required],
    number: [0, [Validators.required, Validators.min(1)]],
    locality: ['', Validators.required],
    province: ['', Validators.required],
    type: ['', Validators.required]
  });

  ngOnInit(): void {
    this.addressForm.valueChanges.subscribe(() => this.emitAddress());
  }
  clearZero(): void {
    // Verifica si el valor es 0 antes de borrarlo
    if (this.addressForm.controls['number'].value === 0) {
      this.addressForm.controls['number'].setValue(null);
    }
  }
  emitAddress() {
    const formValue = this.addressForm.value;

    const address: Address = {
      street: formValue.street || '',
      number: formValue.number || 0,
      locality: formValue.locality || '',
      province: formValue.province || '',
      type: formValue.type || '',
      isActivated: true
    };
    this.address.emit(address); // Emite el valor siempre, incluso si el formulario es inválido
  }
}
