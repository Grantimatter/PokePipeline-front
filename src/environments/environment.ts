// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://pokeapi.co/api/v2',
  ec2Url: 'http://3.137.201.253:8085/PokePipeline',
};

const host = 'http://localhost:8080';
const apiroot = host + '/PokePipeline';
const user = apiroot + '/user';
const getUser = user + '/getprofile';
const updateUser = user + '/updateprofile';
const updatePassword = user + '/updatepassword';

export const API = {
  getUserEndpoint: getUser,
  updateUserEndpoint: updateUser,
  updatePasswordEndpoint: updatePassword,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
