import { Component, OnInit } from '@angular/core';
import { ServiciosService} from './servicio/servicios.service';
import { Mascota} from './modelo/Mascota';
import Swal from'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  btnagregar:boolean =true;
  btnmodficar:boolean =false;
  mascota:Mascota = new  Mascota();
  title = 'angularsinentity';
  public datos :any=[];
  
  constructor(private service:ServiciosService ) {             
  }

  cargarInformacion (){
    this.service.getMascota().subscribe((res)=>{
      this.datos = res;      
    }); }    

  ngOnInit(): void {
    this.cargarInformacion ();
  }

  convert(model:Mascota){
    this.mascota.IdMascota = model.IdMascota;
    this.mascota.Nombre = model.Nombre;
    this.mascota.Edad = model.Edad;
    this.mascota.Descripcion = model.Descripcion;
  }



  agregar(model:Mascota,numero:number){
    if(numero===1){            
        this.btnagregar=false;
        this.btnmodficar=true;
        this.cargarInformacion();

     }
      else{
        Swal.fire({
          title: 'Are you sure?',          
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {

            this.service.DeleteMascota(model.IdMascota).subscribe((res)=>{
              if(res)
              {        
                Swal.fire(
                  'Elemento Eliminado',
                  'Informacion eliminada.',
                  'success'
                )
                this.cargarInformacion();
                this.limpiar()
              }});
            
            
          }
        })
      }


    this.convert(model);                  
  }

  mensajeExito(textto:string){
    Swal.fire(
      textto,
      'success'
    )

    this.cargarInformacion ();
    this.limpiar();
    }

  AgregarMascota(model:Mascota){    
   console.log(model);
    if(model.IdMascota===0){
    this.service.addMascota(model).subscribe((res)=>{
      if(res)
      {        
        this.mensajeExito("Se ha Agregado la mascota");
      }
      
    });
  }else{
    this.service.EditMascota(model).subscribe((res)=>{
      if(res)
      {        
        this.mensajeExito("Se ha modificado la mascota");
        
      }      
    });
  }
  
  }

  limpiar(){
    this.mascota.IdMascota=0;
    this.mascota.Nombre="";
    this.mascota.Descripcion="";
    this.mascota.Edad=0;
    this.btnagregar=true;
    this.btnmodficar=false;
  }


  

  

}
