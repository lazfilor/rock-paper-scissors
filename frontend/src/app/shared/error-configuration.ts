
export const errorConfiguration: {idPath: string, types: Record<string, string>} = {
  idPath: 'id',
  types: {
    default: 'An error occurred!',
    routing: 'An error occurred! Unable to find the current page!',
    server: 'An error occurred on the server!'
  }
};
