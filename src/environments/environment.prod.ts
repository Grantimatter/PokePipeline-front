export const environment = {
  production: true,
  apiUrl: 'https://pokeapi.co/api/v2',
  ec2Url:
    'http://ec2-18-216-220-245.us-east-2.compute.amazonaws.com:8085/PokePipeline',
  pokemonRange: 649,
};

export const trainerAPIendpoint = environment.ec2Url + '/trainer';
export const authAPIendpoint = environment.ec2Url + '/auth';
