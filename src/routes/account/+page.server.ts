import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ parent }) {
  let parentData = await parent();
  if (parentData?.user) {
    // console.log(parentData)
    return { ...parentData }
  } else {
    throw redirect(
      301,
      "/login?alert_danger=you are not allowed to access that page"
    );
  }
}
