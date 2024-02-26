import { Router } from '@angular/router';
import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';


declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') declare googleBtn: ElementRef;
  
  public formSubmitted = false;
  
  
  
  public loginForm: FormGroup = this.fb.group({
    email:[localStorage.getItem('email')|| '',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(2)]],
    remember: [false]
  });
  
  
  constructor(private route: Router,
    private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private ngZone: NgZone){  }
    
    
    
    ngAfterViewInit(): void {
      
      this.googleInit();
      this.logout();
  }
  googleInit(){
      google.accounts.id.initialize({
      client_id: '262405824363-jkh0orho6mo09g9m63mrqumqd8l3h79i.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }
    
  handleCredentialResponse(response: any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).
    subscribe(resp =>{
      // console.log({login:resp})
          this.route.navigateByUrl('/')

    })
  }

  login(){
    // console.log(this.loginForm.value)
    // this.route.navigateByUrl('/')
    this.usuarioService.login(this.loginForm.value).
                        subscribe(resp =>{
                          
                        if(this.loginForm.get('remember')!.value){
                          localStorage.setItem('email', this.loginForm.get('email')?.value);
                        }else{
                          localStorage.removeItem('email');
                        }

            // Navegar por el Dashboard
            this.route.navigateByUrl('/');


            },(err)=>{
              // Si sucede un error

              Swal.fire('Error',err.error.msg,'error');

            })

  }

  logout(){
    const email=localStorage.getItem('email')|| '';
    google.accounts.id.revoke(email,()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    })
  }
}
