import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaModel } from '../models/categoria.model';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  @Input() categoria: CategoriaModel | null = null;
  @Input() edit: boolean = false;

  categoriaForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private toastService: ToastService
  ) {
    this.categoriaForm = this.formBuilder.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.categoria) {
      // Si estamos editando, cargamos los datos de la categoría
      this.categoriaForm.patchValue(this.categoria);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardarCategoria() {
    if (this.categoriaForm.valid) {
      if (this.categoria) {
        // Editar categoría
        this.categoriaService.actualizarCategoria(this.categoria.idcategoria!, this.categoriaForm.value).subscribe(() => {
          this.modalCtrl.dismiss(this.categoriaForm.value, 'updated');
          this.toastService.mostrarToast('Categoría actualizada exitosamente.');
        });
      } else {
        // Agregar nueva categoría
        this.categoriaService.agregarCategoria(this.categoriaForm.value).subscribe(() => {
          this.modalCtrl.dismiss(this.categoriaForm.value, 'created');
          this.toastService.mostrarToast('Categoría agregada exitosamente.');
        });
      }
    }
  }
}