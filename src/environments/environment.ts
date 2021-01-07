// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://pokeapi.co/api/v2',
  ec2Url:
    'http://ec2-54-215-135-86.us-west-1.compute.amazonaws.com:8085/PokePipeline',
  pokemonRange: 649,
};

export const trainerAPIendpoint = environment.ec2Url + '/trainer';
export const authAPIendpoint = environment.ec2Url + '/auth';
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
