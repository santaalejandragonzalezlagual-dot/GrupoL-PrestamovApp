import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-prestamo',
  templateUrl: './nuevo-prestamo.page.html',
  styleUrls: ['./nuevo-prestamo.page.scss'],
  standalone : false,
})
export class NuevoPrestamoPage implements OnInit {

  prestamo = {
    nombre: '',
    cedula: '',
    direccion: '',
    monto: null,
    plazo: null,
    interes: null,
    nota: ''
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardarPrestamo() {
  // 1. Limpiamos espacios en blanco para evitar errores
  const nombreLimpio = this.prestamo.nombre?.trim();
  const cedulaLimpia = this.prestamo.cedula?.trim();

  // 2. Validamos de forma que los campos obligatorios tengan información
  if (!nombreLimpio || !cedulaLimpia || !this.prestamo.monto || !this.prestamo.plazo) {
    alert(' Error: El Nombre, la Cédula, el Monto y el Plazo son obligatorios.');
    return; // Detiene la función aquí y no guarda nada.
  }


  // 3. Validamos que el monto y el plazo sean números válidos mayores a cero
  if (this.prestamo.monto <= 0 || this.prestamo.plazo <= 0) {
    alert('❌ Error: El monto y el plazo deben ser mayores a cero.');
    return; // Detiene la función si ponen números negativos o cero.
  }

  // 4. Si pasa todas las pruebas anteriores, entonces SÍ se guarda con éxito
  console.log('¡Datos aprobados y listos para guardar!:', this.prestamo);
  alert(`✅ ¡Solicitud registrada con éxito para ${this.prestamo.nombre}!`);
  
  // 5. Cerramos la ventana mandando el objeto con los datos reales
  this.modalCtrl.dismiss(this.prestamo); 
}
}