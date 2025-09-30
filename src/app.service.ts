import { Injectable } from '@nestjs/common';
import { app } from './main';
import { Router } from 'express';

@Injectable()
export class AppService {
  getRouts(): JSON {
    const server = app.getHttpServer();
    const router: Router = server._events.request.router;
    console.log(JSON.stringify(router))
    if(!router) return JSON.parse(JSON.stringify({"Error": "No router"}));

    
    for(let i=0; i<router.stack.length; i++) {
      console.log(JSON.stringify(router.stack[i]))
    }
    return JSON.parse(JSON.stringify({"Error": "Debug"}));
    
    let availableRoutes: [{ path: string, methods: string[] }?] = [];
    for(let i=0; i<router.stack.length; i++) {
      if (router.stack[i].route && router.stack[i].route!.stack[0].method !== "acl" && isInList(router.stack[i].route!.path, availableRoutes)) {
        availableRoutes.push({
          path: router.stack[i].route!.path,
          methods: getMethods(router.stack[i].route!.path , router),
        })
      }
    }
    return JSON.parse(JSON.stringify(availableRoutes));
  }
}

function isInList(path: string, availableRoutes: [{ path: string, methods: string[] }?]): boolean {
  if(path.endsWith('/:id')) return false;
  for(let i=0; i<availableRoutes.length; i++) {
    if(availableRoutes[i]!.path === path) return false;
  }
  return true;
}

function getMethods(path: string, router: Router): string[] {
  let methods: string[] = [];
  for(let i=0; i<router.stack.length; i++) {
    if(router.stack[i].route!.path === path) {
      methods.push(router.stack[i].route!.stack[0].method)
    } else if(router.stack[i].route!.path === path+"/:id") {
      methods.push(router.stack[i].route?.stack[0].method+"/:id")
    }
  }
  return methods;
}