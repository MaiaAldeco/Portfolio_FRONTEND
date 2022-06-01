import { Component, OnInit } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone, faPaperPlane, faPenToSquare, faTrash, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../models/contact';
import { ServiceScrollrevealService } from '../service-scrollreveal.service';
import { ContactService } from '../service/contact-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faLocationDot = faLocationDot;
  faPhone = faPhone;
  faPaperPlane = faPaperPlane;
  faUser = faUser;
  faSearch = faMagnifyingGlass;
  closeResult: string;
  contactos: Contact[];
  editForm: FormGroup;
  isAdmin = false;
  isLogged = false;

  constructor(private scrollreveal: ServiceScrollrevealService,
    private modalService: NgbModal,
    private contactoService: ContactService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) { }

  config1reveal = this.scrollreveal.config1reveal

  ngOnInit(): void {
    this.contactoLista();
    this.editForm = this.formBuilder.group({
      id: [''],
      localidad: [''],
      telefono: [''],
      email: ['']
    });
    //verifica que estemos loggeados
    this.isLogged = this.tokenService.isLogged();
    //obtiene el rol
    this.isAdmin = this.tokenService.isAdmin();
  }

  //lista
  contactoLista(): void {
    this.contactoService.lista().subscribe({
      next: (data) => this.contactos = data, error: (e) => console.log(e)
    })
  };

  //details
  openDetails(targetModal, contact: Contact) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('localidadContact').setAttribute('value', contact.localidad);
    document.getElementById('telefonoContact').setAttribute('value', contact.telefono);
    document.getElementById('emailContact').setAttribute('value', contact.email);
  }

  //vista edit
  openEdit(targetModal, contact: Contact) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: contact.id,
      localidad: contact.localidad,
      telefono: contact.telefono,
      email: contact.email
    });
  }

  //update
  onSave() {
    this.contactoService.update(this.editForm.value.id, this.editForm.value).subscribe({
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
