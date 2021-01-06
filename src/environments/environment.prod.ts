export const environment = {
  production: true,
  apiUrl: 'https://pokeapi.co/api/v2',
  ec2Url: 'http://ec2-54-215-135-86.us-west-1.compute.amazonaws.com:8085/PokePipeline'
};

//const host = 'http://localhost:8080';
//const apiroot = host + '/PokePipeline';
const trainer = environment.ec2Url + '/trainer';
//const getUser = user + '/getprofile';
//const updateUser = user + '/updateprofile';
//const updatePassword = user + '/updatepassword';

export const API = {
  getUserEndpoint: trainer,
  updateUserEndpoint: trainer,
  updatePasswordEndpoint: trainer,
};
