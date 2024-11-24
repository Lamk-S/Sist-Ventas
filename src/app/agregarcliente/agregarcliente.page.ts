import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { ClienteModel } from '../models/cliente.model';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.page.html',
  styleUrls: ['./agregarcliente.page.scss'],
})
export class AgregarClientePage implements OnInit {
  @Input() cliente: ClienteModel | null = null;  // Para saber si estamos editando un cliente existente

  clienteForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private toastService: ToastService
  ) {
    this.clienteForm = this.formBuilder.group({
      ruc_dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      nombres: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    if (this.cliente) {
      // Si estamos editando, cargamos los datos del cliente
      this.clienteForm.patchValue(this.cliente);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardarCliente() {
    if (this.clienteForm.valid) {
      if (this.cliente) {
        // Editar cliente
        this.clientesService.actualizarCliente(this.cliente.cliente_id!, this.clienteForm.value).subscribe(() => {
          this.modalCtrl.dismiss(this.clienteForm.value, 'updated');
          this.toastService.mostrarToast('Cliente actualizado exitosamente.');
        });
      } else {
        // Agregar nuevo cliente
        this.clientesService.agregarCliente(this.clienteForm.value).subscribe(() => {
          this.modalCtrl.dismiss(this.clienteForm.value, 'created');
          this.toastService.mostrarToast('Cliente agregado exitosamente.');
        });
      }
    }
  }
}