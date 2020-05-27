import { join } from 'path';
import 'zone.js/dist/zone-node';
import { existsSync } from 'fs';
import * as express from 'express';
import { XMLHttpRequest } from 'xhr2';
import { parseStringPromise } from 'xml2js';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { BOE, Contract } from 'src/app/models';
import { APP_BASE_HREF } from '@angular/common';
import { AppServerModule } from './src/main.server';
import { boeParser } from 'src/app/parsers/boe.parser';
import { environment } from 'src/environments/environment';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { of, Observable, forkJoin, PartialObserver } from 'rxjs';
import { pluck, map, concatMap, switchMap } from 'rxjs/operators';
import { ContractParser } from 'src/app/parsers/Contract.parser';

/////////////////////////////
let baseUrl = `${environment.boeBaseUrl}${environment.boeApi}`;

// Customized Code
const createAjaxConfig = (url: string): AjaxRequest => {
  return {
    createXHR: () => new XMLHttpRequest(),
    url,
    method: 'GET',
    crossDomain: true,
    responseType: 'text',
  };
};

const mapBoeToContractCollection = ({
  idAnuncio,
}: BOE): Observable<Contract>[] => {
  let observablesCollection: Observable<Contract>[] = idAnuncio.map(
    (id: string) => {
      return getContract(`${baseUrl}?id=${id}`);
    }
  );

  return observablesCollection;
};

const getContract = (url): Observable<Contract> => {
  return ajax(createAjaxConfig(url)).pipe(
    pluck('response'),
    concatMap((value) => parseStringPromise(value)),
    map<any, Contract>(ContractParser)
  );
};

/////////////////////////////

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/nuestro-dinero/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  server.get('/api/boe', async (req, res) => {
    let boeId = req.query.id;
    let query = boeId ? `?id=${boeId}` : '';

    const observable$: Observable<Contract[]> = ajax(
      createAjaxConfig(`${baseUrl}${query}`)
    ).pipe(
      pluck('response'),
      concatMap<string, Promise<any>>((value) => parseStringPromise(value)),
      map<any, BOE>(boeParser),
      map<BOE, Observable<Contract>[]>(mapBoeToContractCollection),
      switchMap<Observable<Contract>[], Observable<Contract[]>>((r) => {
        return r.length ? forkJoin(r) : of([]);
      })
    );

    const observer: PartialObserver<Contract[]> = {
      next: (ContractCollection) => {
        console.log(
          `Succesfully retrieved ${ContractCollection.length} documents`
        );
        res.status(200).send(ContractCollection);
      },
      error: (err) => {
        console.warn('Error', err);
        res.status(err.status).send(err.error);
      },
    };

    observable$.subscribe(observer);
  });

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
