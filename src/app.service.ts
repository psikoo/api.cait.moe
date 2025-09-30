import { Injectable } from '@nestjs/common';
import { app } from './main';
import { Router } from 'express';

@Injectable()
export class AppService {
  getRouts(): JSON {
    const server = app.getHttpServer();
    console.log(" > DEBUG "+server)
    const router: Router = server._events.request._router;
    console.log(JSON.stringify(router))
    console.log(" > DEBUG "+router.stack)
    console.log(" > DEBUG "+router.stack.length)
    console.log(" > DEBUG "+router.stack[0].route)
    console.log(" > DEBUG "+router.stack[0].route!.path)
    console.log(" > DEBUG "+getMethods(router.stack[0].route!.path , router))
    
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