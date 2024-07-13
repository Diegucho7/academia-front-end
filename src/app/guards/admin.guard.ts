import { CanActivateFn, Router } from '@angular/router';
import {   inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.role === 'ADMIN_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false
  }
};
export const profeGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.role === 'PROFESOR_ROLE' || usuarioService.role === 'ADMIN_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false
  }
};
export const estudianteGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.role === 'ESTUDIANTE_ROLE' || usuarioService.role === 'ADMIN_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false
  }
};
export const contadorGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.role === 'ADMIN_ROLE' || usuarioService.role === 'CONTADOR_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false
  }
};
export const reciboGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.role === 'ADMIN_ROLE' || usuarioService.role ===  'CONTADOR_ROLE'|| usuarioService.role === 'ESTUDIANTE_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false
  }
};
export const revisionGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.role === 'ADMIN_ROLE' || usuarioService.role ===  'PROFESOR_ROLE'|| usuarioService.role === 'ESTUDIANTE_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false
  }
};
