import { Component, OnInit } from '@angular/core';
import { ServiceScrollrevealService } from '../service-scrollreveal.service';
import { faPenToSquare, faTrash, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonaServiceService } from '../service/persona-service.service';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../models/persona';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faUser = faUser;
  faSearch = faMagnifyingGlass;
  closeResult: string;
  personas: Persona[];
  editForm: FormGroup;
  deleteId: number;
  isLogged = false;
  authority: string;
  isAdmin = false;
  mensaje:string;
  errorMsj:string;


  constructor(private scrollreveal: ServiceScrollrevealService,
    private modalService: NgbModal,
    private personaService: PersonaServiceService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {
  }

  config1reveal = this.scrollreveal.config1reveal

  ngOnInit(): void {
    this.personaLista();
    this.editForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      stack: [''],
      tecnologia: [''],
      descripcion: ['']

    });
    //verifica que estemos loggeados
    this.isLogged = this.tokenService.isLogged();
    //obtiene el rol
    this.isAdmin = this.tokenService.isAdmin();
  }

  //lista
  personaLista(): void {
    this.personaService.lista().subscribe({
      next: (data) => this.personas = data, error: (e) => console.log(e)
    })
  };

  //detalle
  openDetails(targetModal, persona: Persona) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('firstname').setAttribute('value', persona.nombre);
    document.getElementById('lastname').setAttribute('value', persona.apellido);
    document.getElementById('stck').setAttribute('value', persona.stack);
    document.getElementById('tec').setAttribute('value', persona.tecnologia);
    document.getElementById('desc').setAttribute('value', persona.descripcion);

  }

  //vista edit
  openEdit(targetModal, persona: Persona) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      stack: persona.stack,
      tecnologia: persona.tecnologia,
      descripcion: persona.descripcion
    });
  }

  //update
  onSave() {
    this.personaService.update(this.editForm.value.id, this.editForm.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Persona actualizada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })

    })
  }

  //new
  onSubmit(f: NgForm) {
    this.personaService.save(f.value).subscribe({
      next: (v) => {
        this.ngOnInit(),
        this.toastr.success('Persona creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => { this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    }})
  }

  //vista delete
  openDelete(targetModal, persona: Persona) {
    this.deleteId = persona.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  //delete
  onDelete() {
    this.personaService.delete(this.deleteId).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Persona creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    })
  }

  //modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
