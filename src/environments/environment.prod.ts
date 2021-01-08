export const environment = {
  production: true,
  apiUrl: "https://pokeapi.co/api/v2",
  ec2Url: "http://ec2-54-215-135-86.us-west-1.compute.amazonaws.com:8085/PokePipeline",
  pokemonRange: 649
};

export const trainerAPIendpoint = environment.ec2Url + '/trainer';
export const authAPIendpoint = environment.ec2Url + '/auth';
