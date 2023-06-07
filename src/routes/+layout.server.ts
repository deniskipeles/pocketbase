
/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals: { user, hostel } }) => {

  return {
    user,
    hostel,
  };
};


